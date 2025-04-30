import crypto from "node:crypto";
import bcrypt from "bcrypt";

import { JWT } from "../../jwt/jwt.js";
import { AccountMySQL } from "../../models/accountMySQL.js";
import { AccountValidator } from "../../validators/accountValidator.js";
import { UUIDParser } from "../../utils/uuidParser.js";
import { SALT } from "../../config.js";
import { logginMySQL } from "../../models/logginMySQL.js";

export class AccountController {
  static async login(req, res) {
    // Validamos el cuerpo de la petición antes de procesarlo
    const validate = AccountValidator.validate(req.body);

    // Si no cumple con los requisitos enviamos un error y un 400
    if (!validate.success) {
      res.status(200).json({ success: false, error: validate.errors[0] });
      return;
    }

    // Comprobamos la información del usuario  y recuperamos su información
    const checkAccount = await AccountMySQL.getAccountData(
      req.body.email,
      req.body.passwd
    );

    // Si no es valido el usuario enviamos el error
    if (!checkAccount.success) {
      res.status(200).json(checkAccount);
      return;
    }

    // Guardamos un registro de los inicios de sesion
    logginMySQL.Login({
      ip: req.headers["x-real-ip"],
      device: req.headers["user-agent"],
      user_id: checkAccount.data.id,
    });

    // Creamos el jwt
    const token = JWT.create(checkAccount.data);

    // Asignamos el token dentro de una cookie y ademas lo enviamos en el cuerpo
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 2, // 1 hora
      })
      .json({
        success: true,
        data: checkAccount.data,
        token,
      });
  }

  static async logout(_, res) {
    // Borramos la cookie y listo
    res.status(200).clearCookie("token").end();
  }

  static async create(req, res) {
    // Validamos el contenido
    const validate = AccountValidator.validateFull(req.body);

    // Si tiene errores delvolvemos el estado
    if (!validate.success) {
      res
        .status(200)
        .json({ success: validate.success, error: validate.errors[0] });
      return;
    }

    // 1. Validamos que el email no este ya registrado
    const emailValidate = await AccountMySQL.verifyEmail(req.body.email);

    // Si el email ya está en uso, enviamos el error
    if (!emailValidate.success) {
      res.send(emailValidate);
      return;
    }

    // 2. Preparamos los campos de la sentencia SQL
    const {
      username,
      surname,
      email,
      passwd,
      department,
      description = "",
      rol = "user",
      birthdate,
    } = req.body;

    const params = [
      UUIDParser.UUIDToBin(crypto.randomUUID()),
      username,
      surname,
      email,
      bcrypt.hashSync(passwd, Number(SALT)),
      department,
      description,
      rol,
      birthdate,
    ];
    // 3. Lo metemos en la base de datos.
    const validation = await AccountMySQL.createAccount(params);

    res.send(validation);
  }

  static async getAll(req, res) {
    // Sacamos el filtro de la query
    const { filter } = req.query;

    // Recuperamos todos los registros o filtrados segun nos llegue la petición
    const results = filter
      ? await AccountMySQL.getFiltered(filter)
      : await AccountMySQL.getAll();

    res.json(results);
  }

  static async getSingle(req, res) {
    const { id } = req.params;

    // Verificamos que el uuid sea valido
    if (!id || !UUIDParser.validateUUID(id)) {
      // Si no lo es, salimos
      res.status(400).json({ success: false, error: "UUID no es válido" });
      return;
    }

    const result = await AccountMySQL.getSingle(id);

    res.json(result);
  }

  static async updateSingle(req, res) {
    const { id } = req.params;

    // 1. Verificamos que el uuid sea valido
    if (!id || !UUIDParser.validateUUID(id)) {
      // Si no lo es, salimos
      res.status(400).json({ success: false, error: "UUID no es válido" });
      return;
    }

    // 2. Validamos los datos recibidos
    const validate = AccountValidator.validateUpdate(req.body);

    // Si los datos no son válidos enviamos
    if (!validate.success) {
      res.json({ success: validate.success, error: validate.errors[0] });
      return;
    }

    // 3. Actualizamos el recurso
    const dbUpdate = await AccountMySQL.updateData(req.body, id);

    res.json(dbUpdate);
  }

  static async deleteSingle(req, res) {
    const { id } = req.params;

    // 1. Verificamos que el uuid sea valido
    if (!id || !UUIDParser.validateUUID(id)) {
      // Si no lo es, salimos
      res.status(400).json({ success: false, error: "UUID no es válido" });
      return;
    }

    // Borramos el usuario de la DB
    const dbResult = await AccountMySQL.deleteAccount(id);

    // Enviamos el resultado de la operacion
    res.json(dbResult);
  }

  static async updateSelf(req, res) {
    // Sacamos el id de la sesion
    const { id } = req.session;

    // Extraemos los campos de
    const { currentPasswd, newPasswd } = req.body;

    // Si no recibimos los campos devolvemos 400
    if (!currentPasswd || !newPasswd) {
      res.status(400).json({ success: false });
    }

    // Validamos la nueva contraseña
    const validate = AccountValidator.validtePasswd(newPasswd);

    // Si no es válida mandamos el error
    if (!validate.success) {
      res.json(validate);
    }

    const dbWork = await AccountMySQL.updatePasswd(
      id,
      currentPasswd,
      newPasswd
    );

    res.send(dbWork);
  }
}

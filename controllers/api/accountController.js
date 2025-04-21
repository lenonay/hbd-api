import crypto from "node:crypto";

import { JWT } from "../../jwt/jwt.js";
import { AccountMySQL } from "../../models/accountMySQL.js";
import { AccountValidator } from "../../validators/accountValidator.js";
import { UUIDParser } from "../../utils/uuidParser.js";

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
      passwd,
      department,
      description,
      rol,
      birthdate
    ];
    // 3. Lo metemos en la base de datos.
    const validation = await AccountMySQL.createAccount(params);

    res.send(validation);
  }
}

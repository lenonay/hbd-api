import { JWT } from "../../jwt/jwt.js";
import { AccountMySQL } from "../../models/accountMySQL.js";
import { AccountValidator } from "../../validators/accountValidator.js";

export class AccountController {
  static async login(req, res) {
    // Validamos el cuerpo de la petición antes de procesarlo
    const validate = AccountValidator.validate(req.body);

    // Si no cumple con los requisitos enviamos un error y un 400
    if (!validate.success) {
      res.status(400).json({success: false, error: validate.errors[0]});
      return;
    }

    // Comprobamos la información del usuario  y recuperamos su información
    const checkAccount = await AccountMySQL.getAccountData(
      req.body.email,
      req.body.passwd
    );

    // Si no es valido el usuario enviamos el error
    if (!checkAccount.success) {
      res.status(400).json(checkAccount);
      return;
    }

    // Creamos el jwt
    const token = JWT.create(checkAccount.data);

    // Asignamos el token dentro de una cookie y ademas lo enviamos en el cuerpo
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        path: "/api",
        maxAge: 1000 * 60 * 60 * 1, // 1 hora
      })
      .json({
        success: true,
        data: checkAccount.data,
        token,
      });
  }
}

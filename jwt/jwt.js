import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config.js";

export class JWT {
  static create(data) {
    return jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
  }

  static validate(token) {
    try {
      // Extraemos la información sin los campos que añade jwt
      const { iat, exp, ...data } = jwt.verify(token, JWT_SECRET);
      // Devolvemos un estado correcto y la info
      return { success: true, data: data };
    } catch (err) {
      // Si ocurre un error, enviamos el estado
      return { success: false };
    }
  }
}

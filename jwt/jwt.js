import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config.js";
import { SecretCreator } from "../utils/secretCreator.js";
import { logginMySQL } from "../models/logginMySQL.js";

export class JWT {
  static create(userData, loginData) {
    // 1. Creamos el payload del refresh
    const refreshPayload = {
      userID: userData.id,
      device: loginData.device,
      loginID: loginData.id,
      randomString: loginData.randomString,
    };
    // 2. Creamos el secret del refresh
    const refreshSecret = SecretCreator(userData.id, loginData.id);

    // 3. Creamos el token de refresh
    const refreshToken = jwt.sign(refreshPayload, refreshSecret, {
      expiresIn: "14 days",
    });

    const tokenPayload = {
      ...userData,
      loginID: loginData.id,
      refresh: refreshToken,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "14 days" });

    return { token, refreshSecret };
  }

  static recreate(userData, loginData) {
    // 1. Creamos el token de nuevo
    const jwt = this.create(userData, loginData);

    // 2. Guardamos el secret en la base de datos
    logginMySQL.updateSecret(jwt.refreshSecret, loginData.id, userData.id);

    return jwt.token;
  }

  static validate(token) {
    try {
      // Extraemos la información sin los campos que añade jwt
      const { iat, exp, ...data } = jwt.verify(token, JWT_SECRET);
      // Devolvemos un estado correcto y la info
      return { success: true, data: data };
    } catch (err) {
      console.log(err);
      // Si ocurre un error, enviamos el estado
      return { success: false };
    }
  }

  static async validateRefresh(refresh, loginID, currentDevice, userID) {
    // 1. Extraemos los datos de la DB
    const dbData = await logginMySQL.getLogByID(loginID);

    if (!dbData.success) {
      return { success: false };
    }

    try {
      // 2. Intentamos validar el token
      const refreshToken = jwt.verify(refresh, dbData.data.secret);

      // 3. Validamos los dispositivos
      if (refreshToken.device != currentDevice) {
        return { success: false };
      }

      if (userID !== refreshToken.userID) {
        return { success: false };
      }

      return { success: true, data: refreshToken };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }
}

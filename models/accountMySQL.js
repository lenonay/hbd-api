import bcrypt from "bcrypt";

import { createDBConection } from "../db/mysql.js";
import { UUIDParser } from "../utils/uuidParser.js";

export class AccountMySQL {
  static async getAccountData(email, passwd) {
    // Nos conectamos a la DB
    const con = await createDBConection();

    // Buscamos los datos del usuario en la DB
    const [userResult] = await con.query(
      "SELECT * FROM users where email = ?",
      [email]
    );

    // Si no existe devolvemos un error
    if (userResult.length == 0) {
      return { success: false, error: "Credenciales inválidas" };
    }

    // Nos quedamos con la información
    const userDBData = userResult[0];

    // Comprobamos la constraseña
    if (!bcrypt.compareSync(passwd, userDBData.passwd)) {
      return { success: false, error: "Credenciales inválidas" };
    }

    // Eliminamos la contraseña hasheada de la información que se enviará al usuario
    delete userDBData.passwd;
    
    // Devolvemos la información con el UUID cambiado
    return {
      success: true,
      data: { ...userDBData, id: UUIDParser.binToUUID(userDBData.id) },
    };
  }
}

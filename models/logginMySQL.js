import crypto from "node:crypto";

import { createDBConnection } from "../db/mysql.js";
import { UUIDParser } from "../utils/uuidParser.js";

export class logginMySQL {
  static async Login(data) {
    // Extraemos los campos que permiten guardan el registro
    const { ip, device, user_id } = data;

    // Generamos el uuid
    const id = UUIDParser.UUIDToBin(crypto.randomUUID());

    const con = await createDBConnection();

    try {
      // Lanzamos y nos olvidamos
      con.execute(
        "INSERT INTO logins (id, user_id, ip, device) VALUES (?,?,?,?)",
        [id, UUIDParser.UUIDToBin(user_id), ip, device]
      );
    } finally {
      con.end();
    }
  }
}

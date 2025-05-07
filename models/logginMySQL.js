import { createDBConnection } from "../db/mysql.js";
import { UUIDParser } from "../utils/uuidParser.js";

// Transformar los id a binarios
const bin = (id) => UUIDParser.UUIDToBin(id);

export class logginMySQL {
  static async Login(data, secret) {
    // Extraemos los campos que permiten guardan el registro
    const { id, ip, device, userID } = data;

    const con = await createDBConnection();

    try {
      // Lanzamos la consulta
      await con.execute(
        "INSERT INTO logins (id, user_id, ip, device, secret) VALUES (?,?,?,?,?)",
        [bin(id), bin(userID), ip, device ?? "", secret]
      );
    } finally {
      con.end();
    }
  }

  static async getLogByID(id) {
    const con = await createDBConnection();
    try {
      const [query] = await con.query("SELECT * FROM logins WHERE id = ?", [
        UUIDParser.UUIDToBin(id),
      ]);

      // Si no hay resultado salimos
      if (query.length < 1) {
        return { success: false };
      }

      // Nos quedamos con el primer resultado
      return { success: true, data: query[0] };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }

  static async updateSecret(secret, loginID, userID) {
    const con = await createDBConnection();
    const bin = (id) => UUIDParser.UUIDToBin(id);

    try {
      await con.execute(
        "UPDATE logins SET secret = ? WHERE id = ? AND user_id = ?",
        [secret, bin(loginID), bin(userID)]
      );

    } catch (e) {
      console.log(e);
    } finally {
      con.end();
    }
  }
}

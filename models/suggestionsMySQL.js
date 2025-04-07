import { createDBConection } from "../db/mysql.js";
import { UUIDParser } from "../utils/uuidParser.js";

export class SuggestionsMySQL {
  static async getAll() {
    // Creamos la conexion
    const con = await createDBConection();

    const [results] = await con.query("SELECT * FROM users");

    // Convertimos el binario a UUID en todos los usuarios
    return results.map((row) => ({ ...row, id: UUIDParser.binToUUID(row.id) }));
  }
}

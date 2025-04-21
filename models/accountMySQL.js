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

    // Verificamos que la cuenta esté activa
    if (userDBData.active !== 1) {
      return { success: false, error: "La cuenta está inactiva" };
    }

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

  static async verifyEmail(email) {
    // 1. Obtenemos la conexión
    const con = await createDBConection();
    // 2. Hacemos la consulta
    const [query] = await con.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (query.length !== 0) {
      return {
        success: false,
        error: { field: "email", error: "Esa dirección ya está en uso" },
      };
    }

    // 3. Retornamos el estado
    return { success: true };
  }

  static async createAccount(params) {
    // 1. Creamos la conexión
    const con = await createDBConection();
    // 2. Intentamos meter la cuenta
    try {
      con.execute(
        "INSERT INTO users(id,username,surname,email,passwd,department,description,rol, birthdate) VALUES (?,?,?,?,?,?,?,?,?)",
        params
      );

      return { success: true };
    } catch (error) {
      // 3. devolvemos resultado y manejamos el error
      return { success: false, error: "No se ha podido crear el usuario" };
    }
  }
}

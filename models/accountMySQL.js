import bcrypt from "bcrypt";

import { createDBConection } from "../db/mysql.js";
import { UUIDParser } from "../utils/uuidParser.js";

import { SALT } from "../config.js";

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

    // Verificamos que la cuenta esté activa
    if (userDBData.active !== 1) {
      return { success: false, error: "La cuenta está inactiva" };
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

  static async getAll() {
    const con = await createDBConection();
    try {
      const [[deptsRows], [userRows]] = await Promise.all([
        con.query("SELECT department FROM departments ORDER BY department"),
        con.query(
          "SELECT id, username, surname, email, department, description ,rol, active FROM users ORDER BY username, surname, email"
        ),
      ]);

      // Extraemos todos los departamentos unicos
      const depts = deptsRows.map((row) => row.department).sort();

      // Extraemos los datos de los usuarios
      const data = userRows.map((row) => ({
        ...row,
        id: UUIDParser.binToUUID(row.id),
        active: row.active === 1 ? true : false, // Cambiamos el valor binario a booleano
      }));

      return { depts, data };
    } finally {
      // Al acabar cerramos la conexión
      con.end();
    }
  }

  static async getFiltered(filter) {
    // Creamos la conexión de la DB
    const con = await createDBConection();

    try {
      // Creamos el SQL
      const sql = `
        SELECT id, username, surname, email, department, description ,rol, active
        FROM users
        WHERE MATCH(username,surname,email,rol,department)
              AGAINST(? IN BOOLEAN MODE)
        ORDER BY MATCH(username,surname,email,rol,department)
                AGAINST(? IN BOOLEAN MODE) DESC
        LIMIT 50;
      `;

      const [[deptsRows], [usersRows]] = await Promise.all([
        con.query("SELECT department FROM departments ORDER BY department"),
        con.query(sql, [filter, filter]),
      ]);

      // Extraemos todos los departamentos unicos
      const depts = deptsRows.map((row) => row.department).sort();

      // Extraemos los datos de los usuarios
      const data = usersRows.map((row) => ({
        ...row,
        id: UUIDParser.binToUUID(row.id),
        active: row.active === 1 ? true : false, // Cambiamos el valor binario a booleano
      }));

      return { depts, data };
    } catch (e) {
      return { status: "error", e };
    } finally {
      con.end();
    }
  }

  static async getSingle(id) {
    const con = await createDBConection();
    try {
      const [result] = await con.query("SELECT * FROM users WHERE id = ?", [
        UUIDParser.UUIDToBin(id),
      ]);

      // Si no sacamos resultados, enviamos un error
      if (result.length == 0) {
        return { success: false, error: "No existe ese usuario" };
      }

      // Nos quedamos con el unico resultado
      const data = result.map((row) => ({
        ...row,
        id: UUIDParser.binToUUID(row.id), // Cambiamos el uuid a string
      }))[0];

      // Le quitamos el campo de la contraseña
      delete data.passwd;

      return { success: true, data };
    } finally {
      con.end();
    }
  }

  static async updateData(data, id) {
    // Declaramos los campos que pueden variar sin problema
    const commonFields = [
      "username",
      "surname",
      "birthdate",
      "email",
      "department",
      "description",
      "rol",
    ];

    // Variables para crear la sentencia SQL
    const sets = [];
    const values = [];

    // Bucle para iterar los campos a actualizar
    for (const field of commonFields) {
      // Si el campo contiene algo lo guardamos para actualizar
      // if (data[field]) {
      sets.push(`${field} = ?`);
      values.push(data[field]);
      // }
    }

    // Guardamos el estado de la cuenta
    sets.push("active = ?");
    values.push(data.active ? 1 : 0);

    // Si existe el campo contraseña y no está vacio
    if (data.passwd && data.passwd.trim() !== "") {
      // Guardamos la contraseña hasheada
      sets.push("passwd = ?");
      values.push(bcrypt.hashSync(data.passwd, Number(SALT)));
    }

    const sql = `UPDATE users SET ${sets.join(", ")} WHERE id = ?`;
    values.push(UUIDParser.UUIDToBin(id));

    // Creamos la conexion a la DB
    const con = await createDBConection();
    try {
      const resultado = await con.execute(sql, values);

      return { success: true, resultado };
    } catch (e) {
      console.log(e);
      return { success: false, error: e };
    } finally {
      con.end();
    }
  }

  static async deleteAccount(id) {
    // Creamos la conexión a la DB
    const con = await createDBConection();
    // Intentamos borrar la cuenta
    try {
      const result = await con.execute("DELETE FROM users WHERE id = ?", [
        UUIDParser.UUIDToBin(id),
      ]);

      // Devolvemos estado true si fue bien
      return { success: true };
    } catch (error) {
      // Si hubo un error lo retornamos
      return { success: false, error: error };
    } finally {
      // Cerramos la conexion
      con.end();
    }
  }

  static async updatePasswd(id, currentPasswd, newPasswd) {
    // Creamos la conexiçon con la base de datos
    const con = await createDBConection();

    try {
      // 1. Sacamos el hash de la cuenta asociada al ID
      const [userData] = await con.query(
        "SELECT passwd FROM users WHERE id = ?",
        UUIDParser.UUIDToBin(id)
      );

      if (userData.length == 0) {
        return { success: false, error: "La cuenta no existe" };
      }

      // 2. Verificamos la contraseña actual
      // Nos quedamos con la contraseña actual
      const dbPasswd = userData[0].passwd;

      // Verificamos que la contraseña actual sea correcta
      if (!bcrypt.compareSync(currentPasswd, dbPasswd)) {
        return { success: false, error: "Credenciales inválidas" };
      }

      // 3. Actualizamos a la nueva contraseña
      const [query] = await con.execute(
        "UPDATE users SET passwd = ? WHERE id = ?",
        [bcrypt.hashSync(newPasswd, Number(SALT)), UUIDParser.UUIDToBin(id)]
      );

      return { success: true };
    } catch (e) {
      console.log(e);
      return { success: false, error: "Ha ocurrido un error" };
    } finally {
      con.end();
    }
  }
}

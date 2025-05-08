import crypto from "node:crypto";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

import { UUIDParser } from "../utils/uuidParser.js";

import {
  DB,
  DB_HOST,
  DB_PASSWD,
  DB_PORT,
  DB_USER,
  DBWP,
  SALT,
  USER_BIRTHDATE,
  USER_DEPT,
  USER_DESCRIPTION,
  USER_EMAIL,
  USER_PASSWD,
  USER_SURNAME,
  USERNAME,
} from "../config.js";

export async function createDBConnection() {
  return await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWD,
    database: DB,
    dateStrings: true,
  });
}

export async function createDBWPConnection() {
  return await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWD,
    database: DBWP,
    dateStrings: true,
  });
}

export async function InitDB() {
  // Obtenemos una conección
  const con = await createDBConnection();

  // Consultamos la tabla de usuarios
  const [result] = await con.query("SELECT * FROM users");

  // Si la tabla está vacía tenemos que meter un usuario por defecto
  // En caso de que haya registros salimos de la función
  if (result.length > 0) {
    return;
  }

  // Metemos el usuario nuevo usando una sentencia preparada
  const [queryResult] = await con.execute(
    "INSERT INTO users(id, username, surname, email, passwd, department, description, rol, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      UUIDParser.UUIDToBin(crypto.randomUUID()),
      USERNAME,
      USER_SURNAME,
      USER_EMAIL,
      bcrypt.hashSync(USER_PASSWD, Number(SALT)),
      USER_DEPT,
      USER_DESCRIPTION,
      "duke",
      USER_BIRTHDATE,
    ]
  );

  // Mostramos aviso de que se ha creado
  console.log("[+] Default API user created");
  console.log(
    `Credentials:\n\tEmail: ${USER_EMAIL},\n\tPassword: ${USER_PASSWD}`
  );
}

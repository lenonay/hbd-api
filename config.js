process.loadEnvFile(".env");

import { InitDB } from "./db/mysql.js";

export const {
  PORT,
  INT,
  MAIN_URI,
  WP_API,
  SALT,
  VERSION,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWD,
  DB,
  DBWP,
  USERNAME,
  USER_SURNAME,
  USER_EMAIL,
  USER_PASSWD,
  USER_DEPT,
  USER_DESCRIPTION,
  USER_BIRTHDATE,
  JWT_SECRET,
  API_KEY,
} = process.env;

// Inicializamos la base de datos
InitDB();

process.loadEnvFile(".env");

import { InitDB } from "./db/mysql.js";

export const {
  PORT,
  INT,
  MAIN_URI,
  SALT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWD,
  DB,
  USERNAME,
  USER_EMAIL,
  USER_PASSWD,
  USER_DESCRIPTION,
  JWT_SECRET,
} = process.env;

// Inicializamos la base de datos
InitDB();

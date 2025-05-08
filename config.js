// 1. Cargamos el fichero .env
process.loadEnvFile(".env");

import { InitDB } from "./db/mysql.js";
import { Env } from "./utils/env.js";

// Configuramos las variables de entorno dependiendo de la fuente
Env.congigureEnv();

// Lista de variables necesarias para el funcionamiento de la app/api
const requiredEnvVars = [
  "PORT", "INT", "MAIN_URI", "SALT", "VERSION", "JWT_SECRET", // APP
  "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWD", "DB", "DBWP", // DB
  "USERNAME", "USER_SURNAME", "USER_EMAIL", "USER_PASSWD", // User info
  "USER_DEPT", "USER_DESCRIPTION", "USER_BIRTHDATE",
];

// Validamos que estén todas las variables de entorno antes de salir
Env.validateEnv(requiredEnvVars);

export const {
  PORT,
  INT,
  MAIN_URI,
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
} = process.env;

// Inicializamos la base de datos
InitDB();

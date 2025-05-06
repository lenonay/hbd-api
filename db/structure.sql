DROP DATABASE IF EXISTS api;

CREATE DATABASE api
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_spanish_ci;

USE api;

CREATE TABLE departments (
  department VARCHAR(50) PRIMARY KEY
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_spanish_ci;

CREATE TABLE users (
  id BINARY(16)      PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  surname  VARCHAR(150) NOT NULL,
  email    VARCHAR(255) UNIQUE,
  passwd   VARCHAR(255) NOT NULL,
  department VARCHAR(50),
  description VARCHAR(255) NOT NULL DEFAULT '',
  rol VARCHAR(255) NOT NULL DEFAULT 'user',
  birthdate DATE       NOT NULL,
  active    TINYINT    NOT NULL DEFAULT 1,
  creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),

  -- Índice FULLTEXT abarcando los campos buscables
  FULLTEXT KEY ft_user (
    username,
    surname,
    email,
    department,
    rol
  ),

  FOREIGN KEY (department)
    REFERENCES departments(department)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_spanish_ci;

CREATE TABLE logins (
  id BINARY(16) PRIMARY KEY,
  user_id BINARY(16),
  ip VARCHAR(20) NOT NULL,
  device VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  CONSTRAINT fk_user_login FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

/* Popular la Base de Datos */
INSERT INTO departments VALUES
("a&b"),
("administración"),
("banquetes"),
("cocina"),
("economato"),
("informática"),
("jardinería"),
("mantenimiento"),
("reservas");
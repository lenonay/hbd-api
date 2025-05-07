import crypto, { hash } from "node:crypto";

function ProcessSecret(userID, loginID) {
  // 1. Generamos un numero aleatorio
  const seed = crypto.randomInt(56911);
  // Inicializamos la semilla
  let part1 = "",
    part2 = "",
    final = "";

  // 2. Si es par hacemos un proceso
  switch (true) {
    case seed % 5 == 0:
      part1 = hash("sha256", userID) + randomChars(seed);
      part2 =
        randomChars(part1.length) +
        hash("sha512", loginID + new Date().toISOString());

      final = part1 + part2;
      break;

    case seed % 2 == 0:
      part1 = hash("sha512", userID) + randomChars(seed);
      part2 = hash('md5', new Date().toISOString()) + hash("sha256", loginID);

      final = part2 + randomChars(seed) + part1;
      break;

    default:
      part1 = hash("sha256", userID) + hash("md5", loginID);
      part2 =
        hash("sha512", new Date().toISOString()) +
        hash("sha256", randomChars(seed));

      final = part1 + randomChars(part2.length);
      break;
  }

  // 3. Si es impar hacemos otro
  return final;
}

function randomChars(seed) {
  // Generamos caracteres random
  return crypto.randomBytes(seed / 1000).toString("hex");
}

export function SecretCreator(userID, loginID) {
  // 1. Procesamos el Secreto para que al menos tenga +400 caracteres
  let secret = "";
  while (secret.length < 400) {
    secret += ProcessSecret(userID, loginID);
  }

  // Si nos pasamos de 600 lo dejamos en 600
  if (secret.length > 600) {
    // Devolvemos una seccion desde la posición 0 hasta un máximo de 600 - n
    secret = secret.slice(0, 600 - crypto.randomInt(40));
  }

  return secret;
}

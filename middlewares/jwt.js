import { JWT } from "../jwt/jwt.js";

export function jwt(req, res, next) {
  // Extraemos el token de la cookie o de la cabecera de authorization
  const token = req.headers.authorization
    ? req.headers.authorization
    : req.cookies.token;


  // Validamos el token para extraer su información
  const jwtToken = JWT.validate(token);

  // Creamos la session con el contenido del token y sino pues nula.
  req.session = jwtToken.data ?? null;

  // Continuamos
  next();
}

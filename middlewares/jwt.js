import { JWT } from "../jwt/jwt.js";

export async function jwt(req, res, next) {
  // Extraemos el token de la cookie o de la cabecera de authorization
  const token = req.cookies.token;

  // Si no hay token salimos
  if (!token) {
    req.session = null;
    return next();
  }

  // Validamos el token para extraer su información
  const jwtToken = JWT.validate(token);

  if (!jwtToken.success) {
    return next();
  }

  // Extraemos el refresh y el id del login
  const { refresh, loginID } = jwtToken.data;
  // Los eliminamos para no pasarlos más alla
  delete jwtToken.data.refresh;
  delete jwtToken.data.loginID;

  // Creamos la session con el contenido del token y sino pues nula.
  req.session = jwtToken.data ?? null;

  // Validamos
  const refreshToken = await JWT.validateRefresh(
    refresh,
    loginID,
    req.headers["user-agent"],
    jwtToken.data.id
  );


  // Si no podemos extraer el token de refresh
  if (!refreshToken.success) {
    // Borramos la cookie del token
    res.clearCookie("token");
    return next(); // Y Salimos
  }

  // Verificamos que se haga falta recrear el token
  if (!skipRecreate(refreshToken.data.exp)) {
    // TODO: Mandamos a recrear el token y lo asignamos de nuevo
    console.log("Se va recrear el token")

    const newToken = JWT.recreate(jwtToken.data, {
      device: refreshToken.data.device,
      id: loginID,
      randomString: refreshToken.randomString,
    });

    // Asignamos de nuevo el token a la cookie
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 14, // 2 días
    });
  }

  // Continuamos
  next();
}

function skipRecreate(exp) {
  const duration = 1000 * 60 * 60 * 24 * 14; // 14 días
  const threshold = (duration * 0.40).toFixed(0); // Limite del 40%

  // 1. Sacamos el tiempo actual en ms
  const time = Date.now();

  // 2. Nos quedamos con los ms que quedan hasta que se caduque
  const remainingTime = exp * 1000 - time;

  // 3. Revisamos si estamos por debajo del 3/4 de vida util
  return remainingTime > threshold;
}

export function authorization(req, res, next) {
  // Si no tenemos una sesión válida
  if (!req.session) {
    // enviamos un 401 y salimos
    res.status(401).send();
    return;
  }

  // Si la tenemos continuamos
  next();
}

export function adminAuth(req, res, next) {
  // Si no somos administradores o duques nos saca
  if (!req.session || req.session.rol !== "admin" && req.session.rol !== "duke") {
    // Validamos si era un get a /panel y entonces redireccionamos al login
    if (req.originalUrl === "/admin/panel") {
      // Borramos la cookie tambien para borrar la sesion
      res.clearCookie('token').redirect("/admin");

    } else {
      res.status(401).send();
    }

    return;
  }

  next();
}

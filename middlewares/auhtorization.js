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
  // Si no somos administradores nos saca
  if (!req.session || req.session.rol !== "admin") {
    // Validamos si era un get a /panel y entonces redireccionamos al login
    if (req.originalUrl === "/admin/panel") {
      res.redirect("/admin");
    } else {
      res.status(401).send();
    }

    return;
  }

  next();
}

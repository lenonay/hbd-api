export function authorization(req, res, next){
  // Si no tenemos una sesión válida
  if(!req.session){
    // enviamos un 401 y salimos
    res.status(401).send()
    return;
  }

  // Si la tenemos continuamos
  next()
}
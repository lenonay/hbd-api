import { VERSION } from "../config.js";

export function validateAppVersion(v) {
  const server = VERSION.split(".").map(x => parseInt(x, 10));
  const client = v.split(".").map(x => parseInt(x, 10));

  for (let i = 0; i < server.length; i++) {
    if (isNaN(server[i]) || isNaN(client[i])) {
      return { success: false, error: 'Error en la validación de versiones' };
    }
    if (client[i] < server[i]) {
      return { success: false, error: 'Actualice la aplicación para iniciar sesión' };
    }
    if (client[i] > server[i]) {
      return { success: true};
    }
    // si son iguales, seguimos al siguiente segmento
  }

  // todos los segmentos iguales
  return { success: true};
}

export class Env {
  static congigureEnv() {
    const src = process.env.ENV_SOURCE;

    switch (true) {
      case src === "file":
        // Cargamos desde fichero .env
        console.log("Variables de entorno cargadas desde: .env");
        process.loadEnvFile(".env");
        break;

      case src === "compose":
        // No hacemos nada ya estan cargadas desde docker
        console.log("Variables de entorno cargadas desde: Docker-compose");
        break;

      default:
        // Cargamos desde el archivo por si acaso
        console.warn(
          `ENV_SOURCE no está bien definido ("${src}"), se cargará desde el fichero .env por defecto`
        );
        process.loadEnvFile(".env");
    }
  }

  static validateEnv(vars) {
    // Filtramos por las variables que no se hayan cargado
    const missing = vars.filter((name) => !process.env[name]);

    // Si falta alguna mostramos un error
    if (missing.length > 0) {
      console.error(
        `Faltan variables de entorno obligatorias: ${missing.join(", ")}`
      );

      // Salimos con estado de error
      process.exit(1)
    }
  }
}

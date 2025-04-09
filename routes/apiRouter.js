import { Router } from "express";

import { MAIN_URI } from "../config.js";
import { AccountRouter } from "./api/accountRouter.js";
import { v1Router } from "./api/v1Router.js";

export const apiRouter = Router();

// Redirigir a la pagina principal
apiRouter.get("/", (_, res) => {
  res.redirect(MAIN_URI);
});

// Gestion de cuentas
apiRouter.use("/account", AccountRouter);

// Endpoints de Wordpress
apiRouter.use("/v1", v1Router);
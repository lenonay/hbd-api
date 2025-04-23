import { Router } from "express";

import { AccountController } from "../../controllers/api/accountController.js";
import { adminAuth } from "../../middlewares/auhtorization.js";

export const AccountRouter = Router();

// Inicio de sesión
AccountRouter.post("/login", AccountController.login)
AccountRouter.delete("/logout", AccountController.logout);


AccountRouter.use(adminAuth)
// Creación de cuentas
AccountRouter.post("/", AccountController.create)

// Ver toda información de las cuentas
AccountRouter.get("/all", AccountController.getAll)
/// Una sola cuenta
// Ver toda la información de una cuenta
AccountRouter.get("/:id", AccountController.getSingle);
// Actualizar los datos de una cuenta
AccountRouter.put("/:id", AccountController.updateSingle);
// Borrar una cuenta
AccountRouter.delete("/:id", AccountController.deleteSingle)
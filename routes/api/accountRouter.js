import { Router } from "express";

import { AccountController } from "../../controllers/api/accountController.js";

export const AccountRouter = Router();

// Inicio de sesión
AccountRouter.post("/login", AccountController.login)
AccountRouter.delete("/logout", AccountController.logout);

// Creación de cuentas
AccountRouter.post("/", AccountController.create)
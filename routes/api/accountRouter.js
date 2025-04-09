import { Router } from "express";

import { AccountController } from "../../controllers/api/accountController.js";

export const AccountRouter = Router();

AccountRouter.post("/login", AccountController.login)
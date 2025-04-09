import { Router } from "express";

import { WpMediaController } from "../../../controllers/api/wordpress/wpMediaController.js";

export const WpMediaRouter = Router();

WpMediaRouter.get("/", WpMediaController.getAllPostMedia)
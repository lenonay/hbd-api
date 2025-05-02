import { Router } from "express";
import { WpNotificationsController } from "../../../controllers/api/wordpress/wpNotificationsController.js";

export const WpNoticationsRouter = Router();

WpNoticationsRouter.get("/", WpNotificationsController.getLast);

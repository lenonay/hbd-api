import { Router } from "express";
import { WpCouponsController } from "../../../controllers/api/wordpress/wpCouponsController.js";

export const WpCouponsRouter = Router();

WpCouponsRouter.get("/", WpCouponsController.all);
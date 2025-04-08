import { Router } from "express";
import { WpPostsController } from "../controllers/wpPostsController.js";

export const WpPostsRouter = Router();

WpPostsRouter.get("/", WpPostsController.getAll);

WpPostsRouter.get("/:id", WpPostsController.getPostInfo);
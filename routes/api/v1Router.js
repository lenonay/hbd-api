import { Router } from "express";

import { authorization } from "../../middlewares/auhtorization.js";
import { WpPostsRouter } from "./wordpress/wpPostsRouter.js";

export const v1Router = Router();

v1Router.use(authorization);

v1Router.use("/posts", WpPostsRouter);
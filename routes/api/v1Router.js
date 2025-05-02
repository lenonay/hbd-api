import { Router } from "express";

import { authorization } from "../../middlewares/auhtorization.js";
import { WpPostsRouter } from "./wordpress/wpPostsRouter.js";
import { WpNoticationsRouter } from "./wordpress/wpNotificationsRouter.js";

export const v1Router = Router();

v1Router.use(authorization);

v1Router.use("/posts", WpPostsRouter);

v1Router.use("/notifications", WpNoticationsRouter);

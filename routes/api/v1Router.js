import { Router } from "express";
import { SuggestionsRouter } from "./suggestionsRouter.js";

import { authorization } from "../../middlewares/auhtorization.js";
import { WpPostsRouter } from "./wordpress/wpPostsRouter.js";
import { WpMediaRouter } from "./wordpress/wpMediaRouter.js";

export const v1Router = Router();

v1Router.use(authorization);

v1Router.use("/posts", WpPostsRouter);

v1Router.use("/media", WpMediaRouter);

v1Router.use("/suggestions", SuggestionsRouter);

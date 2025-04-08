import { Router } from "express";
import { SuggestionsRouter } from "./suggestionsRouter.js";

import { authorization } from "../middlewares/auhtorization.js";
import { WpPostsRouter } from "./wpPostsRouter.js";

export const v1Router = Router();

v1Router.use(authorization)

v1Router.use("/posts", WpPostsRouter);

v1Router.use("/suggestions", SuggestionsRouter)
import { Router } from "express";
import { SuggestionsController } from "../controllers/suggestionsController.js";

export const SuggestionsRouter = Router();

SuggestionsRouter.get("/", SuggestionsController.GetAll)

SuggestionsRouter.post("/", SuggestionsController.Create)
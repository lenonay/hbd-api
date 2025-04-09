import { Router } from "express";
import { SuggestionsController } from "../../controllers/api/suggestionsController.js";

export const SuggestionsRouter = Router();

SuggestionsRouter.get("/", SuggestionsController.GetAll)

SuggestionsRouter.post("/", SuggestionsController.Create)
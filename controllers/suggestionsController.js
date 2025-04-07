import { SuggestionsMySQL } from "../models/suggestionsMySQL.js";

export class SuggestionsController {
  static async GetAll(req, res) {
    const results = await SuggestionsMySQL.getAll();

    res.json({ results });
  }

  static Create(req, res) {}
}

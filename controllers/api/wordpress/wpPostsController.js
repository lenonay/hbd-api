import { API_KEY, WP_API } from "../../../config.js";
import { fetchURLQuery } from "../../../utils/uriQueryParser.js";

export class WpPostsController {
  static async getAll(req, res) {
    const URIParams = fetchURLQuery(req.query);

    // Hacemos la petición al WP para recuperar todos los posts
    const request = await fetch(`${WP_API}/posts?${URIParams}`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    });

    const response = request.ok ? await request.json() : null;

    res.json(response);
  }

  static async getPostInfo(req, res) {
    const { id } = req.params;

    const request = await fetch(`${WP_API}/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    });

    const response = request.ok ? await request.json() : null;

    res.json(response);
  }
}

import { API_KEY, WP_API } from "../../../config.js";

import { fetchURLQuery } from "../../../utils/uriQueryParser.js";

export class WpMediaController {
  static async getAllPostMedia(req, res) {
    const URIParams = fetchURLQuery(req.query);

    // Hacemos la petición al WP para recuperar todos los posts
    const request = await fetch(`${WP_API}/media?${URIParams}`, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    });

    const response = request.ok ? await request.json() : null;

    res.json(response);
  }
}

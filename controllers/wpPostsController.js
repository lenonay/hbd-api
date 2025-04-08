import { API_KEY, WP_API } from "../config.js";

export class WpPostsController {
  static async getAll(req, res) {
    const URIParams = new URLSearchParams();
    // Verificamos que haya parámetros
    if(req.query){
      // Iteramos por todos y los añadimos
      for(const [key, value] of Object.entries(req.query)){
        URIParams.append(key, value);
      }
    }


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
        Authorization: API_KEY
      }
    });

    const response = request.ok ? await request.json() : null;

    res.json(response);
  }
}

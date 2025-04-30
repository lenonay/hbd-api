import { API_KEY, WP_API } from "../../../config.js";
import { PostsMySQL } from "../../../models/postsMySQL.js";
import { fetchURLQuery } from "../../../utils/uriQueryParser.js";

export class WpPostsController {
  static async getAll(req, res) {
    const posts = await PostsMySQL.all();

    res.json(posts);
  }

  static async getNews(req, res) {
    const posts = await PostsMySQL.filtered("noticias");

    res.json(posts);
  }

  static async getInfo(req, res){
    const posts = await PostsMySQL.filtered("informacion");

    res.json(posts);
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

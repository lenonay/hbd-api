import { PostsMySQL } from "../../../models/postsMySQL.js";

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
}

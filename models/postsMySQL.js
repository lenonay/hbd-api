import { createDBWPConnection } from "../db/mysql.js";
import { unserialize } from "php-serialize";
import * as cheerio from "cheerio";
import { convert } from "html-to-text";

import { categoryQuery } from "./querySQL.js";
import { parsePost } from "../utils/postParse.js";

export class PostsMySQL {
  static async all() {
    const con = await createDBWPConnection();
    try {
      const [posts] = await con.query(`
        SELECT ID, post_date, post_title, post_content
        FROM wp_posts
        WHERE post_status = 'publish'
          AND post_type = 'post'
        ORDER BY post_date DESC;
      `);

      if (posts.length === 0) return [];

      const cleanedPost = posts.map((post) => parsePost(post));

      const postIds = posts.map((p) => p.ID);
      const catPlaceholders = postIds.map(() => "?").join(",");
      const [categoryRows] = await con.query(
        `
        SELECT
          tr.object_id AS post_id,
          t.term_id,
          t.name,
          t.slug
        FROM wp_term_relationships tr
        JOIN wp_term_taxonomy tt
          ON tr.term_taxonomy_id = tt.term_taxonomy_id
         AND tt.taxonomy = 'category'
        JOIN wp_terms t
          ON tt.term_id = t.term_id
        WHERE tr.object_id IN (${catPlaceholders});
        `,
        postIds
      );

      const postCategories = new Map();
      categoryRows.forEach((r) => {
        if (!postCategories.has(r.post_id)) {
          postCategories.set(r.post_id, []);
        }
        postCategories
          .get(r.post_id)
          .push({ id: r.term_id, name: r.name, slug: r.slug });
      });

      return cleanedPost.map((post) => {
        return {
          ...post,
          categories: postCategories.get(post.id) || [],
        };
      });
    } finally {
      await con.end();
    }
  }

  static async filtered(slug) {
    const con = await createDBWPConnection();
    try {
      const [posts] = await con.query(categoryQuery, [slug]);

      if (posts.length === 0) return [];

      return posts.map((post) => parsePost(post));
    } finally {
      await con.end();
    }
  }
}

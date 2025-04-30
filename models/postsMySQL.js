import { createDBWPConnection } from "../db/mysql.js";
import { unserialize } from "php-serialize";
import * as cheerio from "cheerio";
import { convert } from "html-to-text";

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

      const imgUrlsSet = new Set();
      posts.forEach((post) => {
        const $ = cheerio.load(post.post_content);
        $("img").each((_, el) => {
          const src = $(el).attr("src");
          if (src) imgUrlsSet.add(src);
        });
      });
      const imgUrls = Array.from(imgUrlsSet);

      let attachments = [];
      if (imgUrls.length > 0) {
        const placeholders = imgUrls.map(() => "?").join(",");
        const likeClauses = imgUrls
          .map(() => `pm.meta_value LIKE CONCAT('%', ?, '%')`)
          .join(" OR ");
        [attachments] = await con.query(
          `
          SELECT
            p.ID AS attachment_id,
            p.guid AS original_url,
            pm.meta_value AS serialized_meta
          FROM wp_posts p
          JOIN wp_postmeta pm
            ON pm.post_id = p.ID
           AND pm.meta_key = '_wp_attachment_metadata'
          WHERE p.post_type = 'attachment'
            AND (
              p.guid IN (${placeholders})
              OR ${likeClauses}
            );
          `,
          [...imgUrls, ...imgUrls]
        );
      }

      const urlToAttachment = {};
      attachments.forEach((att) => {
        const meta = unserialize(att.serialized_meta);
        const baseUrl = att.original_url.replace(/\/[^\/]+$/, "/");

        const fullFile = att.original_url.split("/").pop();
        urlToAttachment[att.original_url] = {
          id: att.attachment_id,
          url: att.original_url,
          sizes: {
            full: {
              file: fullFile,
              width: meta.width,
              height: meta.height,
              url: att.original_url,
            },
          },
        };

        if (meta.sizes) {
          Object.entries(meta.sizes).forEach(([sizeName, info]) => {
            const sizeUrl = baseUrl + info.file;
            urlToAttachment[sizeUrl] = urlToAttachment[sizeUrl] || {
              id: att.attachment_id,
              url: att.original_url,
              sizes: {},
            };
            urlToAttachment[sizeUrl].sizes[sizeName] = {
              file: info.file,
              width: info.width,
              height: info.height,
              url: sizeUrl,
            };
            urlToAttachment[sizeUrl].sizes.full = {
              file: fullFile,
              width: meta.width,
              height: meta.height,
              url: att.original_url,
            };
          });
        }
      });

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

      return posts.map((post) => {
        const $ = cheerio.load(post.post_content);
        const attachments = [];

        $("img").each((_, el) => {
          const src = $(el).attr("src");
          if (src && urlToAttachment[src]) {
            attachments.push(urlToAttachment[src]);
          }
          $(el).remove();
        });

        const cleanedHTML = $.html();
        const text = convert(cleanedHTML, { wordwrap: false });

        return {
          id: post.ID,
          date: post.post_date,
          title: post.post_title,
          content: text.trim(),
          attachments,
          categories: postCategories.get(post.ID) || [],
        };
      });
    } finally {
      await con.end();
    }
  }

  static async filtered(slug) {
    const con = await createDBWPConnection();
    try {
      const [posts] = await con.query(
        `
        SELECT 
          p.ID, 
          p.post_date, 
          p.post_title, 
          p.post_content
        FROM wp_posts p
        INNER JOIN wp_term_relationships tr
          ON tr.object_id = p.ID
        INNER JOIN wp_term_taxonomy tt
          ON tt.term_taxonomy_id = tr.term_taxonomy_id
          AND tt.taxonomy = 'category'
        INNER JOIN wp_terms t
          ON t.term_id = tt.term_id
          AND t.slug = ?
        WHERE p.post_status = 'publish'
          AND p.post_type = 'post'
        ORDER BY p.post_date DESC;
      `,
        [slug]
      );

      if (posts.length === 0) return [];

      // El resto del código es idéntico al método all()
      const imgUrlsSet = new Set();
      posts.forEach((post) => {
        const $ = cheerio.load(post.post_content);
        $("img").each((_, el) => {
          const src = $(el).attr("src");
          if (src) imgUrlsSet.add(src);
        });
      });
      const imgUrls = Array.from(imgUrlsSet);

      let attachments = [];
      if (imgUrls.length > 0) {
        const placeholders = imgUrls.map(() => "?").join(",");
        const likeClauses = imgUrls
          .map(() => `pm.meta_value LIKE CONCAT('%', ?, '%')`)
          .join(" OR ");
        [attachments] = await con.query(
          `
          SELECT
            p.ID AS attachment_id,
            p.guid AS original_url,
            pm.meta_value AS serialized_meta
          FROM wp_posts p
          JOIN wp_postmeta pm
            ON pm.post_id = p.ID
           AND pm.meta_key = '_wp_attachment_metadata'
          WHERE p.post_type = 'attachment'
            AND (
              p.guid IN (${placeholders})
              OR ${likeClauses}
            );
          `,
          [...imgUrls, ...imgUrls]
        );
      }

      const urlToAttachment = {};
      attachments.forEach((att) => {
        const meta = unserialize(att.serialized_meta);
        const baseUrl = att.original_url.replace(/\/[^\/]+$/, "/");

        const fullFile = att.original_url.split("/").pop();
        urlToAttachment[att.original_url] = {
          id: att.attachment_id,
          url: att.original_url,
          sizes: {
            full: {
              file: fullFile,
              width: meta.width,
              height: meta.height,
              url: att.original_url,
            },
          },
        };

        if (meta.sizes) {
          Object.entries(meta.sizes).forEach(([sizeName, info]) => {
            const sizeUrl = baseUrl + info.file;
            urlToAttachment[sizeUrl] = urlToAttachment[sizeUrl] || {
              id: att.attachment_id,
              url: att.original_url,
              sizes: {},
            };
            urlToAttachment[sizeUrl].sizes[sizeName] = {
              file: info.file,
              width: info.width,
              height: info.height,
              url: sizeUrl,
            };
            urlToAttachment[sizeUrl].sizes.full = {
              file: fullFile,
              width: meta.width,
              height: meta.height,
              url: att.original_url,
            };
          });
        }
      });

      return posts.map((post) => {
        const $ = cheerio.load(post.post_content);
        const attachments = [];

        $("img").each((_, el) => {
          const src = $(el).attr("src");
          if (src && urlToAttachment[src]) {
            attachments.push(urlToAttachment[src]);
          }
          $(el).remove();
        });

        const cleanedHTML = $.html();
        const text = convert(cleanedHTML, { wordwrap: false });

        return {
          id: post.ID,
          date: post.post_date,
          title: post.post_title,
          content: text.trim(),
          attachments,
        };
      });
    } finally {
      await con.end();
    }
  }
}

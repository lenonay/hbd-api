import * as cheerio from "cheerio";
import { createDBWPConnection } from "../db/mysql.js";
import { convert } from "html-to-text";

export class NotificationsMySQL {
  static async last() {
    const con = await createDBWPConnection();

    try {
      // 1. Hacer la query
      const [notifications] = await con.query(
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
        ORDER BY p.post_date DESC
        LIMIT 1;
      `,
        ["notificaciones"]
      );
      // 2. Procesar el resultado
      // Si no hya devolvemos un array vacío
      if (notifications.length == 0) {
        return { success: true, isNotification: false };
      }

      const data = notifications.map((notification) => {
        const $ = cheerio.load(notification.post_content);

        const cleanedHTML = $.html();

        const text = convert(cleanedHTML, { wordwrap: false });

        return {
          title: notification.post_title,
          content: text.trim(),
        };
      });
      // 3. Devolver la info
      return { success: true, isNotification: true, data: data[0] };
      // En caso de error
    } catch (e) {
      console.log(e);
      return { success: false, error: "Hubo un error inesperado" };
    } finally {
      // Cerramos la conexión
      con.end();
    }
  }
}

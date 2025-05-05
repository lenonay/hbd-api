import * as cheerio from "cheerio";
import { createDBWPConnection } from "../db/mysql.js";
import { convert } from "html-to-text";


import { categoryQuery } from "./querySQL.js";

export class NotificationsMySQL {
  static async last() {
    const con = await createDBWPConnection();

    try {
      // 1. Hacer la query
      const [notifications] = await con.query(categoryQuery, [
        "notificaciones",
      ]);
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

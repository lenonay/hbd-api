import * as cheerio from "cheerio";
import { convert } from "html-to-text";

import { createDBWPConnection } from "../db/mysql.js";
import { categoryQuery } from "./querySQL.js";

export class CouponsMySQL {
  static async all() {
    // 1. Creamos la conexión
    const con = await createDBWPConnection();

    try {
      const [coupons] = await con.query(categoryQuery, ["cupones"]);

      // Si no hay cupones retornamos
      if (coupons.length == 0) {
        return { success: true, data: coupons };
      }

      const data = coupons.map((coupon) => {
        const $ = cheerio.load(coupon.post_content);

        const cleanedHTML = $.html();

        const text = convert(cleanedHTML, { wordwrap: false });

        return {
          title: coupon.post_title,
          content: text,
        };
      });

      return { success: true, data };
    } catch (e) {
      console.log(e);
      return { success: false };
    } finally {
      con.end();
    }
  }
}

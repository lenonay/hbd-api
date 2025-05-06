// utils/postParse.js
import * as cheerio from "cheerio";
import { convert } from "html-to-text";

export function parsePost(post) {
  // Cargo el HTML (no necesito xmlMode si sólo hay <img>)
  const $ = cheerio.load(post.post_content);

  // Cojo todas las src de <img> y las meto en un Set para que sean únicas
  const urls = new Set();
  $("img").each((_, el) => {
    const src = $(el).attr("src");
    if (src) urls.add(src);
    // opcional: quitar la imagen del DOM para limpiar el contenido
    $(el).remove();
  });

  // Convierto el resto a texto
  const text = convert($.html(), { wordwrap: false }).trim();

  return {
    id:          post.ID,
    date:        post.post_date,
    title:       post.post_title,
    content:     text,
    // aquí pongo un array de strings con las URLs
    attachments: Array.from(urls),
  };
}

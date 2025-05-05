export const categoryQuery = `
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
`;

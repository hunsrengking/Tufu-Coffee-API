import pool from "../../../config/db.js";

const Product = {
  async getAll() {
    const { rows } = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.is_deleted = false`
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = $1 AND p.is_deleted = FALSE`,
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { category_id, name, description, price, sale_price, stock_quantity, image_url } = data;
    const { rows } = await pool.query(
      `INSERT INTO products (category_id, name, description, price, sale_price, stock_quantity, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [category_id, name, description, price, sale_price, stock_quantity, image_url]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .filter((key) => data[key] !== undefined)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data).filter((v) => v !== undefined);

    const { rows } = await pool.query(
      `UPDATE products SET ${fields}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND is_deleted = FALSE RETURNING *`,
      [id, ...values]
    );
    return rows[0];
  },

  async softDelete(id) {
    await pool.query(
      "UPDATE products SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE id = $1",
      [id]
    );
  },

  async restore(id) {
    await pool.query(
      "UPDATE products SET is_deleted = FALSE, deleted_at = NULL WHERE id = $1",
      [id]
    );
  }
};

export default Product;

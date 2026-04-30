import pool from "../../../config/db.js";

const Category = {
  async getAll() {
    const { rows } = await pool.query(
      "SELECT * FROM categories WHERE is_deleted = FALSE ORDER BY name ASC"
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM categories WHERE id = $1 AND is_deleted = FALSE",
      [id]
    );
    return rows[0];
  },

  async findByName(name) {
    const { rows } = await pool.query(
      "SELECT * FROM categories WHERE name = $1 AND is_deleted = FALSE",
      [name]
    );
    return rows[0];
  },

  async create(data) {
    const { name, description } = data;
    const { rows } = await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .filter((v) => v !== undefined)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data).filter((v) => v !== undefined);

    const { rows } = await pool.query(
      `UPDATE categories SET ${fields}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND is_deleted = FALSE RETURNING *`,
      [id, ...values]
    );
    return rows[0];
  },

  async softDelete(id) {
    await pool.query(
      "UPDATE categories SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE id = $1",
      [id]
    );
  }
};

export default Category;

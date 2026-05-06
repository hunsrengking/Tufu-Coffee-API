import pool from "../../../config/db.js";

const Slide = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM slides WHERE ORDER BY sort_order ASC");
    return rows;
  },

  async getActive() {
    const { rows } = await pool.query("SELECT * FROM slides WHERE is_active = true ORDER BY sort_order ASC");
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM slides WHERE is_active = true and id = $1", [id]);
    return rows[0];
  },

  async create(data) {
    const { title, description, image_url, sort_order, is_active } = data;
    const { rows } = await pool.query(
      `INSERT INTO slides (title, description, image_url, sort_order, is_active) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, image_url, sort_order, is_active]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data);
    const { rows } = await pool.query(
      `UPDATE slides SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query("DELETE FROM slides WHERE id = $1", [id]);
  }
};

export default Slide;

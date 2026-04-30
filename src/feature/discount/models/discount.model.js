import pool from "../../../config/db.js";

const Discount = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM discounts ORDER BY created_at DESC");
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM discounts WHERE id = $1", [id]);
    return rows[0];
  },

  async findByCode(code) {
    const { rows } = await pool.query(
      "SELECT * FROM discounts WHERE code = $1 AND is_active = TRUE",
      [code]
    );
    return rows[0];
  },

  async create(data) {
    const { code, type, value, min_order_amount, max_discount_amount, start_date, end_date, usage_limit } = data;
    const { rows } = await pool.query(
      `INSERT INTO discounts (code, type, value, min_order_amount, max_discount_amount, start_date, end_date, usage_limit) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [code, type, value, min_order_amount, max_discount_amount, start_date, end_date, usage_limit]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data);
    const { rows } = await pool.query(
      `UPDATE discounts SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return rows[0];
  },

  async incrementUsage(id) {
    await pool.query("UPDATE discounts SET used_count = used_count + 1 WHERE id = $1", [id]);
  },

  async delete(id) {
    await pool.query("DELETE FROM discounts WHERE id = $1", [id]);
  }
};

export default Discount;

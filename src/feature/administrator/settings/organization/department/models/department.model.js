import pool from "../../../../../../config/db.js";

const Department = {
  async getAll() {
    const { rows } = await pool.query(
      "SELECT * FROM departments WHERE is_active = TRUE ORDER BY name ASC"
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM departments WHERE id = $1",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { name, description } = data;
    const { rows } = await pool.query(
      "INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return rows[0];
  },

  async update(id, data) {
    const { name, description, is_active } = data;
    const { rows } = await pool.query(
      "UPDATE departments SET name = $1, description = $2, is_active = $3 WHERE id = $4 RETURNING *",
      [name, description, is_active, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query("DELETE FROM departments WHERE id = $1", [id]);
  }
};

export default Department;

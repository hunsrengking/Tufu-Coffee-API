import pool from "../../../../config/db.js";

const Permission = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM permissions where is_active = true");
    return rows;
  },
  async create(name, description) {
    const { rows } = await pool.query(
      "INSERT INTO permissions (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return rows[0];
  }
};

export default Permission;

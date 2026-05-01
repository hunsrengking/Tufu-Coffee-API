import pool from "../../../../../../config/db.js";

const Position = {
  async getAll() {
    const { rows } = await pool.query(
      "SELECT * FROM positions WHERE is_active = TRUE ORDER BY name ASC"
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM positions WHERE id = $1",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { name, description } = data;
    const { rows } = await pool.query(
      "INSERT INTO positions (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return rows[0];
  },

  async update(id, data) {
    const { name, description, is_active } = data;
    const { rows } = await pool.query(
      "UPDATE positions SET name = $1, description = $2, is_active = $3 WHERE id = $4 RETURNING *",
      [name, description, is_active, id]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query("DELETE FROM positions WHERE id = $1", [id]);
  }
};

export default Position;

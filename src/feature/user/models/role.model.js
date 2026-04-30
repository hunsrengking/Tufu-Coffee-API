import pool from "../../../config/db.js";

const Role = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM roles");
    return rows;
  },
  async getById(id) {
    const { rows } = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return rows[0];
  },
  async create(name, description) {
    const { rows } = await pool.query(
      "INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return rows[0];
  },
  async addPermission(roleId, permissionId) {
    await pool.query(
      "INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [roleId, permissionId]
    );
  }
};

export default Role;

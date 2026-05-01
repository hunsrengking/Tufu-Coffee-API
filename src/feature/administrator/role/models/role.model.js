import pool from "../../../../config/db.js";

const Role = {
  async getAll() {
    const { rows } = await pool.query(`
      SELECT r.*, 
      COALESCE(json_agg(p.name) FILTER (WHERE p.name IS NOT NULL), '[]') as permissions
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      LEFT JOIN permissions p ON rp.permission_id = p.id
      GROUP BY r.id
      ORDER BY r.id ASC
    `);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`
      SELECT r.*, 
      COALESCE(json_agg(p.*) FILTER (WHERE p.id IS NOT NULL), '[]') as permissions
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      LEFT JOIN permissions p ON rp.permission_id = p.id
      WHERE r.id = $1
      GROUP BY r.id
    `, [id]);
    return rows[0];
  },

  async findByName(name) {
    const { rows } = await pool.query("SELECT * FROM roles WHERE name = $1", [name]);
    return rows[0];
  },

  async create(name, description) {
    const { rows } = await pool.query(
      "INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return rows[0];
  },

  async update(id, name, description) {
    const { rows } = await pool.query(
      "UPDATE roles SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    return rows[0];
  },

  async setActiveStatus(id, isActive) {
    const { rows } = await pool.query(
      "UPDATE roles SET is_active = $1 WHERE id = $2 RETURNING *",
      [isActive, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rowCount } = await pool.query("DELETE FROM roles WHERE id = $1", [id]);
    return rowCount > 0;
  },

  async addPermission(roleId, permissionId) {
    await pool.query(
      "INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [roleId, permissionId]
    );
  },

  async removePermission(roleId, permissionId) {
    await pool.query(
      "DELETE FROM role_permissions WHERE role_id = $1 AND permission_id = $2",
      [roleId, permissionId]
    );
  },

  async clearPermissions(roleId) {
    await pool.query("DELETE FROM role_permissions WHERE role_id = $1", [roleId]);
  },

  async assignPermissions(roleId, permissionIds) {
    // Start transaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("DELETE FROM role_permissions WHERE role_id = $1", [roleId]);
      
      if (permissionIds && permissionIds.length > 0) {
        const values = permissionIds.map((pid, index) => `($1, $${index + 2})`).join(",");
        const query = `INSERT INTO role_permissions (role_id, permission_id) VALUES ${values} ON CONFLICT DO NOTHING`;
        await client.query(query, [roleId, ...permissionIds]);
      }
      
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
};

export default Role;

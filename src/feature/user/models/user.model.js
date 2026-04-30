import pool from "../../../config/db.js";
import bcrypt from "bcryptjs";

const User = {
  async findByEmail(email) {
    const { rows } = await pool.query(
      "SELECT u.*, r.* as roles, array_agg(p.name) as permissions FROM users u LEFT JOIN roles r ON u.role_id = r.id LEFT JOIN role_permissions rp ON rp.role_id = r.id LEFT JOIN permissions p ON p.id = rp.permission_id WHERE (u.email = $1 OR u.recovery_email = $1) AND u.is_deleted = FALSE GROUP BY u.id, r.id",
      [email]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query(
      "SELECT u.id, u.username, u.email, u.role_id, u.is_active, u.is_locked, u.last_login, r.name as role_name, array_agg(p.name) as permissions FROM users u LEFT JOIN roles r ON u.role_id = r.id LEFT JOIN role_permissions rp ON rp.role_id = r.id LEFT JOIN permissions p ON p.id = rp.permission_id WHERE u.id = $1 AND u.is_deleted = FALSE GROUP BY u.id, r.name",
      [id]
    );
    return rows[0];
  },

  async create({ username, email, password, role_id }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password, password_decrypted, role_id, is_active) 
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id, username, email, role_id`,
      [username, email, hashedPassword, password, role_id]
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
      `UPDATE users SET ${fields} WHERE id = $1 AND is_deleted = FALSE RETURNING id, username, email, role_id, is_active, is_locked`,
      [id, ...values]
    );
    return rows[0];
  },

  async softDelete(id) {
    await pool.query(
      "UPDATE users SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE id = $1",
      [id]
    );
  },

  async getAll() {
    const { rows } = await pool.query(
      "SELECT u.id, u.username, u.email, u.is_active, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.is_deleted = FALSE"
    );
    return rows;
  },

  async updateLastLogin(id) {
    await pool.query(
      "UPDATE users SET last_login = CURRENT_TIMESTAMP, failed_login = 0 WHERE id = $1",
      [id]
    );
  },

  async incrementFailedLogin(id) {
    await pool.query(
      "UPDATE users SET failed_login = failed_login + 1 WHERE id = $1",
      [id]
    );
  },

  async unlock(id) {
    await pool.query(
      "UPDATE users SET is_locked = FALSE, failed_login = 0 WHERE id = $1",
      [id]
    );
  },

  async checkPermission(userId, { name, resource, action }) {
    let queryStr = `SELECT p.name FROM users u 
                    JOIN roles r ON u.role_id = r.id 
                    JOIN role_permissions rp ON r.id = rp.role_id 
                    JOIN permissions p ON rp.permission_id = p.id 
                    WHERE u.id = $1 AND u.is_active = TRUE AND p.is_active = TRUE`;
    const params = [userId];

    if (name) {
      queryStr += ` AND p.name = $${params.length + 1}`;
      params.push(name);
    }
    if (resource) {
      queryStr += ` AND p.resource = $${params.length + 1}`;
      params.push(resource);
    }
    if (action) {
      queryStr += ` AND p.action = $${params.length + 1}`;
      params.push(action);
    }

    const { rows } = await pool.query(queryStr, params);
    return rows.length > 0;
  },

  async resetPassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE users SET password = $1, password_decrypted = $2 WHERE id = $3",
      [hashedPassword, newPassword, id]
    );
  }
};

export default User;

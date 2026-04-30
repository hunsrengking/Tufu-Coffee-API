import pool from "../../../config/db.js";

const Employee = {
  async getAll() {
    const { rows } = await pool.query(
      "SELECT id, first_name, last_name, email, phone, position, department, hire_date, is_active FROM employees WHERE is_deleted = FALSE ORDER BY created_at DESC"
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM employees WHERE id = $1 AND is_deleted = FALSE",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { first_name, last_name, email, phone, position, department, salary, hire_date, office_id } = data;
    const { rows } = await pool.query(
      `INSERT INTO employees (first_name, last_name, email, phone, position, department, salary, hire_date, office_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, first_name, last_name, email`,
      [first_name, last_name, email, phone, position, department, salary, hire_date || new Date(), office_id]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .filter((key) => data[key] !== undefined)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data).filter((v) => v !== undefined);

    if (fields.length === 0) return null;

    const { rows } = await pool.query(
      `UPDATE employees SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND is_deleted = FALSE RETURNING *`,
      [id, ...values]
    );
    return rows[0];
  },

  async delete(id) {
    await pool.query(
      "UPDATE employees SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE id = $1",
      [id]
    );
  },

  async findByEmail(email) {
    const { rows } = await pool.query(
      "SELECT id FROM employees WHERE email = $1 AND is_deleted = FALSE",
      [email]
    );
    return rows[0];
  }
};

export default Employee;

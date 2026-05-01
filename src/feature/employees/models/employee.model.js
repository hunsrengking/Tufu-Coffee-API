import pool from "../../../config/db.js";

const Employee = {
  async getAll() {
    const { rows } = await pool.query(
      `SELECT e.*, 
              p.name AS position_name, 
              d.name AS department_name,
              o.name AS office_name
       FROM employees e
       LEFT JOIN positions p ON e.position_id = p.id
       LEFT JOIN departments d ON e.department_id = d.id
       LEFT JOIN offices o ON e.office_id = o.id
       WHERE e.is_deleted = FALSE 
       ORDER BY e.created_at DESC`
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT e.*, 
              p.name AS position_name, 
              d.name AS department_name,
              o.name AS office_name
       FROM employees e
       LEFT JOIN positions p ON e.position_id = p.id
       LEFT JOIN departments d ON e.department_id = d.id
       LEFT JOIN offices o ON e.office_id = o.id
       WHERE e.id = $1 AND e.is_deleted = FALSE`,
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      position_id, 
      department_id, 
      salary, 
      joinon_date, 
      office_id 
    } = data;
    
    const { rows } = await pool.query(
      `INSERT INTO employees (
        first_name, 
        last_name, 
        email, 
        phone, 
        position_id, 
        department_id, 
        salary, 
        joinon_date, 
        office_id
      ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING id, first_name, last_name, email`,
      [
        first_name, 
        last_name, 
        email, 
        phone, 
        position_id, 
        department_id, 
        salary, 
        joinon_date || new Date(), 
        office_id
      ]
    );
    return rows[0];
  },

  async update(id, data) {
    const updateData = { ...data };
    
    // Clean up data
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.updated_at;
    delete updateData.is_deleted;
    delete updateData.deleted_at;
    
    // Remove joined fields that are not in the table
    delete updateData.position_name;
    delete updateData.department_name;
    delete updateData.office_name;

    const keys = Object.keys(updateData).filter((key) => updateData[key] !== undefined);
    const fields = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
    const values = keys.map((key) => updateData[key]);

    if (fields.length === 0) return null;

    const { rows } = await pool.query(
      `UPDATE employees SET ${fields}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND is_deleted = FALSE 
       RETURNING id, first_name, last_name, email`,
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


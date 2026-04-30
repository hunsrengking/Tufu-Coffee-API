import pool from "../../../config/db.js";
import bcrypt from "bcryptjs";

const Client = {
  async create({ firstName, lastName, email, phone, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      "INSERT INTO clients (firstname, lastname, email, phone, password, signup_on_date) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING id, firstname, lastname, email, phone",
      [firstName, lastName, email, phone, hashedPassword],
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query(
      "SELECT id, firstname, lastname, email, phone, signup_on_date FROM clients WHERE id = $1",
      [id],
    );
    return rows[0];
  },

  async findByEmail(email) {
    const { rows } = await pool.query(
      "SELECT id, firstname, lastname, email, phone, password, signup_on_date FROM clients WHERE email = $1",
      [email],
    );
    return rows[0];
  },

  async findByEmailOrRecoveryEmail(email) {
    const { rows } = await pool.query(
      "SELECT id, firstname, lastname, email, recovery_email, phone, password, otp, otp_expire, signup_on_date FROM clients WHERE email = $1 OR recovery_email = $1",
      [email],
    );
    return rows[0];
  },

  async update(id, data) {
    const { firstname, lastname, email, phone, recoveryemail } = data;

    const { rows } = await pool.query(
      `UPDATE clients SET 
      firstname = COALESCE($2, firstname),
      lastname = COALESCE($3, lastname),
      email = COALESCE($4, email),
      phone = COALESCE($5, phone),
      recovery_email = COALESCE($6, recovery_email),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id, firstname, lastname, email, phone, recovery_email`,
      [id, firstname, lastname, email, phone, recoveryemail]
    );

    return rows[0];
  },

  async updateOTP(id, otp, expiry) {
    const hashedOTP = await bcrypt.hash(otp, 10);
    const { rows } = await pool.query(
      "UPDATE clients SET otp = $2, otp_expire = $3 WHERE id = $1 RETURNING id",
      [id, hashedOTP, expiry],
    );
    return rows[0];
  },

  async resetPassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { rows } = await pool.query(
      "UPDATE clients SET password = $2, otp = $3, otp_expire = $4, last_password_reset = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id",
      [id, hashedPassword, null, null],
    );
    return rows[0];
  },
};

export default Client;

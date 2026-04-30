import pool from "../../../config/db.js";

const Order = {
  async create({ user_id, total_amount, discount_amount, final_amount, discount_id, order_type, table_number, note, items }) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // 1. Create Order
      const { rows: orderRows } = await client.query(
        `INSERT INTO orders (user_id, total_amount, discount_amount, final_amount, discount_id, order_type, table_number, note) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [user_id, total_amount, discount_amount, final_amount, discount_id, order_type, table_number, note]
      );
      const order = orderRows[0];

      // 2. Create Order Items and Update Stock
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) 
           VALUES ($1, $2, $3, $4, $5)`,
          [order.id, item.product_id, item.quantity, item.unit_price, item.subtotal]
        );

        // Update Stock
        await client.query(
          "UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2",
          [item.quantity, item.product_id]
        );
      }

      // 3. Increment Discount Usage if applicable
      if (discount_id) {
        await client.query(
          "UPDATE discounts SET used_count = used_count + 1 WHERE id = $1",
          [discount_id]
        );
      }

      await client.query("COMMIT");
      return order;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async getAll(filters = {}) {
    let queryStr = `
      SELECT o.*, u.username as customer_name, d.code as discount_code 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id 
      LEFT JOIN discounts d ON o.discount_id = d.id
    `;
    const params = [];

    if (filters.status) {
      queryStr += ` WHERE o.status = $${params.length + 1}`;
      params.push(filters.status);
    }

    queryStr += " ORDER BY o.created_at DESC";

    const { rows } = await pool.query(queryStr, params);
    return rows;
  },

  async findById(id) {
    // 1. Get Order
    const { rows: orderRows } = await pool.query(
      `SELECT o.*, u.username as customer_name, d.code as discount_code 
       FROM orders o 
       LEFT JOIN users u ON o.user_id = u.id 
       LEFT JOIN discounts d ON o.discount_id = d.id 
       WHERE o.id = $1`,
      [id]
    );
    const order = orderRows[0];

    if (!order) return null;

    // 2. Get Items
    const { rows: itemRows } = await pool.query(
      `SELECT oi.*, p.name as product_name, p.image_url 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = $1`,
      [id]
    );
    order.items = itemRows;

    return order;
  },

  async findByUserId(userId) {
    const { rows } = await pool.query(
      `SELECT o.*, d.code as discount_code 
       FROM orders o 
       LEFT JOIN discounts d ON o.discount_id = d.id 
       WHERE o.user_id = $1 
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return rows;
  },

  async updateStatus(id, status) {
    const { rows } = await pool.query(
      "UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [status, id]
    );
    return rows[0];
  }
};

export default Order;

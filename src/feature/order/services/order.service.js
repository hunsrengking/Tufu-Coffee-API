import Order from "../models/order.model.js";
import Product from "../../product/models/product.model.js";
import DiscountService from "../../discount/services/discount.service.js";
import { OrderNotFoundException, OrderPermissionDeniedException } from "../exceptions/order.exception.js";

const OrderService = {
  async getAllOrders(filters) {
    return await Order.getAll(filters);
  },

  async getOrderById(id, userId, roleName) {
    const order = await Order.findById(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    
    // Check if the user is authorized: admin/staff or owner
    if (roleName !== 'Admin' && roleName !== 'admin' && order.user_id !== userId) {
      throw new OrderPermissionDeniedException();
    }

    return order;
  },

  async purchaseOrder(userId, data) {
    const { items, order_type = 'dine-in', table_number, note, discount_code } = data;
    let total_amount = 0;
    const orderItems = [];

    // Detailed item validation and price calculation
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      const currentPrice = product.sale_price ? parseFloat(product.sale_price) : parseFloat(product.price);
      const subtotal = currentPrice * item.quantity;
      total_amount += subtotal;

      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        unit_price: currentPrice,
        subtotal
      });
    }

    // Handle Discount
    let discount_id = null;
    let discount_amount = 0;
    if (discount_code) {
      const { discount, discountAmount } = await DiscountService.validateAndApplyDiscount(discount_code, total_amount);
      discount_id = discount.id;
      discount_amount = discountAmount;
    }

    const final_amount = total_amount - discount_amount;

    return await Order.create({
      user_id: userId,
      total_amount,
      discount_amount,
      final_amount,
      discount_id,
      order_type,
      table_number,
      note,
      items: orderItems
    });
  },

  async updateOrderStatus(id, status) {
    const order = await Order.findById(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    return await Order.updateStatus(id, status);
  },

  async getUserOrderHistory(userId) {
    return await Order.findByUserId(userId);
  }
};

export default OrderService;

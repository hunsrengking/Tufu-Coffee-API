import OrderService from "../services/order.service.js";
import sendResponse from "../../../utils/response.js";

const OrderController = {
  async getAllOrders(req, res) {
    const filters = {
      status: req.query.status
    };
    const orders = await OrderService.getAllOrders(filters);
    sendResponse(res, 200, "Orders retrieved successfully", orders);
  },

  async getOrderById(req, res) {
    const order = await OrderService.getOrderById(req.params.id, req.user.id, req.user.role_name);
    sendResponse(res, 200, "Order retrieved successfully", order);
  },

  async createOrder(req, res) {
    const order = await OrderService.createOrder(req.user.id, req.body);
    sendResponse(res, 201, "Order created successfully", order);
  },

  async updateOrderStatus(req, res) {
    const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
    sendResponse(res, 200, "Order status updated successfully", order);
  }
};

export default OrderController;

import ClientService from "../services/client.service.js";
import sendResponse from "../../../utils/response.js";

const ClientController = {
  async signup(req, res) {
    const result = await ClientService.signup(req.body);
    sendResponse(res, 201, "Signup successful", result);
  },

  async signin(req, res) {
    const { email, password } = req.body;
    const result = await ClientService.signin(email, password);
    sendResponse(res, 200, "Login successful", result);
  },

  async forgotPassword(req, res) {
    const { email } = req.body;
    const result = await ClientService.forgotPassword(email);
    sendResponse(res, 200, result.message);
  },

  async verifyOTP(req, res) {
    const { email, otp } = req.body;
    const result = await ClientService.verifyOTP(email, otp);
    sendResponse(res, 200, result.message);
  },

  async resetPassword(req, res) {
    const { email, newPassword } = req.body;
    const result = await ClientService.resetPassword(email, newPassword);
    sendResponse(res, 200, result.message);
  },

  async getMyProfile(req, res) {
    const user = await ClientService.getMyProfile(req.params.id);
    sendResponse(res, 200, "Profile retrieved successfully", user);
  },

  async updateMyProfile(req, res) {
    const user = await ClientService.updateMyProfile(req.params.id, req.body);
    sendResponse(res, 200, "Profile updated successfully", user);
  },

  async purchaseOrder(req, res) {
    const order = await ClientService.purchaseOrder(req.params.id, req.body);
    sendResponse(res, 201, "Order created successfully", order);
  },

  async getOrderHistory(req, res) {
    const orders = await ClientService.getOrderHistory(req.params.id);
    sendResponse(res, 200, "Order history retrieved successfully", orders);
  },

  async getOrderById(req, res) {
    const order = await ClientService.getOrderById(req.params.id, req.params.id);
    sendResponse(res, 200, "Order retrieved successfully", order);
  },
};

export default ClientController;

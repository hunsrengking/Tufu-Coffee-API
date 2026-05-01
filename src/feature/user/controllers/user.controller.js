import UserService from "../services/user.service.js";
import sendResponse from "../../../utils/response.js";

const UserController = {
  async getAllUsers(req, res) {
    const users = await UserService.getAllUsers();
    sendResponse(res, 200, "Users retrieved successfully", users);
  },

  async getUserById(req, res) {
    const user = await UserService.getUserById(req.params.id);
    sendResponse(res, 200, "User retrieved successfully", user);
  },

  async createUser(req, res) {
    const user = await UserService.createUser(req.body);
    sendResponse(res, 201, "User created successfully", user);
  },

  async updateUser(req, res) {
    const user = await UserService.updateUser(req.params.id, req.body);
    sendResponse(res, 200, "User updated successfully", user);
  },

  async deleteUser(req, res) {
    await UserService.deleteUser(req.params.id);
    sendResponse(res, 204, "User deleted successfully");
  },

  async unlockUser(req, res) {
    await UserService.unlockUser(req.params.id);
    sendResponse(res, 200, "User unlocked successfully");
  },

  async changePassword(req, res) {
    await UserService.changePassword(req.params.id, req.body);
    sendResponse(res, 200, "Password changed successfully");
  },
};

export default UserController;

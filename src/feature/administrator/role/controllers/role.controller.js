import RoleService from "../services/role.service.js";
import sendResponse from "../../../../utils/response.js";

const RoleController = {

  async getAll(req, res) {
    const result = await RoleService.getAll();
    sendResponse(res, 200, result.message, result.data);
  },

  async getPermissions(req, res) {
    const result = await RoleService.getPermissions();
    sendResponse(res, 200, result.message, result.data);
  },

  async findById(req, res) {
    const result = await RoleService.findById(req.params.id);
    sendResponse(res, 200, result.message, result.data);
  },

  async create(req, res) {
    const result = await RoleService.create(req.body);
    sendResponse(res, 201, result.message, result.data);
  },

  async update(req, res) {
    const result = await RoleService.update(req.params.id, req.body);
    sendResponse(res, 200, result.message, result.data);
  },

  async disable(req, res) {
    const result = await RoleService.disable(req.params.id);
    sendResponse(res, 200, result.message, result.data);
  },

  async enable(req, res) {
    const result = await RoleService.enable(req.params.id);
    sendResponse(res, 200, result.message, result.data);
  },

  async delete(req, res) {
    const result = await RoleService.delete(req.params.id);
    sendResponse(res, 200, result.message, result.data);
  },

  async assignPermission(req, res) {
    const { id, permissionId } = req.params;
    const result = await RoleService.assignPermission(id, permissionId);
    sendResponse(res, 200, result.message, result.data);
  },

  async unassignPermission(req, res) {
    const { id, permissionId } = req.params;
    const result = await RoleService.unassignPermission(id, permissionId);
    sendResponse(res, 200, result.message, result.data);
  },

};

export default RoleController;

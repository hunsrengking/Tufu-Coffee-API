import RolePermissionService from "../services/role-permission.service.js";
import sendResponse from "../../../utils/response.js";

const RolePermissionController = {
  async getAllRoles(req, res) {
    const roles = await RolePermissionService.getAllRoles();
    sendResponse(res, 200, "Roles retrieved successfully", roles);
  },
  async getRoleById(req, res) {
    const { id } = req.params;
    const role = await RolePermissionService.getRoleById(id);
    sendResponse(res, 200, "Role retrieved successfully", role);
  },
  async getAllPermissions(req, res) {
    const permissions = await RolePermissionService.getAllPermissions();
    sendResponse(res, 200, "Permissions retrieved successfully", permissions);
  },

  async createRole(req, res) {
    const role = await RolePermissionService.createRole(req.body);
    sendResponse(res, 201, "Role created successfully", role);
  },

  async assignPermissionToRole(req, res) {
    const { roleId } = req.params;
    const { permissionId } = req.body;
    await RolePermissionService.assignPermission(roleId, permissionId);
    sendResponse(res, 200, "Permission assigned to role successfully");
  },
};

export default RolePermissionController;

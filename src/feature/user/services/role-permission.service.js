import Role from "../models/role.model.js";
import Permission from "../models/permission.model.js";

const RolePermissionService = {
  async getAllRoles() {
    return await Role.getAll();
  },
  async getRoleById(id) {
    return await Role.getById(id);
  },

  async getAllPermissions() {
    return await Permission.getAll();
  },

  async createRole(data) {
    return await Role.create(data.name, data.description);
  },

  async assignPermission(roleId, permissionId) {
    return await Role.addPermission(roleId, permissionId);
  },
};

export default RolePermissionService;

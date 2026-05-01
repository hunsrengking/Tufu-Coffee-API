import Role from "../models/role.model.js";
import Permission from "../models/permission.model.js";
import { AppError } from "../../../../middlewares/error.middleware.js";

const RoleService = {
  
  async getPermissions() {
    const permissions = await Permission.getAll();
    return {
      message: "Permissions retrieved successfully",
      data: permissions
    };
  },

  async getAll() {
    const roles = await Role.getAll();
    return {
      message: "Roles retrieved successfully",
      data: roles
    };
  },

  async findById(id) {
    const role = await Role.getById(id);
    if (!role) {
      throw new AppError("Role not found", 404);
    }
    return {
      message: "Role retrieved successfully",
      data: role
    };
  },

  async create(data) {
    const { name, description, permissionIds } = data;
    
    // Check if role already exists
    const existingRole = await Role.findByName(name);
    if (existingRole) {
      throw new AppError("Role already exists", 400);
    }

    const newRole = await Role.create(name, description);
    
    if (permissionIds && Array.isArray(permissionIds)) {
      await Role.assignPermissions(newRole.id, permissionIds);
    }

    const roleWithPermissions = await Role.getById(newRole.id);
    return {
      message: "Role created successfully",
      data: roleWithPermissions
    };
  },

  async update(id, data) {
    const { name, description, permissionIds } = data;
    
    const role = await Role.getById(id);
    if (!role) {
      throw new AppError("Role not found", 404);
    }

    // Check if new name already exists for another role
    if (name && name !== role.name) {
      const existingRole = await Role.findByName(name);
      if (existingRole) {
        throw new AppError("Role name already exists", 400);
      }
    }

    const updatedRole = await Role.update(id, name || role.name, description || role.description);
    
    if (permissionIds && Array.isArray(permissionIds)) {
      await Role.assignPermissions(id, permissionIds);
    }

    const roleWithPermissions = await Role.getById(id);
    return {
      message: "Role updated successfully",
      data: roleWithPermissions
    };
  },

  async delete(id) {
    const role = await Role.getById(id);
    if (!role) {
      throw new AppError("Role not found", 404);
    }

    // Optional: Check if role is assigned to any users before deleting
    // For now, cascade delete is handled by DB schema if implemented, 
    // but our schema has ON DELETE SET NULL for users.role_id

    const deleted = await Role.delete(id);
    if (!deleted) {
      throw new AppError("Failed to delete role", 500);
    }

    return {
      message: "Role deleted successfully",
      data: null
    };
  },

  // Helper methods for enable/disable
  async disable(id) {
    const role = await Role.getById(id);
    if (!role) {
      throw new AppError("Role not found", 404);
    }
    const updatedRole = await Role.setActiveStatus(id, false);
    return {
      message: "Role disabled successfully",
      data: updatedRole
    };
  },

  async enable(id) {
    const role = await Role.getById(id);
    if (!role) {
      throw new AppError("Role not found", 404);
    }
    const updatedRole = await Role.setActiveStatus(id, true);
    return {
      message: "Role enabled successfully",
      data: updatedRole
    };
  },

  async assignPermission(roleId, permissionId) {
    const role = await Role.getById(roleId);
    if (!role) {
      throw new AppError("Role not found", 404);
    }
    await Role.addPermission(roleId, permissionId);
    return {
      message: "Permission assigned successfully",
      data: await Role.getById(roleId)
    };
  },

  async unassignPermission(roleId, permissionId) {
    const role = await Role.getById(roleId);
    if (!role) {
      throw new AppError("Role not found", 404);
    }
    await Role.removePermission(roleId, permissionId);
    return {
      message: "Permission unassigned successfully",
      data: await Role.getById(roleId)
    };
  }
};

export default RoleService;

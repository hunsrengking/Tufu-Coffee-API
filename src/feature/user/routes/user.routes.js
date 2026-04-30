import express from "express";
import UserController from "../controllers/user.controller.js";
import RolePermissionController from "../controllers/role-permission.controller.js";
import userValidation from "../validations/user.validation.js";
import validate from "../../../middlewares/validate.middleware.js";
import { protect, hasPermission } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// User management endpoints
router.get("/", protect, hasPermission('USER.READ'), UserController.getAllUsers);
router.get("/:id", protect, hasPermission('USER.READ'), UserController.getUserById);
router.post("/", protect, hasPermission('USER.CREATE'), validate(userValidation.createUser), UserController.createUser);
router.put("/:id", protect, hasPermission('USER.UPDATE'), validate(userValidation.updateUser), UserController.updateUser);
router.delete("/:id", protect, hasPermission('USER.DELETE'), UserController.deleteUser);
router.post("/:id/unlock", protect, hasPermission('USER.UNLOCK'), UserController.unlockUser);

// Roles/Permissions endpoints
router.get("/roles/", protect, hasPermission('ROLE.READ'), RolePermissionController.getAllRoles);
router.get("/roles/:id/", protect, hasPermission('ROLE.READ'), RolePermissionController.getRoleById);
router.get("/permissions/", protect, hasPermission('PERMISSION.READ'), RolePermissionController.getAllPermissions);
router.post("/roles", protect, hasPermission('ROLE.CREATE'), RolePermissionController.createRole);
router.put("/roles/:id/assign-permission", protect, hasPermission('ROLE.ASSIGN_PERMISSION'), RolePermissionController.assignPermissionToRole);

export default router;

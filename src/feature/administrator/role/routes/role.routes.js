import express from "express";
import RoleController from "../controllers/role.controller.js";
import roleValidation from "../validations/role.validation.js";
import validate from "../../../../middlewares/validate.middleware.js";
import { protect, hasPermission } from "../../../../middlewares/auth.middleware.js";

const router = express.Router();

// Role routes
router.get("/", protect, hasPermission('ROLE.READ'), validate(roleValidation.getAll), RoleController.getAll);
router.get("/permissions", protect, hasPermission('ROLE.READ'), RoleController.getPermissions);
router.get("/:id", protect, hasPermission('ROLE.READ'), validate(roleValidation.findById), RoleController.findById);
router.post("/", protect, hasPermission('ROLE.CREATE'), validate(roleValidation.create), RoleController.create);
router.put("/:id", protect, hasPermission('ROLE.UPDATE'), validate(roleValidation.update), RoleController.update);
router.put("/:id/disable", protect, hasPermission('ROLE.UPDATE'), validate(roleValidation.disable), RoleController.disable);
router.put("/:id/enable", protect, hasPermission('ROLE.UPDATE'), validate(roleValidation.enable), RoleController.enable);
router.delete("/:id", protect, hasPermission('ROLE.DELETE'), validate(roleValidation.delete), RoleController.delete);
router.post("/:id/permissions/:permissionId", protect, hasPermission('ROLE.UPDATE'), validate(roleValidation.assignPermission), RoleController.assignPermission);
router.delete("/:id/permissions/:permissionId", protect, hasPermission('ROLE.UPDATE'), validate(roleValidation.unassignPermission), RoleController.unassignPermission);

export default router;

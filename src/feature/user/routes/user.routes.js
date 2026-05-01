import express from "express";
import UserController from "../controllers/user.controller.js";
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
router.put("/:id/unlock", protect, hasPermission('USER.UNLOCK'), UserController.unlockUser);
router.put("/:id/change-password", protect, validate(userValidation.ChangePassword), UserController.changePassword);

export default router;

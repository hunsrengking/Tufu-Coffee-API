import express from "express";
import CategoryController from "../controllers/category.controller.js";
import productValidation from "../validations/product.validation.js";
import validate from "../../../middlewares/validate.middleware.js";
import { protect, hasPermission } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);

// Admin/Staff routes
router.post("/", protect, hasPermission('CATEGORY.CREATE'), validate(productValidation.createCategory), CategoryController.createCategory);
router.put("/:id", protect, hasPermission('CATEGORY.UPDATE'), validate(productValidation.updateCategory), CategoryController.updateCategory);
router.delete("/:id", protect, hasPermission('CATEGORY.DELETE'), CategoryController.deleteCategory);

export default router;

import express from "express";
import ProductController from "../controllers/product.controller.js";
import productValidation from "../validations/product.validation.js";
import validate from "../../../middlewares/validate.middleware.js";
import { protect, hasPermission } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

// Admin/Staff routes
router.post("/", protect, hasPermission('PRODUCT.CREATE'), validate(productValidation.createProduct), ProductController.createProduct);
router.put("/:id", protect, hasPermission('PRODUCT.UPDATE'), validate(productValidation.updateProduct), ProductController.updateProduct);
router.delete("/:id", protect, hasPermission('PRODUCT.DELETE'), ProductController.deleteProduct);

export default router;

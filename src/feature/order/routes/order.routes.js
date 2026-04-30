import express from "express";
import OrderController from "../controllers/order.controller.js";
import orderValidation from "../validations/order.validation.js";
import validate from "../../../middlewares/validate.middleware.js";
import { protect, hasPermission } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// General routes (requires login)
router.post("/", protect, validate(orderValidation.createOrder), OrderController.createOrder);
router.get("/:id", protect, OrderController.getOrderById);

// Administrative/Employee routes
router.get("/", protect, hasPermission('ORDER.READ'), OrderController.getAllOrders);
router.patch("/:id/status", protect, hasPermission('ORDER.UPDATE'), validate(orderValidation.updateStatus), OrderController.updateOrderStatus);

export default router;

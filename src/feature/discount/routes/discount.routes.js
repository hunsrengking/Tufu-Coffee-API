import express from "express";
import DiscountController from "../controllers/discount.controller.js";
import discountValidation from "../validations/discount.validation.js";
import validate from "../../../middlewares/validate.middleware.js";
import { protect, hasPermission } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// General routes (requires login)
router.post("/validate", protect, validate(discountValidation.validateCode), DiscountController.validateCode);

// Administrative routes
router.get("/", protect, hasPermission('DISCOUNT.READ'), DiscountController.getAllDiscounts);
router.post("/", protect, hasPermission('DISCOUNT.CREATE'), validate(discountValidation.createDiscount), DiscountController.createDiscount);
router.put("/:id", protect, hasPermission('DISCOUNT.UPDATE'), validate(discountValidation.createDiscount), DiscountController.updateDiscount);

export default router;

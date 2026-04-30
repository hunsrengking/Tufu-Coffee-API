import express from "express";
import AuthController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";
import validate from "../../../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/login", validate(authValidation.login), AuthController.login);
router.post("/forgot-password", validate(authValidation.forgotPassword), AuthController.forgotPassword);
router.post("/reset-password", validate(authValidation.resetPassword), AuthController.resetPassword);

export default router;

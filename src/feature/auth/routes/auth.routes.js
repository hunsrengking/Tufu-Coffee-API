import express from "express";
import AuthController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";
import validate from "../../../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/login", validate(authValidation.login), AuthController.login);
router.post("/forgotpassword", validate(authValidation.forgotPassword), AuthController.forgotPassword);
router.post("/verifyotp", validate(authValidation.verifyOTP), AuthController.verifyOTP);
router.post("/resetpassword", validate(authValidation.resetPassword), AuthController.resetPassword);

export default router;

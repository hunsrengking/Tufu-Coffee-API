import express from "express";
import ClientController from "../controllers/client.controller.js";
import clientValidation from "../validations/client.validation.js";
import validate from "../../../middlewares/validate.middleware.js";

const router = express.Router();

// register client routes here
router.post("/signup", validate(clientValidation.signup), ClientController.signup);
router.post("/signin", validate(clientValidation.signin), ClientController.signin);
router.post("/forgotpassword", validate(clientValidation.forgotPassword), ClientController.forgotPassword);
router.post("/verifyotp", validate(clientValidation.verifyOTP), ClientController.verifyOTP);
router.post("/resetpassword", validate(clientValidation.resetPassword), ClientController.resetPassword);

// Client profile management
router.get("/profile", ClientController.getMyProfile);
router.get("/profile/:id", ClientController.getMyProfile);
router.put("/updateprofile/:id", validate(clientValidation.updateProfile), ClientController.updateMyProfile);

// Order history
router.get("/orders", ClientController.getOrderHistory);
router.get("/orders/:id", ClientController.getOrderById);
router.post("/orders", validate(clientValidation.createOrder), ClientController.purchaseOrder);

export default router;

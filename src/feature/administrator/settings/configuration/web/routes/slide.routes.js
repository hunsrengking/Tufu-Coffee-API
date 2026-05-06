import express from "express";
import SlideController from "../controllers/slide.controller.js";

const router = express.Router();

router.post("/slide", protect, validate(slideValidation.validateCode), SlideController.validateCode);
export default router;

import express from "express";
import SlideController from "../controllers/slide.controller.js";
import validate from "../../../middlewares/validate.middleware.js";
import slideValidation from "../validations/slide.validation.js";
import { protect } from "../../../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/slide", SlideController.getAllSlides);
router.post("/slide", protect, validate(slideValidation.createSlide), SlideController.createSlide);
router.put("/slide/:id", protect, validate(slideValidation.updateSlide), SlideController.updateSlide);
router.delete("/slide/:id", protect, validate(slideValidation.deleteSlide), SlideController.deleteSlide);

router.get("/about", AboutController.getAllAbout);
router.post("/about", protect, validate(aboutValidation.createAbout), AboutController.createAbout);
router.put("/about/:id", protect, validate(aboutValidation.updateAbout), AboutController.updateAbout);
router.delete("/about/:id", protect, AboutController.deleteAbout);

export default router;

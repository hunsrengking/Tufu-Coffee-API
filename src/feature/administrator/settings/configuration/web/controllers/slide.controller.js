import SlideService from "../services/slide.service.js";
import sendResponse from "../../../utils/response.js";

const SlideController = {
  async getAllSlides(req, res) {
    const slides = await SlideService.getAllSlides();
    sendResponse(res, 200, "Slides retrieved successfully", slides);
  },

  async createSlide(req, res) {
    const slide = await SlideService.createSlide(req.body);
    sendResponse(res, 201, "Slide created successfully", slide);
  },

  async updateSlide(req, res) {
    const slide = await SlideService.updateSlide(req.params.id, req.body);
    sendResponse(res, 200, "Slide updated successfully", slide);
  },

  async deleteSlide(req, res) {
    const slide = await SlideService.deleteSlide(req.params.id);
    sendResponse(res, 200, "Slide deleted successfully", slide);
  }
};

export default SlideController;

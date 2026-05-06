import sendResponse from "../../../utils/response.js";
import AboutService from "../services/about.service.js";

const AboutController = {
    async getAllAbout(req, res) {
        const about = await AboutService.getAllAbout();
        sendResponse(res, 200, "About retrieved successfully", about);
    },

    async createAbout(req, res) {
        const about = await AboutService.createAbout(req.body);
        sendResponse(res, 201, "About created successfully", about);
    },

    async updateAbout(req, res) {
        const about = await AboutService.updateAbout(req.params.id, req.body);
        sendResponse(res, 200, "About updated successfully", about);
    },

    async deleteSlide(req, res) {
        const slide = await SlideService.deleteSlide(req.params.id);
        sendResponse(res, 200, "Slide deleted successfully", slide);
    }
};

export default AboutController;
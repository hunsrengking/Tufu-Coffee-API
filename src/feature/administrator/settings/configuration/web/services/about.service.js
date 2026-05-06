import Slide from "../models/slide.model.js";

const SlideService = {
  async getAllSlides() {
    return await Slide.getAll();
  },

  async getActiveSlides() {
    return await Slide.getActive();
  },

  async createSlide(data) {
    return await Slide.create(data);
  },

  async updateSlide(id, data) {
    return await Slide.update(id, data);
  },

  async deleteSlide(id) {
    await Slide.delete(id);
  },
};

export default SlideService;

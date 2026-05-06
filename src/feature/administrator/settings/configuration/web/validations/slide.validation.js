import Joi from "joi";

const slideValidation = {
  createSlide: Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(50).required(),
    image_url: Joi.string().required(),
    sort_order: Joi.number().integer().min(0).optional(),
    is_active: Joi.boolean().required()
  }),

  updateSlide: Joi.object({
    title: Joi.string().min(2).max(50).optional(),
    description: Joi.string().min(2).max(50).optional(),
    image_url: Joi.string().optional(),
    sort_order: Joi.number().integer().min(0).optional(),
    is_active: Joi.boolean().optional()
  }),

};

export default slideValidation;

import Joi from "joi";

const productValidation = {
  createProduct: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().optional().allow(""),
    price: Joi.number().precision(2).positive().required(),
    sale_price: Joi.number().precision(2).positive().optional().allow(null),
    category_id: Joi.number().integer().optional(),
    stock_quantity: Joi.number().integer().min(0).optional(),
    image_url: Joi.string().uri().optional().allow("")
  }),

  updateProduct: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    description: Joi.string().optional().allow(""),
    price: Joi.number().precision(2).positive().optional(),
    sale_price: Joi.number().precision(2).positive().optional().allow(null),
    category_id: Joi.number().integer().optional(),
    stock_quantity: Joi.number().integer().min(0).optional(),
    image_url: Joi.string().uri().optional().allow(""),
    is_active: Joi.boolean().optional()
  }),

  createCategory: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().optional().allow("")
  }),

  updateCategory: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    description: Joi.string().optional().allow(""),
    is_active: Joi.boolean().optional()
  })
};

export default productValidation;

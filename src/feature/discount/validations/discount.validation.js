import Joi from "joi";

const discountValidation = {
  createDiscount: Joi.object({
    code: Joi.string().min(2).max(50).uppercase().required(),
    type: Joi.string().valid('percentage', 'fixed').required(),
    value: Joi.number().positive().required(),
    min_order_amount: Joi.number().min(0).optional(),
    max_discount_amount: Joi.number().min(0).optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    usage_limit: Joi.number().integer().min(1).optional()
  }),

  validateCode: Joi.object({
    code: Joi.string().required(),
    totalAmount: Joi.number().positive().required()
  })
};

export default discountValidation;

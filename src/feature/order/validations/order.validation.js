import Joi from "joi";

const orderValidation = {
  createOrder: Joi.object({
    order_type: Joi.string().valid('dine-in', 'takeaway', 'delivery').default('dine-in'),
    table_number: Joi.string().max(10).optional().allow(null, ""),
    note: Joi.string().optional().allow(null, ""),
    items: Joi.array().items(
      Joi.object({
        product_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required()
      })
    ).min(1).required()
  }),

  updateStatus: Joi.object({
    status: Joi.string().valid('pending', 'processing', 'completed', 'cancelled').required()
  })
};

export default orderValidation;

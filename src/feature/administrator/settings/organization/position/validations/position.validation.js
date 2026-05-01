import Joi from "joi";

const positionValidation = {
  create: Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().allow(null, "").max(255),
  }),

  update: Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().allow(null, "").max(255),
  }).min(1),
};

export default positionValidation;


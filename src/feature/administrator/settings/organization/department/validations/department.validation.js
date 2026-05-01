import Joi from "joi";

const departmentValidation = {
  create: Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().allow(null, "").max(100),
  }),

  update: Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().allow(null, "").max(200),
  }),
};

export default departmentValidation;
import Joi from "joi";

const employeeValidation = {
  create: Joi.object({
    first_name: Joi.string().required().max(100),
    last_name: Joi.string().required().max(100),
    email: Joi.string().email().required().max(100),
    phone: Joi.string().allow(null, "").max(20),
    position: Joi.string().allow(null, "").max(100),
    department: Joi.string().allow(null, "").max(100),
    salary: Joi.number().allow(null).precision(2),
    hire_date: Joi.date().allow(null),
  }),

  update: Joi.object({
    first_name: Joi.string().max(100),
    last_name: Joi.string().max(100),
    email: Joi.string().email().max(100),
    phone: Joi.string().allow(null, "").max(20),
    position: Joi.string().allow(null, "").max(100),
    department: Joi.string().allow(null, "").max(100),
    salary: Joi.number().allow(null).precision(2),
    hire_date: Joi.date().allow(null),
    is_active: Joi.boolean()
  }).min(1),
};

export default employeeValidation;

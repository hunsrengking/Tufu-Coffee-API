import Joi from "joi";

const employeeValidation = {
  create: Joi.object({
    first_name: Joi.string().required().max(100),
    last_name: Joi.string().required().max(100),
    email: Joi.string().email().required().max(100),
    phone: Joi.string().allow(null, "").max(20),
    position_id: Joi.number().integer().allow(null),
    department_id: Joi.number().integer().allow(null),
    office_id: Joi.number().integer().allow(null),
    salary: Joi.number()
      .min(0)
      .allow(null)
      .precision(2),
    joinon_date: Joi.date().allow(null),
  }),

  update: Joi.object({
    first_name: Joi.string().max(100),
    last_name: Joi.string().max(100),
    email: Joi.string().email().max(100),
    phone: Joi.string().allow(null, "").max(20),
    position_id: Joi.number().integer().allow(null),
    department_id: Joi.number().integer().allow(null),
    office_id: Joi.number().integer().allow(null),
    salary: Joi.number().allow(null).precision(2),
    joinon_date: Joi.date().allow(null),
    is_active: Joi.boolean()
  }).min(1),
};

export default employeeValidation;


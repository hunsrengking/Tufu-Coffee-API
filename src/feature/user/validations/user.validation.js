import Joi from "joi";

const userValidation = {
  createUser: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role_id: Joi.number().integer().required(),
  }),

  updateUser: Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    role_id: Joi.number().integer().optional(),
    is_active: Joi.boolean().optional(),
    is_locked: Joi.boolean().optional(),
  }),
};

export default userValidation;

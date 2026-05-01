import Joi from "joi";

const userValidation = {
  createUser: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role_id: Joi.number().integer().required(),
    employee_id: Joi.number().integer().allow(null).optional(),
    recovery_email: Joi.string().email().allow(null, '').optional(),
  }),

  updateUser: Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    role_id: Joi.number().integer().optional(),
    employee_id: Joi.number().integer().allow(null).optional(),
    is_active: Joi.boolean().optional(),
    is_locked: Joi.boolean().optional(),
    recovery_email: Joi.string().email().allow(null, '').optional(),
  }),

  ChangePassword: Joi.object({
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
  }),
};

export default userValidation;


import Joi from "joi";

const authValidation = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required()
  }),

  resetPassword: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).required(),
    verificationToken: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  })
};

export default authValidation;

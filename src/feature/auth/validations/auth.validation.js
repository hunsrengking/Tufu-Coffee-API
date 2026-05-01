import Joi from "joi";

const authValidation = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required()
  }),

  verifyOTP: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required()
  }),

  resetPassword: Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(6).required()
  })
};

export default authValidation;


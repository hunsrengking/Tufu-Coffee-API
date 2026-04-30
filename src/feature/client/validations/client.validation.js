import Joi from "joi";

const clientValidation = {
  signup: Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^0[0-9]{8,9}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone must be valid Cambodian number (start with 0, 9-10 digits)",
      }),
    recoveryEmail: Joi.string().email().optional(),
    password: Joi.string().min(6).required(),
  }),

  signin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  verifyOTP: Joi.object({
    email: Joi.string().email().optional(),
    otp: Joi.string().length(6).required(),
  }),

  resetPassword: Joi.object({
    email: Joi.string().email().required(),
    newPassword: Joi.string().min(6).required(),
  }),

  updateProfile: Joi.object({
    firstname: Joi.string().trim().min(2).max(30).optional(),
    lastname: Joi.string().trim().min(2).max(30).optional(),
    email: Joi.string().trim().email().optional(),
    phone: Joi.string()
      .trim()
      .pattern(/^0[0-9]{8,9}$/)
      .optional(),
    recoveryemail: Joi.string().email().optional(),
  }),

  createOrder: Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.number().required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
    note: Joi.string().optional(),
  }),
};

export default clientValidation;
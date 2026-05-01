import { AppError } from "./error.middleware.js";

const validate = (schema) => {
  return (req, res, next) => {
    // Combine params, query, and body for validation
    const dataToValidate = {
      ...req.params,
      ...req.query,
      ...req.body
    };

    const { error } = schema.validate(dataToValidate, { abortEarly: false, allowUnknown: true });
    
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new AppError(errorMessage, 400));
    }
    
    next();
  };
};

export default validate;

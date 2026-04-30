/**
 * response.js - Standardized success response structure
 */
const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: "success",
    message,
    ...(data && { data }),
  });
};

export default sendResponse;

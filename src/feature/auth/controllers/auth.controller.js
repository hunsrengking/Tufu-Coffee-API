import AuthService from "../services/auth.service.js";
import sendResponse from "../../../utils/response.js";

const AuthController = {

  // Login handler
  async login(req, res) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    sendResponse(res, 200, "Login successful", result);
  },

  // Forgot password handler
  async forgotPassword(req, res) {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email);
    sendResponse(res, 200, result.message);
  },

  // Verify OTP handler
  async verifyOTP(req, res) {
    const { email, otp } = req.body;
    const result = await AuthService.verifyOTP(email, otp);
    sendResponse(res, 200, result.message);
  },

  // Reset password handler
  async resetPassword(req, res) {
    const { email, newPassword } = req.body;
    const result = await AuthService.resetPassword(email, newPassword);
    sendResponse(res, 200, result.message);
  },
};


export default AuthController;

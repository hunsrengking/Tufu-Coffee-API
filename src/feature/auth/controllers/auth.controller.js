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
    sendResponse(res, 200, result.message, {
      verificationToken: result.verificationToken,
    });
  },

  // Reset password handler
  async resetPassword(req, res) {
    const { email, code, verificationToken, newPassword } = req.body;
    const result = await AuthService.verifyAndResetPassword(
      email,
      code,
      verificationToken,
      newPassword
    );
    sendResponse(res, 200, result.message);
  },
};

export default AuthController;

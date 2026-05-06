import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../user/models/user.model.js";
import {
  InvalidCredentialsException,
  AccountLockedException,
  AccountInactiveException,
} from "../exceptions/auth.exception.js";
import { UserNotFoundException } from "../../user/exceptions/user.exception.js";
import { AppError } from "../../../middlewares/error.middleware.js";
import { sendEmail } from "../../../utils/mailer.js";

const AuthService = {

  async login(email, password) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (!user.is_active) {
      throw new AccountInactiveException();
    }

    if (user.is_locked) {
      throw new AccountLockedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await User.incrementFailedLogin(user.id);
      throw new InvalidCredentialsException();
    }

    // Success login
    await User.updateLastLogin(user.id);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: [
        {
          id: user.role_id,
          name: user.role_name,
          disabled: !user.is_active,
        },
      ],
      permissions: user.permissions,
      token: token,
    };
  },

  async forgotPassword(email) {
    const user = await User.findByEmailOrRecoveryEmail(email);

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 899999 + 1).toString();
      const otpExpiryMinutes = Number(process.env.OTP_EXPIRY_MINUTES || 5);
      const otpExpire = new Date(Date.now() + otpExpiryMinutes * 60 * 1000);

      await User.updateOTP(user.id, otp, otpExpire);

      await sendEmail(
        email,
        "Password Reset OTP",
        `Your OTP is: ${otp}. It expires in ${otpExpiryMinutes} minutes.`,
        `
        <div style="font-family: Arial; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>You requested a password reset. Use the OTP below to proceed:</p>
          <div style="background: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; color: #007bff;">
            ${otp}
          </div>
          <p>This OTP expires in ${otpExpiryMinutes} minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
      );
    }
    return { message: "If this email exists, an OTP has been sent." };
  },


  async verifyOTP(email, otp) {
    const user = await User.findByEmailOrRecoveryEmail(email);
    if (!user || !user.otp || !user.otp_expire) {
      throw new InvalidCredentialsException("Invalid or expired OTP");
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    const isExpired = new Date() > new Date(user.otp_expire);

    if (!isMatch) {
      throw new InvalidCredentialsException("Invalid OTP");
    }
    if (isExpired) {
      console.log("OTP has expired");
      console.log(user.otp_expire);
      await User.updateOTP(user.id, null, null);
      throw new InvalidCredentialsException("OTP has expired");
    }
    return { message: "OTP verified successfully" };
  },

  async resetPassword(email, newPassword) {
    const user = await User.findByEmailOrRecoveryEmail(email);
    if (!user) {
      throw new UserNotFoundException("User not found");
    }

    await User.resetPassword(user.id, newPassword);
    return { message: "Password reset successfully" };
  },
};

export default AuthService;


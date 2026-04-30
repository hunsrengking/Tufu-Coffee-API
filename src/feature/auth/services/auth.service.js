import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../../user/models/user.model.js";
import {
  InvalidCredentialsException,
  AccountLockedException,
  AccountInactiveException,
} from "../exceptions/auth.exception.js";
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
          name: user.name,
          description: user.description,
          disabled: !user.is_active,
        },
      ],
      permissions: user.permissions,
      token: token,
    };
  },

  async forgotPassword(email) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError("Recovery code sent to your email", 200);
    }

    // 1. Generate OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto
      .createHmac("sha256", process.env.JWT_SECRET)
      .update(code)
      .digest("hex");

    // 2. Create signed token (Stateless)
    const verificationToken = jwt.sign(
      { email: user.email, otpHash },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    // 3. Send email
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
    const htmlBody = `<h3>Password Recovery</h3><p>Your OTP code is: <b>${code}</b>. It will expire in ${expiryMinutes} minutes.</p>`;
    await sendEmail(
      user.email,
      "Password Recovery OTP",
      `Your OTP is ${code}`,
      htmlBody,
    );

    // 4. Return the verification token (client must send this back with the OTP)
    return { message: "Recovery code sent to your email", verificationToken };
  },

  async verifyAndResetPassword(email, code, verificationToken, newPassword) {
    try {
      // 1. Verify the verificationToken
      const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);

      if (decoded.email !== email) {
        throw new AppError("Invalid verification token", 400);
      }

      // 2. Hash incoming code and compare with stored hash in token
      const incomingHash = crypto
        .createHmac("sha256", process.env.JWT_SECRET)
        .update(code)
        .digest("hex");

      if (incomingHash !== decoded.otpHash) {
        throw new AppError("Invalid recovery code", 400);
      }

      // 3. Reset password
      const user = await User.findByEmail(email);
      if (!user) throw new AppError("User not found", 404);

      await User.resetPassword(user.id, newPassword);
      return { message: "Password updated successfully" };
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new AppError(
          "Recovery session expired. Please request a new code.",
          400,
        );
      }
      throw new AppError(
        err.message || "Invalid or tampered verification token",
        400,
      );
    }
  },
};

export default AuthService;

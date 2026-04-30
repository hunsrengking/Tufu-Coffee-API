import Client from "../models/client.model.js";
import {
  ClientAlreadyExistsException,
  UserNotFoundException,
  InvalidCredentialsException,
} from "../exceptions/client.exception.js";
import OrderService from "../../order/services/order.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../../../utils/mailer.js";

const ClientService = {
  async signup(data) {
    const existingUser = await Client.findByEmail(data.email);
    if (existingUser) {
      throw new ClientAlreadyExistsException(data.email);
    }
    const user = await Client.create({
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    return {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      phone: user.phone
    };
  },

  async signin(email, password) {
    const user = await Client.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new InvalidCredentialsException();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      token: token,
    };
  },

  async forgotPassword(email) {
    const user = await Client.findByEmailOrRecoveryEmail(email);

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 899999 + 1).toString();
      const otpExpiryMinutes = Number(process.env.OTP_EXPIRY_MINUTES || 5);
      const otpExpire = new Date(Date.now() + otpExpiryMinutes * 60 * 1000);

      await Client.updateOTP(user.id, otp, otpExpire);

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

  async verifyOTP(email, otps) {
    const user = await Client.findByEmailOrRecoveryEmail(email);
    const isMatch = await bcrypt.compare(otps, user.otp);
    if (!user || !isMatch || new Date() > new Date(user.otp_expire)) {
      throw new InvalidCredentialsException("Invalid or expired OTP");
    }
    return { message: "OTP verified correctly" };
  },

  async resetPassword(email, newPassword) {
    const user = await Client.findByEmailOrRecoveryEmail(email);
    if (user !== null) {
      await Client.resetPassword(user.id, newPassword);
      return { message: "Password reset successfully" };
    }
    else {
      throw new UserNotFoundException("User not found");
    }
  },

  async getMyProfile(userId) {
    const user = await Client.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      recoveryemail: user.recovery_email,
      signupOnDate: user.signup_on_date,
    };
  },

  async updateMyProfile(userId, data) {
    const { firstname, lastname, email, phone, recoveryemail } = data;
    if (email && recoveryemail && email === recoveryemail) {
      throw new ClientAlreadyExistsException("Email and recovery email must be different");
    }
    const user = await Client.update(userId, {
      firstname: firstname ?? null,
      lastname: lastname ?? null,
      email: email ?? null,
      phone: phone ?? null,
      recoveryemail: recoveryemail ?? null,
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      recoveryemail: user.recovery_email
    };
  },

  async getOrderHistory(userId) {
    return await OrderService.getUserOrderHistory(userId);
  },

  async getOrderById(userId, orderId) {
    return await OrderService.getOrderById(orderId, userId, "Client");
  },

  async purchaseOrder(userId, data) {
    return await OrderService.purchaseOrder(userId, data);
  },
};

export default ClientService;

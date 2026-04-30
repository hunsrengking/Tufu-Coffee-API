import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
  throw new Error("GMAIL_USER or GMAIL_PASS is missing in .env");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    logger.error("Gmail SMTP failed", { error: error.message });
  } else {
    logger.info("Gmail SMTP ready");
  }
});

export const sendEmail = async (to, subject, text, html) => {
  return await transporter.sendMail({
    from: `"Tufu System" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

export default transporter;
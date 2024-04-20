import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/Context/constant";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL,
    ADMIN_PASSWORD,
  },
});

export const mailOptions = (toEmail) => ({
  from: ADMIN_EMAIL,
  to: toEmail,
});
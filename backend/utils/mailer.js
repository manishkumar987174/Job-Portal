import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (to, token, fullname) => {
  const base =
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
  const verifyUrl = `${base}/api/users/verify?token=${token}`;

  const mailOptions = {
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to,
    subject: "Verify your Job Portal account",
    html: `<p>Hi ${fullname || "user"},</p>
      <p>Thanks for creating an account. Please verify your email by clicking the link below:</p>
      <p><a href="${verifyUrl}">Verify my account</a></p>
      <p>If you didn't register, you can ignore this message.</p>`,
  };

  return transporter.sendMail(mailOptions);
};

export const sendOtpEmail = async (to, otp, fullname) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to,
    subject: "Verify your Job-Portal account with OTP",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; color: #333333;">
      <h2 style="color: #7c3aed; text-align: center; font-weight: bold; margin-bottom: 24px;">Job-Portal Email Verification</h2>
      <p>Hi <strong>${fullname || "user"}</strong>,</p>
      <p>Thank you for registering on <strong>Job-Portal</strong>. To complete your signup and verify your email, please use the following 6-digit One-Time Password (OTP):</p>
      <div style="background-color: #f3f4f6; border: 1px dashed #7c3aed; border-radius: 8px; font-size: 28px; font-weight: 800; text-align: center; padding: 15px; margin: 24px 0; color: #7c3aed; letter-spacing: 5px;">
        ${otp}
      </div>
      <p style="font-size: 13px; color: #666666;">This OTP is valid for <strong>10 minutes</strong>. Please do not share this code with anyone for security reasons.</p>
      <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 24px 0;" />
      <p style="font-size: 11px; color: #999999; text-align: center;">© ${new Date().getFullYear()} Job-Portal. All rights reserved.</p>
    </div>`,
  };

  return transporter.sendMail(mailOptions);
};

export default transporter;

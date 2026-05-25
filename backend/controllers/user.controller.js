import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import {
  getResumeDeliveryUrl,
  uploadResumeToCloudinary,
} from "../utils/resumeUrl.js";
import crypto from "crypto";
import { sendVerificationEmail, sendOtpEmail } from "../utils/mailer.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const profile = {};

    // Generate 6-digit numeric OTP and expiry (10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const created = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile,
      otp,
      otpExpiry,
      isVerified: false,
    });

    // send verification OTP email
    try {
      await sendOtpEmail(email, otp, fullname);
    } catch (mailErr) {
      console.error("Failed to send OTP email:", mailErr);
    }

    return res.status(201).json({
      message: "Account created successfully. An OTP has been sent to your email to verify your account.",
      success: true,
      email: email, // Send back email to facilitate front-end OTP screen
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Registration failed. Internal server error.",
      success: false,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is required", success: false });
    }
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token", success: false });
    }
    user.isVerified = true;
    user.verificationToken = "";
    await user.save();
    return res
      .status(200)
      .json({ message: "Email verified successfully.", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found with this email.",
        success: false,
      });
    }
    if (user.isVerified) {
      return res.status(200).json({
        message: "Email is already verified. You can log in.",
        success: true,
      });
    }
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
        success: false,
      });
    }
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
        success: false,
      });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully! You can now log in.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error during verification.",
      success: false,
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found with this email.",
        success: false,
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified.",
        success: false,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOtpEmail(email, otp, user.fullname);

    return res.status(200).json({
      message: "A new OTP has been sent to your email.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error during resending OTP.",
      success: false,
    });
  }
};

export const serveResume = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res
        .status(400)
        .json({ message: "url is required", success: false });
    }
    const deliveryUrl = getResumeDeliveryUrl(url);
    const fetchRes = await fetch(deliveryUrl);
    if (!fetchRes.ok) {
      return res
        .status(502)
        .json({ message: "Failed to fetch resume", success: false });
    }
    const contentType =
      fetchRes.headers.get("content-type") || "application/pdf";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", 'inline; filename="resume.pdf"');
    // `fetchRes.body` can be a Node stream or a WHATWG ReadableStream depending on Node version.
    // Prefer piping a Node stream when available; otherwise convert the body to a buffer.
    if (fetchRes.body && typeof fetchRes.body.pipe === "function") {
      fetchRes.body.pipe(res);
    } else {
      const arrayBuffer = await fetchRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      res.end(buffer);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "ing is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({
          message: "Please verify your email before logging in.",
          success: false,
        });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const profile = {
      ...(user.profile.toObject?.() ?? user.profile),
    };
    if (profile.resume) {
      profile.resume = getResumeDeliveryUrl(profile.resume);
    }

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await uploadResumeToCloudinary(cloudinary, fileUri);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const profile = {
      ...(user.profile.toObject?.() ?? user.profile),
      resume: getResumeDeliveryUrl(user.profile.resume),
    };

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

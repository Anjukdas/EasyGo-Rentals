import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import brevo from "../config/mail.js";

import { verifyEmail as verifyEmailTemplate } from "../templates/verifyEmail.js";
import { resetPasswordEmail } from "../templates/resetPassword.js";


// ================= REGISTER =================

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken =
      crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpire:
        Date.now() + 24 * 60 * 60 * 1000,
    });

    const verificationUrl =
      `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    const result =
      await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: "EasyGo Rentals",
          email: "anjukdas7777@gmail.com",
        },

        to: [
          {
            email: newUser.email,
            name: newUser.name,
          },
        ],

        subject: "Verify your EasyGo Rentals account",

        htmlContent: verifyEmailTemplate(
          newUser.name,
          verificationUrl
        ),
      });

    console.log(
      "Verification email sent:",
      result.messageId
    );

    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= VERIFY EMAIL =================

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
      name: user.name,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= LOGIN =================

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email before login",
      });
    }

    const isMatch =
      await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= FORGOT PASSWORD =================

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const resetToken =
      crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const result =
      await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: "EasyGo Rentals",
          email: "anjukdas7777@gmail.com",
        },

        to: [
          {
            email: user.email,
            name: user.name,
          },
        ],

        subject: "Reset your EasyGo Rentals password",

        htmlContent: resetPasswordEmail(
          user.name,
          resetUrl
        ),
      });

    console.log(
      "Reset email sent:",
      result.messageId
    );

    res.json({
      message: "Password reset email sent",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= RESET PASSWORD =================

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
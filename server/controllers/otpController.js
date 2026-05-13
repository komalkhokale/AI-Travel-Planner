import otpGenerator from "otp-generator";

import User from "../models/User.js";

import sendEmail from "../utils/sendEmail.js";

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = otp;

    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Email Verification OTP",
      `
      <h2>Your OTP Code</h2>

      <h1>${otp}</h1>

      <p>OTP valid for 5 minutes</p>
      `,
    );

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    user.isVerified = true;

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.resetOTP = otp;

    user.resetOTPExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `
      <h2>Reset Password OTP</h2>

      <h1>${otp}</h1>

      <p>OTP valid for 5 minutes</p>
      `,
    );

    res.status(200).json({
      message: "Reset OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    user.password = newPassword;

    user.resetOTP = null;
    user.resetOTPExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
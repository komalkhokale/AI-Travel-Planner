import express from "express";

import {
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
} from "../controllers/otpController.js";
const router = express.Router();

router.post("/send", sendOTP);

router.post("/verify", verifyOTP);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;

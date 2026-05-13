import express from "express";

import {
  createCoupon,
  validateCoupon,
} from "../controllers/couponController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createCoupon);

router.post("/validate", protect, validateCoupon);

export default router;

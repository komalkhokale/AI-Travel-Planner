import express from "express";

import {
  getDashboardStats,
  getTopPackages,
  getMonthlyRevenue,
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, admin, getDashboardStats);

router.get("/top-packages", protect, admin, getTopPackages);

router.get("/monthly-revenue", protect, admin, getMonthlyRevenue);

export default router;

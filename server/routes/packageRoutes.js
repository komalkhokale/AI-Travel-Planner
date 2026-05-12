import express from "express";

import {
  createPackage,
  getPackages,
  getSinglePackage,
} from "../controllers/packageController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createPackage);

router.get("/", getPackages);

router.get("/:id", getSinglePackage);

export default router;
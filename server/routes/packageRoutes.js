import express from "express";

import {
  createPackage,
  getPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
  createPackageReview,
} from "../controllers/packageController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, upload.array("images", 5), createPackage);

router.get("/", getPackages);

router.get("/:id", getSinglePackage);

router.put("/:id", protect, admin, updatePackage);

router.delete("/:id", protect, admin, deletePackage);

router.post("/:id/reviews", protect, createPackageReview);

export default router;

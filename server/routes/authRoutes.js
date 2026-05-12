import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin", protect, admin, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

export default router;
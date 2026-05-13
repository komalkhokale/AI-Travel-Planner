import express from "express";

import { getTrendingPackages } from "../controllers/trendingController.js";

const router = express.Router();

router.get("/", getTrendingPackages);

export default router;

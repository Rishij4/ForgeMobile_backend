import express from "express";

import {
  getProfileStats
}
from "../controllers/userController.js";

import authMiddleware
from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/profile-stats",
  authMiddleware,
  getProfileStats
);

export default router;
import express from "express";

import {
  getAdminStats,
  getAllUsers,
  deleteUser
} from "../controllers/adminDashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

export default router;

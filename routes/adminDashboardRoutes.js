import express from "express";

import {
  getAdminStats,
  getAllUsers,
  deleteUser
} from "../controllers/adminDashboardController.js";

const router = express.Router();

router.get("/stats", getAdminStats);

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);

export default router;
// buildRoutes.js
import express from "express";
import { saveBuild, getBuilds, updateBuild, getPublicBuild } from "../controllers/buildController.js";
import Build from "../models/Build.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/public/:id", getPublicBuild);

// Protected Routes
router.post("/", authMiddleware, saveBuild);
router.get("/", authMiddleware, getBuilds);
router.put("/:id", authMiddleware, updateBuild);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedBuild = await Build.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedBuild) return res.status(404).json({ success: false, message: "Build not found" });
    
    res.json({ success: true, message: "Build deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
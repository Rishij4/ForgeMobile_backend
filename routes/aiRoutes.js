import express from "express";
import { analyzeBuild } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", analyzeBuild);

export default router;
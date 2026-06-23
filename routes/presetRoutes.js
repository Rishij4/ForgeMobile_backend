import express from "express";
import { getPreset } from "../controllers/presetController.js";

const router = express.Router();

router.post("/", getPreset);

export default router;
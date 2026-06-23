import express from "express";

import {
  getAllHaptics
} from "../controllers/hapticController.js";

const router =
  express.Router();

router.get(
  "/",
  getAllHaptics
);

export default router;
import express from "express";

import {
  getComponents
} from "../controllers/componentController.js";

const router =
  express.Router();

router.get(
  "/",
  getComponents
);

export default router;
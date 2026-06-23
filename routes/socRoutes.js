import express from "express";
import SoC from "../models/SoC.js";
import {
  getAllSoCs
} from "../controllers/socController.js";

import {
  scrapeNanoReviewSoC
} from "../scrapers/nanoReviewScraper.js";

const router = express.Router();

// Get all processors
router.get("/", getAllSoCs);

// Run scraper manually
router.get("/scrape", async (req, res) => {
  try {
    const result =
      await scrapeNanoReviewSoC();

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Optional: direct DB fetch
router.get("/all", async (req, res) => {
  try {
    const socs = await SoC.find();

    res.json(socs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;
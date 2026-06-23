// adminRoutes.js
import express from "express";

import {
  scrapeSocData
}
from "../controllers/adminController.js";
import { scrapeGSMArena } from "../controllers/adminController.js";

import { scrapeNanoReview } from "../controllers/adminController.js";
const router = express.Router();

router.get(
  "/scrape/soc",
  scrapeSocData
);
router.get(
  "/scrape/gsmarena",
  scrapeGSMArena
);
router.get(
  "/scrape/nanoreview",
  scrapeNanoReview
);
export default router;
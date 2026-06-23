// adminController.js
import { scrapeSoCs } from "../scrapers/socScraper.js";
import { scrapeGSMArenaSoc } from "../scrapers/gsmArenaSocScraper.js";
import { scrapeNanoReviewSoC } from "../scrapers/nanoReviewScraper.js";

export const scrapeSocData = async (req, res) => {
  await scrapeSoCs();
  res.json({ success: true, message: "SoCs scraped" });
};

export const scrapeGSMArena = async (req, res) => {
  try {
    const data = await scrapeGSMArenaSoc();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const scrapeNanoReview = async (req, res) => {
  try {
    const data = await scrapeNanoReviewSoC();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
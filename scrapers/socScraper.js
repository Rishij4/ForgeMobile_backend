// server/scrapers/socScraper.js

import axios from "axios";
import * as cheerio from "cheerio";
import SoC from "../models/SoC.js";

export const scrapeSoCs = async () => {
  try {
    const response = await axios.get(
  "https://en.wikipedia.org/wiki/List_of_Qualcomm_Snapdragon_systems_on_chips",
  {
    headers: {
      "User-Agent": "ForgeMobileBot/1.0",
      "Accept-Language": "en-US,en;q=0.9"
    }
  }
);

    const $ = cheerio.load(response.data);

    const processors = [];

$("table.wikitable tbody tr").each((i, row) => {
  const columns = $(row).find("td");

  if (columns.length === 0) return;

  const chipName = $(columns[0])
    .text()
    .replace(/\[\d+\]/g, "")
    .replace(/\n/g, " ")
    .trim();

  if (
    chipName.match(
      /Snapdragon\s(8|7|6|4)\s?(Gen\s?\d+|\+\s?Gen\s?\d+)?/i
    )
  ) {
    processors.push({
      name: chipName,

      supportedRAM: ["LPDDR5X"],
      supportedStorage: ["UFS 4.0"],

      maxDisplayHz: 120,
      maxCameraMP: 200,

      thermalLevel: "medium",

      gamingScore: 80,
      performanceScore: 80,

      price: 0
    });
  }
});

    const uniqueProcessors = [
      ...new Map(
        processors.map((item) => [item.name, item])
      ).values()
    ];

    await SoC.deleteMany({});

    await SoC.insertMany(uniqueProcessors);

    console.log(
      `${uniqueProcessors.length} SoCs inserted`
    );

    return uniqueProcessors;
  } catch (error) {
    console.error("SoC Scraper Error:", error);
  }
};
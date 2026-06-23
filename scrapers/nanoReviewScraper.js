import axios from "axios";
import * as cheerio from "cheerio";
import SoC from "../models/SoC.js";

export const scrapeNanoReviewSoC = async () => {
  try {
    // Step 1: Scrape all processor list links
    const listResponse = await axios.get("https://nanoreview.net/en/soc-list/rating", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });

    const $$ = cheerio.load(listResponse.data);
    const chips = [];

    $$("a[href^='/en/soc/']").each((_, el) => {
      const href = $$(el).attr("href");
      if (!href) return;
      const slug = href.replace("/en/soc/", "");
      if (slug && !chips.includes(slug) && !slug.includes("vs")) chips.push(slug);
    });

    console.log(`Found ${chips.length} processors`);
    const savedProcessors = [];

    // Step 2: Sequential execution across distinct processor metadata targets
    for (const chip of chips) {
      try {
        const response = await axios.get(`https://nanoreview.net/en/soc/${chip}`, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
        });

        const $ = cheerio.load(response.data);
        const title = $("h1").first().text().trim();
        if (!title) continue;

        const allText = $("body").text();
        const processNodeMatch = allText.match(/(\d+)\s*nanometers/i);
        const processNode = processNodeMatch ? `${processNodeMatch[1]}nm` : "";
        
        const ramMatch = allText.match(/LPDDR\dX?/i);
        const storageMatches = [...allText.matchAll(/UFS\s*\d\.\d/gi)].map(m => m[0]);
        const cameraMatch = allText.match(/(\d+)\s*MP/i);
        const antutuMatch = allText.match(/Total score\s*(\d+)/i);
        const singleCoreMatch = allText.match(/Single-Core Score\s*(\d+)/i);
        const multiCoreMatch = allText.match(/Multi-Core Score\s*(\d+)/i);
        const gpuScoreMatch = allText.match(/Compute Score \(GPU\)\s*(\d+)/i);

        let manufacturer = "Unknown";
        if (title.toLowerCase().includes("snapdragon")) manufacturer = "Qualcomm";
        else if (title.toLowerCase().includes("dimensity")) manufacturer = "MediaTek";
        else if (title.toLowerCase().includes("apple")) manufacturer = "Apple";
        else if (title.toLowerCase().includes("exynos")) manufacturer = "Samsung";

        const antutuVal = antutuMatch ? Number(antutuMatch[1]) : 0;

        const processor = {
          name: title,
          manufacturer,
          processNode,
          supportedRAM: ramMatch ? [ramMatch[0]] : [],
          supportedStorage: [...new Set(storageMatches)],
          maxDisplayHz: 144,
          maxCameraMP: cameraMatch ? Number(cameraMatch[1]) : 0,
          thermalLevel: "high",
          gamingScore: antutuMatch ? Math.min(100, Math.round(antutuVal / 25000)) : 80,
          performanceScore: antutuMatch ? Math.min(100, Math.round(antutuVal / 24000)) : 80,
          thermalScore: 85,
          antutuScore: antutuVal,
          geekbenchSingle: singleCoreMatch ? Number(singleCoreMatch[1]) : 0,
          geekbenchMulti: multiCoreMatch ? Number(multiCoreMatch[1]) : 0,
          gpuScore: gpuScoreMatch ? Number(gpuScoreMatch[1]) : 0
        };

        await SoC.findOneAndUpdate({ name: processor.name }, processor, { upsert: true, new: true });
        console.log("Saved:", processor.name);
        savedProcessors.push(processor);
      } catch (err) {
        console.log(`Failed to scrape ${chip}`);
      }
    }

    return { success: true, count: savedProcessors.length, processors: savedProcessors };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
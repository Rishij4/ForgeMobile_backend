import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeGSMArenaSoc = async () => {
  try {
    const url =
      "https://www.gsmarena.com/qualcomm_snapdragon_8_gen_3-news-60371.php";

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const $ = cheerio.load(response.data);

    const title = $("h1").first().text().trim();

    console.log("TITLE:", title);

    return {
      success: true,
      title
    };
  } catch (error) {
    console.error(error);
  }
};
import { generateAnalysis } from "../services/geminiService.js";

export const analyzeBuild = async (req, res) => {
  try {
    console.log(
  JSON.stringify(req.body, null, 2)
);
    const response = await generateAnalysis(req.body);

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);
    console.log("PARSED DATA:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
  message:
    "AI service is temporarily busy. Please try again in a few seconds."
});
  }
};
import { GoogleGenerativeAI } from "@google/generative-ai";

const generateAnalysis = async (buildData) => {
  console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const currentDate = new Date().toLocaleDateString("en-GB");

  const prompt = `You are a smartphone hardware expert.
Today's date is ${currentDate}. Use smartphone hardware market pricing trends in India as of today's date.
Estimate component pricing based on the current market situation on ${currentDate}, not historical pricing.
Analyze the complete smartphone build and provide a detailed, objective evaluation.

Smartphone Specifications:
Processor: ${buildData?.processor || "Unknown"}
RAM: ${buildData?.ram || "Unknown"}
Storage: ${buildData?.storage || "Unknown"}
Display: ${buildData?.display || "Unknown"}
Battery: ${buildData?.battery || "Unknown"}
Camera Count: ${buildData?.cameraCount || "Unknown"}
Camera Configuration: ${buildData?.camera || "Unknown"}
Connectivity: ${buildData?.connectivity || "Unknown"}
Audio: ${buildData?.audio || "Unknown"}
Thermal System: ${buildData?.thermal || "Unknown"}
Device Build Material: ${buildData?.phoneBuild || "Unknown"}
Haptics: ${buildData?.haptics || "Unknown"}
Sensors: ${buildData?.sensors?.length ? buildData.sensors.map(s => s.name || s).join(", ") : "None"}
Additional Components: ${buildData?.components?.length ? buildData.components.map(c => c.name || c).join(", ") : "None"}

Evaluation Guidelines:
- Analyze processor performance, efficiency, gaming capability, and future readiness.
- Evaluate RAM and storage performance for multitasking and responsiveness.
- Evaluate display technology, refresh rate potential, and user experience.
- Evaluate battery capacity and expected endurance.
- Evaluate camera quality and versatility only when camera information is available.
- Consider camera count and camera roles such as Primary, Ultra-Wide, Telephoto, Macro, Periscope, etc.
- Do not say the camera system is unknown if camera specifications are provided.
- Evaluate connectivity technologies and future-proofing.
- Evaluate audio quality based on provided features.
- Evaluate thermal management efficiency and expected heat dissipation.
- Evaluate build material durability, structural strength, and premium quality.
- Consider thermal throttling risk for high performance processors.
- Consider body material impact on durability and long-term reliability.
- Evaluate haptic feedback quality when haptic information is available.
- Consider sensors and additional components as premium features.
- Mention both advantages and realistic limitations.
- Only suggest upgrades that genuinely improve the build.
- Do not invent specifications that were not provided.
- Focus on real-world user experience, photography, gaming, productivity, battery life, and long-term usability.

Additionally provide: compatible (true or false), overallScore (0-100), performanceScore (0-100), thermalScore (0-100), batteryEfficiency (0-100), issues (array of detected concerns), marketPrice (integer, estimated current market price in INR)

marketPrice rules:
Use component market pricing conditions valid as of ${currentDate}. Assume the user is calculating smartphone hardware cost on ${currentDate}.
Estimate the approximate CURRENT market cost in India by calculating the individual price of EACH selected component separately.
You MUST estimate component prices individually and then calculate the total combined hardware cost.
Example reasoning process:
- Processor → estimate current chipset cost
- RAM → estimate memory module cost
- Storage → estimate storage module cost
- Display → estimate display panel cost
- Battery → estimate battery pack cost
- Camera modules → estimate total camera hardware cost
- Connectivity hardware → estimate modem, WiFi and Bluetooth hardware cost
- Audio hardware → estimate speaker and audio hardware cost
- Thermal cooling system → estimate cooling hardware cost
- Build material → estimate chassis/frame/body hardware cost
- Haptics → estimate vibration motor cost
- Sensors → estimate combined sensor cost
- Additional components → estimate combined additional hardware cost
After estimating each component individually, add all component prices together and return final marketPrice.

Rules:
- Do NOT estimate the final smartphone selling price. Do NOT use brand pricing assumptions.
- Do NOT include taxes, packaging, marketing, retailer margin or company profit.
- marketPrice must represent only hardware component cost.
- marketPrice should generally be similar to or higher than a manually calculated component database cost for flagship builds. Avoid unrealistic low values.
- If the build contains flagship-level components, marketPrice should reflect premium hardware cost.
- High-end flagship builds should not produce unusually low marketPrice values.
- Double-check the final marketPrice for pricing consistency before returning the result.
- Return marketPrice only as integer in INR.

Scoring rules:
- Performance Score should reflect processor performance, RAM speed/capacity, storage speed, and overall responsiveness.
- Thermal Score should reflect chipset efficiency, cooling system quality, battery size, display demands, and expected thermal management.
- Build quality should influence overall durability and premium device quality.
- Battery Efficiency should reflect battery capacity, display efficiency, processor efficiency, and charging capability.
- Overall Score should represent the complete smartphone build as a whole.
- Compatible should be false only if there are major design conflicts or severe limitations.
- Issues should contain meaningful weaknesses detected in the build.
- All scores must be integers between 0 and 100.

Return ONLY raw JSON object. The response must start with { and end with }. Do not include explanation text before or after JSON.
Do NOT use markdown. Do NOT use code blocks. Do NOT use bullet points. Do NOT add any text outside the JSON.

Expected format:
{
  "compatible": true,
  "overallScore": 0,
  "performanceScore": 0,
  "thermalScore": 0,
  "buildQuality": 0,
  "batteryEfficiency": 0,
  "issues": [],
  "strengths": [],
  "weaknesses": [],
  "upgrades": [],
  "summary": "",
  "marketPrice": 0
}`;

  try {
    let result;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (error) {
        if (error?.status === 503 && attempt < 3) {
          console.log(`Retrying Gemini... Attempt ${attempt}`);
          await new Promise(res => setTimeout(res, 2000));
          continue;
        }
        throw error;
      }
    }
    const text = result.response.text();
    console.log("GEMINI TEXT:\n", text);
    return text;
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    throw error;
  }
};

export { generateAnalysis };
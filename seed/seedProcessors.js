import mongoose from "mongoose";
import dotenv from "dotenv";
import SoC from "../models/SoC.js";

dotenv.config();

const seedProcessors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await SoC.deleteMany();

    await SoC.insertMany([
      {
        name: "Snapdragon 8 Gen 3",
        supportedRAM: ["LPDDR5X"],
        supportedStorage: ["UFS 4.0", "UFS 3.1"],
        maxDisplayHz: 144,
        maxCameraMP: 200,
        thermalLevel: "High",
        powerConsumption: "Medium",
        gamingScore: 98,
        performanceScore: 95,
        thermalScore: 90,
        price: 25000
      },

      {
        name: "Dimensity 9300",
        supportedRAM: ["LPDDR5T", "LPDDR5X"],
        supportedStorage: ["UFS 4.0"],
        maxDisplayHz: 180,
        maxCameraMP: 200,
        thermalLevel: "High",
        powerConsumption: "Medium",
        gamingScore: 96,
        performanceScore: 92,
        thermalScore: 88,
        price: 22000
      }
    ]);

    console.log("Processors Seeded");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProcessors();
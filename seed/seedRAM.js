import mongoose from "mongoose";
import dotenv from "dotenv";
import RAM from "../models/RAM.js";

dotenv.config();

const seedRAM = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    await RAM.deleteMany();

    await RAM.insertMany([
      {
        type: "LPDDR5X",
        size: 12,
        performanceScore: 90,
        price: 4500
      },

      {
        type: "LPDDR5T",
        size: 16,
        performanceScore: 95,
        price: 6500
      }
    ]);

    console.log("RAM Seeded");
    process.exit();

  } catch (error) {

    console.log(error);
    process.exit(1);

  }
};

seedRAM();
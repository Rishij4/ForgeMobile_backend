import mongoose from "mongoose";
import dotenv from "dotenv";
import Display from "../models/Display.js";

dotenv.config();

const seedDisplays = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    await Display.deleteMany();

    await Display.insertMany([
      {
        name: "AMOLED 144Hz",
        size: 6.8,
        refreshRate: 144,
        resolution: "2K",
        panelType: "AMOLED",
        brightness: 3000,
        displayScore: 95,
        batteryImpact: -15,
        price: 9000
      },

      {
        name: "OLED 120Hz",
        size: 6.7,
        refreshRate: 120,
        resolution: "FHD+",
        panelType: "OLED",
        brightness: 2200,
        displayScore: 90,
        batteryImpact: -10,
        price: 7500
      },

      {
        name: "IPS LCD 90Hz",
        size: 6.5,
        refreshRate: 90,
        resolution: "FHD",
        panelType: "IPS LCD",
        brightness: 1200,
        displayScore: 75,
        batteryImpact: -5,
        price: 4500
      }
    ]);

    console.log("Displays Seeded");
    process.exit();

  } catch (error) {

    console.log(error);
    process.exit(1);

  }
};

seedDisplays();
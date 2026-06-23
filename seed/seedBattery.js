import mongoose from "mongoose";
import dotenv from "dotenv";
import Battery from "../models/Battery.js";

dotenv.config();

const seedBattery = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    await Battery.deleteMany();

    await Battery.insertMany([
      {
        capacity: 5000,
        chargingSpeed: 120,
        type: "Li-Po",
        batteryScore: 85,
        price: 3000
      },

      {
        capacity: 6000,
        chargingSpeed: 80,
        type: "Li-Ion",
        batteryScore: 95,
        price: 4500
      }
    ]);

    console.log("Battery Seeded");
    process.exit();

  } catch (error) {

    console.log(error);
    process.exit(1);

  }
};

seedBattery();
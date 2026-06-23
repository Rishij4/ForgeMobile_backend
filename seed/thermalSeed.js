import mongoose from "mongoose";
import dotenv from "dotenv";
import Thermal from "../models/Thermal.js";

dotenv.config();

const thermalData = [
  {
    name: "Graphite Cooling Layer",
    coolingScore: 70,
    price: 300
  },
  {
    name: "Copper Heat Pipe",
    coolingScore: 82,
    price: 500
  },
  {
    name: "Vapor Chamber Cooling",
    coolingScore: 92,
    price: 800
  },
  {
    name: "Liquid Cooling System",
    coolingScore: 97,
    price: 1200
  }
];

const seedThermal = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Thermal.deleteMany();
    await Thermal.insertMany(thermalData);

    console.log("Thermal data inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedThermal();
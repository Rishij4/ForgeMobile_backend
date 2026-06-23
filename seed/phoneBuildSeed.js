import mongoose from "mongoose";
import dotenv from "dotenv";
import PhoneBuild from "../models/PhoneBuild.js";

dotenv.config();

const buildData = [
  {
    material: "Plastic Frame",
    durabilityScore: 60,
    premiumScore: 40,
    price: 400
  },
  {
    material: "Glass Back",
    durabilityScore: 72,
    premiumScore: 68,
    price: 700
  },
  {
    material: "Aluminum Frame",
    durabilityScore: 82,
    premiumScore: 78,
    price: 950
  },
  {
    material: "Titanium Frame",
    durabilityScore: 96,
    premiumScore: 95,
    price: 1800
  }
];

const seedPhoneBuild = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await PhoneBuild.deleteMany();
    await PhoneBuild.insertMany(buildData);

    console.log("PhoneBuild data inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedPhoneBuild();
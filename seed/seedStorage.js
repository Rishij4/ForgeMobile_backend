import mongoose from "mongoose";
import dotenv from "dotenv";

import Storage from "../models/Storage.js";

dotenv.config();

const seedStorage = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    await Storage.deleteMany();

    await Storage.insertMany([
  {
    type: "UFS 4.0",
    capacity: 256,
    speedScore: 95,
    price: 6500
  },
  {
    type: "UFS 3.1",
    capacity: 128,
    speedScore: 80,
    price: 3500
  }
]);

    console.log("Storage Seeded");

    process.exit();

  } catch (error) {

    console.log(error);

  }
};

seedStorage();
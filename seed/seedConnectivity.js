import mongoose from "mongoose";
import dotenv from "dotenv";
import Connectivity from "../models/Connectivity.js";

dotenv.config();

const seedConnectivity = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    await Connectivity.deleteMany();

    await Connectivity.insertMany([
      {
        network: "5G",
        wifi: "WiFi 7",
        bluetooth: "5.4",
        nfc: true,
        connectivityScore: 95,
        price: 2500
      },

      {
        network: "5G",
        wifi: "WiFi 6",
        bluetooth: "5.3",
        nfc: true,
        connectivityScore: 85,
        price: 1800
      }
    ]);

    console.log("Connectivity Seeded");
    process.exit();

  } catch (error) {

    console.log(error);
    process.exit(1);

  }
};

seedConnectivity();
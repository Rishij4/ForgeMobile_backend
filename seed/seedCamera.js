import mongoose from "mongoose";
import dotenv from "dotenv";
import Camera from "../models/Camera.js";

dotenv.config();

const seedCameras = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    await Camera.deleteMany();

    await Camera.insertMany([
      {
        megapixels: 50,
        type: "Sony IMX890",
        stabilization: "OIS",
        cameraScore: 85,
        price: 6000
      },

      {
        megapixels: 108,
        type: "Samsung HM6",
        stabilization: "EIS",
        cameraScore: 92,
        price: 9000
      }
    ]);

    console.log("Cameras Seeded");
    process.exit();

  } catch (error) {

    console.log(error);
    process.exit(1);

  }
};

seedCameras();
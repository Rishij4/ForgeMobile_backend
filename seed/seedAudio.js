import mongoose from "mongoose";
import dotenv from "dotenv";
import Audio from "../models/Audio.js";

dotenv.config();

const seedAudio = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    await Audio.deleteMany();

    await Audio.insertMany([
      {
        speakers: "Dual Stereo",
        dolbyAtmos: true,
        hiResAudio: true,
        spatialAudio: true,
        audioScore: 95,
        price: 2500
      },

      {
        speakers: "Mono Speaker",
        dolbyAtmos: false,
        hiResAudio: false,
        spatialAudio: false,
        audioScore: 65,
        price: 1000
      }
    ]);

    console.log("Audio Seeded");
    process.exit();

  } catch (error) {

    console.log(error);
    process.exit(1);

  }
};

seedAudio();
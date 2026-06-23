import mongoose from "mongoose";

const audioSchema =
new mongoose.Schema({

  speakers: String,

  dolbyAtmos: String,

  hiResAudio: String,

  audioScore: {
    type: Number,
    default: 80
  },

  price: {
    type: Number,
    default: 0
  }

});

export default mongoose.model(
  "Audio",
  audioSchema
);
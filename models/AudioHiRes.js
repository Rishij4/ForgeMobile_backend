import mongoose from "mongoose";

const audioHiResSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

export default mongoose.model(
  "AudioHiRes",
  audioHiResSchema,
  "AudioHiRes"
);
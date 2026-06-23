import mongoose from "mongoose";

const audioSpeakerSchema = new mongoose.Schema({
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
  "AudioSpeaker",
  audioSpeakerSchema,
  "AudioSpeaker"
);
import mongoose from "mongoose";

const socSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  manufacturer: String,

  processNode: String,

  supportedRAM: [String],

  supportedStorage: [String],

  maxDisplayHz: Number,

  maxCameraMP: Number,

  thermalLevel: String,

  powerConsumption: String,

  gamingScore: Number,

  performanceScore: Number,

  thermalScore: Number,

  aiScore: Number,
  antutuScore: Number,
geekbenchSingle: Number,
geekbenchMulti: Number,
gpuScore: Number,

  price: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("SoC", socSchema);
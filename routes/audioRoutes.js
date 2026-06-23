import express from "express";

import AudioSpeaker from "../models/AudioSpeaker.js";
import AudioDolby from "../models/AudioDolby.js";
import AudioHiRes from "../models/AudioHiRes.js";

const router = express.Router();


// GET all speaker options
router.get("/speakers", async (req, res) => {
  try {
    const speakers = await AudioSpeaker.find();
    res.json(speakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET all dolby options
router.get("/dolby", async (req, res) => {
  try {
    const dolby = await AudioDolby.find();
    res.json(dolby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET all hi-res options
router.get("/hires", async (req, res) => {
  try {
    const hires = await AudioHiRes.find();
    res.json(hires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
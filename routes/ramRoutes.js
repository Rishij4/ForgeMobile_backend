import express from "express";
import RAM from "../models/RAM.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const rams = await RAM.find();

    res.json(rams);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

export default router;
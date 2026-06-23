import express from "express";
import Battery from "../models/Battery.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const batteries = await Battery.find();

    res.json(batteries);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch batteries"
    });

  }

});

export default router;
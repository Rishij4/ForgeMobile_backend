import express from "express";
import Storage from "../models/Storage.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const storage = await Storage.find();

    res.json(storage);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

export default router;
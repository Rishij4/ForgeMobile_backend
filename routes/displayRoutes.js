import express from "express";

import Display
from "../models/Display.js";

const router =
express.Router();

router.get(
  "/",
  async (req, res) => {

    try {

      const displays =
      await Display.find();

      res.json(displays);

    } catch(error){

      res.status(500).json({
        message:
          error.message
      });

    }

  }
);

export default router;
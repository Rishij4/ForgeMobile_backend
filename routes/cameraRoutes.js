import express from "express";

import Camera from "../models/Camera.js";

const router = express.Router();

router.get("/", async (req, res) => {

  const cameras = await Camera.find();

  res.json(cameras);

});

export default router;
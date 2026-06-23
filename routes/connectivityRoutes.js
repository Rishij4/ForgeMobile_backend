import express from "express";

import Network from "../models/Network.js";
import Wifi from "../models/Wifi.js";
import Bluetooth from "../models/Bluetooth.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const networks = await Network.find();

    const wifis = await Wifi.find();

    const bluetooths =
      await Bluetooth.find();

    res.json({

      networks,

      wifis,

      bluetooths

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

export default router;
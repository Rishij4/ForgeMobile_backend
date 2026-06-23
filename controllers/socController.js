import SoC from "../models/SoC.js";

export const getAllSoCs = async (req, res) => {
  try {

    const socs = await SoC.find();

    res.json(socs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
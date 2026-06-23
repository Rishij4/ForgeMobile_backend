import Haptic from "../models/Haptic.js";

export const getAllHaptics =
  async (req, res) => {

    try {

      const haptics =
        await Haptic.find();

      res.json(haptics);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };
import Sensor from "../models/Sensor.js";

export const getSensors = async (
  req,
  res
) => {
  try {
    const sensors =
      await Sensor.find();

    res.json(sensors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
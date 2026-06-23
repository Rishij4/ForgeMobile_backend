import Component from "../models/Component.js";

export const getComponents =
  async (req, res) => {
    try {
      const components =
        await Component.find();

      res.json(components);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
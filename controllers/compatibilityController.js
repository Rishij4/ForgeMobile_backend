import SoC from "../models/SoC.js";
import RAM from "../models/RAM.js";
import Storage from "../models/Storage.js";
import Battery from "../models/Battery.js";
import Thermal from "../models/Thermal.js";
import PhoneBuild from "../models/PhoneBuild.js";
import { checkCompatibility } from "../services/compatibilityEngine.js";

// GET PROCESSORS
export const getProcessors = async (req, res) => {
  try { res.json(await SoC.find()); } 
  catch (error) { res.status(500).json({ message: "Failed to fetch processors" }); }
};

// GET RAMS
export const getRAMs = async (req, res) => {
  try { res.json(await RAM.find()); } 
  catch (error) { res.status(500).json({ message: "Failed to fetch RAMs" }); }
};

// GET STORAGES
export const getStorages = async (req, res) => {
  try { res.json(await Storage.find()); } 
  catch (error) { res.status(500).json({ message: "Failed to fetch storages" }); }
};

// GET THERMALS
export const getThermals = async (req, res) => res.json(await Thermal.find());

// GET PHONE BUILDS
export const getPhoneBuilds = async (req, res) => res.json(await PhoneBuild.find());

// RUN COMPATIBILITY TEST
export const runCompatibilityTest = async (req, res) => {
  try {
    const { processor, ram, storage, battery, thermal, phoneBuild } = req.body;

    // Concurrent database fetches for all hardware components
    const [processorData, ramData, storageData, batteryData, thermalData, phoneBuildData] = await Promise.all([
      SoC.findById(processor),
      RAM.findById(ram),
      Storage.findById(storage),
      Battery.findById(battery),
      Thermal.findById(thermal),
      PhoneBuild.findById(phoneBuild)
    ]);

    if (!processorData || !ramData || !storageData || !batteryData || !thermalData || !phoneBuildData) {
      return res.status(404).json({ message: "Components not found" });
    }

    const result = checkCompatibility(processorData, ramData, storageData, batteryData, thermalData, phoneBuildData);
    console.log("COMPATIBILITY RESULT:", result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
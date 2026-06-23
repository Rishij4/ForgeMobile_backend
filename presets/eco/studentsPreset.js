// ecoStudentsPreset.js
import SoC from "../../models/SoC.js";
import RAM from "../../models/RAM.js";
import Storage from "../../models/Storage.js";
import Battery from "../../models/Battery.js";
import Display from "../../models/Display.js";
import Camera from "../../models/Camera.js";
import Network from "../../models/Network.js";
import Wifi from "../../models/Wifi.js";
import Bluetooth from "../../models/Bluetooth.js";
import AudioSpeaker from "../../models/AudioSpeaker.js";
import AudioDolby from "../../models/AudioDolby.js";
import AudioHiRes from "../../models/AudioHiRes.js";
import Haptics from "../../models/Haptic.js";
import Thermal from "../../models/Thermal.js";
import PhoneBuild from "../../models/PhoneBuild.js";
import Sensor from "../../models/Sensor.js";
import Component from "../../models/Component.js";
import { buildCamera, buildConnectivity, buildAudio } from "../../utils/presetHelpers.js";

export const ecoStudentsPreset = async () => {
  // Select random mid-range student-friendly processor
  const processors = await SoC.find({ name: { $in: ["Qualcomm Snapdragon 7 Gen 3", "MediaTek Dimensity 7200", "Qualcomm Snapdragon 7s Gen 2", "MediaTek Dimensity 7050"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // study + multitasking capacity
    storage,      // apps + notes + media storage space
    battery,      // all-day operational battery cell
    display,      // fluid smooth 120Hz AMOLED panel
    cameraPreset, // reliable sensor for document scans + photos
    network,      // modern 5G cellular communication standard
    wifi,
    bluetooth,
    speaker,      // clean stereo outputs for video lectures
    dolby,
    hiRes,
    haptics,      // baseline vibration feedback
    thermal,      // stable heat dispersion layers
    phoneBuild    // budget-friendly durable composite chassis
  ] = await Promise.all([
    RAM.findOne({ size: 6 }),
    Storage.findOne({ capacity: 128 }),
    Battery.findOne({ capacity: 5000, chargingSpeed: 33, type: "Li-Ion" }),
    Display.findOne({ refreshRate: 120, panelType: "AMOLED" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 50 }),
    Network.findOne({ type: "5G Sub-6" }),
    Wifi.findOne({ type: "WiFi 6" }),
    Bluetooth.findOne({ type: "Bluetooth 5.2" }),
    AudioSpeaker.findOne({ name: "Dual Stereo" }),
    AudioDolby.findOne({ name: "None" }),
    AudioHiRes.findOne({ name: "Standard Audio" }),
    Haptics.findOne({ name: "ERM Vibration Motor" }),
    Thermal.findOne({ name: "Graphite Cooling Layer" }),
    PhoneBuild.findOne({ material: "Plastic Frame" })
  ]);

  // Translate direct database documents to structured context layouts
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster", "Optical Fingerprint Sensor"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
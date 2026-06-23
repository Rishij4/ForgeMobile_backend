// ecoSeniorCitizensPreset.js
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

export const ecoSeniorCitizensPreset = async () => {
  // Select random stable, reliable processor
  const processors = await SoC.find({ name: { $in: ["Qualcomm Snapdragon 6 Gen 1", "MediaTek Helio G99", "MediaTek Dimensity 6100+", "Qualcomm Snapdragon 4 Gen 2"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // simple, stable multitasking capacity
    storage,      // enough local vault headroom for years
    battery,      // long-lasting reliable battery capacity
    display,      // large, smooth readable panel setup
    cameraPreset, // straightforward high-res single sensor
    network,      // modern stable connectivity standard
    wifi,
    bluetooth,
    speaker,      // loud stereo speaker outputs for accessibility
    dolby,
    hiRes,
    haptics,      // simple basic vibration feedback
    thermal,      // structural cool temperature protection
    phoneBuild    // lightweight durable plastic framework
  ] = await Promise.all([
    RAM.findOne({ size: 4 }),
    Storage.findOne({ capacity: 128 }),
    Battery.findOne({ capacity: 5000, chargingSpeed: 18 }),
    Display.findOne({ refreshRate: 90 }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 50 }),
    Network.findOne({ type: "5G Sub-6" }),
    Wifi.findOne({ type: "WiFi 5" }),
    Bluetooth.findOne({ type: "Bluetooth 5.0" }),
    AudioSpeaker.findOne({ name: "Dual Stereo" }),
    AudioDolby.findOne({ name: "None" }),
    AudioHiRes.findOne({ name: "Standard Audio" }),
    Haptics.findOne({ name: "ERM Vibration Motor" }),
    Thermal.findOne({ name: "Graphite Cooling Layer" }),
    PhoneBuild.findOne({ material: "Plastic Frame" })
  ]);

  // Translate standalone model payloads into configuration context states
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Compass", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["Optical Fingerprint Sensor"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
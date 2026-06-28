// ecoBudgetBuyersPreset.js
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

export const ecoBudgetBuyersPreset = async () => {
  // Select random entry-level budget processor
  const processors = await SoC.find({ name: { $in: ["Qualcomm Snapdragon 4 Gen 2", "MediaTek Helio G99", "MediaTek Dimensity 6100+", "Unisoc T760"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // RAM → type + size
    storage,      // Storage → type + capacity
    battery,      // Battery → capacity + chargingSpeed + type
    display,      // Display → panelType + refreshRate + resolution + size
    cameraPreset, // Camera → cameraType + mp + ois
    network,      // Connectivity sub-documents
    wifi,
    bluetooth,
    speaker,      // Audio sub-documents
    dolby,
    hiRes,
    haptics,      // Mechanical haptics standard
    thermal,      // Heat protection dissipation layer
    phoneBuild    // Body structural frame chassis
  ] = await Promise.all([
    RAM.findOne({ type: "LPDDR2", size: 4 }),
    Storage.findOne({ type: "UFS 2.1", capacity: 64 }),
    Battery.findOne({ capacity: 5000, chargingSpeed: 18, type: "Li-Po" }),
    Display.findOne({ panelType: "IPS LCD", refreshRate: 90, resolution: "HD+", size: 6.6 }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 50, ois: "No" }),
    Network.findOne({ type: "4G LTE" }),
    Wifi.findOne({ type: "WiFi 5" }),
    Bluetooth.findOne({ type: "Bluetooth 5.0" }),
    AudioSpeaker.findOne({ name: "Mono Speaker" }),
    AudioDolby.findOne({ name: "None" }),
    AudioHiRes.findOne({ name: "Standard Audio" }),
    Haptics.findOne({ name: "ERM Vibration Motor" }),
    Thermal.findOne({ name: "Graphite Cooling Layer" }),
    PhoneBuild.findOne({ material: "Plastic Frame" })
  ]);

  // Aggregate composite layouts using factory conversion utilities
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["Optical Fingerprint Sensor"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};

// standardOfficeProfessionalsPreset.js
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

export const standardOfficeProfessionalsPreset = async () => {
  // Processor pool → efficiency + stability
  const processors = await SoC.find({ name: { $in: ["Samsung Exynos 1480", "Google Tensor G4", "Qualcomm Snapdragon 7 Gen 4", "MediaTek Dimensity 8400"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // smooth 8GB multitasking performance
    storage,      // docs/files/presentations (256GB)
    battery,      // long workday battery lifespan
    display,      // crisp professional 120Hz AMOLED panel
    cameraPreset, // reliable for scanning/docs/video calls
    network,      // secure modern enterprise cellular
    wifi,
    bluetooth,
    speaker,      // clear voice communication for meetings
    dolby,
    hiRes,
    haptics,      // premium business-tier tactile feel
    thermal,      // vapor chamber heat safety layer
    phoneBuild    // professional aluminum casing
  ] = await Promise.all([
    RAM.findOne({ size: 8 }),
    Storage.findOne({ capacity: 256 }),
    Battery.findOne({ capacity: 5500, chargingSpeed: 45 }),
    Display.findOne({ refreshRate: 120, panelType: "AMOLED" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 50 }),
    Network.findOne({ type: "5G Sub-6" }),
    Wifi.findOne({ type: "WiFi 6" }),
    Bluetooth.findOne({ type: "Bluetooth 5.3" }),
    AudioSpeaker.findOne({ name: "Dual Stereo" }),
    AudioDolby.findOne({ name: "Dolby Atmos" }),
    AudioHiRes.findOne({ name: "Standard Audio" }),
    Haptics.findOne({ name: "Z-Axis Linear Actuator" }),
    Thermal.findOne({ name: "Vapor Chamber Cooling" }),
    PhoneBuild.findOne({ material: "Aluminum Frame" })
  ]);

  // Consolidate properties through layout formatting dependencies
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass"] } }),
    Component.find({ name: { $in: ["NFC"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
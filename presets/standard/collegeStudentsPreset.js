// standardCollegeStudentsPreset.js
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

export const standardCollegeStudentsPreset = async () => {
  // Select random heavy-multitasking performance processor
  const processors = await SoC.find({ name: { $in: ["MediaTek Dimensity 8300", "Qualcomm Snapdragon 7 Plus Gen 3", "Samsung Exynos 2400e", "Google Tensor G4"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // fluid 8GB multi-app workspace
    storage,      // generous 256GB local file storage
    battery,      // high capacity 5500mAh cell
    display,      // cinematic 120Hz AMOLED panel
    cameraPreset, // ultra-crisp 64MP primary optics
    network,      // 5G communications baseline
    wifi,
    bluetooth,
    speaker,      // premium audio arrangement
    dolby,
    hiRes,
    haptics,      // modern tactile linear vibration
    thermal,      // vapor chamber heat dissipation 
    phoneBuild    // robust rigid aluminum chassis
  ] = await Promise.all([
    RAM.findOne({ size: 8 }),
    Storage.findOne({ capacity: 256 }),
    Battery.findOne({ capacity: 5500 }),
    Display.findOne({ refreshRate: 120, panelType: "AMOLED" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 64 }),
    Network.findOne({ type: "5G Sub-6" }),
    Wifi.findOne({ type: "WiFi 6" }),
    Bluetooth.findOne({ type: "Bluetooth 5.3" }),
    AudioSpeaker.findOne({ name: "Dual Stereo" }),
    AudioDolby.findOne({ name: "Dolby Atmos" }),
    AudioHiRes.findOne({ name: "Hi-Res Certified" }),
    Haptics.findOne({ name: "Z-Axis Linear Actuator" }),
    Thermal.findOne({ name: "Vapor Chamber Cooling" }),
    PhoneBuild.findOne({ material: "Aluminum Frame" })
  ]);

  // Aggregate composite components via layout helper structures
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
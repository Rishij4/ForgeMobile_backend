// titanGamersPreset.js
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

export const titanGamersPreset = async () => {
  // Select random flagship gaming processor
  const processors = await SoC.find({ name: { $in: ["Qualcomm Snapdragon 8 Elite", "MediaTek Dimensity 9500", "Apple A19 Pro", "Samsung Exynos 2600"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // RAM → type + size (LPDDR5X, 16GB)
    storage,      // Storage → type + capacity (UFS 4.0, 512GB)
    battery,      // Battery → capacity + chargingSpeed + type
    display,      // Display → panelType + refreshRate + resolution + size
    cameraPreset, // Camera → cameraType + mp + ois
    network,      // Connectivity sub-document properties
    wifi,
    bluetooth,
    speaker,      // Audio spatial characteristics profiles
    dolby,
    hiRes,
    haptics,      // Extreme-fidelity vibration actuator core
    thermal,      // Heavy-duty liquid refrigeration matrix
    phoneBuild    // Premium Titanium perimeter frame chassis
  ] = await Promise.all([
    RAM.findOne({ type: "LPDDR5X", size: 16 }),
    Storage.findOne({ type: "UFS 4.0", capacity: 512 }),
    Battery.findOne({ capacity: 7000, chargingSpeed: 100, type: "Silicon Carbon" }),
    Display.findOne({ panelType: "LTPO 3.0 AMOLED", refreshRate: 165, resolution: "QHD+", size: 6.8 }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 50, ois: "Yes" }),
    Network.findOne({ type: "5G mmWave" }),
    Wifi.findOne({ type: "WiFi 7" }),
    Bluetooth.findOne({ type: "Bluetooth 5.4" }),
    AudioSpeaker.findOne({ name: "Quad Speaker" }),
    AudioDolby.findOne({ name: "Dolby Atmos" }),
    AudioHiRes.findOne({ name: "Hi-Res Audio" }),
    Haptics.findOne({ name: "X-Axis Linear Actuator" }),
    Thermal.findOne({ name: "Liquid Cooling System" }),
    PhoneBuild.findOne({ material: "Titanium Frame" })
  ]);

  // Aggregate composite layouts using factory conversion utilities
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Gyroscope", "Compass", "Proximity Sensor", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster", "Wireless Charging", "UWB Chip"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};

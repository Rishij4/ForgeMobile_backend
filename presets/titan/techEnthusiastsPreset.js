// titanTechEnthusiastsPreset.js
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

export const titanTechEnthusiastsPreset = async () => {
  // Select random cutting-edge flagship processor
  const processors = await SoC.find({ name: { $in: ["Qualcomm Snapdragon 8 Elite", "Apple A19 Pro", "MediaTek Dimensity 9500", "Samsung Exynos 2600"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // premium future-proof capacity (16GB)
    storage,      // deep local hardware headroom (1TB)
    battery,      // massive high-capacity silicon matrix (6500mAh, 120W)
    display,      // peak refresh fluid panel (165Hz LTPO AMOLED)
    cameraPreset, // ultra high-res primary sensor engine (200MP)
    network,      // next-gen mmWave gigabit lane (5G mmWave)
    wifi,         // bleeding-edge WiFi 7
    bluetooth,    // low-latency Bluetooth 5.4 link
    speaker,      // premium spatial monitor quad acoustics
    dolby,
    hiRes,
    haptics,      // discrete tactile actuator feedback core
    thermal,      // heavy load liquid cooling system
    phoneBuild    // rigid ultra-premium structural frame (Titanium Frame)
  ] = await Promise.all([
    RAM.findOne({ size: 16 }),
    Storage.findOne({ capacity: 1024 }),
    Battery.findOne({ capacity: 6500, chargingSpeed: 120 }),
    Display.findOne({ refreshRate: 165, panelType: "LTPO AMOLED" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 200 }),
    Network.findOne({ type: "5G mmWave" }),
    Wifi.findOne({ type: "WiFi 7" }),
    Bluetooth.findOne({ type: "Bluetooth 5.4" }),
    AudioSpeaker.findOne({ name: "Quad Speaker" }),
    AudioDolby.findOne({ name: "Dolby Atmos" }),
    AudioHiRes.findOne({ name: "Hi-Res Audio" }),
    Haptics.findOne({ name: "Z-Axis Linear Actuator" }),
    Thermal.findOne({ name: "Liquid Cooling System" }),
    PhoneBuild.findOne({ material: "Titanium Frame" })
  ]);

  // Translate specific standalone fields through structural utility adapters
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Gyroscope", "Compass", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster"] } }) // extra flagship features
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
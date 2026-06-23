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
    ram,          // extreme gaming performance (16GB)
    storage,      // deep local library space (512GB)
    battery,      // massive silicon-carbon structural endurance cell (7000mAh, 100W)
    display,      // ultra fluid low-latency panel (165Hz LTPO 3.0 AMOLED)
    cameraPreset, // reliable crisp high-res single sensor
    network,      // modern ultra-fast low-ping communication lane (5G mmWave)
    wifi,         // bleeding-edge WiFi 7
    bluetooth,    // low-latency Bluetooth 5.4 accessory links
    speaker,      // premium spatial quad-speaker system
    dolby,
    hiRes,
    haptics,      // extreme-fidelity tactile feedback (X-Axis Linear Actuator)
    thermal,      // critical liquid cooling to prevent thermal throttling
    phoneBuild    // heavy duty rigid structural frame (Titanium Frame)
  ] = await Promise.all([
    RAM.findOne({ size: 16 }),
    Storage.findOne({ capacity: 512 }),
    Battery.findOne({ capacity: 7000, chargingSpeed: 100, type: "Silicon Carbon" }),
    Display.findOne({ refreshRate: 165, panelType: "LTPO 3.0 AMOLED" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 50 }),
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

  // Translate specific standalone fields through structural utility helpers
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Gyroscope", "Compass", "Proximity Sensor", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster", "Wireless Charging", "UWB Chip"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
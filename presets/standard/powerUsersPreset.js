// standardPowerUsersPreset.js
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

export const standardPowerUsersPreset = async () => {
  // Near-flagship processors pool
  const processors = await SoC.find({ name: { $in: ["Qualcomm Snapdragon 8s Gen 4", "MediaTek Dimensity 9400", "Samsung Exynos 2500", "Google Tensor G5"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // heavy multitasking (12GB)
    storage,      // deep storage for apps/media/files (512GB)
    battery,      // long heavy usage pack (6000mAh, 67W)
    display,      // flagship-like display panel (144Hz AMOLED)
    cameraPreset, // ultra high-res 108MP primary optics
    network,      // premium standalone fast connectivity (5G mmWave)
    wifi,         // bleeding-edge WiFi 7
    bluetooth,    // ultra-stable Bluetooth 5.4
    speaker,      // premium quad-speaker audio hardware
    dolby,
    hiRes,
    haptics,      // modern tactile linear vibration
    thermal,      // vapor chamber to handle sustained heavy loads
    phoneBuild    // premium business structural aluminum frame
  ] = await Promise.all([
    RAM.findOne({ size: 12 }),
    Storage.findOne({ capacity: 512 }),
    Battery.findOne({ capacity: 6000, chargingSpeed: 67 }),
    Display.findOne({ refreshRate: 144, panelType: "AMOLED" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 108 }),
    Network.findOne({ type: "5G mmWave" }),
    Wifi.findOne({ type: "WiFi 7" }),
    Bluetooth.findOne({ type: "Bluetooth 5.4" }),
    AudioSpeaker.findOne({ name: "Quad Speaker" }),
    AudioDolby.findOne({ name: "Dolby Atmos" }),
    AudioHiRes.findOne({ name: "Hi-Res Certified" }),
    Haptics.findOne({ name: "Z-Axis Linear Actuator" }),
    Thermal.findOne({ name: "Vapor Chamber Cooling" }),
    PhoneBuild.findOne({ material: "Aluminum Frame" })
  ]);

  // Consolidate properties through configuration adapters
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
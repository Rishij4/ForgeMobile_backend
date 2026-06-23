// standardMultitaskersPreset.js
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

export const standardMultitaskersPreset = async () => {
  // Strong sustained processors pool
  const processors = await SoC.find({ name: { $in: ["MediaTek Dimensity 9400", "Qualcomm Snapdragon 8s Gen 4", "Samsung Exynos 2500", "Google Tensor G5"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // multitasking priority (12GB)
    storage,      // lots of app storage (256GB)
    battery,      // heavy usage battery
    display,      // smoother UI panel (144Hz AMOLED)
    cameraPreset, // decent high-res primary module
    network,      // baseline mobile connectivity
    wifi,
    bluetooth,
    speaker,      // premium audio configurations
    dolby,
    hiRes,
    haptics,      // premium tactile response core
    thermal,      // critical for keeping sustained loads cool
    phoneBuild    // rigid structural aluminum frame
  ] = await Promise.all([
    RAM.findOne({ size: 12 }),
    Storage.findOne({ capacity: 256 }),
    Battery.findOne({ capacity: 5500, chargingSpeed: 45 }),
    Display.findOne({ refreshRate: 144, panelType: "AMOLED" }),
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

  // Translate specific standalone fields through structural mapping helpers
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
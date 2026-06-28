// standardRemoteWorkersPreset.js
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

export const standardRemoteWorkersPreset = async () => {
  // Stable + efficient processors pool
  const processors = await SoC.find({ name: { $in: ["Google Tensor G4", "Samsung Exynos 1480", "MediaTek Dimensity 8400", "Qualcomm Snapdragon 7 Gen 4"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // RAM → type + size (LPDDR5, 8GB)
    storage,      // Storage → type + capacity (UFS 3.1, 256GB)
    battery,      // Battery → capacity + chargingSpeed + type
    display,      // Display → panelType + refreshRate + resolution + size
    cameraPreset, // Camera → cameraType + mp + ois
    network,      // Connectivity sub-document configurations
    wifi,
    bluetooth,
    speaker,      // Audio spatial characteristics profiles
    dolby,
    hiRes,
    haptics,      // Z-Axis linear vibration feedback core
    thermal,      // Vapor chamber cooling block layer
    phoneBuild    // Aluminum perimeter frame chassis
  ] = await Promise.all([
    RAM.findOne({ type: "LPDDR5", size: 8 }),
    Storage.findOne({ type: "UFS 3.1", capacity: 256 }),
    Battery.findOne({ capacity: 6000, chargingSpeed: 45, type: "Li-Ion" }),
    Display.findOne({ panelType: "AMOLED", refreshRate: 120, resolution: "FHD+", size: 6.7 }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 64, ois: "Yes" }),
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

  // Aggregate complex peripheral specifications using matching helpers
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass"] } }),
    Component.find({ name: { $in: ["NFC"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};

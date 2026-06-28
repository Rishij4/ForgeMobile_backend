// titanPhotographersPreset.js
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
import { buildConnectivity, buildAudio } from "../../utils/presetHelpers.js";

export const titanPhotographersPreset = async () => {
  // Select premium flagship imaging processor
  const processors = await SoC.find({ name: { $in: ["Apple A19 Pro", "Google Tensor G5", "Qualcomm Snapdragon 8 Elite", "MediaTek Dimensity 9500"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,              // RAM → type + size (LPDDR5X, 16GB)
    storage,          // Storage → type + capacity (UFS 4.1, 1TB)
    battery,          // Battery → capacity + chargingSpeed + type
    display,          // Display → panelType + refreshRate + resolution + size
    primaryCamera,    // Quad Camera sub-modules setup
    ultraWideCamera,
    periscopeCamera,
    telephotoCamera,
    network,          // Connectivity peripheral configurations
    wifi,
    bluetooth,
    speaker,          // Audio properties layout configurations
    dolby,
    hiRes,
    haptics,          // Premium linear vibration actuator
    thermal,          // Vapor chamber cooling block layer
    phoneBuild        // Titanium structural frame chassis
  ] = await Promise.all([
    RAM.findOne({ type: "LPDDR5X", size: 16 }),
    Storage.findOne({ capacity: 1024, type: "UFS 4.1" }),
    Battery.findOne({ capacity: 7000, chargingSpeed: 100, type: "Silicon Carbon" }),
    Display.findOne({ panelType: "LTPO 3.0 AMOLED", refreshRate: 120, resolution: "QHD+", size: 6.8 }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 200, ois: "Yes" }),
    Camera.findOne({ cameraType: "Ultra-Wide Module", mp: 50, ois: "Yes" }),
    Camera.findOne({ cameraType: "Periscope Module", mp: 180, ois: "Yes" }),
    Camera.findOne({ cameraType: "Telephoto Module", mp: 50, ois: "Yes" }),
    Network.findOne({ type: "5G mmWave" }),
    Wifi.findOne({ type: "WiFi 7" }),
    Bluetooth.findOne({ type: "Bluetooth 5.4" }),
    AudioSpeaker.findOne({ name: "Quad Speaker" }),
    AudioDolby.findOne({ name: "Dolby Atmos" }),
    AudioHiRes.findOne({ name: "Hi-Res Audio" }),
    Haptics.findOne({ name: "Z-Axis Linear Actuator" }),
    Thermal.findOne({ name: "Vapor Chamber Cooling" }),
    PhoneBuild.findOne({ material: "Titanium Frame" })
  ]);

  // Map individual lens records manually into a unified multi-slot system matching CameraSelector.jsx
  const camera = {
    count: 4,
    slots: [
      { type: primaryCamera.cameraType, mp: primaryCamera.mp, ois: primaryCamera.ois },
      { type: ultraWideCamera.cameraType, mp: ultraWideCamera.mp, ois: ultraWideCamera.ois },
      { type: periscopeCamera.cameraType, mp: periscopeCamera.mp, ois: periscopeCamera.ois },
      { type: telephotoCamera.cameraType, mp: telephotoCamera.mp, ois: telephotoCamera.ois }
    ],
    price: (primaryCamera?.price || 0) + (ultraWideCamera?.price || 0) + (periscopeCamera?.price || 0) + (telephotoCamera?.price || 0),
    isValid: true
  };

  // Build composite configurations via peripheral mapping utilities
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Gyroscope", "Compass", "Ambient Light Sensor", "Proximity Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster", "Noise Cancellation Mic", "Ultrasonic Fingerprint Sensor", "Face ID (3D)", "Wireless Charging"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};

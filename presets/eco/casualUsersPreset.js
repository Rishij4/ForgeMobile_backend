// ecoCasualUsersPreset.js
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

export const ecoCasualUsersPreset = async () => {
  // Select random balanced casual-use processor
  const processors = await SoC.find({ name: { $in: ["Qualcomm Snapdragon 6 Gen 1", "MediaTek Dimensity 7050", "Qualcomm Snapdragon 7s Gen 2", "MediaTek Dimensity 7200"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram, storage, battery, display, primaryCamera, ultraWideCamera,
    network, wifi, bluetooth, speaker, dolby, hiRes, haptics, thermal, phoneBuild
  ] = await Promise.all([
    RAM.findOne({ type: "LPDDR4X", size: 6 }),
    Storage.findOne({ type: "UFS 2.2", capacity: 128 }),
    Battery.findOne({ capacity: 5000, chargingSpeed: 33, type: "Li-Po" }),
    Display.findOne({ panelType: "AMOLED", refreshRate: 90, resolution: "FHD+", size: 6.5 }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 50, ois: "No" }),
    Camera.findOne({ cameraType: "Ultra-Wide Module", mp: 8, ois: "No" }),
    Network.findOne({ type: "5G Sub-6" }),
    Wifi.findOne({ type: "WiFi 6" }),
    Bluetooth.findOne({ type: "Bluetooth 5.2" }),
    AudioSpeaker.findOne({ name: "Dual Stereo" }),
    AudioDolby.findOne({ name: "None" }),
    AudioHiRes.findOne({ name: "Standard Audio" }),
    Haptics.findOne({ name: "ERM Vibration Motor" }),
    Thermal.findOne({ name: "Graphite Cooling Layer" }),
    PhoneBuild.findOne({ material: "Plastic Frame" })
  ]);

  // Build camera object manually matching specifications
  const camera = {
    count: 2,
    slots: [
      { type: primaryCamera.cameraType, mp: primaryCamera.mp, ois: primaryCamera.ois },
      { type: ultraWideCamera.cameraType, mp: ultraWideCamera.mp, ois: ultraWideCamera.ois }
    ],
    price: (primaryCamera?.price || 0) + (ultraWideCamera?.price || 0),
    isValid: true
  };

  // Build composite configurations via utility helpers
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "Optical Fingerprint Sensor"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};

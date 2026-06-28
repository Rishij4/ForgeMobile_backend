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
  const preset = {
    processors: ["Qualcomm Snapdragon 6 Gen 1", "MediaTek Dimensity 7050", "Qualcomm Snapdragon 7s Gen 2", "MediaTek Dimensity 7200"],
    ram: { type: "LPDDR4X", size: 6 },
    storage: { type: "UFS 2.2", capacity: 128 },
    battery: { capacity: 5000, chargingSpeed: 33, type: "Li-Po" },
    display: { panelType: "AMOLED", refreshRate: 90, resolution: "FHD+", size: 6.6 },
    primaryCamera: { cameraType: "Primary Sensor", mp: 50, ois: "No" },
    ultraWideCamera: { cameraType: "Ultra-Wide Module", mp: 8, ois: "No" },
    network: { type: "5G Sub-6" },
    wifi: { type: "WiFi 6" },
    bluetooth: { type: "Bluetooth 5.2" },
    speaker: { name: "Dual Stereo" },
    dolby: { name: "None" },
    hiRes: { name: "Standard Audio" },
    haptics: { name: "ERM Vibration Motor" },
    thermal: { name: "Graphite Cooling Layer" },
    build: { material: "Plastic Frame" },
    sensors: ["Accelerometer", "Proximity Sensor", "Gyroscope", "Compass", "Ambient Light Sensor"],
    components: ["NFC", "Optical Fingerprint Sensor"]
  };

  // Select random matching processor
  const processors = await SoC.find({ name: { $in: preset.processors } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  // Concurrent lookups for discrete hardware components
  const [
    ram, storage, battery, display, primaryCamera, ultraWideCamera,
    network, wifi, bluetooth, speaker, dolby, hiRes, haptics, thermal, phoneBuild
  ] = await Promise.all([
    RAM.findOne(preset.ram),
    Storage.findOne(preset.storage),
    Battery.findOne(preset.battery),
    Display.findOne(preset.display),
    Camera.findOne(preset.primaryCamera),
    Camera.findOne(preset.ultraWideCamera),
    Network.findOne(preset.network),
    Wifi.findOne(preset.wifi),
    Bluetooth.findOne(preset.bluetooth),
    AudioSpeaker.findOne(preset.speaker),
    AudioDolby.findOne(preset.dolby),
    AudioHiRes.findOne(preset.hiRes),
    Haptics.findOne(preset.haptics),
    Thermal.findOne(preset.thermal),
    PhoneBuild.findOne(preset.build)
  ]);

  // Map individual lens entities to unified multi-slot configuration
  const camera = {
    count: 2,
    slots: [
      { type: primaryCamera.cameraType, mp: primaryCamera.mp, ois: primaryCamera.ois },
      { type: ultraWideCamera.cameraType, mp: ultraWideCamera.mp, ois: ultraWideCamera.ois }
    ],
    price: (primaryCamera?.price || 0) + (ultraWideCamera?.price || 0),
    isValid: true
  };

  // Standardize peripheral adapter arrays via structural helpers
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: preset.sensors } }),
    Component.find({ name: { $in: preset.components } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};

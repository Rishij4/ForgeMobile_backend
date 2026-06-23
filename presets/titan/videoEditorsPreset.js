// titanVideoEditorsPreset.js
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

export const titanVideoEditorsPreset = async () => {
  // Select premium heavy-duty rendering processor
  const processors = await SoC.find({ name: { $in: ["Apple A19 Pro", "Qualcomm Snapdragon 8 Elite", "MediaTek Dimensity 9500", "Google Tensor G5"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,          // heavy timeline scratch editing space (24GB)
    storage,      // deep local capacity for massive video clips (1TB)
    battery,      // high-drain sustained rendering session capacity (7000mAh, 120W)
    display,      // color-accurate premium monitoring interface (165Hz LTPO AMOLED)
    cameraPreset, // reliable high-fidelity primary footage sensor (200MP)
    network,      // seamless high bit-rate footage ingestion pipelines (5G mmWave)
    wifi,         // wireless high bandwidth proxy transfers (WiFi 7)
    bluetooth,    // low-latency studio monitor headphones sync link
    speaker,      // reference-grade quad monitoring acoustics
    dolby,
    hiRes,
    haptics,      // high-fidelity tactile timeline scrubbing feedback
    thermal,      // heavy liquid vapor matrix cooling to prevent throttling
    phoneBuild    // robust ultra-premium structural frame (Titanium Frame)
  ] = await Promise.all([
    RAM.findOne({ size: 24 }),
    Storage.findOne({ capacity: 1024 }),
    Battery.findOne({ capacity: 7000, chargingSpeed: 120 }),
    Display.findOne({ refreshRate: 165, panelType: "LTPO AMOLED" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 200 }),
    Network.findOne({ type: "5G mmWave" }),
    Wifi.findOne({ type: "WiFi 7" }),
    Bluetooth.findOne({ type: "Bluetooth 5.4" }),
    AudioSpeaker.findOne({ name: "Quad Speaker" }),
    AudioDolby.findOne({ name: "Dolby Atmos" }),
    AudioHiRes.findOne({ name: "Hi-Res Certified" }),
    Haptics.findOne({ name: "Z-Axis Linear Actuator" }),
    Thermal.findOne({ name: "Liquid Cooling System" }),
    PhoneBuild.findOne({ material: "Titanium Frame" })
  ]);

  // Translate direct standalone data references through layout helpers
  const camera = buildCamera(cameraPreset);
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Gyroscope", "Compass", "Ambient Light Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
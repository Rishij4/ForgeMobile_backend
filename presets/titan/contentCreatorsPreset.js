// titanContentCreatorsPreset.js
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

export const titanContentCreatorsPreset = async () => {
  // Select premium flagship content creator processor
  const processors = await SoC.find({ name: { $in: ["Apple A19 Pro", "Qualcomm Snapdragon 8 Elite", "MediaTek Dimensity 9500", "Google Tensor G5"] } });
  const processor = processors[Math.floor(Math.random() * processors.length)];

  const [
    ram,              // heavy 4K editing + baseline processing (16GB)
    storage,          // massive capacity for local raw files (1TB UFS 4.1)
    battery,          // long creator sessions (7000mAh Silicon Carbon, 100W)
    display,          // studio color-accurate panel (120Hz LTPO 3.0 AMOLED QHD+)
    primaryCamera,    // ultimate high-res primary sensor (200MP, OIS)
    ultraWideCamera,  // secondary scenery perspective module (50MP, OIS)
    telephotoCamera,  // third optical compression lens (50MP, OIS)
    network,          // ultra-fast wireless uplink (5G mmWave)
    wifi,             // bleeding-edge local bandwidth lane (WiFi 7)
    bluetooth,        // low latency monitor sync link (Bluetooth 5.4)
    speaker,          // true spatial monitor quad speakers
    dolby,
    hiRes,
    haptics,          // modern Z-axis linear tactility feedback
    thermal,          // premium cooling layer to combat rendering heat
    phoneBuild        // heavy duty ultra-premium protective chassis frame
  ] = await Promise.all([
    RAM.findOne({ size: 16 }),
    Storage.findOne({ capacity: 1024, type: "UFS 4.1" }),
    Battery.findOne({ capacity: 7000, chargingSpeed: 100, type: "Silicon Carbon" }),
    Display.findOne({ refreshRate: 120, panelType: "LTPO 3.0 AMOLED", resolution: "QHD+" }),
    Camera.findOne({ cameraType: "Primary Sensor", mp: 200, ois: "Yes" }),
    Camera.findOne({ cameraType: "Ultra-Wide Module", mp: 50, ois: "Yes" }),
    Camera.findOne({ cameraType: "Telephoto Module", mp: 50, ois: "Yes" }),
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

  // Construct structured camera array block parameters manually
  const camera = {
    count: 3,
    slots: [
      { type: primaryCamera.cameraType, mp: primaryCamera.mp, ois: primaryCamera.ois },
      { type: ultraWideCamera.cameraType, mp: ultraWideCamera.mp, ois: ultraWideCamera.ois },
      { type: telephotoCamera.cameraType, mp: telephotoCamera.mp, ois: telephotoCamera.ois }
    ],
    price: (primaryCamera?.price || 0) + (ultraWideCamera?.price || 0) + (telephotoCamera?.price || 0),
    isValid: true
  };

  // Compile network and audio configurations via structural factory adapters
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Gyroscope", "Compass", "Ambient Light Sensor", "Proximity Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "Wireless Charging", "Noise Cancellation Mic", "UWB Chip"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
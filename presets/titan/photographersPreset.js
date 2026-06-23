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
    ram,              // multi-stack image processing (16GB)
    storage,          // deep local headroom for raw files (1TB UFS 4.1)
    battery,          // reliable fieldwork battery cell (7000mAh, 100W)
    display,          // studio color-accurate panel (120Hz LTPO 3.0 AMOLED QHD+)
    primaryCamera,    // flagship main sensor (200MP, OIS)
    ultraWideCamera,  // wide landscape perspective module (50MP, OIS)
    periscopeCamera,  // high-resolution extreme zoom focal length (180MP, OIS)
    telephotoCamera,  // portrait compression lens (50MP, OIS)
    network,          // ultra-fast wireless raw image uplink
    wifi,             // next-gen high bandwidth studio wifi
    bluetooth,        // stable camera peripheral sync channels
    speaker,          // high-fidelity spatial monitor quad audio setup
    dolby,
    hiRes,
    haptics,          // crisp shutter linear tactile motor feedback
    thermal,          // vapor chamber sustained burst cooling
    phoneBuild        // industrial rigid titanium protective frame
  ] = await Promise.all([
    RAM.findOne({ size: 16 }),
    Storage.findOne({ capacity: 1024, type: "UFS 4.1" }),
    Battery.findOne({ capacity: 7000, chargingSpeed: 100 }),
    Display.findOne({ refreshRate: 120, panelType: "LTPO 3.0 AMOLED", resolution: "QHD+" }),
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

  // Construct standard quad-camera layout specifications matching selectors manually
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

  // Build specialized connection logic and audio matrices via utility templates
  const connectivity = buildConnectivity(network, wifi, bluetooth);
  const audio = buildAudio(speaker, dolby, hiRes);

  const [sensors, components] = await Promise.all([
    Sensor.find({ name: { $in: ["Accelerometer", "Gyroscope", "Compass", "Ambient Light Sensor", "Proximity Sensor"] } }),
    Component.find({ name: { $in: ["NFC", "IR Blaster", "Noise Cancellation Mic", "Ultrasonic Fingerprint Sensor", "Face ID (3D)", "Wireless Charging"] } })
  ]);

  return { processor, ram, storage, battery, display, camera, connectivity, audio, haptics, thermal, phoneBuild, sensors, components };
};
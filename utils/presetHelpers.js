export const buildCamera = (cameraPreset) => ({
  count: 1,
  slots: [
    {
      type: cameraPreset.cameraType,
      mp: cameraPreset.mp,
      ois: cameraPreset.ois
    }
  ],
  price: cameraPreset.price,
  isValid: true
});

export const buildConnectivity = (network, wifi, bluetooth) => ({
  network,
  wifi,
  bluetooth,
  isValid: true
});

export const buildAudio = (speaker, dolby, hiRes) => ({
  speakers: speaker?.name || "Unknown",
  dolbyAtmos: dolby?.name || "None",
  hiResAudio: hiRes?.name || "Standard Audio",
  price:
    (speaker?.price || 0) +
    (dolby?.price || 0) +
    (hiRes?.price || 0),

  audioScore:
    (speaker?.score || 0) +
    (dolby?.score || 0) +
    (hiRes?.score || 0),

  isValid: true
});
// server/config/presetRules.js

export const presetRules = {
  ECO: {
    Students: {
      processor: "Snapdragon 7 Gen 3",
      ram: 6,
      storage: 128,
      battery: 5000
    },

    "Senior Citizens": {
      processor: "Snapdragon 6 Gen 1",
      ram: 4,
      storage: 128,
      battery: 5000
    }
  },

  STANDARD: {
    "College Students": {
      processor: "Snapdragon 8s Gen 3",
      ram: 8,
      storage: 256,
      battery: 5000
    }
  },

  TITAN: {
    Gamers: {
      processor: "Snapdragon 8 Elite",
      ram: 16,
      storage: 512,
      battery: 6000
    }
  }
};
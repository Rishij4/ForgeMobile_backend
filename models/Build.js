import mongoose from "mongoose";

const buildSchema = new mongoose.Schema(

  {
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},

    buildName: {
      type: String,
      required: true
    },
    
    tested: {
      type: Boolean,
      default: false
    },

    totalPrice: {
      type: Number,
      default: 0
    },
    marketPrice: {
  type: Number,
  default: null
},

priceDifference: {
  type: Number,
  default: null
},

marketPriceDate: {
  type: Date,
  default: null
},

    performanceScore: {
      type: Number,
      default: 0
    },

    selectedComponents: {
      type: Object,
      default: {}
    },

    compatibilityResult: {

  score: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: ""
  },

  performanceScore: {
    type: Number,
    default: 0
  },

  thermalScore: {
    type: Number,
    default: 0
  },
  buildQuality: {
  type: Number,
  default: 0
},

  batteryEfficiency: {
    type: Number,
    default: 0
  },

  issues: {
    type: [String],
    default: []
  },

  suggestions: {
    type: [String],
    default: []
  }

},

    aiRecommendation: {

  strengths: {
    type: [String],
    default: []
  },

  weaknesses: {
    type: [String],
    default: []
  },

  upgradeSuggestions: {
    type: [String],
    default: []
  },

  summary: {
    type: String,
    default: ""
  }

}

  },

  {
    timestamps: true
  }

);

const Build = mongoose.model(
  "Build",
  buildSchema
);

export default Build;
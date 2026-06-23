// presetController.js
import { ecoStudentsPreset } from "../presets/eco/studentsPreset.js";
import { ecoSeniorCitizensPreset } from "../presets/eco/seniorCitizensPreset.js";
import { ecoBudgetBuyersPreset } from "../presets/eco/budgetBuyersPreset.js";
import { ecoFirstTimeUsersPreset } from "../presets/eco/firstTimeUsersPreset.js";
import { ecoCasualUsersPreset } from "../presets/eco/casualUsersPreset.js";
import { standardOfficeProfessionalsPreset } from "../presets/standard/officeProfessionalsPreset.js";
import { standardCollegeStudentsPreset } from "../presets/standard/collegeStudentsPreset.js";
import { standardMultitaskersPreset } from "../presets/standard/multitaskersPreset.js";
import { standardRemoteWorkersPreset } from "../presets/standard/remoteWorkersPreset.js";
import { standardPowerUsersPreset } from "../presets/standard/powerUsersPreset.js";
import { titanGamersPreset } from "../presets/titan/gamersPreset.js";
import { titanContentCreatorsPreset } from "../presets/titan/contentCreatorsPreset.js";
import { titanVideoEditorsPreset } from "../presets/titan/videoEditorsPreset.js";
import { titanTechEnthusiastsPreset } from "../presets/titan/techEnthusiastsPreset.js";
import { titanPhotographersPreset } from "../presets/titan/photographersPreset.js";

// Multi-tier category dynamic preset mapping strategy table
const presetRegistry = {
  ECO: {
    "Students": ecoStudentsPreset,
    "Senior Citizens": ecoSeniorCitizensPreset,
    "Budget Buyers": ecoBudgetBuyersPreset,
    "First-Time Users": ecoFirstTimeUsersPreset,
    "Casual Users": ecoCasualUsersPreset
  },
  STANDARD: {
    "Office Professionals": standardOfficeProfessionalsPreset,
    "College Students": standardCollegeStudentsPreset,
    "Multitaskers": standardMultitaskersPreset,
    "Remote Workers": standardRemoteWorkersPreset,
    "Power Users": standardPowerUsersPreset
  },
  TITAN: {
    "Gamers": titanGamersPreset,
    "Content Creators": titanContentCreatorsPreset,
    "Video Editors": titanVideoEditorsPreset,
    "Tech Enthusiasts": titanTechEnthusiastsPreset,
    "Photographers": titanPhotographersPreset
  }
};

export const getPreset = async (req, res) => {
  try {
    const { tier, category } = req.body;
    console.log("BODY =", req.body);

    const presetResolver = presetRegistry[tier]?.[category];
    if (!presetResolver) {
      return res.status(404).json({ message: "Preset not found" });
    }

    res.json(await presetResolver());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
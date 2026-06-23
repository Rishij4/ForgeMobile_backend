import Build from "../models/Build.js";

// SAVE BUILD
export const saveBuild = async (req, res) => {
  try {
    const build = await Build.create({ ...req.body, userId: req.user.id });
    res.status(201).json(build);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save build" });
  }
};

// GET BUILDS
export const getBuilds = async (req, res) => {
  try {
    const builds = await Build.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(builds);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch builds" });
  }
};

// UPDATE BUILD
export const updateBuild = async (req, res) => {
  try {
    const updatedBuild = await Build.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
    res.json(updatedBuild);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update build" });
  }
};

// GET PUBLIC BUILD (NO LOGIN REQUIRED)
export const getPublicBuild = async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ message: "Build not found" });
    res.json(build);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch build" });
  }
};
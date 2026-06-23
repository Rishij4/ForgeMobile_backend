import Build from "../models/Build.js";

export const getProfileStats = async (req, res) => {
  try {
    // all builds for current user
    const builds = await Build.find({
      userId: req.user.id
    });

    // total count
    const totalBuilds = builds.length;

    // total price
    const totalValue = builds.reduce(
      (sum, build) =>
        sum + (build.totalPrice || 0),
      0
    );

    res.json({
      totalBuilds,
      totalValue
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stats"
    });
  }
};
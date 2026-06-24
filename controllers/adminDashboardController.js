import User from "../models/User.js";
import Build from "../models/Build.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBuilds = await Build.countDocuments();

    res.json({
      totalUsers,
      totalBuilds
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const usersWithBuilds = await Promise.all(
      users.map(async (user) => {
        const buildCount = await Build.countDocuments({
          userId: user._id
        });

        return {
          ...user._doc,
          buildCount
        };
      })
    );

    res.json(usersWithBuilds);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ SAFE CHECK (IMPORTANT)
    if (!req.user || req.user.id === id) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    await User.findByIdAndDelete(id);

    await Build.deleteMany({
      userId: id
    });

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

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
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        message: "You cannot delete your own admin account"
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
    res.status(500).json({
      message: error.message
    });
  }
};

import User from "../models/User.js";
import Build from "../models/Build.js";


// GET ADMIN STATS
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


// GET ALL USERS + BUILD COUNT
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password");

    const usersWithBuilds =
      await Promise.all(

        users.map(async (user) => {

          const buildCount =
            await Build.countDocuments({
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


// DELETE USER + DELETE ALL BUILDS
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;


    // SAFETY CHECK
    // Admin cannot delete own account
    if (
      !req.user ||
      req.user._id.toString() === id
    ) {
      return res.status(403).json({
        message:
          "Admin cannot delete own account"
      });
    }


    // STEP 1
    // Delete all builds of that user
    await Build.deleteMany({
      userId: id
    });


    // STEP 2
    // Delete user account
    await User.findByIdAndDelete(id);


    res.json({
      message:
        "User and all saved builds deleted successfully"
    });

  } catch (error) {
    console.log(
      "DELETE ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};

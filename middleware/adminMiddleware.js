// adminMiddleware.js
const adminMiddleware = (req, res, next) => {
  try {
    // check if logged in user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only."
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default adminMiddleware;

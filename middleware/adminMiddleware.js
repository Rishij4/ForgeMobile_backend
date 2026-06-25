const adminMiddleware = (req, res, next) => {
  try {
    console.log("ADMIN CHECK USER =", req.user);

    if (req.user.role !== "admin") {
      console.log("NOT ADMIN");

      return res.status(403).json({
        message: "Access denied. Admin only."
      });
    }

    console.log("ADMIN VERIFIED");

    next();

  } catch (error) {
    console.log("ADMIN ERROR =", error);

    return res.status(500).json({
      message: error.message
    });
  }
};

export default adminMiddleware;

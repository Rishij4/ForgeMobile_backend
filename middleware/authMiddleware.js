import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    console.log("===== AUTH START =====");
    console.log("AUTH HEADER =", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("NO TOKEN");
      return res.status(401).json({
        message: "No token"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED =", decoded);

    const user = await User.findById(decoded.id);

    console.log("FOUND USER =", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log("AUTH ERROR =", error);

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("HEADERS RECEIVED =", req.headers);
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER =", authHeader);

    if (!authHeader) {
      console.log("NO TOKEN FOUND");
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN =", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED =", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR =", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
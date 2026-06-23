// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import socRoutes from "./routes/socRoutes.js";
import ramRoutes from "./routes/ramRoutes.js";
import storageRoutes from "./routes/storageRoutes.js";
import batteryRoutes from "./routes/batteryRoutes.js";
import displayRoutes from "./routes/displayRoutes.js";
import cameraRoutes from "./routes/cameraRoutes.js";
import hapticRoutes from "./routes/hapticRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import componentRoutes from "./routes/componentRoutes.js";
import connectivityRoutes from "./routes/connectivityRoutes.js";
import compatibilityRoutes from "./routes/compatibilityRoutes.js";
import buildRoutes from "./routes/buildRoutes.js";
import presetRoutes from "./routes/presetRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

// Base Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// API Route Mounts
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/socs", socRoutes);
app.use("/api/rams", ramRoutes);
app.use("/api/storages", storageRoutes);
app.use("/api/batteries", batteryRoutes);
app.use("/api/displays", displayRoutes);
app.use("/api/cameras", cameraRoutes);
app.use("/api/haptics", hapticRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/connectivity", connectivityRoutes);
app.use("/api/compatibility", compatibilityRoutes);
app.use("/api/builds", buildRoutes);
app.use("/api/preset", presetRoutes);
app.use("/api/ai", aiRoutes);

// Database Connection & Server Initialization
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
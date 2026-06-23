import express from "express";

import {
  getProcessors,
  getRAMs,
  getStorages,
  runCompatibilityTest,
  getThermals,
  getPhoneBuilds
} from "../controllers/compatibilityController.js";

const router = express.Router();

router.get("/processors", getProcessors);

router.get("/rams", getRAMs);

router.get("/storages", getStorages);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "TEST ROUTE WORKING"
  });
});

router.post(
  "/check",
  runCompatibilityTest
);
router.get("/thermals", getThermals);
router.get("/phonebuilds", getPhoneBuilds);

export default router;
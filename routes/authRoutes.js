import express from "express";

import {
  registerUser,
  loginUser,
  checkEmail,
  resetPassword,
  adminLogin
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/admin-login", adminLogin);

router.post("/check-email", checkEmail);

router.post("/reset-password", resetPassword);

export default router;

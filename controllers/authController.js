import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.email === email) return res.status(400).json({ message: "Email already exists" });
      if (existingUser.username === username) return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24h" });

    const newUser = new User({ username, email, password: hashedPassword, isVerified: false });
    await newUser.save();
    console.log("✅ User saved in MongoDB");

    const verifyURL = `${process.env.FRONTEND_URL}/verify-email/${verifyToken}`;

const { data, error } = await resend.emails.send({
  from: "ForgeMobile <onboarding@resend.dev>",
  to: "support.forgemobile@gmail.com",
  subject: "Verify Your Account",
  html: `
    <div style="font-family: Arial; padding:20px;">
      <h2 style="color:#4F46E5;">Welcome to ForgeMobile</h2>
      <p>Please verify your account.</p>

      <a href="${verifyURL}"
      style="background:#4F46E5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block;">
      Verify Account
      </a>

      <p>Link expires in 24 hours.</p>
    </div>`
});
    console.log("Resend response:", data);
    console.log("✅ Email sent successfully");

    res.status(201).json({ message: "Registered. Check your email." });
  } catch (error) {
    console.log("❌ REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.isVerified) return res.status(400).json({ message: "Please verify email first" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No account found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000;
    await user.save();

  
    const FRONTEND_URL = process.env.FRONTEND_URL;

    const resetURL  = `${FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("Sending email...");

    const data = await resend.emails.send({
  from: "ForgeMobile <onboarding@resend.dev>",
  to: "support.forgemobile@gmail.com",
  subject: "ForgeMobile Password Reset",
  html: `
    <div style="font-family: Arial; padding:20px;">
      <h2>Password Reset</h2>

      <a href="${resetURL}"
      style="background:#4F46E5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block;">
      Reset Password
      </a>

      <p>Link expires in 1 hour.</p>
    </div>`
});
    console.log("Resend response:", data);

    res.json({ message: "Reset link sent" });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:\n", error);
    res.status(500).json({ message: error.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired link" });
  }
};

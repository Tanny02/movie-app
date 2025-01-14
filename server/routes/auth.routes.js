import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user and get JWT token
router.post("/login", loginUser);

export default router;

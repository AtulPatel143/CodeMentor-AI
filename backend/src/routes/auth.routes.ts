import { Router } from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/auth.controller";

import { verifyToken } from "../middleware/auth.middleware";
import validate from "../middleware/validation.middleware";

import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();

// Public Routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// Protected Route
router.get("/profile", verifyToken, getProfile);

export default router;

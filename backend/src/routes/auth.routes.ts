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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

// Public Routes
router.post("/register", validate(registerSchema), registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", validate(loginSchema), loginUser);

// Protected Route
router.get("/profile", verifyToken, getProfile);
// auth.routes.js में नया रूट जोड़ें
router.post("/logout", (req, res) => {
  // यहाँ कोई सत्र समाप्त करने वाली लॉजिक नहीं है, बस क्लाइंट साइड पर ही स्टेट क्लियर होगा
  res.status(200).json({ message: "Logged out successfully" });
});
export default router;

import { Router } from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);

export default router;

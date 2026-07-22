import { Router } from "express";
import {
  getConversations,
  sendMessage,
} from "../controllers/conversation.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

// GET conversation history
router.get(
  "/projects/:projectId/conversations",
  verifyToken,
  getConversations
);

// Send a message
router.post(
  "/projects/:projectId/chat",
  verifyToken,
  sendMessage
);

export default router;
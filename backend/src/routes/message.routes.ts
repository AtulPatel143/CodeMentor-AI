import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";

import {
  getMessages,
  sendMessage,
  streamMessage,
} from "../controllers/message.controller";

const router = Router();

router.get("/conversations/:conversationId/messages", verifyToken, getMessages);

router.post(
  "/conversations/:conversationId/messages",
  verifyToken,
  sendMessage,
);

router.post(
  "/conversations/:conversationId/messages/stream",
  verifyToken,
  streamMessage,
);

export default router;

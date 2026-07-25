import { Router } from "express";

import {
  createConversation,
  deleteConversation,
  getConversations,
  renameConversation,
} from "../controllers/conversation.controller";

import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/projects/:projectId/conversations", verifyToken, getConversations);

router.post(
  "/projects/:projectId/conversations",
  verifyToken,
  createConversation,
);

router.patch("/conversations/:id", verifyToken, renameConversation);

router.delete("/conversations/:id", verifyToken, deleteConversation);

export default router;

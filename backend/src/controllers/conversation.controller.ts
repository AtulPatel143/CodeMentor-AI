import { Request, Response } from "express";

import { ConversationService } from "../services/conversation.service";
import { asyncHandler } from "../middleware/asyncHandler";
import { AppError } from "../errors/AppError";

const conversationService = new ConversationService();

export const createConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    const conversation = await conversationService.create(projectId);

    res.status(201).json({
      success: true,
      data: conversation,
    });
  },
);

export const renameConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { title } = req.body;

    if (!title?.trim()) {
      throw new AppError("Title is required.", 400);
    }

    const conversation = await conversationService.rename(id, title);

    res.json({
      success: true,
      data: conversation,
    });
  },
);

export const deleteConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await conversationService.delete(id);

    res.status(200).json({
      success: true,
      data: null,
    });
  },
);

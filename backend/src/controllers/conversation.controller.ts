import { Request, Response } from "express";
import prisma from "../prisma/prisma";

interface SendMessageBody {
  message: string;
}

// GET /api/projects/:projectId/conversations
export const getConversations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let projectId = req.params.projectId;

    if (Array.isArray(projectId)) {
      projectId = projectId[0];
    }

    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
      return;
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
};

// POST /api/projects/:projectId/chat
export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let projectId = req.params.projectId;
    const { message } = req.body as SendMessageBody;

    if (Array.isArray(projectId)) {
      projectId = projectId[0];
    }

    if (!projectId) {
      res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
      return;
    }

    if (!message) {
      res.status(400).json({
        success: false,
        message: "Message is required",
      });
      return;
    }

    // Mock AI response for now
    const aiResponse = `AI Response: ${message}`;

    const conversation = await prisma.conversation.create({
      data: {
        message,
        response: aiResponse,
        projectId,
      },
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

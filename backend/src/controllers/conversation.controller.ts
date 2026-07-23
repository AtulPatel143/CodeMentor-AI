import { Request, Response } from "express";
import prisma from "../prisma/prisma";

import { ConversationService } from "../services/conversation.service";

const conversationService = new ConversationService();

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

    if (!message.trim()) {
      res.status(400).json({
        success: false,
        message: "Message is required",
      });
      return;
    }

    const aiResponse = await conversationService.generateResponse(
      projectId,
      message,
    );

    const conversation = await prisma.conversation.create({
      data: {
        projectId,
        message,
        response: aiResponse,
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

export const streamMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let projectId = req.params.projectId;
    const { message } = req.body as SendMessageBody;

    if (Array.isArray(projectId)) {
      projectId = projectId[0];
    }

    if (!projectId || !message.trim()) {
      res.status(400).json({
        success: false,
        message: "Invalid request",
      });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    let fullResponse = "";

    for await (const chunk of conversationService.generateStreamResponse(
      projectId,
      message,
    )) {
      fullResponse += chunk;

      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      await new Promise((resolve) => setImmediate(resolve));
    }

    await prisma.conversation.create({
      data: {
        projectId,
        message,
        response: fullResponse,
      },
    });

    res.write("event: end\n");
    res.write("data: done\n\n");

    res.end();
  } catch (error) {
    console.error(error);

    res.write("event: error\n");
    res.write('data: {"message":"Streaming failed"}\n\n');

    res.end();
  }
};

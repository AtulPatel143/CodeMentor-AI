import prisma from "../prisma/prisma";
import { AIService } from "./ai/ai.service";
import { AppError } from "../errors/AppError";

const aiService = new AIService();

export class ConversationService {
  async getAll(projectId: string) {
    return prisma.conversation.findMany({
      where: {
        projectId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async create(projectId: string) {
    return prisma.conversation.create({
      data: {
        projectId,
        title: "New Chat",
      },
    });
  }

  async rename(id: string, title: string) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
    });

    if (!conversation) {
      throw new AppError("Conversation not found.", 404);
    }

    return prisma.conversation.update({
      where: {
        id,
      },
      data: {
        title: title.trim(),
      },
    });
  }

  async delete(id: string) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
    });

    if (!conversation) {
      throw new AppError("Conversation not found.", 404);
    }

    await prisma.conversation.delete({
      where: {
        id,
      },
    });
  }

  async updateTitle(conversationId: string): Promise<void> {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      throw new AppError("Conversation not found.", 404);
    }

    if (conversation.title !== "New Chat") {
      return;
    }

    const firstMessage = await prisma.message.findFirst({
      where: {
        conversationId,
        role: "user",
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!firstMessage) {
      return;
    }

    const title = await aiService.generateTitle(firstMessage.content);

    await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        title: title.trim(),
      },
    });
  }
}

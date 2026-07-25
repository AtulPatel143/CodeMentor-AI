import prisma from "../prisma/prisma";
import { AppError } from "../errors/AppError";
import { AIService } from "./ai/ai.service";
import { ConversationService } from "./conversation.service";

const aiService = new AIService();
const conversationService = new ConversationService();

export class MessageService {
  async getMessages(conversationId: string) {
    await this.ensureConversationExists(conversationId);

    return prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async sendMessage(conversationId: string, content: string) {
    await this.ensureConversationExists(conversationId);

    await this.createMessage(conversationId, "user", content);

    const response = await aiService.generate(conversationId);

    const assistantMessage = await this.createMessage(
      conversationId,
      "assistant",
      response,
    );

    await conversationService.updateTitle(conversationId);

    return assistantMessage;
  }

  async *streamMessage(conversationId: string, content: string) {
    await this.ensureConversationExists(conversationId);

    await this.createMessage(conversationId, "user", content);

    let fullResponse = "";

    for await (const chunk of aiService.stream(conversationId)) {
      fullResponse += chunk;
      yield chunk;
    }

    await this.createMessage(conversationId, "assistant", fullResponse);

    await conversationService.updateTitle(conversationId);
  }

  private async createMessage(
    conversationId: string,
    role: "user" | "assistant",
    content: string,
  ) {
    return prisma.message.create({
      data: {
        conversationId,
        role,
        content,
      },
    });
  }

  private async ensureConversationExists(conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      select: {
        id: true,
      },
    });

    if (!conversation) {
      throw new AppError("Conversation not found.", 404);
    }
  }
}

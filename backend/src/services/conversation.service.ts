import prisma from "../prisma/prisma";
import { GeminiService } from "./gemini.service";

const geminiService = new GeminiService();

export class ConversationService {
  async generateResponse(projectId: string, message: string): Promise<string> {
    const previousConversations = await prisma.conversation.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    const conversationHistory = previousConversations
      .reverse()
      .map(
        (chat) => `User: ${chat.message}
AI: ${chat.response}`,
      )
      .join("\n\n");

    const prompt = `
You are CodeMentor AI.

You are an expert programming mentor.

Rules:
- Explain concepts clearly.
- Explain code line by line.
- Find bugs.
- Suggest improvements.
- Mention time complexity when appropriate.
- Use Markdown formatting.
- Continue the conversation naturally.

Previous Conversation:

${conversationHistory}

Current User:

${message}
`;

    return geminiService.generateResponse(prompt);
  }

  async *generateStreamResponse(
    projectId: string,
    message: string,
  ): AsyncGenerator<string> {
    const previousConversations = await prisma.conversation.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    const conversationHistory = previousConversations
      .reverse()
      .map(
        (chat) => `User: ${chat.message}
AI: ${chat.response}`,
      )
      .join("\n\n");

    const prompt = `
You are CodeMentor AI.

You are an expert programming mentor.

Rules:
- Explain concepts clearly.
- Explain code line by line.
- Find bugs.
- Suggest improvements.
- Mention time complexity when appropriate.
- Use Markdown formatting.
- Continue the conversation naturally.

Previous Conversation:

${conversationHistory}

Current User:

${message}
`;

    for await (const chunk of geminiService.generateStreamResponse(prompt)) {
      yield chunk;
    }
  }
}

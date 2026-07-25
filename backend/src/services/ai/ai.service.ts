import prisma from "../../prisma/prisma";
import { Message } from "@prisma/client";
import { GeminiService } from "./gemini.service";
import { SYSTEM_PROMPT } from "./prompts/system.prompt";

const MAX_HISTORY = 30;

export class AIService {
  private readonly provider = new GeminiService();

  private async loadHistory(conversationId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: MAX_HISTORY,
    });
  }

  private buildPrompt(messages: Message[]): string {
    const history = messages
      .map(({ role, content }) => {
        const speaker = role === "user" ? "User" : "Assistant";
        return `${speaker}: ${content}`;
      })
      .join("\n\n");

    return `${SYSTEM_PROMPT}

${history}`;
  }

  async generate(conversationId: string): Promise<string> {
    const messages = await this.loadHistory(conversationId);
    const prompt = this.buildPrompt(messages);

    return this.provider.generateResponse(prompt);
  }

  async *stream(conversationId: string): AsyncGenerator<string> {
    const messages = await this.loadHistory(conversationId);
    const prompt = this.buildPrompt(messages);

    for await (const chunk of this.provider.generateStreamResponse(prompt)) {
      yield chunk;
    }
  }

  async generateTitle(firstMessage: string): Promise<string> {
    const prompt = `
Generate a short title (3-6 words) for this conversation.

Return ONLY the title.

Message:
${firstMessage}
`;

    return this.provider.generateResponse(prompt);
  }
}

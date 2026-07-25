import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const MODEL = "gemini-2.5-flash-lite";

export class GeminiService {
  async generateResponse(prompt: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });

    return response.text ?? "";
  }

  async *generateStreamResponse(prompt: string): AsyncGenerator<string> {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents: prompt,
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  }
}

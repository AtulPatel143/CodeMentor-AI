import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env";
import { AppError } from "../../errors/AppError";
import { retryWithBackoff } from "../../utils/retry";

if (!env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required to initialize GeminiService.");
}

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const MODEL = env.GEMINI_MODEL;
console.log("MODEL =", MODEL);
const GEMINI_CONFIG = {
  maxOutputTokens: env.GEMINI_MAX_OUTPUT_TOKENS,
  temperature: env.GEMINI_TEMPERATURE,
  topP: env.GEMINI_TOP_P,
  topK: env.GEMINI_TOP_K,
};

export class GeminiService {
  async generateResponse(prompt: string): Promise<string> {
    console.log("Sending request with model:", MODEL);
    const response = await retryWithBackoff(
      () =>
        ai.models.generateContent({
          model: MODEL,
          contents: prompt,
          config: GEMINI_CONFIG,
        }),
      env.GEMINI_RETRY_ATTEMPTS,
      env.GEMINI_RETRY_INITIAL_DELAY_MS,
    );

    return response.text ?? "";
  }

  async *generateStreamResponse(prompt: string): AsyncGenerator<string> {
    const stream = await retryWithBackoff(
      () =>
        ai.models.generateContentStream({
          model: MODEL,
          contents: prompt,
          config: GEMINI_CONFIG,
        }),
      env.GEMINI_RETRY_ATTEMPTS,
      env.GEMINI_RETRY_INITIAL_DELAY_MS,
    );

    try {
      for await (const chunk of stream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error) {
      throw new AppError(
        `Gemini stream failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
        502,
      );
    }
  }
}

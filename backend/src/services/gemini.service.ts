import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export class GeminiService {
  async generateResponse(prompt: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `
You are CodeMentor AI.

You are an expert programming mentor.

Explain concepts clearly.
Give beginner-friendly explanations.
When code is provided:
- Explain line by line.
- Find bugs.
- Suggest improvements.
- Mention time complexity if applicable.

User Question:
${prompt}
`,
    });

    return response.text ?? "No response generated.";
  }

  async *generateStreamResponse(prompt: string) {
    const response = await ai.models.generateContentStream({
      model: "gemini-3.6-flash",
      contents: `
You are CodeMentor AI.

You are an expert programming mentor.

Explain concepts clearly.
Give beginner-friendly explanations.
When code is provided:
- Explain line by line.
- Find bugs.
- Suggest improvements.
- Mention time complexity if applicable.

User Question:
${prompt}
`,
    });

    for await (const chunk of response) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  }
}
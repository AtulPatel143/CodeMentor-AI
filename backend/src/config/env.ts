import dotenv from "dotenv";

dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || "development-secret",
  PORT: process.env.PORT || "5000",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  GEMINI_MODEL: process.env.GEMINI_MODEL || "Gemini Flash Latest",
  GEMINI_MAX_OUTPUT_TOKENS: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS ?? "512"),
  GEMINI_TEMPERATURE: Number(process.env.GEMINI_TEMPERATURE ?? "0.7"),
  GEMINI_TOP_P: Number(process.env.GEMINI_TOP_P ?? "0.95"),
  GEMINI_TOP_K: Number(process.env.GEMINI_TOP_K ?? "0"),
  GEMINI_RETRY_ATTEMPTS: Number(process.env.GEMINI_RETRY_ATTEMPTS ?? "3"),
  GEMINI_RETRY_INITIAL_DELAY_MS: Number(process.env.GEMINI_RETRY_INITIAL_DELAY_MS ?? "500"),
};

console.log("GEMINI_MODEL =", process.env.GEMINI_MODEL)
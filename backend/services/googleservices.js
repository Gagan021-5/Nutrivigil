import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { retryWithTimeout, DEFAULT_RETRY_CONFIG } from "../utils/retryHandler.js";
import { parseGeminiError, InvalidAPIKeyError, logError } from "../utils/apiErrorHandler.js";

// Validate API key on startup
if (!process.env.GEMINI_API_KEY) {
  throw new InvalidAPIKeyError("Gemini");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Wrapper for Gemini generateContent with error handling and retries
 */
export const generateGeminiContent = async (
  content,
  retryConfig = DEFAULT_RETRY_CONFIG
) => {
  const context = "[Gemini API]";

  try {
    return await retryWithTimeout(
      () => geminiModel.generateContent(content),
      retryConfig,
      30000,
      context
    );
  } catch (error) {
    logError(error, `${context} Failed to generate content`);
    throw parseGeminiError(error);
  }
};

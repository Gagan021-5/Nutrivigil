import axios from "axios";
import fs from "fs";
import { generateGeminiContent } from "../services/googleservices.js";
import { getNutritionData } from "../services/ninjaServices.js";
import imageToBase64 from "../utils/imgconversion.js";
import getMimeType from "../utils/getmemetype.js";
import { parseGeminiJson } from "../utils/parseGeminiJson.js";
import {
  formatErrorResponse,
  logError,
  APIError,
  NetworkError,
  TimeoutError,
  RateLimitError,
  InvalidAPIKeyError,
} from "../utils/apiErrorHandler.js";

export const analyzeFood = async (req, res) => {
  let imagePath = null;

  const language =
    typeof req.body?.language === "string" && req.body.language.trim()
      ? req.body.language
      : "English";

  try {
    const condition = req.body.condition;
    const query = req.body.query;
    const existingFoodName = req.body.foodName;

    // ---------------- FOLLOW-UP QUERY (NO IMAGE) ----------------
    if (!req.file && query) {
      if (!existingFoodName) {
        return res.status(400).json({
          success: false,
          error: {
            message: "Food name is required for follow-up queries",
            code: "MISSING_FOOD_NAME",
          },
        });
      }

      const followUpPrompt = `
      FOOD NAME (KEEP IN ENGLISH, DO NOT TRANSLATE):
      ${existingFoodName}

      Health Condition: ${condition}
      User's Question: "${query}"

      IMPORTANT RULES:
      - Food name MUST remain in English
      - Respond STRICTLY in ${language} for explanations
      - Do NOT mix languages
      - Do NOT add text outside JSON
      - ALL explanation text must be in ${language}

      Analyze if this food is safe based on the condition.

      Output ONLY valid JSON:
      {
      "traffic_light": "green" | "yellow" | "red",
      "verdict_title": "",
      "answer": ""
      }
      `;

      try {
        const result = await generateGeminiContent(followUpPrompt);
        const responseText =
          result.response.candidates[0].content.parts[0].text;

        const parsedData = parseGeminiJson(responseText);

        return res.json({
          success: true,
          food_name: existingFoodName,
          ...parsedData,
        });
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Follow-up Gemini call failed");
          return res
            .status(error.statusCode)
            .json(formatErrorResponse(error));
        }

        logError(error, "[Analyze] Follow-up processing error");
        return res.status(500).json({
          success: false,
          error: {
            message: "Failed to process follow-up query.",
            code: "FOLLOWUP_ERROR",
          },
        });
      }
    }

    // ---------------- IMAGE VALIDATION ----------------
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          message: "No image file provided. Please upload an image of the food.",
          code: "NO_IMAGE",
        },
      });
    }

    if (!condition) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Health condition is required for analysis.",
          code: "NO_CONDITION",
        },
      });
    }

    imagePath = req.file.path;

    try {
      const base64 = imageToBase64(imagePath);
      const mimeType = getMimeType(imagePath);

      // ---------------- STEP 1: FOOD IDENTIFICATION ----------------
      let foodName;
      try {
        const identify = await generateGeminiContent({
          contents: [
            {
              role: "user",
              parts: [
                { inlineData: { data: base64, mimeType } },
                { text: "Identify the dish. Output ONLY the name in English." },
              ],
            },
          ],
        });

        foodName =
          identify.response.candidates[0].content.parts[0].text.trim();

        if (!foodName) {
          throw new Error("Could not identify the food in the image");
        }
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Food identification failed");
          return res
            .status(error.statusCode)
            .json(formatErrorResponse(error));
        }
        throw error;
      }

      // ---------------- STEP 2: NUTRITION DATA (ENGLISH ONLY) ----------------
      let nutritionData = {};
      try {
        nutritionData = await getNutritionData(foodName);
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Nutrition data fetch failed");
          console.warn(
            "Nutrition data unavailable, continuing with analysis..."
          );
        } else {
          throw error;
        }
      }

      // ---------------- STEP 3: ANALYSIS ----------------
      const analysisPrompt = `
      FOOD NAME (KEEP IN ENGLISH, DO NOT TRANSLATE):
      ${foodName}

      Here is the NUTRITIONAL DATA(KEEP EXACTLY IT AS IS, ENGLISH ONLY):
      ${JSON.stringify(nutritionData)}

      Health condition: "${condition}"

      CRITICAL INSTRUCTIONS:
      1. Food name MUST remain in English
      2. Nutritional data MUST remain in English
      3. Do NOT translate nutrient names or values
      4. ONLY translate the following fields into ${language}:
      - verdict_title
      - reason
      - suggestion
      - alternatives[].name
      - alternatives[].why
      5. Do NOT mix languages
      6. Do NOT add explanations outside JSON
      7. ALL translated text MUST be in ${language}

      Analyze this food for the given condition.
      If the food is not "green", suggest 2–3 healthy alternatives safe for this condition.

      Output ONLY valid JSON in this exact format:
      {
        "traffic_light": "green" | "yellow" | "red",
        "verdict_title": "",
        "reason": "",
        "suggestion": "",
        "alternatives": [
      { "name": "", "why": "" }
      ]
      }
      `;

      let analysis;
      try {
        analysis = await generateGeminiContent({
          contents: [{ role: "user", parts: [{ text: analysisPrompt }] }],
        });
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Analysis generation failed");
          return res
            .status(error.statusCode)
            .json(formatErrorResponse(error));
        }
        throw error;
      }

      const analysisText =
        analysis.response.candidates[0].content.parts[0].text || "";

      try {
        const cleanJson = parseGeminiJson(analysisText);

        return res.json({
          success: true,
          food_name: foodName, // English
          nutrition: nutritionData, // English
          ...cleanJson, // localized explanations
        });
      } catch (parseError) {
        logError(parseError, "[Analyze] Analysis JSON parsing failed");
        return res.status(500).json({
          success: false,
          error: {
            message: "Failed to parse AI analysis. Please try again.",
            code: "PARSE_ERROR",
          },
        });
      }
    } catch (error) {
      if (error instanceof APIError) {
        logError(error, "[Analyze] API Error during analysis");
        return res
          .status(error.statusCode)
          .json(formatErrorResponse(error));
      }

      logError(error, "[Analyze] Unexpected error during processing");
      return res.status(500).json({
        success: false,
        error: {
          message:
            "An unexpected error occurred during analysis. Please try again.",
          code: "ANALYSIS_ERROR",
        },
      });
    }
  } catch (err) {
    logError(err, "[Analyze] Top-level error handler");
    return res.status(500).json({
      success: false,
      error: {
        message:
          "A critical error occurred. Please check your internet connection and try again.",
        code: "CRITICAL_ERROR",
      },
    });
  } finally {
    // ---------------- CLEANUP ----------------
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (unlinkError) {
        console.warn(
          "Failed to delete uploaded file:",
          unlinkError.message
        );
      }
    }
  }
};

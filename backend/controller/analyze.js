import axios from "axios";
import fs from "fs";
import NodeCache from "node-cache";
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

// Initialize cache with 24-hour TTL
const foodCache = new NodeCache({
  stdTTL: 86400,  // 24 hours in seconds
  checkperiod: 120  // Check for expired keys every 2 minutes
});

export const analyzeFood = async (req, res) => {
  let imagePath = null;

  try {
    const condition = req.body.condition; 
    const query = req.body.query;
    const existingFoodName = req.body.foodName;

    // Handle follow-up queries without image
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
        Context: The user is asking about ${existingFoodName || "this food"}.
        Health Profile (Conditions): ${condition}
        User's Question: "${query}"
        
        Analyze if this is safe based on the entire health profile provided. 
        Consider potential risks or interactions for EACH condition listed.
        Output ONLY JSON:
        {
          "traffic_light": "green" | "yellow" | "red", 
          "verdict_title": "Follow-up Answer",
          "answer": "Direct answer to the user's question, accounting for all listed health conditions.",
        }
      `;

      try {
        const result = await generateGeminiContent(followUpPrompt);
        const responseText = result.response.candidates[0].content.parts[0].text;

        try {
          const parsedData = parseGeminiJson(responseText);
          return res.json({
            success: true,
            food_name: existingFoodName,
            ...parsedData,
          });
        } catch (parseError) {
          logError(parseError, "[Analyze] Follow-up JSON parsing failed");
          return res.status(500).json({
            success: false,
            error: {
              message: "Failed to parse AI response. Please try again.",
              code: "PARSE_ERROR",
            },
          });
        }
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Follow-up Gemini call failed");
          return res.status(error.statusCode).json(formatErrorResponse(error));
        }
        throw error;
      }
    }

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
          message: "Health profile is required for analysis.",
          code: "NO_CONDITION",
        },
      });
    }

    imagePath = req.file.path;

    try {
      const base64 = imageToBase64(imagePath);
      const mimeType = getMimeType(imagePath);

      // Step 1: Identify food or product in image
      let foodName;
      try {
        const identify = await generateGeminiContent({
          contents: [
            {
              role: "user",
              parts: [
                { inlineData: { data: base64, mimeType } },
                { text: "Identify the food or product in this image. If it's a packaged food item or an ingredient label, output 'packaged_food'. Otherwise, output the specific dish name. Output ONLY the name." },
              ],
            },
          ],
        });

        foodName = identify.response.candidates[0].content.parts[0].text.trim();

        if (!foodName || foodName.length === 0) {
          throw new Error("Could not identify the food in the image");
        }
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Food identification failed");
          return res.status(error.statusCode).json(formatErrorResponse(error));
        }
        throw error;
      }

      const cacheKey = `${foodName.toLowerCase()}_${condition.toLowerCase()}`;
      const cachedResult = foodCache.get(cacheKey);

      if (cachedResult) {
        console.log(`✅ Cache HIT for ${cacheKey}`);
        return res.json({
          ...cachedResult,
          fromCache: true
        });
      }

      // Step 2: Get nutrition data (Only for non-packaged dishes)
      let nutritionData = {};
      if (foodName !== "packaged_food") {
        try {
          nutritionData = await getNutritionData(foodName);
        } catch (error) {
          if (error instanceof APIError) {
            logError(error, "[Analyze] Nutrition data fetch failed");
            console.warn("Nutrition data unavailable, continuing with analysis...");
          } else {
            throw error;
          }
        }
      }

      // Step 3: Analyze food or label based on multi-condition profile
      const analysisPrompt = `
        Context: The user has the health profile: "${condition}".
        Target: ${foodName === "packaged_food" ? "Analyze the ingredient label in the image" : "Analyze the dish: " + foodName}.
        ${foodName !== "packaged_food" ? "Nutritional Data: " + JSON.stringify(nutritionData) : ""}

        CRITICAL INSTRUCTIONS:
        1. If an ingredient label is present, extract all ingredients (OCR).
        2. Identify specific ingredients, additives, or chemicals harmful across ALL listed conditions.
        3. Check for interactions or risks across ALL listed conditions simultaneously.
        4. If the food is unsafe or requires caution for ANY listed condition, the traffic light MUST be "red" or "yellow".
        5. Provide a unified reason that explains the impact on the specific conditions listed.
        6. Suggest 2-3 healthy alternatives safe for THIS specific multi-condition profile.

        Output ONLY JSON in this exact format:
        {
          "traffic_light": "green" | "yellow" | "red",
          "verdict_title": "Analysis Result",
          "reason": "Identify specific harmful ingredients or nutritional risks found.",
          "suggestion": "What the user should look for or avoid specifically for their condition.",
          "alternatives": [
            { "name": "Alternative Name", "why": "Why it is safe for all the listed conditions" }
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
          return res.status(error.statusCode).json(formatErrorResponse(error));
        }
        throw error;
      }

      const analysisText = analysis.response.candidates[0].content.parts[0].text || "";

      try {
        const cleanJson = parseGeminiJson(analysisText);

        const result = {
          success: true,
          food_name: foodName === "packaged_food" ? "Packaged Product" : foodName,
          nutrition: nutritionData,
          ...cleanJson,
        };

        if (result && !result.error) {
          foodCache.set(cacheKey, result);
        }

        res.json({
          ...result,
          fromCache: false
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
        return res.status(error.statusCode).json(formatErrorResponse(error));
      }

      logError(error, "[Analyze] Unexpected error during processing");
      return res.status(500).json({
        success: false,
        error: {
          message: "An unexpected error occurred during analysis. Please try again.",
          code: "ANALYSIS_ERROR",
        },
      });
    }
  } catch (err) {
    logError(err, "[Analyze] Top-level error handler");
    return res.status(500).json({
      success: false,
      error: {
        message: "A critical error occurred. Please check your internet connection.",
        code: "CRITICAL_ERROR",
      },
    });
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (unlinkError) {
        console.warn("Failed to delete uploaded file:", unlinkError.message);
      }
    }
  }
};

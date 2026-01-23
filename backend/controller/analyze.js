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
        Health Condition: ${condition}
        User's Question: "${query}"
        
        Analyze if this is safe based on the condition. 
        Output ONLY JSON:
        {
          "traffic_light": "green", 
          "verdict_title": "Follow-up Answer",
          "answer": "Direct answer to the user's question and a add helpful tip.",
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

    // Validate image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          message: "No image file provided. Please upload an image of the food.",
          code: "NO_IMAGE",
        },
      });
    }

    // Validate condition
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

      // Step 1: Identify food in image
      let foodName;
      try {
        const identify = await generateGeminiContent({
          contents: [
            {
              role: "user",
              parts: [
                { inlineData: { data: base64, mimeType } },
                { text: "Identify the dish. Output ONLY the name." },
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

      // Step 2: Get nutrition data
      let nutritionData = {};
      try {
        nutritionData = await getNutritionData(foodName);
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Nutrition data fetch failed");
          // Don't fail completely, continue with empty nutrition data
          console.warn("Nutrition data unavailable, continuing with analysis...");
        } else {
          throw error;
        }
      }

      // Step 3: Analyze food based on condition
      const analysisPrompt = `
        Here is the nutritional data for ${foodName}: 
        ${JSON.stringify(nutritionData)}

        Analyze this food for someone with the condition: "${condition}"
        If the food is not "green", suggest 2-3 healthy alternatives safe for this condition.
        Output ONLY JSON in this exact format:
        {
          "traffic_light": "green" | "yellow" | "red",
          "verdict_title": "",
          "reason": "",
          "suggestion": "",
          "alternatives": [
            { "name": "Alternative Name", "why": "Why it is safe" }
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

        res.json({
          success: true,
          food_name: foodName,
          nutrition: nutritionData,
          ...cleanJson,
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
      // Handle unexpected errors during analysis
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
        message:
          "A critical error occurred. Please check your internet connection and try again.",
        code: "CRITICAL_ERROR",
      },
    });
  } finally {
    // Clean up uploaded file
    if (imagePath && fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (unlinkError) {
        console.warn("Failed to delete uploaded file:", unlinkError.message);
      }
    }
  }
};

/**
 * API Ninjas Service with Error Handling & Retries
 */

import axios from "axios";
import "dotenv/config";
import { retryWithTimeout, DEFAULT_RETRY_CONFIG } from "../utils/retryHandler.js";
import { parseAxiosError, InvalidAPIKeyError, logError, formatErrorResponse } from "../utils/apiErrorHandler.js";

// Validate API key on startup
if (!process.env.NINJA_API_KEY) {
  throw new InvalidAPIKeyError("API Ninjas");
}

const NINJA_API_BASE = "https://api.api-ninjas.com/v1";

/**
 * Get nutrition data with error handling and retries
 */
export const getNutritionData = async (
  foodQuery,
  retryConfig = DEFAULT_RETRY_CONFIG
) => {
  const context = "[API Ninjas - Nutrition]";

  if (!foodQuery || foodQuery.trim() === "") {
    const error = new Error("Food query cannot be empty");
    logError(error, `${context} Validation failed`);
    throw error;
  }

  try {
    const response = await retryWithTimeout(
      () =>
        axios.get(`${NINJA_API_BASE}/nutrition`, {
          params: { query: foodQuery },
          headers: { "X-Api-Key": process.env.NINJA_API_KEY },
          timeout: 10000,
        }),
      retryConfig,
      15000,
      context
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid nutrition data format from API Ninjas");
    }

    // Return first result or empty object if no results
    return response.data.length > 0 ? response.data[0] : {};
  } catch (error) {
    logError(error, `${context} Failed to fetch nutrition data for: "${foodQuery}"`);
    throw parseAxiosError(error, "API Ninjas - Nutrition Database");
  }
};

/**
 * Get generic data from API Ninjas with error handling
 */
export const getAPIData = async (
  endpoint,
  params = {},
  retryConfig = DEFAULT_RETRY_CONFIG
) => {
  const context = `[API Ninjas - ${endpoint}]`;

  try {
    const response = await retryWithTimeout(
      () =>
        axios.get(`${NINJA_API_BASE}/${endpoint}`, {
          params,
          headers: { "X-Api-Key": process.env.NINJA_API_KEY },
          timeout: 10000,
        }),
      retryConfig,
      15000,
      context
    );

    return response.data;
  } catch (error) {
    logError(error, `${context} Failed to fetch data`);
    throw parseAxiosError(error, `API Ninjas - ${endpoint}`);
  }
};

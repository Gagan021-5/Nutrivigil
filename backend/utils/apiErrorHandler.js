/**
 * Centralized API Error Handler
 * Converts various API errors into user-friendly messages
 */

// Define custom error types
export class APIError extends Error {
  constructor(message, code, statusCode = 500, details = {}) {
    super(message);
    this.name = "APIError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class NetworkError extends APIError {
  constructor(message = "Network connection failed", details = {}) {
    super(message, "NETWORK_ERROR", 503, details);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends APIError {
  constructor(message = "Request timed out", details = {}) {
    super(message, "TIMEOUT_ERROR", 504, details);
    this.name = "TimeoutError";
  }
}

export class RateLimitError extends APIError {
  constructor(message = "Too many requests. Please try again later.", details = {}) {
    super(message, "RATE_LIMIT_ERROR", 429, details);
    this.name = "RateLimitError";
  }
}

export class InvalidAPIKeyError extends APIError {
  constructor(apiName = "API", details = {}) {
    const message = `Invalid or missing ${apiName} API key. Please check your configuration.`;
    super(message, "INVALID_API_KEY", 401, details);
    this.name = "InvalidAPIKeyError";
  }
}

export class ValidationError extends APIError {
  constructor(message = "Invalid input data", details = {}) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
  }
}

/**
 * Parse Axios error and return appropriate APIError
 */
export const parseAxiosError = (error, apiName = "External API") => {
  const errorDetails = {
    apiName,
    timestamp: new Date().toISOString(),
  };

  // Network errors (no response)
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return new TimeoutError(
        `${apiName} request timed out. Please try again.`,
        errorDetails
      );
    }
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return new NetworkError(
        `Unable to connect to ${apiName}. Please check your internet connection.`,
        errorDetails
      );
    }
    return new NetworkError(
      `Network error connecting to ${apiName}: ${error.message}`,
      errorDetails
    );
  }

  const status = error.response.status;
  const data = error.response.data;

  errorDetails.statusCode = status;

  // Rate limiting
  if (status === 429) {
    return new RateLimitError(
      `${apiName} is currently busy. Please wait a moment and try again.`,
      { ...errorDetails, retryAfter: error.response.headers["retry-after"] }
    );
  }

  // Authentication/Authorization errors
  if (status === 401 || status === 403) {
    return new InvalidAPIKeyError(apiName, errorDetails);
  }

  // Bad request
  if (status === 400) {
    const errorMsg = data?.error?.message || data?.message || "Invalid request";
    return new ValidationError(
      `${apiName} validation error: ${errorMsg}`,
      errorDetails
    );
  }

  // Server errors
  if (status >= 500) {
    return new APIError(
      `${apiName} is temporarily unavailable. Please try again later.`,
      "SERVER_ERROR",
      status,
      errorDetails
    );
  }

  // Generic error
  return new APIError(
    `${apiName} error: ${data?.message || error.message}`,
    "API_ERROR",
    status,
    errorDetails
  );
};

/**
 * Parse Gemini API errors
 */
export const parseGeminiError = (error) => {
  const errorDetails = {
    apiName: "Gemini API",
    timestamp: new Date().toISOString(),
  };

  // Check if it's a Google API error
  if (error.message?.includes("API_KEY")) {
    return new InvalidAPIKeyError("Gemini", errorDetails);
  }

  if (
    error.message?.includes("RESOURCE_EXHAUSTED") ||
    error.message?.includes("quota")
  ) {
    return new RateLimitError(
      "Gemini API quota exceeded. Please try again in a moment.",
      errorDetails
    );
  }

  if (error.message?.includes("DEADLINE_EXCEEDED")) {
    return new TimeoutError(
      "Gemini API request timed out. Please try again.",
      errorDetails
    );
  }

  if (error.message?.includes("INVALID_ARGUMENT")) {
    return new ValidationError(
      `Invalid request to Gemini API: ${error.message}`,
      errorDetails
    );
  }

  return new APIError(
    `Gemini API error: ${error.message}`,
    "GEMINI_ERROR",
    500,
    errorDetails
  );
};

/**
 * Format error response for client
 */
export const formatErrorResponse = (error) => {
  if (error instanceof APIError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        type: error.name,
      },
      statusCode: error.statusCode,
    };
  }

  // Fallback for unknown errors
  return {
    success: false,
    error: {
      message: "An unexpected error occurred. Please try again later.",
      code: "UNKNOWN_ERROR",
      type: "Error",
    },
    statusCode: 500,
  };
};

/**
 * Log error for debugging
 */
export const logError = (error, context = "") => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ${context}`);
  
  if (error instanceof APIError) {
    console.error(`Error Code: ${error.code}`);
    console.error(`Status: ${error.statusCode}`);
    console.error(`Message: ${error.message}`);
    console.error(`Details:`, error.details);
  } else {
    console.error(error);
  }
};

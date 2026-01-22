/**
 * Retry Mechanism with Exponential Backoff
 * Automatically retries failed API calls with exponential backoff
 */

/**
 * Retry configuration
 */
export const DEFAULT_RETRY_CONFIG = {
  maxRetries: 3,
  initialDelayMs: 1000, // Start with 1 second
  maxDelayMs: 10000, // Cap at 10 seconds
  backoffMultiplier: 2, // Double the delay each time
  retryableStatusCodes: [408, 429, 500, 502, 503, 504], // Timeout, Rate Limit, Server Errors
};

/**
 * Calculate delay with exponential backoff
 */
export const calculateBackoffDelay = (
  retryCount,
  initialDelay = DEFAULT_RETRY_CONFIG.initialDelayMs,
  maxDelay = DEFAULT_RETRY_CONFIG.maxDelayMs,
  multiplier = DEFAULT_RETRY_CONFIG.backoffMultiplier
) => {
  const delay = initialDelay * Math.pow(multiplier, retryCount);
  return Math.min(delay, maxDelay);
};

/**
 * Determine if an error is retryable
 */
export const isRetryableError = (error, retryableStatuses = DEFAULT_RETRY_CONFIG.retryableStatusCodes) => {
  // Network errors are retryable
  if (!error.response) {
    if (
      error.code === "ECONNABORTED" ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED" ||
      error.code === "ETIMEDOUT"
    ) {
      return true;
    }
  }

  // Retryable HTTP status codes
  if (error.response?.status && retryableStatuses.includes(error.response.status)) {
    return true;
  }

  return false;
};

/**
 * Sleep utility
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry wrapper for API calls
 * Usage: const result = await retryAPICall(() => axios.get(...))
 */
export const retryAPICall = async (
  apiCallFn,
  config = DEFAULT_RETRY_CONFIG,
  context = ""
) => {
  let lastError;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const delay = calculateBackoffDelay(
          attempt - 1,
          config.initialDelayMs,
          config.maxDelayMs,
          config.backoffMultiplier
        );
        console.log(
          `${context} Retry attempt ${attempt}/${config.maxRetries} after ${delay}ms delay...`
        );
        await sleep(delay);
      }

      return await apiCallFn();
    } catch (error) {
      lastError = error;

      if (attempt === config.maxRetries) {
        // Max retries exceeded
        console.error(
          `${context} Failed after ${config.maxRetries} retries:`,
          error.message
        );
        break;
      }

      if (!isRetryableError(error, config.retryableStatusCodes)) {
        // Error is not retryable, throw immediately
        console.error(`${context} Non-retryable error, failing immediately:`, error.message);
        throw error;
      }

      console.warn(
        `${context} Attempt ${attempt + 1} failed: ${error.message}`
      );
    }
  }

  throw lastError;
};

/**
 * Timeout wrapper for promises
 * Ensures API calls don't hang indefinitely
 */
export const withTimeout = (promise, timeoutMs = 30000, timeoutMessage = "Operation timed out") => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
    ),
  ]);
};

/**
 * Combined retry + timeout wrapper
 */
export const retryWithTimeout = async (
  apiCallFn,
  retryConfig = DEFAULT_RETRY_CONFIG,
  timeoutMs = 30000,
  context = ""
) => {
  return retryAPICall(
    () => withTimeout(apiCallFn(), timeoutMs, `${context} request timed out`),
    retryConfig,
    context
  );
};

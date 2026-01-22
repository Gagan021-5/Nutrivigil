/**
 * Error Handling Testing Script
 * Demonstrates various API errors and how they're handled
 * 
 * Usage:
 * 1. From backend folder: node scripts/testErrorHandling.js
 * 2. Tests various error scenarios
 * 3. Shows console logs and formatted error responses
 */

import "dotenv/config";
import axios from "axios";
import {
  parseAxiosError,
  parseGeminiError,
  formatErrorResponse,
  logError,
  NetworkError,
  TimeoutError,
  RateLimitError,
  InvalidAPIKeyError,
} from "../utils/apiErrorHandler.js";
import {
  retryAPICall,
  retryWithTimeout,
  isRetryableError,
  DEFAULT_RETRY_CONFIG,
} from "../utils/retryHandler.js";

console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║        API ERROR HANDLING & RETRY MECHANISM TESTS          ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

// Test 1: Invalid API Key Error
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 1: Invalid API Key Detection");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
try {
  const error = new Error("API_KEY_INVALID");
  throw parseGeminiError(error);
} catch (err) {
  const formatted = formatErrorResponse(err);
  console.log("\n❌ Error Response:\n", JSON.stringify(formatted, null, 2));
  console.log("\n💬 User Message:", formatted.error.message);
}

// Test 2: Network Error (Simulated)
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 2: Network Connection Error");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
try {
  const error = new Error("Network request failed");
  error.code = "ECONNREFUSED";
  throw parseAxiosError(error, "API Ninjas");
} catch (err) {
  const formatted = formatErrorResponse(err);
  console.log("\n❌ Error Response:\n", JSON.stringify(formatted, null, 2));
  console.log("\n💬 User Message:", formatted.error.message);
}

// Test 3: Rate Limit Error
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 3: Rate Limit (429) Error");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
try {
  const error = new Error("Too Many Requests");
  error.response = {
    status: 429,
    data: { message: "Rate limit exceeded" },
    headers: { "retry-after": "60" },
  };
  throw parseAxiosError(error, "Gemini API");
} catch (err) {
  const formatted = formatErrorResponse(err);
  console.log("\n❌ Error Response:\n", JSON.stringify(formatted, null, 2));
  console.log("\n💬 User Message:", formatted.error.message);
  console.log("⏱️  Retry After:", err.details.retryAfter, "seconds");
}

// Test 4: Timeout Error
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 4: Request Timeout (ECONNABORTED) Error");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
try {
  const error = new Error("Request timeout");
  error.code = "ECONNABORTED";
  throw parseAxiosError(error, "Image Processing");
} catch (err) {
  const formatted = formatErrorResponse(err);
  console.log("\n❌ Error Response:\n", JSON.stringify(formatted, null, 2));
  console.log("\n💬 User Message:", formatted.error.message);
}

// Test 5: Server Error (500+)
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 5: Server Error (503 - Service Unavailable)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
try {
  const error = new Error("Service Unavailable");
  error.response = {
    status: 503,
    data: { message: "Server temporarily unavailable" },
  };
  throw parseAxiosError(error, "API Ninjas");
} catch (err) {
  const formatted = formatErrorResponse(err);
  console.log("\n❌ Error Response:\n", JSON.stringify(formatted, null, 2));
  console.log("\n💬 User Message:", formatted.error.message);
}

// Test 6: Invalid Input
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 6: Validation Error (400 - Bad Request)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
try {
  const error = new Error("Bad Request");
  error.response = {
    status: 400,
    data: { error: { message: "Invalid food query format" } },
  };
  throw parseAxiosError(error, "Nutrition API");
} catch (err) {
  const formatted = formatErrorResponse(err);
  console.log("\n❌ Error Response:\n", JSON.stringify(formatted, null, 2));
  console.log("\n💬 User Message:", formatted.error.message);
}

// Test 7: Retryable Error Detection
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 7: Retryable Error Detection");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

const testErrors = [
  { name: "Timeout (ECONNABORTED)", code: "ECONNABORTED", response: null },
  { name: "Rate Limit (429)", status: 429 },
  { name: "Bad Request (400)", status: 400 },
  { name: "Server Error (500)", status: 500 },
];

testErrors.forEach((testErr) => {
  const error = new Error("Test error");
  if (testErr.code) {
    error.code = testErr.code;
  }
  if (testErr.status) {
    error.response = { status: testErr.status };
  }
  const retryable = isRetryableError(error);
  console.log(
    `   ${testErr.name}: ${retryable ? "✅ RETRYABLE" : "❌ NOT RETRYABLE"}`
  );
});

// Test 8: Backoff Calculation
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 8: Exponential Backoff Delays");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`Default Config: Max Retries=${DEFAULT_RETRY_CONFIG.maxRetries}`);
console.log(
  `Initial Delay=${DEFAULT_RETRY_CONFIG.initialDelayMs}ms, Max Delay=${DEFAULT_RETRY_CONFIG.maxDelayMs}ms\n`
);
for (let i = 0; i < 4; i++) {
  const delay = (DEFAULT_RETRY_CONFIG.initialDelayMs *
    Math.pow(DEFAULT_RETRY_CONFIG.backoffMultiplier, i)) /
    1000; // Convert to seconds
  console.log(`   Retry Attempt ${i + 1}: ~${delay.toFixed(1)}s delay`);
}

// Test 9: Test Retry Simulation (with fake API)
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("TEST 9: Simulated Retry with Recovery");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

let attemptCount = 0;
const simulatedRetry = async () => {
  return retryAPICall(
    async () => {
      attemptCount++;
      console.log(`   Attempt ${attemptCount}: Calling API...`);

      if (attemptCount < 2) {
        // Fail first time
        const error = new Error("Connection timeout");
        error.code = "ECONNABORTED";
        throw error;
      }

      // Succeed on retry
      return { success: true, data: "✅ Success after retry!" };
    },
    {
      maxRetries: 3,
      initialDelayMs: 100, // Short delay for testing
      maxDelayMs: 500,
      backoffMultiplier: 2,
    },
    "[Test API]"
  );
};

try {
  const result = await simulatedRetry();
  console.log(`   Result: ${result.data}`);
} catch (err) {
  console.error(`   Failed: ${err.message}`);
}

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║                    ALL TESTS COMPLETED ✅                   ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

console.log("📝 SUMMARY OF ERROR HANDLING IMPROVEMENTS:");
console.log("   ✅ Centralized error parsing for all API types");
console.log("   ✅ User-friendly error messages instead of technical details");
console.log("   ✅ Automatic retry with exponential backoff");
console.log("   ✅ Timeout protection on all API calls");
console.log("   ✅ Detailed error logging for debugging");
console.log("   ✅ Graceful degradation (nutrition data optional)");
console.log("   ✅ Clear status codes and error codes for clients\n");

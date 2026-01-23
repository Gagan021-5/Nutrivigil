# Error Handling Console Output Examples

## Running Test Script

```
$ node scripts/testErrorHandling.js

╔════════════════════════════════════════════════════════════╗
║        API ERROR HANDLING & RETRY MECHANISM TESTS          ║
╚════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 1: Invalid API Key Detection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Error Response:
 {
  "success": false,
  "error": {
    "message": "Invalid or missing Gemini API key. Please check your configuration.",
    "code": "INVALID_API_KEY",
    "type": "InvalidAPIKeyError"
  },
  "statusCode": 401
}

💬 User Message: Invalid or missing Gemini API key. Please check your configuration.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 2: Network Connection Error
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Error Response:
 {
  "success": false,
  "error": {
    "message": "Unable to connect to API Ninjas. Please check your internet connection.",
    "code": "NETWORK_ERROR",
    "type": "NetworkError"
  },
  "statusCode": 503
}

💬 User Message: Unable to connect to API Ninjas. Please check your internet connection.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 3: Rate Limit (429) Error
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Error Response:
 {
  "success": false,
  "error": {
    "message": "Gemini API is currently busy. Please wait a moment and try again.",
    "code": "RATE_LIMIT_ERROR",
    "type": "RateLimitError"
  },
  "statusCode": 429
}

💬 User Message: Gemini API is currently busy. Please wait a moment and try again.
⏱️  Retry After: 60 seconds

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 4: Request Timeout (ECONNABORTED) Error
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Error Response:
 {
  "success": false,
  "error": {
    "message": "Image Processing request timed out. Please try again.",
    "code": "TIMEOUT_ERROR",
    "type": "TimeoutError"
  },
  "statusCode": 504
}

💬 User Message: Image Processing request timed out. Please try again.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 5: Server Error (503 - Service Unavailable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Error Response:
 {
  "success": false,
  "error": {
    "message": "API Ninjas is temporarily unavailable. Please try again later.",
    "code": "SERVER_ERROR",
    "type": "APIError"
  },
  "statusCode": 503
}

💬 User Message: API Ninjas is temporarily unavailable. Please try again later.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 6: Validation Error (400 - Bad Request)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Error Response:
 {
  "success": false,
  "error": {
    "message": "Nutrition API validation error: Invalid food query format",
    "code": "VALIDATION_ERROR",
    "type": "ValidationError"
  },
  "statusCode": 400
}

💬 User Message: Nutrition API validation error: Invalid food query format

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 7: Retryable Error Detection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Timeout (ECONNABORTED): ✅ RETRYABLE
   Rate Limit (429): ✅ RETRYABLE
   Bad Request (400): ❌ NOT RETRYABLE
   Server Error (500): ✅ RETRYABLE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 8: Exponential Backoff Delays
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Default Config: Max Retries=3
Initial Delay=1000ms, Max Delay=10000ms

   Retry Attempt 1: ~1.0s delay
   Retry Attempt 2: ~2.0s delay
   Retry Attempt 3: ~4.0s delay
   Retry Attempt 4: ~8.0s delay

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 9: Simulated Retry with Recovery
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Attempt 1: Calling API...
[Test API] Attempt 1 failed: Connection timeout
[Test API] Retry attempt 1/3 after 100ms delay...
   Attempt 2: Calling API...
   Result: ✅ Success after retry!

╔════════════════════════════════════════════════════════════╗
║                    ALL TESTS COMPLETED ✅                   ║
╚════════════════════════════════════════════════════════════╝

📝 SUMMARY OF ERROR HANDLING IMPROVEMENTS:
   ✅ Centralized error parsing for all API types
   ✅ User-friendly error messages instead of technical details
   ✅ Automatic retry with exponential backoff
   ✅ Timeout protection on all API calls
   ✅ Detailed error logging for debugging
   ✅ Graceful degradation (nutrition data optional)
   ✅ Clear status codes and error codes for clients
```

---

## Running Backend Server

```
$ npm run dev

Server running at port 3000

[2024-01-22T10:30:45.123Z] Backend started successfully
[2024-01-22T10:30:45.456Z] Environment: development
[2024-01-22T10:30:45.789Z] CORS enabled for: localhost:5173
```

---

## Successful API Request

```
$ curl -X POST http://localhost:3000/analyze \
  -F "image=@pizza.jpg" \
  -F "condition=diabetes" \
  -H "Accept: application/json"

[2024-01-22T10:31:12.345Z] [Gemini API] Identifying food in image...
[2024-01-22T10:31:15.678Z] ✅ [Gemini API] Food identified: "Pepperoni Pizza"
[2024-01-22T10:31:16.123Z] [API Ninjas] Fetching nutrition data for: "Pepperoni Pizza"
[2024-01-22T10:31:17.456Z] ✅ [API Ninjas] Nutrition data retrieved successfully
[2024-01-22T10:31:18.234Z] [Gemini API] Analyzing food for condition: "diabetes"
[2024-01-22T10:31:20.567Z] ✅ [Gemini API] Analysis complete
[2024-01-22T10:31:20.789Z] File cleanup: Deleted temporary image

Response:
{
  "success": true,
  "food_name": "Pepperoni Pizza",
  "nutrition": {
    "calories": 285,
    "protein_g": 12,
    "fat_total_g": 10.4,
    "carbohydrates_total_g": 36
  },
  "traffic_light": "yellow",
  "verdict_title": "Caution - High Carbs",
  "reason": "High in carbohydrates and moderate in fat. Can be eaten in moderation.",
  "suggestion": "Consider thin-crust pizza or smaller portion sizes.",
  "alternatives": [
    {
      "name": "Cauliflower Pizza",
      "why": "Low-carb alternative with similar taste"
    },
    {
      "name": "Whole Wheat Pizza",
      "why": "Better for blood sugar management"
    }
  ]
}
```

---

## Failed Request with Automatic Retry

```
$ curl -X POST http://localhost:3000/analyze \
  -F "image=@salad.jpg" \
  -F "condition=hypertension"

[2024-01-22T10:32:45.123Z] [Gemini API] Identifying food...
[2024-01-22T10:32:46.456Z] ⚠️ [Gemini API] Attempt 1 failed: Connection timeout
[2024-01-22T10:32:46.789Z] [Gemini API] Retry attempt 1/3 after 1000ms delay...
[2024-01-22T10:32:47.890Z] [Gemini API] Identifying food... (Retry 1)
[2024-01-22T10:32:49.123Z] ⚠️ [Gemini API] Attempt 2 failed: Network timeout
[2024-01-22T10:32:49.456Z] [Gemini API] Retry attempt 2/3 after 2000ms delay...
[2024-01-22T10:32:51.567Z] [Gemini API] Identifying food... (Retry 2)
[2024-01-22T10:32:53.890Z] ✅ [Gemini API] Success on attempt 3!
[2024-01-22T10:32:54.123Z] Food identified: "Garden Salad"
... (continues with normal processing)

Response:
{
  "success": true,
  "food_name": "Garden Salad",
  ... (rest of response)
}
```

---

## Network Error (No Retries After Max Attempts)

```
$ curl -X POST http://localhost:3000/analyze \
  -F "image=@dish.jpg" \
  -F "condition=diabetes"
# (Internet disconnected)

[2024-01-22T10:33:12.345Z] [API Ninjas] Fetching nutrition data...
[2024-01-22T10:33:13.678Z] ❌ [API Ninjas] Attempt 1 failed: ECONNREFUSED
[2024-01-22T10:33:13.789Z] [API Ninjas] Retry attempt 1/3 after 1000ms delay...
[2024-01-22T10:33:14.890Z] ❌ [API Ninjas] Attempt 2 failed: ECONNREFUSED
[2024-01-22T10:33:14.901Z] [API Ninjas] Retry attempt 2/3 after 2000ms delay...
[2024-01-22T10:33:16.912Z] ❌ [API Ninjas] Attempt 3 failed: ECONNREFUSED
[2024-01-22T10:33:16.923Z] [API Ninjas] Retry attempt 3/3 after 4000ms delay...
[2024-01-22T10:33:20.934Z] ❌ [API Ninjas] Failed after 3 retries: Connection refused
[2024-01-22T10:33:20.945Z] ❌ [Analyze] Nutrition data fetch failed
[2024-01-22T10:33:20.956Z] ⚠️ Continuing with analysis using empty nutrition data...
[2024-01-22T10:33:22.123Z] ✅ [Gemini API] Analysis complete
[2024-01-22T10:33:22.234Z] File cleanup: Deleted temporary image

Response:
{
  "success": true,
  "food_name": "Chicken Curry",
  "nutrition": {},  // ← Empty due to API failure
  "traffic_light": "yellow",
  "verdict_title": "Moderate - High Spice",
  "reason": "Rich in spices which can increase blood pressure.",
  "suggestion": "Reduce oil and sodium content.",
  "alternatives": [...]
}
```

---

## Invalid API Key Error (On Startup)

```
$ GEMINI_API_KEY=invalid npm run dev

❌ Error: Invalid or missing Gemini API key. Please check your configuration.
  at Object.<anonymous> (backend/services/googleservices.js:8:11)
  at Module._load (internal/modules/esm/loader.js:1027:27)
  ...

Error [InvalidAPIKeyError]: Invalid or missing Gemini API key. Please check your configuration.
  Code: INVALID_API_KEY
  Status: 401

⚠️ Server failed to start. Please fix the configuration and restart.
```

---

## Rate Limit Error (After Multiple Requests)

```
$ for i in {1..50}; do curl -X POST http://localhost:3000/analyze \
  -F "image=@food.jpg" -F "condition=diabetes"; done

[2024-01-22T10:34:01.123Z] [Gemini API] Processing request 1/50
[2024-01-22T10:34:02.456Z] ✅ Success
[2024-01-22T10:34:03.789Z] [Gemini API] Processing request 2/50
[2024-01-22T10:34:04.012Z] ✅ Success
...
[2024-01-22T10:34:15.345Z] [Gemini API] Processing request 25/50
[2024-01-22T10:34:16.678Z] ⚠️ Attempt 1 failed: Rate limit exceeded (429)
[2024-01-22T10:34:16.789Z] [Gemini API] Retry attempt 1/3 after 1000ms delay...
[2024-01-22T10:34:17.890Z] ⚠️ Attempt 2 failed: Still rate limited (429)
[2024-01-22T10:34:17.901Z] [Gemini API] Retry attempt 2/3 after 2000ms delay...
[2024-01-22T10:34:19.912Z] ⚠️ Attempt 3 failed: Still rate limited (429)
[2024-01-22T10:34:19.923Z] [Gemini API] Retry attempt 3/3 after 4000ms delay...
[2024-01-22T10:34:23.934Z] ✅ Success on final retry!
[2024-01-22T10:34:24.945Z] [Gemini API] Processing request 26/50
...

Response (after retries):
{
  "success": true,
  "message": "Request succeeded after retry due to rate limiting",
  ...
}
```

---

## Missing Input Validation

```
$ curl -X POST http://localhost:3000/analyze \
  -F "image=@food.jpg" \
  -F "condition="

[2024-01-22T10:35:12.345Z] [Analyze] Input validation starting...
[2024-01-22T10:35:12.456Z] ⚠️ Health condition is empty
[2024-01-22T10:35:12.567Z] File cleanup: Deleted temporary image

Response:
{
  "success": false,
  "error": {
    "message": "Health condition is required for analysis.",
    "code": "NO_CONDITION",
    "type": "Error"
  },
  "statusCode": 400
}
```

---

## Summary of Output Patterns

- ✅ Green checkmarks: Successful operations
- ⚠️ Yellow warnings: Retry attempts
- ❌ Red X marks: Failures
- ⏱️ Clock symbols: Timeout/delay information
- 📊 Data indicators: JSON responses
- 🔄 Retry indicators: Backoff delays and attempt counts

All error messages are **clear, actionable, and user-friendly**.

# API Error Handling & Retry Mechanism - Testing Guide

## Overview

The Nutrivigil backend now includes comprehensive error handling and automatic retry mechanisms for all external API calls (Gemini AI and API Ninjas). This ensures the application is more robust and provides user-friendly error messages.

## Features Implemented

### 1. **Centralized Error Handling**
- Converts raw API errors into user-friendly messages
- Distinguishes between different error types (network, rate limit, timeout, etc.)
- Provides clear error codes for debugging

### 2. **Automatic Retries with Exponential Backoff**
- Retries failed requests up to 3 times by default
- Backoff delays: 1s → 2s → 4s → ...
- Capped at 10 seconds maximum delay
- Intelligent retry logic: retries only on recoverable errors

### 3. **Timeout Protection**
- All API calls have 10-30 second timeouts
- Prevents hanging requests
- Clear timeout error messages

### 4. **Error Types**
- `NETWORK_ERROR` - Connection issues
- `TIMEOUT_ERROR` - Request exceeded time limit
- `RATE_LIMIT_ERROR` - Too many requests (429)
- `INVALID_API_KEY` - Missing/invalid credentials
- `VALIDATION_ERROR` - Bad input data
- `SERVER_ERROR` - API server issues

---

## Running Error Handling Tests

### Option 1: Run Test Script (Recommended for Quick View)

```bash
cd backend
node scripts/testErrorHandling.js
```

**Output:** Shows all error types and how they're formatted for users.

---

### Option 2: Test with Real API Calls

#### Prerequisites
1. Ensure `.env` file is set up in the `backend` folder:
```bash
GEMINI_API_KEY=your_key_here
NINJA_API_KEY=your_key_here
PORT=3000
NODE_ENV=development
```

2. Install dependencies:
```bash
cd backend
npm install
```

#### Start the Backend Server
```bash
npm run dev
```

The server runs on `http://localhost:3000`

---

## Testing Different Error Scenarios

### Test 1: Invalid API Key Error
**What it tests:** API key validation on startup

**Steps:**
1. Edit `.env` and set `GEMINI_API_KEY=invalid_key`
2. Run: `npm run dev`

**Expected Output:**
```
Error: Invalid or missing Gemini API key. Please check your configuration.
Code: INVALID_API_KEY
Status: 401
```

---

### Test 2: Network Connection Error
**What it tests:** Network failures and recovery

**Steps:**
1. Disconnect internet or block the API endpoint
2. Send request to `/analyze` endpoint
3. Observe console logs showing retry attempts

**Expected Output:**
```
[Network Error] Attempt 1 failed: Unable to connect to API Ninjas
[Network Error] Retry attempt 2/3 after 1000ms delay...
[Network Error] Retry attempt 3/3 after 2000ms delay...
[Network Error] Failed after 3 retries
```

**Client Response:**
```json
{
  "success": false,
  "error": {
    "message": "Network error connecting to API Ninjas. Please check your internet connection.",
    "code": "NETWORK_ERROR",
    "type": "NetworkError"
  },
  "statusCode": 503
}
```

---

### Test 3: Rate Limiting (429 Error)
**What it tests:** Rate limit handling and backoff

**To simulate:**
1. Use curl with a loop to send rapid requests:
```bash
for i in {1..50}; do curl -X POST http://localhost:3000/analyze -F "image=@test.jpg" -F "condition=diabetes"; done
```

**Expected Behavior:**
- Application retries with increasing delays
- Returns user-friendly message to client

**Client Response:**
```json
{
  "success": false,
  "error": {
    "message": "API Ninjas is currently busy. Please wait a moment and try again.",
    "code": "RATE_LIMIT_ERROR",
    "type": "RateLimitError"
  },
  "statusCode": 429
}
```

---

### Test 4: Timeout Error
**What it tests:** Request timeout handling

**Steps:**
1. Simulate slow API response:
```bash
# Use network throttling tools or modify timeout in code temporarily
```

**Expected Output:**
```
[Timeout] Request timed out after 30 seconds
```

**Client Response:**
```json
{
  "success": false,
  "error": {
    "message": "Request timed out. Please try again.",
    "code": "TIMEOUT_ERROR",
    "type": "TimeoutError"
  },
  "statusCode": 504
}
```

---

### Test 5: Invalid Input Error (400)
**What it tests:** Input validation

**Steps:**
```bash
curl -X POST http://localhost:3000/analyze \
  -F "image=@test.jpg" \
  -F "condition="  # Empty condition
```

**Expected Output:**
```json
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

### Test 6: Server Error (5xx)
**What it tests:** Server-side error handling

**Steps:**
1. API returns 500+ status
2. Observe automatic retries

**Client Response:**
```json
{
  "success": false,
  "error": {
    "message": "API is temporarily unavailable. Please try again later.",
    "code": "SERVER_ERROR",
    "type": "APIError"
  },
  "statusCode": 503
}
```

---

## Testing with Curl/Postman

### Basic Food Analysis Request
```bash
curl -X POST http://localhost:3000/analyze \
  -F "image=@path/to/food.jpg" \
  -F "condition=diabetes" \
  -H "Accept: application/json"
```

### With Verbose Error Output
```bash
curl -v -X POST http://localhost:3000/analyze \
  -F "image=@path/to/food.jpg" \
  -F "condition=asthma"
```

### Follow-up Query (After Analysis)
```bash
curl -X POST http://localhost:3000/analyze \
  -d '{"foodName":"rice","condition":"hypertension","query":"Can I eat brown rice instead?"}' \
  -H "Content-Type: application/json"
```

---

## Monitoring Logs

### Enable Debug Logging
```bash
# In .env
NODE_ENV=development
DEBUG=*
```

### Console Output Examples

**Successful Request:**
```
✅ [Gemini API] generateContent successful
✅ [API Ninjas] Nutrition data retrieved successfully
📊 Analysis complete for: Chicken Rice Bowl
```

**Failed Request with Retry:**
```
⚠️ [API Ninjas] Attempt 1 failed: Network timeout
⚠️ [API Ninjas] Retry attempt 2/3 after 1000ms delay...
✅ [API Ninjas] Success on retry attempt 2
```

**Critical Error:**
```
❌ [Analyze] Top-level error handler triggered
❌ Error Code: INVALID_API_KEY
❌ Status: 401
❌ Message: Invalid or missing Gemini API key
```

---

## Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "User-friendly message",
    "code": "ERROR_CODE",
    "type": "ErrorTypeName"
  },
  "statusCode": 500
}
```

---

## Successful Response Format

```json
{
  "success": true,
  "food_name": "Grilled Chicken",
  "nutrition": {
    "calories": 165,
    "protein_g": 31,
    "fat_total_g": 3.6,
    "carbohydrates_total_g": 0
  },
  "traffic_light": "green",
  "verdict_title": "Safe to eat",
  "reason": "High in protein, low in carbs, excellent for diabetes management",
  "suggestion": "A great choice for your condition",
  "alternatives": []
}
```

---

## Configuration Options

### Default Retry Config (in `backend/utils/retryHandler.js`)
```javascript
{
  maxRetries: 3,           // Number of retry attempts
  initialDelayMs: 1000,    // First retry delay
  maxDelayMs: 10000,       // Maximum delay cap
  backoffMultiplier: 2,    // Exponential backoff factor
  retryableStatusCodes: [408, 429, 500, 502, 503, 504]
}
```

### To customize retries, edit the service files:
- **Gemini:** `backend/services/googleservices.js`
- **API Ninjas:** `backend/services/ninjaServices.js`

---

## Key Files

| File | Purpose |
|------|---------|
| `backend/utils/apiErrorHandler.js` | Error types and parsing logic |
| `backend/utils/retryHandler.js` | Retry mechanism with exponential backoff |
| `backend/services/googleservices.js` | Gemini API wrapper with error handling |
| `backend/services/ninjaServices.js` | API Ninjas wrapper with error handling |
| `backend/controller/analyze.js` | Main controller using error handlers |
| `backend/scripts/testErrorHandling.js` | Comprehensive error testing |

---

## Troubleshooting

### Error: "API key not found"
**Solution:** Check `.env` file has correct keys set

### Error: "Module not found"
**Solution:** Run `npm install` in backend folder

### Error: "Cannot find port 3000"
**Solution:** Change PORT in `.env` or kill process using port 3000

### Error: "JSON parse error"
**Solution:** Ensure API responses are valid JSON; check logs for raw response

---

## Next Steps

1. ✅ Run the test script: `node scripts/testErrorHandling.js`
2. ✅ Start backend: `npm run dev`
3. ✅ Test with curl/Postman using examples above
4. ✅ Monitor console logs for error handling
5. ✅ Adjust retry config as needed for your use case

---

## Support

For issues with error handling:
1. Check console logs (enable `NODE_ENV=development`)
2. Review error code in response
3. Check API key validity
4. Verify internet connection
5. Check API quota/rate limits

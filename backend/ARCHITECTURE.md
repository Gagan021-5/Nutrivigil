# Error Handling Architecture & Flow

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT (Frontend)                          │
│                                                                 │
│  User uploads food image + health condition                     │
└────────────────────────┬────────────────────────────────────────┘
                         │ POST /analyze
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND - Error Handling Pipeline                  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. INPUT VALIDATION                                      │  │
│  │    - Check image file exists                             │  │
│  │    - Check health condition provided                     │  │
│  │    - Validate food query format                          │  │
│  └────────────────┬─────────────────────────────────────────┘  │
│                   │ ✅ Valid                                     │
│                   ▼                                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 2. IMAGE PROCESSING + FOOD IDENTIFICATION               │  │
│  │    with Gemini API                                       │  │
│  │                                                          │  │
│  │    ┌─────────────────────────────────────────────┐      │  │
│  │    │ retryWithTimeout()                          │      │  │
│  │    │ - Retry up to 3x with exponential backoff   │      │  │
│  │    │ - 30s timeout                               │      │  │
│  │    │ - Error parsing & logging                   │      │  │
│  │    └─────────────────────────────────────────────┘      │  │
│  └────────────────┬─────────────────────────────────────────┘  │
│                   │                                             │
│          ┌────────┴────────┐                                    │
│          │ ✅ Success     │ ❌ Error                            │
│          ▼                  ▼                                    │
│  ┌──────────────────┐  ┌──────────────────────────────────┐    │
│  │ Food Name        │  │ Error Type Detection             │    │
│  │ (e.g., "Rice")   │  │                                  │    │
│  └────────┬─────────┘  │ - NETWORK_ERROR (no connection)  │    │
│           │            │ - TIMEOUT_ERROR (>30s)           │    │
│           │            │ - RATE_LIMIT_ERROR (429)         │    │
│           │            │ - INVALID_API_KEY (401)          │    │
│           │            │ - SERVER_ERROR (5xx)             │    │
│           │            │ - VALIDATION_ERROR (400)         │    │
│           │            │                                  │    │
│           │            │ Retryable? → Retry with backoff  │    │
│           │            │ Non-Retryable? → Return error    │    │
│           │            └──────────┬───────────────────────┘    │
│           │                       ▼                             │
│           │            ┌──────────────────────┐                │
│           │            │ formatErrorResponse()│                │
│           │            │                      │                │
│           │            │ Client receives:     │                │
│           │            │ {                    │                │
│           │            │   success: false,    │                │
│           │            │   error: {           │                │
│           │            │     message: "...",  │                │
│           │            │     code: "...",     │                │
│           │            │     type: "..."      │                │
│           │            │   },                 │                │
│           │            │   statusCode: 429    │                │
│           │            │ }                    │                │
│           │            └──────────────────────┘                │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 3. GET NUTRITION DATA - API Ninjas                       │  │
│  │                                                          │  │
│  │    ┌─────────────────────────────────────────────┐      │  │
│  │    │ retryWithTimeout(getNutritionData)          │      │  │
│  │    │ - Query: "Rice"                             │      │  │
│  │    │ - Retry up to 3x                            │      │  │
│  │    │ - 15s timeout                               │      │  │
│  │    └─────────────────────────────────────────────┘      │  │
│  └────────────────┬─────────────────────────────────────────┘  │
│                   │                                             │
│          ┌────────┴────────┐                                    │
│          │ ✅ Got Data   │ ⚠️ Error (non-blocking)            │
│          ▼                 ▼                                    │
│  ┌──────────────────┐  ┌───────────────────┐                  │
│  │ Nutrition Data:  │  │ Log error         │                  │
│  │ Calories: 206    │  │ Continue anyway   │                  │
│  │ Protein: 4.3g    │  │ Use empty {}      │                  │
│  │ ...              │  └────────┬──────────┘                  │
│  └────────┬─────────┘           │                             │
│           └───────────┬─────────┘                             │
│                       ▼                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 4. ANALYZE WITH GEMINI AI                               │  │
│  │    Based on: Nutrition Data + Health Condition           │  │
│  │                                                          │  │
│  │    ┌─────────────────────────────────────────────┐      │  │
│  │    │ retryWithTimeout(generateContent)           │      │  │
│  │    │ - Retry up to 3x                            │      │  │
│  │    │ - 30s timeout                               │      │  │
│  │    └─────────────────────────────────────────────┘      │  │
│  └────────────────┬─────────────────────────────────────────┘  │
│                   │                                             │
│          ┌────────┴────────┐                                    │
│          │ ✅ Analysis    │ ❌ Error                           │
│          ▼                  ▼                                    │
│  ┌──────────────────┐  └──► formatErrorResponse()              │
│  │ Traffic Light:   │      → Client receives error             │
│  │ - Green (safe)   │                                          │
│  │ - Yellow (caution)                                          │
│  │ - Red (avoid)    │                                          │
│  │                  │                                          │
│  │ With reasoning & │                                          │
│  │ alternatives     │                                          │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 5. CLEANUP & RESPONSE                                   │  │
│  │    - Delete uploaded image file (finally block)          │  │
│  │    - Send JSON response to client                        │  │
│  └────────────────┬─────────────────────────────────────────┘  │
│                   │                                             │
│                   ▼                                             │
└─────────────────────────────────────────────────────────────────┘
                         │
                         ▼
          ┌──────────────────────────────────┐
          │    CLIENT RECEIVES RESPONSE      │
          │                                  │
          │ Success (200):                   │
          │ {                                │
          │   success: true,                 │
          │   food_name: "Rice",             │
          │   traffic_light: "green",        │
          │   ...                            │
          │ }                                │
          │                                  │
          │ Error (4xx/5xx):                 │
          │ {                                │
          │   success: false,                │
          │   error: {                       │
          │     message: "User-friendly",    │
          │     code: "ERROR_CODE",          │
          │     type: "ErrorType"            │
          │   },                             │
          │   statusCode: 429                │
          │ }                                │
          └──────────────────────────────────┘
```

## Error Handling Flow

```
API Call Initiated
       │
       ▼
┌─────────────────────┐
│ retryWithTimeout()  │
└──────────┬──────────┘
           │
           ├─────────────────────────────────────┐
           │ Attempt 1                           │
           ▼                                     │
      ┌─────────────────────┐                   │
      │ Execute API Call    │                   │
      │ (with 10-30s timeout)                   │
      └────────┬────────────┘                   │
               │                                │
        ┌──────┴──────┐                         │
        │ Success?    │                         │
        ▼             ▼                         │
       YES            NO                        │
        │              │                        │
        │         ┌────────────────┐            │
        │         │ isRetryable?   │            │
        │         └────┬───────┬───┘            │
        │              │       │                │
        │          YES │       │ NO             │
        │              ▼       ▼                │
        │         Retry     Error               │
        │          +1       Response            │
        │              │                        │
        │              ▼                        │
        │         ┌──────────────┐              │
        │         │ Delay 1s × 2^│              │
        │         │ (Backoff)    │              │
        │         └──────┬───────┘              │
        │                │                      │
        │                └──────────┬───────────┘
        │                           │
        │                    Attempt 2, 3...
        │                           │
        └───────────────────────────┘
                     │
                     ▼
            ┌──────────────────────┐
            │ Return Success or    │
            │ throw ParsedError    │
            └──────────────────────┘
```

## Error Type Decision Tree

```
                    Error Occurred
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
    No Response             HTTP Response
        │                        │
        ├─ ECONNABORTED ──┐      ├─ 400 ────→ ValidationError
        ├─ ENOTFOUND ──┐  │      ├─ 401 ────→ InvalidAPIKeyError
        ├─ ECONNREFUSED ┼─┼──┐   ├─ 408 ────→ TimeoutError
        ├─ ETIMEDOUT ──┘  │  │   ├─ 429 ────→ RateLimitError
        │                 │  │   ├─ 500+ ───→ ServerError
        └─ (Other) ───────┤  │   └─ (Other)→ APIError
                          │  │
                          ▼  ▼
                      NetworkError
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
    Retryable?                         Return Error
        │                              to Client
        ├─ YES ───→ Retry with backoff
        │
        └─ NO ─────→ Return Error
                    to Client
```

## Backoff Illustration

```
Timeline (Seconds)
│
0│  ●─────────── Attempt 1 (fails)
│  
1│  ⏰ Wait 1s
2│  ●─────────── Attempt 2 (fails)
│  
4│  ⏰ Wait 2s
6│  ●─────────── Attempt 3 (fails)
│  
10 ⏰ Wait 4s
14 ●─────────── Attempt 4 (fails)
│  
22 ⏰ Wait 8s (capped at 10s) ← Would be 8s, under cap
│  
32 ✅ Success / Return Error
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                    Controller (analyze.js)                  │
│                                                             │
│  - Validates input                                          │
│  - Orchestrates API calls                                   │
│  - Handles overall flow                                     │
│  - Wraps errors for client response                         │
└────────────┬──────────────────────────────────────────┬────┘
             │                                          │
             ▼                                          ▼
   ┌──────────────────────┐            ┌──────────────────────────┐
   │ Google Services      │            │ Ninja Services           │
   │ (googleservices.js)  │            │ (ninjaServices.js)       │
   │                      │            │                          │
   │ generateGeminiContent│            │ getNutritionData         │
   │ - Retry wrapper      │            │ - Retry wrapper          │
   │ - Error parsing      │            │ - Error parsing          │
   │ - Timeout            │            │ - Timeout                │
   └───────────┬──────────┘            └───────────┬──────────────┘
               │                                   │
               ▼                                   ▼
   ┌──────────────────────────┐    ┌──────────────────────────────┐
   │ Retry Handler            │    │ API Error Handler            │
   │ (retryHandler.js)        │    │ (apiErrorHandler.js)         │
   │                          │    │                              │
   │ - retryAPICall()         │    │ - parseAxiosError()          │
   │ - retryWithTimeout()     │    │ - parseGeminiError()         │
   │ - calculateBackoff()     │    │ - formatErrorResponse()      │
   │ - isRetryableError()     │    │ - Error classes              │
   │ - sleep()                │    │ - logError()                 │
   └──────────────────────────┘    └──────────────────────────────┘
               │                                   │
               └───────────────┬───────────────────┘
                               │
                               ▼
                       Client Response JSON
```

## State Transitions

```
                          ┌─────────────────────────────┐
                          │   Initial Request Received  │
                          │   (POST /analyze)           │
                          └──────────────┬──────────────┘
                                         │
                          ┌──────────────▼──────────────┐
                          │   Input Validation          │
                          │   - File? Condition?        │
                          └──────────────┬──────────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    │ Error             │ Valid               │
                    ▼                    ▼                    ▼
            ┌──────────────┐    ┌──────────────┐   ┌──────────────┐
            │ Return 400   │    │ Food ID      │   │ Follow-up    │
            │ Response     │    │ (Gemini)     │   │ Query        │
            └──────────────┘    └──────────────┘   │ (Gemini)     │
                                       │            └──────────────┘
                          ┌────────────┴────────────┐
                          │                         │
                          ▼                         ▼
                    ┌──────────────┐        ┌──────────────┐
                    │ Nutrition    │        │ Analyze      │
                    │ (API Ninjas) │        │ (Gemini)     │
                    └──────────────┘        └──────────────┘
                          │                         │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │  Combine Results        │
                          │  Format Response        │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │  Cleanup Files          │
                          │  (finally block)        │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │  Return JSON to Client  │
                          │  Success or Error       │
                          └────────────────────────┘
```

This architecture ensures:
- ✅ Automatic recovery from transient failures
- ✅ Clear user-friendly error messages
- ✅ Centralized error handling logic
- ✅ Easy to test and debug
- ✅ Production-ready reliability

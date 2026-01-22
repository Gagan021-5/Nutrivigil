<h1 align="center">NutriVigil</h1>

<p align="center">
  <img src="https://img.shields.io/badge/AI%20Food%20Scan-Gemini%20v2.5-5859EA?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Nutrition%20Facts-API%20Ninjas-18D89E?style=for-the-badge&logo=nutanix&logoColor=white" />
  <img src="https://img.shields.io/badge/Express%20API-FFD600?style=for-the-badge&logo=express&logoColor=black" />
  <img src="https://img.shields.io/badge/Multer%20Uploads-F7B731?style=for-the-badge&logo=upload&logoColor=white" />
</p>

---

<p align="center">
  <strong>An AI-powered nutrition analysis application using the Gemini v2.5 API.</strong><br>
  <em>Educational project demonstrating the integration of Computer Vision and Large Language Models for dietary health analysis.</em>
</p>

---

<div align="center">
  <img src="https://image2url.com/images/1763887204703-5c90a51a-5fec-45a3-b6ce-c25e7acba923.png" width="45%" alt="Food Analysis Screen"/>
  &nbsp;
  <img src="https://image2url.com/images/1763887449739-167e9658-ae5c-4223-beec-ed112f5ae824.png" width="45%" alt="Personalized Traffic Light Safety"/>
</div>

---

## 📂 Project Overview

NutriVigil is a full-stack web application designed to analyze food images and provide nutritional data. It leverages **Google's Gemini v2.5** for image recognition and the **API Ninjas Nutrition database** for caloric breakdown.

**Key Technical Features:**
- **AI Integration:** Implements Gemini API for food recognition from user-uploaded images.
- **Health Algorithm:** Custom logic to cross-reference food data with user health conditions (Diabetes, Hypertension, etc.).
- **Data Visualization:** Renders macro/micronutrients using responsive charts.
- **RESTful Architecture:** Express.js backend handling secure API calls and file uploads via Multer.

---

## 🛠️ Tech Stack

| Frontend                   | Backend                      | Intelligence & Data         |
|:--------------------------:|:---------------------------:|:--------------------------:|
| ⚛️ React (Vite)            | 🖥️ Node.js + Express        | 🤖 Gemini AI v2.5 (Google) |
| 🎨 Tailwind CSS            | 🗂️ Multer (File Handling)   | 🥗 API Ninjas Nutrition    |
| 🗃️ Lucide React            | 🚦 Custom Middleware         | 🔒 Axios                   |

---

## 🗺️ System Architecture

```mermaid
graph TD
  U[🧑 User] -->|Upload Image| FE[⚛️ NutriVigil Frontend]
  FE -->|API Request| BE[🖥️ Express Backend]
  BE -->|Image Analysis| AI[🤖 Gemini 2.5]
  BE -->|Fetch Data| API[🥗 API Ninjas]
  BE -->|Process Logic| LOGIC[🚦 Health Algorithm]
  FE -->|Render Data| UX[UI Components]

```
## Local Installation 
NutriVigil/
 ├─ frontend/       # React + Vite + Tailwind
 ├─ backend/        # Node.js + Express + Multer
 └─ README.md

 ## APIs Required
 To replicate this project, you will need your own API keys:

1. Gemini API Key: Google AI Studio
2. API Ninjas Key: API Ninjas Nutrition

---

## Project Structure 

```

Nutrivigil/
│
├── backend/                               # Backend server handling API and AI processing
│   ├── controller/                        # Contains request handling logic
│   │   └── analyze.js                     # Main controller to analyze uploaded food images
│   │
│   ├── middleware/                        # Middleware functions for request processing
│   │   └── upload.js                      # Handles image uploads (e.g., using Multer)
│   │
│   ├── services/                          # External service integrations
│   │   └── googleservices.js              # Connects to Google Gemini / AI services
│   │
│   ├── utils/                             # Helper utility functions
│   │   ├── getmimetype.js                 # Detects MIME type of uploaded files
│   │   ├── imgconversion.js               # Converts images to required formats
│   │   └── parseGeminiJson.js             # Parses AI-generated JSON responses
│   │
│   ├── .gitignore                         # Ignores backend node_modules and env files
│   ├── index.js                           # Entry point of the backend server
│   ├── package.json                       # Backend dependencies and scripts
│   └── package-lock.json                  # Locked dependency versions
│
├── frontend/                              # Frontend React + Vite application
│   ├── src/
│   │   ├── assets/                        # Static assets like images
│   │   │   └── nutrivigile.jpeg           # App logo / banner image
│   │   │
│   │   ├── components/                    # Reusable UI components
│   │   │   ├── Footer.jsx                 # Footer component
│   │   │   ├── LanguagePicker.jsx         # Language selection component
│   │   │   ├── Navbar.jsx                 # Navigation bar component
│   │   │   └── VoiceQuery.jsx             # Voice-based food query component
│   │   │
│   │   ├── contexts/                      # React Context for global state
│   │   │   └── ThemeContext.jsx           # Manages light/dark theme
│   │   │
│   │   ├── hooks/                         # Custom React hooks
│   │   │   └── useThemeTranslation.js     # Combines theme and language logic
│   │   │
│   │   ├── i18n/                          # Multi-language translation setup
│   │   │   ├── locales/                   # Language JSON files
│   │   │   └── index.js                   # i18n configuration
│   │   │
│   │   ├── pages/                         # Application pages
│   │   │   ├── Home.jsx                   # Landing page
│   │   │   ├── Profile.jsx                # User profile page
│   │   │   └── ScanPage.jsx               # Food image scanning page
│   │   │
│   │   ├── App.jsx                        # Root React component
│   │   ├── index.css                      # Global styles
│   │   └── main.jsx                       # Frontend entry point
│   │
│   ├── index.html                         # Main HTML template
│   ├── nutrivigile.jpeg                  # Additional image asset
│   ├── package.json                       # Frontend dependencies and scripts
│   ├── package-lock.json                  # Locked dependency versions
│   ├── vite.config.js                     # Vite build configuration
│   └── .gitignore                         # Ignores frontend node_modules
│
├── .gitignore                             # Global git ignore rules
├── CODE-OF-CONDUCT.md                     # Community behavior guidelines
├── CONTRIBUTING.md                        # Contribution instructions
├── License.md                             # License information
├── MIT LICENSE.md                         # MIT license text
├── README.md                              # Project documentation
├── SECURITY.md                            # Security policy
└── package-lock.json                      # Root lock file (if present)


```
---

# 🥗 NutriVigil

**NutriVigil** is an AI-powered nutrition analysis web application that analyzes food images and provides nutritional insights using computer vision and large language models.

This is an educational full-stack project demonstrating the integration of:

+ Image understanding via Google Gemini v2.5
+ Nutrition data from API Ninjas
+ A modern React + Node.js architecture

## 📌 Project Overview

NutriVigil allows users to upload food images and receive:

* Identified food items
* Estimated nutritional breakdown
* Contextual health insights based on user conditions (e.g., diabetes, hypertension)

The project focuses on clarity, modularity, and responsible API usage, rather than production-grade medical claims.

## ✨ Key Features

### 🧠 AI-based Food Recognition
Uses Google Gemini v2.5 to analyze uploaded food images.

### 🥗 Nutrition Breakdown
Fetches calorie and macro data via API Ninjas Nutrition database.

### 🚦 Health Context Logic
Custom rules to interpret food impact based on user health conditions.

### 📊 Data Visualization
Responsive charts for macro and micronutrients.

### 🌍 Multi-Language Support
Internationalization (i18n) support on the frontend.

### 🔐 Secure API Handling
Backend handles all API calls securely using environment variables.

## 🛠️ Tech Stack
**Frontend**

+ ⚛️ React (Vite)
+ 🎨 Tailwind CSS
+ 🗂️ Lucide React
+ 🌐 i18n (multi-language support)

**Backend**

+ 🖥️ Node.js + Express
+ 🗂️ Multer (image uploads)
+ 🔒 Axios
+ 🚦 Custom middleware

**AI & Data**

+ 🤖 Google Gemini v2.5 API
+ 🥗 API Ninjas Nutrition Database

## 🗺️ System Architecture
Frontend (React + Vite)
        |
        |  HTTP requests (image + metadata)
        v
Backend (Node.js + Express)
        |
        |  AI + Nutrition API calls
        v
Gemini API + API Ninjas

```bash
# Check that .env is listed in .gitignore
cat .gitignore | grep ".env"
```
## Local Installation and Setup

### 📌 Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git
- Modern web browser (Chrome/Firefox recommended)

### 📥 Step 1: Clone the Repository
1. Open terminal
2. Run:
```bash
git clone https://github.com/Gagan021-5/Nutrivigil.git
cd Nutrivigil

```
### Add Backend/Frontend Installation

```markdown
### 📦 Step 2: Install Dependencies

#### Backend
cd backend
npm install

#### Frontend
cd frontend
npm install

```
---

###  Add Running Commands

```markdown
### Step 3:Run the Application

#### Start Backend Server
cd backend
npm start

#### Start Frontend Server
cd frontend
npm run dev


```

All sensitive operations and API keys are handled server-side.

## 📂 Project Structure
NutriVigil/
│
├── backend/
│   ├── controller/
│   │   └── analyze.js
│   ├── middleware/
│   │   └── upload.js
│   ├── services/
│   │   └── googleservices.js
│   ├── utils/
│   │   ├── getmimetype.js
│   │   ├── imgconversion.js
│   │   └── parseGeminiJson.js
│   ├── index.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── flags/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── i18n/
│   │   ├── pages/
│   │   ├── utils/
│   │   │   └── languageMap.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── CODE-OF-CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── License.md
├── MIT LICENSE.md
└── README.md


⚠️ Note: Previous screenshots and outdated structure references have been intentionally removed to avoid confusion.

## 🔐 Security & Environment Setup
**Required API Keys**

You will need:
+ Google Gemini API key
+ API Ninjas Nutrition API key

**Environment Setup (Backend)**
**Step 1:** Create .env file
```bash
cd backend
```
```bash
cp .env.example .env
```

**Step 2:** Add your keys
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_actual_gemini_key_here
NINJA_API_KEY=your_actual_api_ninjas_key_here

**Step 3:** Verify .env is ignored
cat .gitignore | grep ".env"

## ✅ Security Best Practices

✔️ API keys are never committed to version control
✔️ .env is ignored via .gitignore
✔️ .env.example documents required variables
✔️ Keys should be rotated regularly
✔️ Production secrets should use platform-level secret managers

## 🚀 Local Installation
Backend
```bash
cd backend
npm install
npm run dev
```

```bash
Frontend
cd frontend
npm install
npm run dev
```

## ⚠️ Disclaimer

NutriVigil is an educational project and should not be used as a medical diagnostic tool. All nutritional outputs are estimations and intended for learning purposes only.

## 🤝 Contributing

Contributions are welcome.
Please read CONTRIBUTING.md before opening issues or pull requests.

## 📜 License

This project is licensed under the MIT License.

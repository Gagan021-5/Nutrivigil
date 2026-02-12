# 🥗 NutriVigil

**NutriVigil** is an AI-powered nutrition analysis web application that analyzes food images and provides nutritional insights using computer vision and large language models.

This is an educational full-stack project demonstrating the integration of:

* Image understanding via Google Gemini v2.5
* Nutrition data from API Ninjas
* A modern React + Node.js architecture

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

### 🔄 Robust Error Handling
Advanced retry logic and error recovery mechanisms for API interactions.

## 🛠️ Tech Stack

**Frontend**
* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🗂️ Lucide React
* 🌐 i18n (multi-language support)

**Backend**
* 🖥️ Node.js + Express
* 🗂️ Multer (image uploads)
* 🔒 Axios
* 🚦 Custom middleware
* ⚡ Advanced error handling & retry logic

**AI & Data**
* 🤖 Google Gemini v2.5 API
* 🥗 API Ninjas Nutrition Database

## 🗺️ System Architecture

```
Frontend (React + Vite)
        |
        | HTTP requests (image + metadata)
        v
Backend (Node.js + Express)
        |
        | AI + Nutrition API calls
        v
Gemini API + API Ninjas
```

## 📂 Project Structure

```
NutriVigil/
│
├── backend/
│   ├── controller/
│   │   └── analyze.js                 # Main analysis controller
│   ├── middleware/
│   │   └── upload.js                  # Image upload handler
│   ├── services/
│   │   ├── googleservices.js          # Gemini API integration
│   │   └── ninjaServices.js           # API Ninjas integration
│   ├── utils/
│   │   ├── apiErrorHandler.js         # Centralized error handling
│   │   ├── retryHandler.js            # API retry logic
│   │   ├── getmemetype.js             # MIME type detection
│   │   ├── imgconversion.js           # Image format conversion
│   │   └── parseGeminiJson.js         # Gemini response parser
│   ├── scripts/
│   │   └── testErrorHandling.js       # Error handling test suite
│   ├── index.js                       # Server entry point
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── flags/                 # Language flag icons
│   │   ├── components/                # Reusable React components
│   │   ├── contexts/                  # React context providers
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── i18n/                      # Translation files
│   │   ├── pages/                     # Page components
│   │   ├── utils/
│   │   │   └── languageMap.js         # Language mapping utility
│   │   ├── App.jsx                    # Main App component
│   │   └── main.jsx                   # Application entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore rules
├── CODE-OF-CONDUCT.md                 # Community guidelines
├── CONTRIBUTING.md                    # Contribution guidelines
├── SECURITY.md                        # Security policies
├── LICENSE                            # MIT License
└── README.md                          # This file
```

## 📋 Prerequisites

* Node.js (v14 or higher)
* npm (comes with Node.js)
* Git
* Modern web browser (Chrome/Firefox recommended)

## 🚀 Local Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Gagan021-5/Nutrivigil.git
cd Nutrivigil
```

### Step 2: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Step 3: Environment Configuration

See [ENV_QUICKSTART.md](./ENV_QUICKSTART.md) for detailed setup instructions.

**Quick Setup:**

1. Navigate to backend directory:
```bash
cd backend
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Add your API keys to `.env`:
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_actual_gemini_key_here
NINJA_API_KEY=your_actual_api_ninjas_key_here
```

4. Verify `.env` is ignored by Git:
```bash
cat .gitignore | grep ".env"
```

### Step 4: Run the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3000`

#### Start Frontend Server
Open a new terminal:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 🔐 Security & Environment Setup

### Required API Keys

You will need:
* **Google Gemini API key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
* **API Ninjas Nutrition API key** - Get from [API Ninjas](https://api-ninjas.com/)

### Security Best Practices

✔️ API keys are never committed to version control  
✔️ `.env` is ignored via `.gitignore`  
✔️ `.env.example` documents required variables  
✔️ Keys should be rotated regularly  
✔️ Production secrets should use platform-level secret managers  

## 📚 Documentation

* **[START_HERE.md](./START_HERE.md)** - Quick start guide for new contributors
* **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute to this project
* **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete documentation index
* **[ENV_QUICKSTART.md](./ENV_QUICKSTART.md)** - Environment setup guide
* **[SECURITY.md](./SECURITY.md)** - Security policies and guidelines
* **[CODE-OF-CONDUCT.md](./CODE-OF-CONDUCT.md)** - Community code of conduct

## 🧪 Testing

### Backend Error Handling Tests
```bash
cd backend
node scripts/testErrorHandling.js
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Module Not Found**
```bash
# Reinstall dependencies
cd backend && npm install
cd ../frontend && npm install
```

**API Key Issues**
- Verify your `.env` file is in the `backend/` directory
- Check that API keys are correctly copied (no extra spaces)
- Ensure `.env` follows the format in `.env.example`

## ⚠️ Disclaimer

NutriVigil is an educational project and should not be used as a medical diagnostic tool. All nutritional outputs are estimations and intended for learning purposes only.

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines before opening issues or pull requests.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Hall of Contributors

A huge thanks to all the amazing people who have contributed to NutriVigil! 🌟

<a href="https://github.com/Gagan021-5/Nutrivigil/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Gagan021-5/Nutrivigil" />
</a>

**Want to see your name here?** Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) and start contributing!

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check existing documentation in [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
- Review [troubleshooting](#-troubleshooting) section

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---
<div align="center"> 

**Built with ❤️ for learning and education**

</div>
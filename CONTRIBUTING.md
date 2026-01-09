## Contributing to NutriVigil 🥗

Thank you for your interest in contributing to NutriVigil!
We welcome contributors of all experience levels, especially beginners participating in Social Winter of Code (SWOC).

This guide is designed to help you get started smoothly, avoid common mistakes, and understand what is expected when contributing to this repository.

## 📌 Before You Start

Before contributing, please ensure that you:

* Have Git and Node.js (v18+) installed
* Read the README.md to understand the project goals and structure
* Browse existing Issues to avoid duplicate work
* Comment on an issue and get it assigned before starting work

**⚠️ Please do not open a Pull Request without being assigned to an issue.**

## 🛠️ Tech Stack Overview
Frontend

* React (Vite)
* Tailwind CSS
* Lucide Icons

Backend

* Node.js
* Express
* Multer
* Gemini AI
* API Ninjas

## 🚀 Contribution Workflow (Step-by-Step)
1️⃣ Fork the Repository

Click the Fork button on the top-right of this repository.

2️⃣ Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/NutriVigil.git
cd NutriVigil
```

3️⃣ Create a Feature Branch

Always create a new branch for your work.
```bash
git checkout -b feature/short-description
```

Example:
```bash
git checkout -b feature/add-dictionary-app
```

4️⃣ Make Your Changes

* Follow the existing folder structure
* Keep changes focused on the assigned issue
* Write clean, readable, and commented code where necessary

5️⃣ Commit Your Changes

Write clear and meaningful commit messages.
```bash
git commit -m "Add dictionary app using HTML, CSS, and JS"
```

Avoid vague messages like fix bug or update code.

6️⃣ Push to Your Fork
```bash
git push origin feature/short-description
```

7️⃣ Open a Pull Request

* Open a PR against the main branch
* Link the issue using Closes #issue-number
* Clearly explain what you changed and why

## 💻 Local Development Setup
***Frontend Setup***
```bash
cd frontend
npm install
npm run dev
```

***Backend Setup***
```bash
cd backend
npm install
npm run dev
```

Environment Variables

* Copy .env.example to .env
* Add required API keys (Gemini, API Ninjas)
* Never commit .env files

🧩 Issue Selection Guidelines (Important for SWOC)
✅ How to Choose an Issue

Look for issues labeled:

+ good first issue
+ beginner-friendly
+ SWOC

### Read the issue description carefully
### Ask questions before starting if anything is unclear

## ❌ When NOT to Open a PR

* If the issue is not assigned to you
* If someone else is already working on it
* If the issue is marked as in progress
* If you want to add an unapproved feature

## 🧑‍💻 Coding & Style Guidelines

* Follow the existing folder structure
* Use meaningful variable and function names
* Avoid unnecessary dependencies
* Keep components small and reusable
* Ensure the app builds without errors
* Do not introduce breaking changes

## 🔍 Pull Request Checklist

Before submitting a PR, make sure:

 * Code builds and runs locally
 * Changes are limited to the assigned issue
 * No unnecessary files are added
 * UI changes include screenshots (if applicable)
 * PR references the correct issue
 * PR description clearly explains the changes

## 🤝 Communication & Conduct

* Be respectful and constructive in all discussions
* Ask questions if you’re stuck — that’s encouraged
* Follow the project’s Code of Conduct

***📄 See: CODE_OF_CONDUCT.md***

Unacceptable behavior will not be tolerated.

## 🌱 Notes for SWOC Contributors

* Quality > Quantity
* One well-done PR is better than multiple rushed ones
* Incomplete or low-effort PRs may be closed without review
* Maintainers may request changes — this is part of the learning process
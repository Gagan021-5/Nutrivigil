# ⚡ Quick Start - Environment Setup

## TL;DR (For Impatient Contributors)

### Step 1: Copy Template
```bash
cd backend
cp .env.example .env
```

### Step 2: Get API Keys
- 🔑 Gemini: https://ai.google.dev/ → Get API Key
- 🔑 API Ninjas: https://api-ninjas.com/ → Get API Key

### Step 3: Edit .env
```bash
# Edit backend/.env and add your keys:
GEMINI_API_KEY=your_key_here
NINJA_API_KEY=your_key_here
PORT=3000
NODE_ENV=development
```

### Step 4: Never Commit!
✅ `.env` is already in `.gitignore`  
✅ Always use `.env.example` for documentation  

### Step 5: Run
```bash
npm install
npm run dev
```

---

## What's Inside .env.example?

```env
# Backend Configuration
PORT=3000

# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
NINJA_API_KEY=your_api_ninjas_key_here

# Environment
NODE_ENV=development
```

---

## Getting Your Keys

### Gemini API (Google)
1. Visit: https://ai.google.dev/
2. Click "Get API Key"
3. Create new project or use existing
4. Copy your API key
5. Paste in `.env` as `GEMINI_API_KEY`

### API Ninjas
1. Sign up: https://api-ninjas.com/
2. Go to dashboard
3. Create new API key
4. Paste in `.env` as `NINJA_API_KEY`

---

## Common Issues

### Issue: "Cannot find module 'dotenv'"
**Solution**: Run `npm install` in backend directory

### Issue: "GEMINI_API_KEY is undefined"
**Solution**: 
- Check `.env` file exists in `backend/` directory
- Verify keys are correctly set (no extra spaces/quotes)
- Restart the server

### Issue: "401 Unauthorized from API Ninjas"
**Solution**:
- Verify `NINJA_API_KEY` is correct
- Check key hasn't expired in API Ninjas dashboard

---

## Security Reminders

🔒 **DO:**
- ✅ Use `.env` file for local development
- ✅ Keep `.env` in `.gitignore`
- ✅ Use platform secrets for production
- ✅ Rotate keys regularly

🔒 **DON'T:**
- ❌ Commit `.env` files
- ❌ Share API keys via email/chat
- ❌ Hardcode keys in code
- ❌ Post keys in issues/PRs

---

## Production Deployment

### Render.com
```
Dashboard → Environment Variables
Add: GEMINI_API_KEY, NINJA_API_KEY, PORT, NODE_ENV
Deploy ✓
```

### Docker
```dockerfile
ENV GEMINI_API_KEY=${GEMINI_API_KEY}
ENV NINJA_API_KEY=${NINJA_API_KEY}
```

### Vercel/Other
Use platform's environment variable configuration

---

Need help? See [SECURITY.md](SECURITY.md) or [README.md](README.md#-security--environment-setup)

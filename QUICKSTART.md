# ⚡ Quick Start Guide

Get the Decision Navigator app running in **5 minutes**!

## Prerequisites

- Node.js 18+ installed
- A code editor (VS Code recommended)
- 5 minutes to get free API keys

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Get API Keys (3 mins)

### Required: Groq AI (1 min)
1. Open https://console.groq.com in new tab
2. Click "Sign Up" (can use GitHub/Google)
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy the key (starts with `gsk_`)

### Required: TMDB (2 mins)
1. Open https://www.themoviedb.org/signup
2. Sign up for free account
3. Verify your email
4. Go to Settings → API
5. Click "Request an API Key"
6. Choose "Developer"
7. Fill the form (put website as "http://localhost:8080")
8. Copy the API Key (v3 auth)

## Step 3: Configure Environment (30 sec)

```bash
# Copy the example file
cp .env.example .env

# Open .env in your editor
# Paste your keys:
VITE_GROQ_API_KEY=gsk_your_actual_key_here
VITE_TMDB_API_KEY=your_actual_key_here
```

## Step 4: Run the App (10 sec)

```bash
npm run dev
```

Visit http://localhost:8080

## Step 5: Test It! (30 sec)

1. Click on "TD²" or "Apps"
2. Select "Entertainment" category
3. Answer the survey questions
4. Watch AI magic happen! ✨

---

## 🎉 That's It!

The app is now fully functional with:
- ✅ AI-powered recommendations
- ✅ Real movie/TV data from TMDB
- ✅ Beautiful images (via Unsplash Source)
- ✅ Personalized results based on your answers

## Optional: Add More APIs

Want even better results?

### Unsplash (better images)
```
VITE_UNSPLASH_ACCESS_KEY=your_key
```
Get key at: https://unsplash.com/developers

### Yelp (real restaurants)
```
VITE_YELP_API_KEY=your_key
```
Get key at: https://www.yelp.com/developers
*Note: Needs CORS proxy - see CORS_PROXY_GUIDE.md*

---

## Troubleshooting

**Port 8080 already in use?**
```bash
# Kill the process
lsof -ti:8080 | xargs kill

# Or edit vite.config.ts to use different port
```

**"API key not configured" error?**
1. Check .env file exists
2. Check keys are pasted correctly (no extra spaces)
3. Restart the dev server (Ctrl+C, then `npm run dev`)

**Still having issues?**
See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed troubleshooting.

---

## Next Steps

- 📖 Read [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed API docs
- 🔧 Check [MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md) to understand the architecture
- 🚀 Explore the code in `src/services/` to see how it works
- 🎨 Customize the UI in `src/components/`

Enjoy building with AI! 🤖✨

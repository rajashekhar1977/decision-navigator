# Backend Integration Setup Guide

This guide will help you set up the real backend APIs for the Decision Navigator application.

## Overview

The application now uses **real AI and data APIs** instead of mock data:

- **Groq AI** (Llama 3.3) - For intelligent recommendations
- **TMDB** - For entertainment (movies/TV shows) data
- **Yelp Fusion** - For restaurant and food data
- **Unsplash** - For high-quality images
- **Amadeus** - For travel data (optional)

## Quick Start

### 1. Copy Environment File

```bash
cp .env.example .env
```

### 2. Get Your API Keys

#### **Required: Groq API** (Free)
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy and paste into `.env` as `VITE_GROQ_API_KEY`

**Free tier**: 30 requests/minute, perfect for this app!

#### **Required: TMDB API** (Free)
1. Visit [themoviedb.org](https://www.themoviedb.org/signup)
2. Create a free account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Fill out the simple form
6. Copy the API Key (v3 auth) into `.env` as `VITE_TMDB_API_KEY`

**Free tier**: Unlimited requests for non-commercial use!

#### **Optional: Unsplash API** (Free)
1. Visit [unsplash.com/developers](https://unsplash.com/developers)
2. Create a free account
3. Create a new application
4. Accept the API guidelines
5. Copy Access Key into `.env` as `VITE_UNSPLASH_ACCESS_KEY`

**Free tier**: 50 requests/hour (demo mode)
**Note**: App falls back to Unsplash Source if not configured.

#### **Optional: Yelp Fusion API** (Free)
1. Visit [yelp.com/developers](https://www.yelp.com/developers/v3/manage_app)
2. Create a free Yelp account
3. Create a new app
4. Copy API Key into `.env` as `VITE_YELP_API_KEY`

**Free tier**: 500 requests/day
**Note**: Requires CORS proxy for browser use (see below)

#### **Optional: Amadeus API** (Free)
1. Visit [developers.amadeus.com](https://developers.amadeus.com/register)
2. Create a free account
3. Create a new app
4. Copy API Key and Secret into `.env`

**Free tier**: Good monthly quota for testing

### 3. Configure Your .env File

Open `.env` and fill in the API keys you obtained:

```env
# Required
VITE_GROQ_API_KEY=gsk_your_groq_key_here
VITE_TMDB_API_KEY=your_tmdb_key_here

# Optional (app will work without these)
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key_here
VITE_YELP_API_KEY=your_yelp_key_here
VITE_AMADEUS_API_KEY=your_amadeus_key_here
VITE_AMADEUS_API_SECRET=your_amadeus_secret_here
```

### 4. Install Dependencies (if not done)

```bash
npm install
```

### 5. Run the App

```bash
npm run dev
```

Visit `http://localhost:8080` and test the TD² app!

## How It Works

### Architecture

```
User Answers
    ↓
Groq AI (generates 8 personalized recommendations)
    ↓
Recommendation Service (enriches with real data)
    ↓
Category-specific APIs
    ↓
Final Results with Images & Details
```

### By Category

#### 🎬 **Entertainment**
1. User answers survey questions
2. Groq AI analyzes preferences and generates movie/show recommendations
3. System searches TMDB for each recommendation
4. Returns rich data: posters, ratings, cast, streaming platforms
5. Falls back to Unsplash images if TMDB data unavailable

#### 🍽️ **Food & Dining**
1. User specifies cuisine, price range, dining type
2. Groq AI generates restaurant/recipe recommendations
3. System queries Yelp API for real restaurants (if configured)
4. Returns ratings, photos, prices, locations
5. Falls back to AI recommendations with Unsplash images

#### ✈️ **Travel**
1. User specifies trip type, duration, budget
2. Groq AI generates destination recommendations
3. Enriched with beautiful Unsplash travel photography
4. Can integrate Amadeus API for flights/hotels (optional)

#### 🎁 **Gifts & Shopping**
1. User provides recipient info, occasion, budget
2. Groq AI generates creative gift ideas
3. Enriched with product images from Unsplash
4. Includes search queries for finding products online

## Important Notes

### API Costs
- **All APIs used have generous FREE tiers**
- Groq: 30 req/min free
- TMDB: Unlimited for non-commercial
- Unsplash: 50 req/hour free (or unlimited with Source API)
- Yelp: 500 req/day free

### CORS Issues
Some APIs (like Yelp) block browser requests. Solutions:
1. **For production**: Set up a simple proxy server
2. **For development**: Use a CORS proxy or browser extension
3. **Alternative**: App gracefully falls back to AI-generated data

### Rate Limiting
The app implements automatic fallbacks:
- If TMDB fails → Use AI + Unsplash
- If Yelp fails → Use AI + Unsplash
- If Unsplash fails → Use Unsplash Source (no key needed)

### Production Considerations

For production deployment:

1. **Never commit .env to git** (already in .gitignore)
2. **Use environment variables** in your hosting platform
3. **Consider a backend proxy** for sensitive API keys
4. **Apply for production quotas** if needed
5. **Implement caching** to reduce API calls

## Testing

### Test with minimum setup:
1. Get Groq API key (required)
2. Get TMDB API key (required)
3. Test entertainment category ✅

### Test without optional APIs:
The app works perfectly with just Groq + TMDB:
- Food/Travel/Gifts use AI recommendations
- Images come from Unsplash Source (no key needed)
- Still provides great user experience!

## Troubleshooting

### "Groq API key not configured"
→ Make sure `VITE_GROQ_API_KEY` is in your `.env` file
→ Restart the dev server after adding keys

### "TMDB API error"
→ Verify your API key is correct
→ Check you're using the v3 API key (not v4)

### "CORS error with Yelp"
→ This is expected in browser-only setup
→ App will fallback to AI recommendations
→ For production, use a backend proxy

### Images not loading
→ Check Unsplash API key
→ App will automatically use Unsplash Source as fallback
→ No action needed if fallback images work

## API Documentation Links

- [Groq API Docs](https://console.groq.com/docs)
- [TMDB API Docs](https://developers.themoviedb.org/3)
- [Unsplash API Docs](https://unsplash.com/documentation)
- [Yelp Fusion API Docs](https://docs.developer.yelp.com/docs/fusion-intro)
- [Amadeus API Docs](https://developers.amadeus.com/self-service)

## Support

For issues or questions:
1. Check this guide first
2. Review API documentation
3. Check browser console for errors
4. Verify API keys are correct

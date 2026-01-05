# CORS Proxy for Browser-Based API Calls

Some APIs (like Yelp Fusion) block direct browser requests due to CORS policies. Here are solutions:

## Option 1: Use a CORS Proxy (Development Only)

### Public CORS Proxies (Not for Production!)

```typescript
// In yelpService.ts, update the API URL:
const YELP_API_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3';
```

**Popular CORS proxies:**
- `https://cors-anywhere.herokuapp.com/` (requires activation)
- `https://api.allorigins.win/raw?url=`

⚠️ **Warning**: Never use public proxies in production!

## Option 2: Simple Node.js Proxy (Recommended)

Create a simple Express proxy server:

### 1. Create proxy server

```bash
mkdir proxy-server
cd proxy-server
npm init -y
npm install express cors dotenv
```

### 2. Create `server.js`

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Yelp proxy endpoint
app.get('/api/yelp/search', async (req, res) => {
  try {
    const { term, location, categories, limit } = req.query;
    
    const params = new URLSearchParams({
      term: term || 'restaurants',
      location: location || 'San Francisco',
      limit: limit || '8',
    });
    
    if (categories) params.append('categories', categories);
    
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    );
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
```

### 3. Create `.env` in proxy-server folder

```env
YELP_API_KEY=your_yelp_api_key_here
PORT=3001
```

### 4. Run the proxy

```bash
node server.js
```

### 5. Update yelpService.ts

```typescript
const YELP_PROXY_URL = 'http://localhost:3001/api/yelp';

export async function searchYelpMultiple(...) {
  const response = await fetch(
    `${YELP_PROXY_URL}/search?${params}`,
    {
      headers: {
        'Accept': 'application/json',
      },
    }
  );
  // ... rest of the code
}
```

## Option 3: Serverless Function (Production)

Deploy the proxy as a serverless function:

### Vercel

Create `api/yelp.ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { term, location, categories, limit } = req.query;
  
  const params = new URLSearchParams({
    term: (term as string) || 'restaurants',
    location: (location as string) || 'San Francisco',
    limit: (limit as string) || '8',
  });
  
  if (categories) {
    params.append('categories', categories as string);
  }
  
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    );
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Yelp' });
  }
}
```

Then in your app:
```typescript
const YELP_PROXY_URL = '/api/yelp'; // Automatically routed by Vercel
```

### Netlify Functions

Similar approach with Netlify Functions in `netlify/functions/yelp.ts`.

## Option 4: Disable Yelp (Graceful Degradation)

The app already handles Yelp API failures gracefully:

1. If Yelp API key is missing → Uses AI recommendations
2. If Yelp API fails → Falls back to AI + Unsplash images
3. User still gets great recommendations!

**For development without Yelp:**
- Just don't add `VITE_YELP_API_KEY` to `.env`
- App works perfectly with AI-generated restaurant recommendations
- Add Yelp later when you set up a proxy

## Recommendation

**Development**: 
- Skip Yelp or use Option 4 (AI fallback)
- Focus on Groq + TMDB first

**Production**: 
- Use Option 3 (Serverless functions)
- Keeps API keys secure
- Handles CORS automatically
- Scales well

## Security Note

Never expose API keys in browser code for production! Always use:
- Environment variables for sensitive keys
- Server-side proxies or serverless functions
- The `VITE_` prefix only exposes keys to the browser (intentional for APIs that support it)

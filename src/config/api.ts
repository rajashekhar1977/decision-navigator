/**
 * Configuration for all external API services
 */

export const API_CONFIG = {
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    maxTokens: 2000,
    temperature: 1.2, // Higher for more variety in recommendations
  },
  tmdb: {
    url: 'https://api.themoviedb.org/3',
    imageBase: 'https://image.tmdb.org/t/p/w500',
  },
  rawg: {
    url: 'https://api.rawg.io/api',
    // Free tier: Get your key at https://rawg.io/apidocs
    key: '71b652f4b4404e44804d44f23e2e3c80',
  },
  unsplash: {
    url: 'https://api.unsplash.com',
    fallbackUrl: 'https://source.unsplash.com',
  },
  yelp: {
    url: 'https://api.yelp.com/v3',
    // For production, set this to your proxy URL
    proxyUrl: import.meta.env.VITE_YELP_PROXY_URL || null,
  },
  amadeus: {
    url: 'https://api.amadeus.com/v1',
    testUrl: 'https://test.api.amadeus.com/v1',
  },
};

/**
 * Check which APIs are configured
 */
export function getConfiguredAPIs() {
  return {
    groq: !!import.meta.env.VITE_GROQ_API_KEY,
    tmdb: !!import.meta.env.VITE_TMDB_API_KEY,
    unsplash: !!import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    yelp: !!import.meta.env.VITE_YELP_API_KEY,
    amadeus: !!(import.meta.env.VITE_AMADEUS_API_KEY && import.meta.env.VITE_AMADEUS_API_SECRET),
  };
}

/**
 * Get a user-friendly message about missing APIs
 */
export function getMissingAPIsMessage(): string | null {
  const configured = getConfiguredAPIs();
  const missing: string[] = [];

  if (!configured.groq) missing.push('Groq (required for AI recommendations)');
  if (!configured.tmdb) missing.push('TMDB (required for entertainment)');
  
  if (missing.length > 0) {
    return `Missing API keys: ${missing.join(', ')}. Please check BACKEND_SETUP.md for setup instructions.`;
  }

  return null;
}

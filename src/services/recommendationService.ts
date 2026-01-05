import { Category, EnrichedOption } from '@/types/td2';
import { getGroqRecommendations, GroqRecommendation } from './groqService';
import { searchTMDB, getPopularEntertainment } from './tmdbService';
import { searchRAWG, getPopularGames } from './rawgService';
import { getUnsplashImage } from './unsplashService';
import { searchYelpMultiple } from './yelpService';

/**
 * Main recommendation service that coordinates AI recommendations
 * with data enrichment from various APIs
 */
export async function getRecommendations(
  category: Category,
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  try {
    // Step 1: Get AI recommendations from Groq
    const groqRecommendations = await getGroqRecommendations(category, answers);

    // Step 2: Enrich recommendations with real data based on category
    const enrichedResults = await enrichRecommendations(
      category,
      groqRecommendations,
      answers
    );

    return enrichedResults;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
}

async function enrichRecommendations(
  category: Category,
  recommendations: GroqRecommendation[],
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  switch (category) {
    case 'entertainment':
      return enrichEntertainmentRecommendations(recommendations, answers);
    
    case 'eat':
      return enrichFoodRecommendations(recommendations, answers);
    
    case 'travel':
      return enrichTravelRecommendations(recommendations);
    
    case 'gift':
    case 'buy':
      return enrichShoppingRecommendations(recommendations);
    
    default:
      return enrichGenericRecommendations(recommendations);
  }
}

async function enrichEntertainmentRecommendations(
  recommendations: GroqRecommendation[],
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  const intent = answers.intent; // 'watch', 'play', 'listen', 'read'
  
  console.log(`[Recommendations] Entertainment intent: ${intent}`);
  
  // Route to different services based on intent
  switch (intent) {
    case 'watch':
      return enrichWatchRecommendations(recommendations, answers);
    case 'play':
      return enrichGameRecommendations(recommendations, answers);
    case 'listen':
      return enrichMusicRecommendations(recommendations, answers);
    case 'read':
      return enrichBookRecommendations(recommendations, answers);
    default:
      // Fallback to watch if intent not specified
      return enrichWatchRecommendations(recommendations, answers);
  }
}

async function enrichWatchRecommendations(
  recommendations: GroqRecommendation[],
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  const mediaType = answers.mediaType === 'series' ? 'tv' : 'movie';
  const results: EnrichedOption[] = [];

  for (const rec of recommendations) {
    try {
      // Try to get real data from TMDB (no cache)
      const tmdbData = await searchTMDB(rec.searchQuery || rec.title, mediaType);
      
      if (tmdbData) {
        results.push({
          ...tmdbData,
          snippet: rec.reason, // Use AI reason as the snippet
        });
      } else {
        // Fallback to AI data with Unsplash image
        const image = await getUnsplashImage(rec.searchQuery || rec.title);
        console.log(`[Entertainment] No TMDB data found for "${rec.title}", using AI fallback`);
        results.push({
          id: `ai-${Date.now()}-${Math.random()}`,
          title: rec.title,
          snippet: rec.reason,
          description: rec.description,
          image,
          sourceUrl: `https://www.themoviedb.org/search?query=${encodeURIComponent(rec.title)}`,
          extra: {
            aiGenerated: true,
          },
        });
      }
    } catch (error) {
      console.error('Error enriching watch rec:', error);
      // Add fallback version
      const image = await getUnsplashImage(rec.searchQuery || rec.title);
      results.push({
        id: `ai-${Date.now()}-${Math.random()}`,
        title: rec.title,
        snippet: rec.reason,
        description: rec.description,
        image,
        sourceUrl: `https://www.themoviedb.org/search?query=${encodeURIComponent(rec.title)}`,
        extra: {
          aiGenerated: true,
        },
      });
    }
  }

  // If we have fewer than 8 results, fill with popular content
  if (results.length < 8) {
    const popular = await getPopularEntertainment(mediaType, 8 - results.length);
    results.push(...popular);
  }

  return results.slice(0, 8);
}

async function enrichGameRecommendations(
  recommendations: GroqRecommendation[],
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  const results: EnrichedOption[] = [];

  for (const rec of recommendations) {
    try {
      // Try to get real data from RAWG (no cache)
      const rawgData = await searchRAWG(rec.searchQuery || rec.title);
      
      if (rawgData) {
        results.push({
          ...rawgData,
          snippet: rec.reason, // Use AI reason as the snippet
        });
      } else {
        // Fallback to AI data with Unsplash image
        const image = await getUnsplashImage(`${rec.searchQuery || rec.title} video game`);
        console.log(`[Games] No RAWG data found for "${rec.title}", using AI fallback`);
        results.push({
          id: `ai-${Date.now()}-${Math.random()}`,
          title: rec.title,
          snippet: rec.reason,
          description: rec.description,
          image,
          sourceUrl: `https://rawg.io/search?query=${encodeURIComponent(rec.title)}`,
          extra: {
            aiGenerated: true,
          },
        });
      }
    } catch (error) {
      console.error('Error enriching game rec:', error);
      const image = await getUnsplashImage(`${rec.title} video game`);
      results.push({
        id: `ai-${Date.now()}-${Math.random()}`,
        title: rec.title,
        snippet: rec.reason,
        description: rec.description,
        image,
        sourceUrl: `https://rawg.io/search?query=${encodeURIComponent(rec.title)}`,
        extra: {
          aiGenerated: true,
        },
      });
    }
  }

  // If we have fewer than 8 results, fill with popular games
  if (results.length < 8) {
    const popular = await getPopularGames(8 - results.length);
    results.push(...popular);
  }

  return results.slice(0, 8);
}

async function enrichMusicRecommendations(
  recommendations: GroqRecommendation[],
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  // For music, use AI recommendations with music-themed images
  // Future: integrate Spotify/Apple Music/Deezer APIs
  const enriched = await Promise.all(
    recommendations.map(async (rec) => {
      const image = await getUnsplashImage(`${rec.searchQuery || rec.title} music album`);
      return {
        id: `music-${Date.now()}-${Math.random()}`,
        title: rec.title,
        snippet: rec.reason,
        description: rec.description,
        image,
        sourceUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(rec.title)}`,
        extra: {
          aiGenerated: true,
          type: 'music',
        },
      };
    })
  );

  return enriched.slice(0, 8);
}

async function enrichBookRecommendations(
  recommendations: GroqRecommendation[],
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  // For books, use AI recommendations with book cover images
  // Future: integrate Google Books/OpenLibrary APIs
  const enriched = await Promise.all(
    recommendations.map(async (rec) => {
      const image = await getUnsplashImage(`${rec.searchQuery || rec.title} book cover`);
      return {
        id: `book-${Date.now()}-${Math.random()}`,
        title: rec.title,
        snippet: rec.reason,
        description: rec.description,
        image,
        sourceUrl: `https://www.goodreads.com/search?q=${encodeURIComponent(rec.title)}`,
        extra: {
          aiGenerated: true,
          type: 'book',
        },
      };
    })
  );

  return enriched.slice(0, 8);
}

async function enrichFoodRecommendations(
  recommendations: GroqRecommendation[],
  answers: Record<string, any>
): Promise<EnrichedOption[]> {
  // For Yelp, we need a location (could come from browser geolocation)
  const location = 'San Francisco, CA'; // Default location
  const cuisine = Array.isArray(answers.cuisine) ? answers.cuisine.join(',') : answers.cuisine;

  try {
    // Try to get real restaurant data from Yelp
    const yelpResults = await searchYelpMultiple(
      cuisine || 'restaurants',
      location,
      cuisine,
      8
    );

    if (yelpResults.length > 0) {
      return yelpResults;
    }
  } catch (error) {
    console.error('Error fetching from Yelp:', error);
  }

  // Fallback to AI recommendations with images
  return enrichGenericRecommendations(recommendations);
}

async function enrichTravelRecommendations(
  recommendations: GroqRecommendation[]
): Promise<EnrichedOption[]> {
  // For travel, we'll use AI recommendations with beautiful images
  const enriched = await Promise.all(
    recommendations.map(async (rec) => {
      const image = await getUnsplashImage(`${rec.searchQuery || rec.title} travel destination`);
      return {
        id: `travel-${Date.now()}-${Math.random()}`,
        title: rec.title,
        snippet: rec.reason,
        description: rec.description,
        image,
        extra: {
          type: 'destination',
        },
      };
    })
  );

  return enriched;
}

async function enrichShoppingRecommendations(
  recommendations: GroqRecommendation[]
): Promise<EnrichedOption[]> {
  // For shopping/gifts, use AI recommendations with product images
  const enriched = await Promise.all(
    recommendations.map(async (rec) => {
      const image = await getUnsplashImage(rec.searchQuery || rec.title);
      return {
        id: `shop-${Date.now()}-${Math.random()}`,
        title: rec.title,
        snippet: rec.reason,
        description: rec.description,
        image,
        extra: {
          searchQuery: rec.searchQuery,
        },
      };
    })
  );

  return enriched;
}

async function enrichGenericRecommendations(
  recommendations: GroqRecommendation[]
): Promise<EnrichedOption[]> {
  const enriched = await Promise.all(
    recommendations.map(async (rec) => {
      const image = await getUnsplashImage(rec.searchQuery || rec.title);
      return {
        id: `gen-${Date.now()}-${Math.random()}`,
        title: rec.title,
        snippet: rec.reason,
        description: rec.description,
        image,
      };
    })
  );

  return enriched;
}

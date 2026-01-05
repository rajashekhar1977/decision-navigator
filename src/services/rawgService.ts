import { EnrichedOption } from '@/types/td2';
import { API_CONFIG } from '@/config/api';

/**
 * RAWG API integration for video game data
 * Free tier: 500,000+ games
 * Docs: https://api.rawg.io/docs/
 */

export async function searchRAWG(query: string): Promise<EnrichedOption | null> {
  const apiKey = API_CONFIG.rawg.key;
  
  if (!apiKey) {
    console.warn('RAWG API key not configured');
    return null;
  }

  // Clean the search query - only remove "game" suffixes but keep years
  const cleanQuery = query
    .replace(/\s+(game|video game|gameplay)$/gi, '')
    .trim();

  try {
    // Search for games (remove cache headers - RAWG doesn't allow them in CORS)
    const searchUrl = `${API_CONFIG.rawg.url}/games?key=${apiKey}&search=${encodeURIComponent(cleanQuery)}&page_size=1`;
    console.log(`[RAWG] Searching: "${cleanQuery}" (original: "${query}")`);
    
    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      console.error(`[RAWG] Search failed with status ${searchResponse.status}`);
      return null;
    }

    const searchData = await searchResponse.json();
    const game = searchData.results?.[0];

    if (!game) {
      console.warn(`[RAWG] No results found for "${query}"`);
      return null;
    }

    console.log(`[RAWG] Found: ${game.name} (ID: ${game.id})`);

    // Get detailed game information
    const detailsUrl = `${API_CONFIG.rawg.url}/games/${game.id}?key=${apiKey}`;
    const detailsResponse = await fetch(detailsUrl);

    if (!detailsResponse.ok) {
      console.error(`[RAWG] Details fetch failed for ID ${game.id}`);
      return null;
    }

    const details = await detailsResponse.json();

    // Get stores where the game is available
    const stores = details.stores?.map((s: any) => ({
      name: s.store.name,
      url: s.url || s.store.domain,
    })) || [];

    return {
      id: String(details.id),
      title: details.name,
      snippet: details.description_raw?.substring(0, 200) + '...' || 'No description available',
      description: details.description_raw?.substring(0, 400) + '...' || '',
      image: details.background_image || details.background_image_additional,
      sourceUrl: details.website || stores[0]?.url || `https://rawg.io/games/${details.slug}`,
      extra: {
        rating: details.rating ? `${details.rating}/5` : undefined,
        releaseDate: details.released,
        genres: details.genres?.map((g: any) => g.name).join(', '),
        platforms: details.platforms?.slice(0, 5).map((p: any) => p.platform.name).join(', '),
        playtime: details.playtime ? `${details.playtime} hours avg` : undefined,
        metacritic: details.metacritic ? `${details.metacritic}/100` : undefined,
        stores: stores,
        rawgLink: `https://rawg.io/games/${details.slug}`,
        esrbRating: details.esrb_rating?.name,
      },
    };
  } catch (error) {
    console.error('Error fetching from RAWG:', error);
    return null;
  }
}

export async function getPopularGames(count: number = 8): Promise<EnrichedOption[]> {
  const apiKey = API_CONFIG.rawg.key;
  
  if (!apiKey) {
    return [];
  }

  try {
    // Get top-rated games from the last year
    const currentDate = new Date();
    const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    const dates = `${lastYear.toISOString().split('T')[0]},${currentDate.toISOString().split('T')[0]}`;

    const response = await fetch(
      `${API_CONFIG.rawg.url}/games?key=${apiKey}&dates=${dates}&ordering=-rating&page_size=${count}`
    );

    if (!response.ok) {
      throw new Error('RAWG popular fetch failed');
    }

    const data = await response.json();
    const results = data.results || [];

    return results.map((game: any) => {
      const stores = game.stores?.map((s: any) => ({
        name: s.store.name,
        url: s.store.domain,
      })) || [];

      return {
        id: String(game.id),
        title: game.name,
        snippet: `${game.genres?.map((g: any) => g.name).join(', ') || 'Game'}`,
        description: `Released: ${game.released || 'TBA'}`,
        image: game.background_image,
        sourceUrl: stores[0]?.url || `https://rawg.io/games/${game.slug}`,
        extra: {
          rating: game.rating ? `${game.rating}/5` : undefined,
          releaseDate: game.released,
          genres: game.genres?.map((g: any) => g.name).join(', '),
          platforms: game.platforms?.slice(0, 3).map((p: any) => p.platform.name).join(', '),
          metacritic: game.metacritic ? `${game.metacritic}/100` : undefined,
          stores: stores,
          rawgLink: `https://rawg.io/games/${game.slug}`,
        },
      };
    });
  } catch (error) {
    console.error('Error fetching popular games:', error);
    return [];
  }
}

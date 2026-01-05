import { EnrichedOption } from '@/types/td2';
import { API_CONFIG } from '@/config/api';

interface StreamingProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

interface WatchProviders {
  link?: string;
  flatrate?: StreamingProvider[];
  rent?: StreamingProvider[];
  buy?: StreamingProvider[];
}

export async function searchTMDB(query: string, mediaType: string = 'movie'): Promise<EnrichedOption | null> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  
  if (!apiKey) {
    console.warn('TMDB API key not configured. Get a free key at https://www.themoviedb.org/settings/api');
    return null;
  }

  // Clean the search query - only remove words like "movie", "film" but KEEP years (they help disambiguation)
  const cleanQuery = query
    .replace(/\s+(movie|film|show|series|tv)$/gi, '')
    .trim();

  try {
    // Try search with original query first (includes year if present)
    let searchUrl = `${API_CONFIG.tmdb.url}/search/${mediaType}?api_key=${apiKey}&query=${encodeURIComponent(cleanQuery)}`;
    console.log(`[TMDB] Searching: "${cleanQuery}" (original: "${query}")`);
    
    const searchResponse = await fetch(searchUrl, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });

    if (!searchResponse.ok) {
      console.error(`[TMDB] Search failed with status ${searchResponse.status}`);
      return null;
    }

    const searchData = await searchResponse.json();
    console.log(`[TMDB] Search results for "${query}":`, searchData.results?.length || 0, 'results');
    
    let result = searchData.results?.[0];

    // If no results, try without year as fallback
    if (!result) {
      const queryWithoutYear = cleanQuery.replace(/\s+\d{4}$/g, '').trim();
      if (queryWithoutYear !== cleanQuery) {
        console.log(`[TMDB] Retrying without year: "${queryWithoutYear}"`);
        const retryUrl = `${API_CONFIG.tmdb.url}/search/${mediaType}?api_key=${apiKey}&query=${encodeURIComponent(queryWithoutYear)}`;
        const retryResponse = await fetch(retryUrl, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          result = retryData.results?.[0];
          console.log(`[TMDB] Retry results:`, retryData.results?.length || 0);
        }
      }
    }

    if (!result) {
      console.warn(`[TMDB] No results found for "${query}"`);
      return null;
    }

    console.log(`[TMDB] Found: ${result.title || result.name} (ID: ${result.id})`);

    // Get detailed information including streaming providers
    const detailsResponse = await fetch(
      `${API_CONFIG.tmdb.url}/${mediaType}/${result.id}?api_key=${apiKey}&append_to_response=credits,watch/providers`,
      {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      }
    );

    if (!detailsResponse.ok) {
      console.error(`[TMDB] Details fetch failed for ID ${result.id}`);
      return null;
    }

    const details = await detailsResponse.json();
    
    // Get US streaming providers
    const providers = details['watch/providers']?.results?.US as WatchProviders;
    const streamingServices = providers?.flatrate || [];
    const rentalServices = providers?.rent || [];
    const purchaseServices = providers?.buy || [];
    
    // Use high-quality image URL with HTTPS
    const imageUrl = details.poster_path 
      ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
      : details.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${details.backdrop_path}`
      : undefined;

    return {
      id: String(details.id),
      title: details.title || details.name,
      snippet: details.overview,
      description: details.tagline || details.overview?.substring(0, 150) + '...',
      image: imageUrl,
      sourceUrl: providers?.link || `https://www.themoviedb.org/${mediaType}/${details.id}`,
      extra: {
        year: (details.release_date || details.first_air_date)?.split('-')[0],
        rating: `${details.vote_average?.toFixed(1)}/10`,
        duration: details.runtime ? `${details.runtime} min` : undefined,
        genres: details.genres?.map((g: any) => g.name).join(', '),
        cast: details.credits?.cast?.slice(0, 5).map((c: any) => c.name).join(', '),
        streamingServices: streamingServices.map(s => ({
          name: s.provider_name,
          logo: `https://image.tmdb.org/t/p/original${s.logo_path}`,
          id: s.provider_id,
        })),
        rentalServices: rentalServices.map(s => ({
          name: s.provider_name,
          logo: `https://image.tmdb.org/t/p/original${s.logo_path}`,
          id: s.provider_id,
        })),
        purchaseServices: purchaseServices.map(s => ({
          name: s.provider_name,
          logo: `https://image.tmdb.org/t/p/original${s.logo_path}`,
          id: s.provider_id,
        })),
        tmdbLink: `https://www.themoviedb.org/${mediaType}/${details.id}`,
      },
    };
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    return null;
  }
}

export async function getPopularEntertainment(mediaType: string = 'movie', count: number = 8): Promise<EnrichedOption[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  
  if (!apiKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${API_CONFIG.tmdb.url}/${mediaType}/popular?api_key=${apiKey}&page=1`,
      {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      }
    );

    if (!response.ok) {
      throw new Error('TMDB popular fetch failed');
    }

    const data = await response.json();
    const results = data.results?.slice(0, count) || [];

    const enriched = await Promise.all(
      results.map(async (item: any) => {
        const detailsResponse = await fetch(
          `${API_CONFIG.tmdb.url}/${mediaType}/${item.id}?api_key=${apiKey}&append_to_response=credits,watch/providers`,
          {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' },
          }
        );
        
        const details = detailsResponse.ok ? await detailsResponse.json() : item;

        // Get US streaming providers
        const providers = details['watch/providers']?.results?.US as WatchProviders;
        const streamingServices = providers?.flatrate || [];
        const rentalServices = providers?.rent || [];
        const purchaseServices = providers?.buy || [];

        const imageUrl = item.poster_path 
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : item.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
          : undefined;

        return {
          id: String(item.id),
          title: item.title || item.name,
          snippet: item.overview,
          description: (details.tagline || item.overview?.substring(0, 150) || '') + '...',
          image: imageUrl,
          sourceUrl: providers?.link || `https://www.themoviedb.org/${mediaType}/${item.id}`,
          extra: {
            year: (item.release_date || item.first_air_date)?.split('-')[0],
            rating: `${item.vote_average?.toFixed(1)}/10`,
            duration: details.runtime ? `${details.runtime} min` : undefined,
            genres: details.genres?.map((g: any) => g.name).join(', '),
            cast: details.credits?.cast?.slice(0, 5).map((c: any) => c.name).join(', '),
            streamingServices: streamingServices.map(s => ({
              name: s.provider_name,
              logo: `https://image.tmdb.org/t/p/original${s.logo_path}`,
              id: s.provider_id,
            })),
            rentalServices: rentalServices.map(s => ({
              name: s.provider_name,
              logo: `https://image.tmdb.org/t/p/original${s.logo_path}`,
              id: s.provider_id,
            })),
            purchaseServices: purchaseServices.map(s => ({
              name: s.provider_name,
              logo: `https://image.tmdb.org/t/p/original${s.logo_path}`,
              id: s.provider_id,
            })),
            tmdbLink: `https://www.themoviedb.org/${mediaType}/${item.id}`,
          },
        };
      })
    );

    return enriched;
  } catch (error) {
    console.error('Error fetching popular from TMDB:', error);
    return [];
  }
}

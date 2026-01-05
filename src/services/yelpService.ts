import { EnrichedOption } from '@/types/td2';
import { API_CONFIG } from '@/config/api';

// Note: Yelp API has CORS restrictions in browser
// For production, use a backend proxy (see CORS_PROXY_GUIDE.md)

export async function searchYelp(
  term: string,
  location: string = 'San Francisco, CA',
  categories?: string
): Promise<EnrichedOption | null> {
  const apiKey = import.meta.env.VITE_YELP_API_KEY;
  
  if (!apiKey) {
    console.warn('Yelp API key not configured. App will use AI-generated recommendations.');
    return null;
  }

  const apiUrl = API_CONFIG.yelp.proxyUrl || API_CONFIG.yelp.url;

  try {
    const params = new URLSearchParams({
      term,
      location,
      limit: '1',
    });

    if (categories) {
      params.append('categories', categories);
    }

    const response = await fetch(
      `${apiUrl}/businesses/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn('Yelp API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    const business = data.businesses?.[0];

    if (!business) {
      return null;
    }

    return {
      id: business.id,
      title: business.name,
      snippet: business.categories?.map((c: any) => c.title).join(', '),
      description: `${business.rating} ⭐ • ${business.price || '$$'} • ${business.location?.city}`,
      image: business.image_url,
      sourceUrl: business.url,
      extra: {
        rating: `${business.rating}/5`,
        price: business.price,
        phone: business.phone,
        address: business.location?.address1,
        city: business.location?.city,
        reviewCount: business.review_count,
        categories: business.categories?.map((c: any) => c.title).join(', '),
      },
    };
  } catch (error) {
    console.error('Error fetching from Yelp:', error);
    return null;
  }
}

export async function searchYelpMultiple(
  term: string,
  location: string = 'San Francisco, CA',
  categories?: string,
  limit: number = 8
): Promise<EnrichedOption[]> {
  const apiKey = import.meta.env.VITE_YELP_API_KEY;
  
  if (!apiKey) {
    return [];
  }

  const apiUrl = API_CONFIG.yelp.proxyUrl || API_CONFIG.yelp.url;

  try {
    const params = new URLSearchParams({
      term,
      location,
      limit: String(limit),
    });

    if (categories) {
      params.append('categories', categories);
    }

    const response = await fetch(
      `${apiUrl}/businesses/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const businesses = data.businesses || [];

    return businesses.map((business: any) => ({
      id: business.id,
      title: business.name,
      snippet: business.categories?.map((c: any) => c.title).join(', '),
      description: `${business.rating} ⭐ • ${business.price || '$$'} • ${business.location?.city}`,
      image: business.image_url,
      sourceUrl: business.url,
      extra: {
        rating: `${business.rating}/5`,
        price: business.price,
        phone: business.phone,
        address: business.location?.address1,
        city: business.location?.city,
        reviewCount: business.review_count,
        categories: business.categories?.map((c: any) => c.title).join(', '),
      },
    }));
  } catch (error) {
    console.error('Error fetching from Yelp:', error);
    return [];
  }
}

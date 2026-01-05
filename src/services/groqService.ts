import { Category } from '@/types/td2';
import { API_CONFIG } from '@/config/api';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqRecommendation {
  title: string;
  description: string;
  reason: string;
  searchQuery?: string;
}

export async function getGroqRecommendations(
  category: Category,
  answers: Record<string, any>
): Promise<GroqRecommendation[]> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      'Groq API key not configured. Please add VITE_GROQ_API_KEY to your .env file. ' +
      'Get a free API key at https://console.groq.com'
    );
  }

  const systemPrompt = buildSystemPrompt(category);
  const userPrompt = buildUserPrompt(category, answers);
  
  // Add randomization to get different results each time
  const randomSeed = Date.now() + Math.random();
  const enhancedUserPrompt = `${userPrompt}\n\nIMPORTANT: Provide fresh, diverse recommendations. Session ID: ${randomSeed}. Avoid repetitive suggestions.`;

  try {
    const response = await fetch(API_CONFIG.groq.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
      body: JSON.stringify({
        model: API_CONFIG.groq.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: enhancedUserPrompt },
        ],
        temperature: API_CONFIG.groq.temperature,
        max_tokens: API_CONFIG.groq.maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Groq API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from Groq API');
    }

    return parseGroqResponse(content);
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}

function buildSystemPrompt(category: Category): string {
  const prompts = {
    entertainment: `You are an expert entertainment recommendation assistant. You provide personalized movie, TV show, game, book, and music recommendations based on user preferences. Respond ONLY with a valid JSON array of exactly 8 recommendations. Each recommendation must have this structure:
{
  "title": "exact title",
  "description": "brief 1-2 sentence description",
  "reason": "why this matches their preferences",
  "searchQuery": "title with release year (e.g., 'Inception 2010') for accurate TMDB matching"
}
IMPORTANT: Always include the release year in searchQuery for movies/TV shows to ensure correct matches on TMDB.`,
    eat: `You are an expert food and dining recommendation assistant. You provide personalized restaurant and recipe recommendations based on cuisine preferences, dining type, and price range. Respond ONLY with a valid JSON array of exactly 8 recommendations. Each recommendation must have:
{
  "title": "restaurant or recipe name",
  "description": "cuisine type and signature dishes",
  "reason": "why this matches their preferences",
  "searchQuery": "search term for finding this on Yelp or food sites"
}`,
    travel: `You are an expert travel recommendation assistant. You provide personalized destination and activity recommendations based on trip type, duration, and budget. Respond ONLY with a valid JSON array of exactly 8 recommendations. Each recommendation must have:
{
  "title": "destination or activity name",
  "description": "brief overview of the place or experience",
  "reason": "why this matches their travel preferences",
  "searchQuery": "search term for finding travel information"
}`,
    gift: `You are an expert gift recommendation assistant. You provide personalized gift ideas based on recipient, occasion, budget, and interests. Respond ONLY with a valid JSON array of exactly 8 recommendations. Each recommendation must have:
{
  "title": "gift idea name",
  "description": "what it is and why it's special",
  "reason": "why this is perfect for the recipient",
  "searchQuery": "search term for finding this gift online"
}`,
    buy: `You are an expert shopping recommendation assistant. You provide personalized product recommendations based on category, use case, and budget. Respond ONLY with a valid JSON array of exactly 8 recommendations. Each recommendation must have:
{
  "title": "product name",
  "description": "key features and benefits",
  "reason": "why this product matches their needs",
  "searchQuery": "search term for finding this product"
}`,
  };

  return prompts[category];
}

function buildUserPrompt(category: Category, answers: Record<string, any>): string {
  const answersText = Object.entries(answers)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(', ')}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');

  return `Based on these preferences:\n${answersText}\n\nProvide 8 personalized recommendations. Respond ONLY with a valid JSON array, no other text.`;
}

function parseGroqResponse(content: string): GroqRecommendation[] {
  try {
    // Clean the content first - replace curly quotes and other special characters
    let cleanContent = content
      .replace(/[\u201C\u201D]/g, '"')  // Replace curly double quotes
      .replace(/[\u2018\u2019]/g, "'")  // Replace curly single quotes  
      .replace(/[\u2013\u2014]/g, '-')  // Replace em/en dashes
      .replace(/\u2026/g, '...')        // Replace ellipsis
      .replace(/\u00A0/g, ' ')          // Replace non-breaking spaces
      .trim();
    
    // Try to extract JSON from the response
    const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON array found in response:', cleanContent);
      throw new Error('Invalid response format from AI');
    }

    const recommendations = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(recommendations)) {
      throw new Error('Response is not an array');
    }

    return recommendations.map((rec: any) => ({
      title: rec.title || 'Unknown',
      description: rec.description || '',
      reason: rec.reason || '',
      searchQuery: rec.searchQuery || rec.title,
    }));
  } catch (error) {
    console.error('Error parsing Groq response:', error);
    console.error('Raw content:', content.substring(0, 500));
    throw new Error('Failed to parse AI recommendations');
  }
}

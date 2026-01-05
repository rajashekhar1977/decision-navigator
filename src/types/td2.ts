export type Category = 'entertainment' | 'travel' | 'eat' | 'gift' | 'buy';

export interface SurveyPayload {
  sessionId?: string;
  category: Category;
  steps: Record<string, any>;
  location?: { lat: number; lng: number } | null;
  userId?: string | null;
}

export interface GroqOption {
  id: string;
  title: string;
  snippet?: string;
  sourceUrl?: string;
  rawMeta?: Record<string, any>;
}

export interface EnrichedOption extends GroqOption {
  image?: string;
  description?: string;
  extra?: Record<string, any>;
}

export interface CategoryConfig {
  id: Category;
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multi' | 'text' | 'range';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface SurveyState {
  category: Category | null;
  currentStep: number;
  answers: Record<string, any>;
}

export interface RecommendationState {
  items: EnrichedOption[];
  currentIndex: number;
  isLoading: boolean;
}

import { useState } from 'react';
import { CategoryPicker } from '@/components/td2/CategoryPicker';
import { FlowSurvey } from '@/components/td2/FlowSurvey';
import { DecisionCard } from '@/components/td2/DecisionCard';
import { categories } from '@/data/categories';
import { getRecommendations } from '@/services/recommendationService';
import { CategoryConfig, EnrichedOption } from '@/types/td2';
import { toast } from 'sonner';

type AppState = 'category' | 'survey' | 'result';

const TD2Page = () => {
  const [appState, setAppState] = useState<AppState>('category');
  const [selectedCategory, setSelectedCategory] = useState<CategoryConfig | null>(null);
  const [recommendations, setRecommendations] = useState<EnrichedOption[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = (category: CategoryConfig) => {
    setSelectedCategory(category);
    setAppState('survey');
  };

  const handleSurveyComplete = async (answers: Record<string, any>) => {
    if (!selectedCategory) return;
    
    setIsLoading(true);
    
    try {
      // Get AI-powered recommendations
      const results = await getRecommendations(selectedCategory.id, answers);
      setRecommendations(results);
      setCurrentIndex(0);
      setAppState('result');
      toast.success('Recommendations ready!');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to get recommendations. Please check your API keys in .env file.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReload = () => {
    // Cycle through the pre-fetched results
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const handleStartOver = () => {
    setAppState('category');
    setSelectedCategory(null);
    setRecommendations([]);
    setCurrentIndex(0);
  };

  const handleBackToCategory = () => {
    setAppState('category');
    setSelectedCategory(null);
  };

  return (
    <>
      {appState === 'category' && (
        <CategoryPicker 
          categories={categories} 
          onSelect={handleCategorySelect} 
        />
      )}

      {appState === 'survey' && selectedCategory && (
        <FlowSurvey
          category={selectedCategory}
          onComplete={handleSurveyComplete}
          onBack={handleBackToCategory}
          isLoading={isLoading}
        />
      )}

      {appState === 'result' && recommendations.length > 0 && (
        <DecisionCard
          item={recommendations[currentIndex]}
          category={selectedCategory?.id || 'entertainment'}
          onReload={handleReload}
          onStartOver={handleStartOver}
          currentIndex={currentIndex}
          totalItems={recommendations.length}
        />
      )}
    </>
  );
};

export default TD2Page;
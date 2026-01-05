import { useState } from 'react';
import { CategoryPicker } from '@/components/td2/CategoryPicker';
import { FlowSurvey } from '@/components/td2/FlowSurvey';
import { DecisionCard } from '@/components/td2/DecisionCard';
import { categories } from '@/data/categories';
import { getMockResults } from '@/data/mockRecommendations';
import { CategoryConfig, EnrichedOption } from '@/types/td2';

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
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Get mock results based on category
    const results = getMockResults(selectedCategory?.id || 'entertainment');
    setRecommendations(results);
    setCurrentIndex(0);
    setIsLoading(false);
    setAppState('result');
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
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategorySelector } from '@/components/td2/CategorySelector';
import { SurveyWizard } from '@/components/td2/SurveyWizard';
import { RecommendationGrid } from '@/components/td2/RecommendationGrid';
import { ReportModal } from '@/components/td2/ReportModal';
import { categories } from '@/data/categories';
import { getMockResults } from '@/data/mockRecommendations';
import { CategoryConfig, EnrichedOption, SurveyState } from '@/types/td2';

type AppState = 'category' | 'survey' | 'results';

const TD2Page = () => {
  const [appState, setAppState] = useState<AppState>('category');
  const [selectedCategory, setSelectedCategory] = useState<CategoryConfig | null>(null);
  const [surveyState, setSurveyState] = useState<SurveyState>({
    category: null,
    currentStep: 0,
    answers: {},
  });
  const [recommendations, setRecommendations] = useState<EnrichedOption[]>([]);
  const [currentIndices, setCurrentIndices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EnrichedOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategorySelect = (category: CategoryConfig) => {
    setSelectedCategory(category);
    setSurveyState({
      category: category.id,
      currentStep: 0,
      answers: {},
    });
    setAppState('survey');
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setSurveyState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  };

  const handleNext = () => {
    if (selectedCategory && surveyState.currentStep < selectedCategory.questions.length - 1) {
      setSurveyState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  const handleBack = () => {
    if (surveyState.currentStep > 0) {
      setSurveyState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    } else {
      setAppState('category');
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Get mock results based on category
    const results = getMockResults(selectedCategory?.id || 'entertainment');
    setRecommendations(results);
    setCurrentIndices({ main: 0 });
    setIsLoading(false);
    setAppState('results');
  };

  const handleReload = (itemId: string) => {
    // Shuffle the recommendations array
    const shuffled = [...recommendations].sort(() => Math.random() - 0.5);
    setRecommendations(shuffled);
  };

  const handleViewDetails = (item: EnrichedOption) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleStartOver = () => {
    setAppState('category');
    setSelectedCategory(null);
    setSurveyState({
      category: null,
      currentStep: 0,
      answers: {},
    });
    setRecommendations([]);
    setCurrentIndices({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <span className="text-lg">🎴</span>
              <span>TD² - The Decision Deck</span>
            </div>
            {appState === 'category' && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Answer a few questions and let AI find the perfect recommendations for you.
                Reload options from pre-fetched results without extra API calls.
              </p>
            )}
          </div>

          {/* Main Content */}
          {appState === 'category' && (
            <CategorySelector categories={categories} onSelect={handleCategorySelect} />
          )}

          {appState === 'survey' && selectedCategory && (
            <SurveyWizard
              category={selectedCategory}
              surveyState={surveyState}
              onAnswerChange={handleAnswerChange}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}

          {appState === 'results' && (
            <RecommendationGrid
              items={recommendations}
              currentIndices={currentIndices}
              onReload={handleReload}
              onViewDetails={handleViewDetails}
              onStartOver={handleStartOver}
              category={selectedCategory?.id || 'entertainment'}
            />
          )}
        </div>
      </main>

      <ReportModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory?.id || 'entertainment'}
      />

      <Footer />
    </div>
  );
};

export default TD2Page;

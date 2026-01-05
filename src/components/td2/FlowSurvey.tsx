import { useState, useEffect, useCallback } from 'react';
import { CategoryConfig, Question, SurveyState } from '@/types/td2';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';

interface FlowSurveyProps {
  category: CategoryConfig;
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function FlowSurvey({ category, onComplete, onBack, isLoading }: FlowSurveyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const currentQuestion = category.questions[currentStep];
  const isLastQuestion = currentStep === category.questions.length - 1;
  const progress = ((currentStep + 1) / category.questions.length) * 100;

  const handleSelect = useCallback((value: string) => {
    if (isTransitioning || isLoading) return;

    const question = category.questions[currentStep];
    
    if (question.type === 'multi') {
      // Multi-select: toggle the value
      const currentValues = Array.isArray(answers[question.id]) ? answers[question.id] : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];
      
      setAnswers(prev => ({
        ...prev,
        [question.id]: newValues,
      }));
      // Don't auto-advance for multi-select
    } else {
      // Single select: set value and auto-advance
      const newAnswers = {
        ...answers,
        [question.id]: value,
      };
      setAnswers(newAnswers);
      
      // Auto-advance after short delay
      setIsTransitioning(true);
      setTimeout(() => {
        if (isLastQuestion) {
          onComplete(newAnswers);
        } else {
          setCurrentStep(prev => prev + 1);
          setIsTransitioning(false);
        }
      }, 300);
    }
  }, [currentStep, answers, isLastQuestion, isTransitioning, isLoading, category.questions, onComplete]);

  const handleMultiComplete = useCallback(() => {
    if (isTransitioning || isLoading) return;
    
    const question = category.questions[currentStep];
    const currentValues = answers[question.id] || [];
    
    if (currentValues.length === 0) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      if (isLastQuestion) {
        onComplete(answers);
      } else {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }
    }, 300);
  }, [currentStep, answers, isLastQuestion, isTransitioning, isLoading, category.questions, onComplete]);

  const handleLongPressStart = useCallback((value: string) => {
    const question = category.questions[currentStep];
    if (question.type !== 'single') return;
    
    const timer = setTimeout(() => {
      setIsLongPressing(true);
      // Convert to multi-select mode for this interaction
      const currentValues = Array.isArray(answers[question.id]) 
        ? answers[question.id] 
        : answers[question.id] ? [answers[question.id]] : [];
      
      if (!currentValues.includes(value)) {
        setAnswers(prev => ({
          ...prev,
          [question.id]: [...currentValues, value],
        }));
      }
    }, 500);
    
    setLongPressTimer(timer);
  }, [currentStep, answers, category.questions]);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setIsLongPressing(false);
  }, [longPressTimer]);

  const isSelected = (value: string) => {
    const currentValue = answers[currentQuestion.id];
    if (Array.isArray(currentValue)) {
      return currentValue.includes(value);
    }
    return currentValue === value;
  };

  const hasMultipleSelections = () => {
    const currentValue = answers[currentQuestion.id];
    return Array.isArray(currentValue) && currentValue.length > 1;
  };

  const getCategoryEmoji = () => {
    switch (category.id) {
      case 'entertainment': return '🎬';
      case 'travel': return '✈️';
      case 'eat': return '🍽️';
      case 'gift': return '🎁';
      case 'buy': return '🛒';
      default: return '✨';
    }
  };

  if (isLoading) {
    return (
      <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-card px-6">
        {/* Background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-5 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Finding your perfect match</h2>
            <p className="text-sm text-muted-foreground">Our AI is analyzing your preferences...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-5 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-muted/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Header with back button */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2 safe-area-top">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        <span className="text-sm font-medium text-primary">{getCategoryEmoji()} {category.title}</span>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 px-4 py-2">
        <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {currentStep + 1} of {category.questions.length}
        </p>
      </div>

      {/* Question */}
      <main className="relative z-10 flex-1 flex flex-col px-4 pt-6 pb-4 overflow-hidden">
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          <h2 className="text-2xl font-bold text-foreground text-center mb-2 px-2">
            {currentQuestion.text}
          </h2>
          
          {currentQuestion.type === 'multi' && (
            <p className="text-sm text-muted-foreground text-center mb-6">
              Tap to select multiple options
            </p>
          )}
          
          {currentQuestion.type === 'single' && (
            <p className="text-xs text-muted-foreground text-center mb-6">
              Long press to select multiple
            </p>
          )}

          {/* Options */}
          <div className="flex-1 overflow-y-auto pb-4">
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  onTouchStart={() => handleLongPressStart(option.value)}
                  onTouchEnd={handleLongPressEnd}
                  onMouseDown={() => handleLongPressStart(option.value)}
                  onMouseUp={handleLongPressEnd}
                  onMouseLeave={handleLongPressEnd}
                  className={`
                    relative p-4 rounded-2xl border-2 transition-all duration-200
                    flex flex-col items-center justify-center gap-2 min-h-[100px]
                    transform active:scale-95
                    ${isSelected(option.value) 
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10' 
                      : 'border-border bg-card/50 hover:border-primary/50 hover:bg-card'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {isSelected(option.value) && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground text-center">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-select continue button */}
        {(currentQuestion.type === 'multi' || hasMultipleSelections()) && (
          <div className="mt-auto pt-4">
            <button
              onClick={handleMultiComplete}
              disabled={!answers[currentQuestion.id] || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)}
              className={`
                w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                transform active:scale-95
                ${answers[currentQuestion.id] && (!Array.isArray(answers[currentQuestion.id]) || answers[currentQuestion.id].length > 0)
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-muted/30 text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              {isLastQuestion ? 'Get My Decision' : 'Continue'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
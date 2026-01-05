import { useState, useEffect, useCallback } from 'react';
import { CategoryConfig, Question, SurveyState } from '@/types/td2';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';

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
      <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-card px-6 relative overflow-hidden">
        <FloatingOrbs />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="text-center">
            <motion.h2
              className="text-2xl font-bold text-foreground mb-3"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Finding your perfect match
            </motion.h2>
            <p className="text-base text-muted-foreground">Our AI is analyzing your preferences...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden relative">
      <FloatingOrbs />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with back button */}
        <motion.header
          className="flex items-center justify-between px-6 pt-6 pb-3 safe-area-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </motion.button>
          <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {getCategoryEmoji()} {category.title}
          </span>
        </motion.header>

        {/* Progress bar */}
        <motion.div
          className="px-6 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2 font-medium">
            Question {currentStep + 1} of {category.questions.length}
          </p>
        </motion.div>

        {/* Question */}
        <main className="flex-1 flex flex-col px-6 pt-4 pb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentQuestion.text}
              </motion.h2>

              {currentQuestion.type === 'multi' && (
                <motion.p
                  className="text-sm text-muted-foreground text-center mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Tap to select multiple options
                </motion.p>
              )}

              {/* Options */}
              <div className="flex-1 overflow-y-auto pb-4">
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options?.map((option, index) => (
                    <motion.button
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
                        ${isSelected(option.value)
                          ? 'border-primary bg-gradient-to-br from-purple-600/10 to-pink-600/10 shadow-xl shadow-primary/20'
                          : 'border-border glass hover:border-primary/50'
                        }
                      `}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSelected(option.value) && (
                        <motion.div
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                      <span className="text-base font-semibold text-foreground text-center">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Multi-select continue button */}
          <AnimatePresence>
            {(currentQuestion.type === 'multi' || hasMultipleSelections()) && (
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <motion.button
                  onClick={handleMultiComplete}
                  disabled={!answers[currentQuestion.id] || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)}
                  className={`
                    w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300
                    ${answers[currentQuestion.id] && (!Array.isArray(answers[currentQuestion.id]) || answers[currentQuestion.id].length > 0)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-primary/40'
                      : 'bg-muted/30 text-muted-foreground cursor-not-allowed'
                    }
                  `}
                  whileHover={answers[currentQuestion.id] && (!Array.isArray(answers[currentQuestion.id]) || answers[currentQuestion.id].length > 0) ? { scale: 1.02 } : {}}
                  whileTap={answers[currentQuestion.id] && (!Array.isArray(answers[currentQuestion.id]) || answers[currentQuestion.id].length > 0) ? { scale: 0.98 } : {}}
                >
                  {isLastQuestion ? 'Get My Decision' : 'Continue'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
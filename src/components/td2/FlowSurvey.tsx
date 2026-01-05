import { useState, useEffect, useCallback } from 'react';
import { CategoryConfig, Question, SurveyState } from '@/types/td2';
import { Check, ArrowLeft, Loader2, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Link } from 'react-router-dom';

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

  // Filter questions based on conditional logic
  const visibleQuestions = category.questions.filter(q => {
    if (typeof q.showIf === 'function') {
      return q.showIf(answers);
    }
    return true;
  });

  const currentQuestion = visibleQuestions[currentStep];
  const isLastQuestion = currentStep === visibleQuestions.length - 1;
  const progress = ((currentStep + 1) / visibleQuestions.length) * 100;

  const handleSelect = useCallback((value: string) => {
    if (isTransitioning || isLoading) return;

    const question = visibleQuestions[currentStep];
    
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
  }, [currentStep, answers, isLastQuestion, isTransitioning, isLoading, visibleQuestions, onComplete]);

  const handleMultiComplete = useCallback(() => {
    if (isTransitioning || isLoading) return;
    
    const question = visibleQuestions[currentStep];
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
  }, [currentStep, answers, isLastQuestion, isTransitioning, isLoading, visibleQuestions, onComplete]);

  const handleLongPressStart = useCallback((value: string) => {
    const question = visibleQuestions[currentStep];
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
  }, [currentStep, answers, visibleQuestions]);

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
      <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-card container-mobile relative overflow-hidden">
        <FloatingOrbs />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 md:gap-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl card-3d"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="text-center px-4">
            <motion.h2
              className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Finding your perfect match
            </motion.h2>
            <p className="text-sm md:text-base text-muted-foreground">Our AI is analyzing your preferences...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden relative">
      <FloatingOrbs />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with back button - Mobile optimized */}
        <motion.header
          className="flex items-center justify-between px-4 md:px-6 pt-6 md:pt-8 pb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors glass-strong px-3 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm font-medium">Back</span>
            </motion.button>
            <Link to="/">
              <motion.button
                className="flex items-center gap-1 px-2 py-2 rounded-full glass-strong border border-white/20 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="h-4 w-4" />
              </motion.button>
            </Link>
          </div>
          <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {getCategoryEmoji()} {category.title}
          </span>
        </motion.header>

        {/* Progress bar - Enhanced with animations */}
        <motion.div
          className="px-4 md:px-6 py-3 md:py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-2 md:h-2.5 bg-muted/30 dark:bg-muted/20 rounded-full overflow-hidden relative glass">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full shadow-lg relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground text-center mt-2 font-medium">
            Question {currentStep + 1} of {category.questions.length}
          </p>
        </motion.div>

        {/* Question - Mobile-first with smooth transitions */}
        <main className="flex-1 flex flex-col px-4 md:px-6 pt-2 md:pt-4 pb-safe-area-bottom overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: 30, rotateX: -10 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              exit={{ opacity: 0, x: -30, rotateX: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-3 md:mb-4 px-2 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentQuestion.text}
              </motion.h2>

              {currentQuestion.type === 'multi' && (
                <motion.p
                  className="text-xs md:text-sm text-muted-foreground text-center mb-4 md:mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Tap to select multiple options
                </motion.p>
              )}

              {/* Options - Enhanced with 3D cards */}
              <div className="flex-1 overflow-y-auto pb-4 perspective">
                <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-2xl mx-auto">
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
                        relative p-3 md:p-4 rounded-2xl border-2 transition-all duration-300
                        flex flex-col items-center justify-center gap-2 min-h-[90px] md:min-h-[100px]
                        card-3d preserve-3d
                        ${isSelected(option.value)
                          ? 'border-primary bg-gradient-to-br from-purple-600/15 to-pink-600/15 dark:from-purple-600/20 dark:to-pink-600/20 shadow-xl shadow-primary/20'
                          : 'border-border/50 dark:border-border/30 glass-strong hover:border-primary/50 hover:shadow-lg'
                        }
                      `}
                      initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 3,
                        rotateX: -3,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSelected(option.value) && (
                        <motion.div
                          className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </motion.div>
                      )}
                      <span className="text-sm md:text-base font-semibold text-foreground text-center leading-snug">
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
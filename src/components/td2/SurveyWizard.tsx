import { CategoryConfig, SurveyState } from '@/types/td2';
import { Button } from '@/components/ui/button';
import { QuestionBlock } from './QuestionBlock';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface SurveyWizardProps {
  category: CategoryConfig;
  surveyState: SurveyState;
  onAnswerChange: (questionId: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function SurveyWizard({
  category,
  surveyState,
  onAnswerChange,
  onNext,
  onBack,
  onSubmit,
  isLoading,
}: SurveyWizardProps) {
  const currentQuestion = category.questions[surveyState.currentStep];
  const isLastStep = surveyState.currentStep === category.questions.length - 1;
  const currentValue = surveyState.answers[currentQuestion.id];

  const canProceed = () => {
    if (!currentValue) return false;
    if (currentQuestion.type === 'multi' && Array.isArray(currentValue)) {
      return currentValue.length > 0;
    }
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {surveyState.currentStep + 1} of {category.questions.length}
          </span>
          <span className="text-2xl">{category.icon}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((surveyState.currentStep + 1) / category.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="min-h-[300px] flex flex-col justify-center">
        <QuestionBlock
          question={currentQuestion}
          value={currentValue}
          onChange={(value) => onAnswerChange(currentQuestion.id, value)}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={surveyState.currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {isLastStep ? (
          <Button
            onClick={onSubmit}
            disabled={!canProceed() || isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                Finding recommendations...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get Recommendations
              </>
            )}
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!canProceed()}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

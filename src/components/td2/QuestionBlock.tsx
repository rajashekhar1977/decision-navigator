import { Question } from '@/types/td2';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface QuestionBlockProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionBlock({ question, value, onChange }: QuestionBlockProps) {
  const handleSingleSelect = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleMultiSelect = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter((v: string) => v !== optionValue));
    } else {
      onChange([...currentValues, optionValue]);
    }
  };

  const isSelected = (optionValue: string) => {
    if (question.type === 'multi') {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-center">
        {question.text}
      </h2>

      {question.type === 'text' ? (
        <input
          type="text"
          placeholder={question.placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 border border-border rounded-lg bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {question.options?.map((option) => (
            <Button
              key={option.value}
              variant={isSelected(option.value) ? 'default' : 'category'}
              className={`h-auto py-4 px-4 flex flex-col items-center justify-center gap-2 relative ${
                isSelected(option.value) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
              onClick={() => 
                question.type === 'multi' 
                  ? handleMultiSelect(option.value)
                  : handleSingleSelect(option.value)
              }
            >
              {isSelected(option.value) && (
                <Check className="absolute top-2 right-2 h-4 w-4" />
              )}
              <span className="text-sm font-medium">{option.label}</span>
            </Button>
          ))}
        </div>
      )}

      {question.type === 'multi' && (
        <p className="text-center text-sm text-muted-foreground">
          Select all that apply
        </p>
      )}
    </div>
  );
}

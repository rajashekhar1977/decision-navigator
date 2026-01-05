import { CategoryConfig } from '@/types/td2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategorySelectorProps {
  categories: CategoryConfig[];
  onSelect: (category: CategoryConfig) => void;
}

export function CategorySelector({ categories, onSelect }: CategorySelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          What decision do you need help with?
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose a category to get personalized AI-powered recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 bg-card"
            onClick={() => onSelect(category)}
          >
            <CardHeader className="pb-3">
              <div className="text-4xl mb-3">{category.icon}</div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="ghost" 
                className="w-full justify-between group-hover:text-primary"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

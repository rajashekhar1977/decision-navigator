import { EnrichedOption } from '@/types/td2';
import { RecommendationCard } from './RecommendationCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface RecommendationGridProps {
  items: EnrichedOption[];
  currentIndices: Record<string, number>;
  onReload: (itemId: string) => void;
  onViewDetails: (item: EnrichedOption) => void;
  onStartOver: () => void;
  category: string;
}

export function RecommendationGrid({
  items,
  currentIndices,
  onReload,
  onViewDetails,
  onStartOver,
  category,
}: RecommendationGridProps) {
  // Group items by their original order (showing one at a time per "slot")
  const displayedItem = items[currentIndices['main'] || 0];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onStartOver}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Start Over
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Your Recommendations</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Based on your preferences • {items.length} options found
          </p>
        </div>
        <Button variant="ghost" onClick={() => onReload('main')}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Shuffle All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, 6).map((item, index) => (
          <RecommendationCard
            key={item.id}
            item={item}
            currentIndex={index}
            totalItems={items.length}
            onReload={() => onReload(item.id)}
            onViewDetails={() => onViewDetails(item)}
            category={category}
          />
        ))}
      </div>

      {items.length > 6 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Show More Recommendations
          </Button>
        </div>
      )}
    </div>
  );
}

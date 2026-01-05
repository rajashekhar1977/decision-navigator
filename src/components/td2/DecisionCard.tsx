import { EnrichedOption } from '@/types/td2';
import { Button } from '@/components/ui/button';
import { RotateCcw, ExternalLink, Play, MapPin, Star, Clock, ArrowLeft } from 'lucide-react';

interface DecisionCardProps {
  item: EnrichedOption;
  category: string;
  onReload: () => void;
  onStartOver: () => void;
  currentIndex: number;
  totalItems: number;
}

export function DecisionCard({
  item,
  category,
  onReload,
  onStartOver,
  currentIndex,
  totalItems,
}: DecisionCardProps) {
  const getCategoryIcon = () => {
    switch (category) {
      case 'entertainment': return '🎬';
      case 'travel': return '✈️';
      case 'eat': return '🍽️';
      case 'gift': return '🎁';
      case 'buy': return '🛒';
      default: return '✨';
    }
  };

  const getActionButton = () => {
    switch (category) {
      case 'entertainment':
        return (
          <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <Play className="h-4 w-4" />
            Watch Now
          </Button>
        );
      case 'travel':
        return (
          <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <MapPin className="h-4 w-4" />
            Explore
          </Button>
        );
      case 'eat':
        return (
          <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <ExternalLink className="h-4 w-4" />
            Order Now
          </Button>
        );
      default:
        return (
          <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <ExternalLink className="h-4 w-4" />
            Get It
          </Button>
        );
    }
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-5 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-muted/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2 safe-area-top">
        <button
          onClick={onStartOver}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Start Over</span>
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{currentIndex + 1} of {totalItems}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col px-4 pb-4 overflow-hidden">
        {/* Category Badge */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span>{getCategoryIcon()}</span>
            <span>Your Decision</span>
          </span>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg flex-shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl">{getCategoryIcon()}</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Rating badge */}
          {item.extra?.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span>{item.extra.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <h1 className="text-2xl font-bold text-foreground mb-2 line-clamp-2">
            {item.title}
          </h1>
          
          {/* Meta info */}
          <div className="flex flex-wrap gap-2 mb-3">
            {item.extra?.year && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {item.extra.year}
              </span>
            )}
            {item.extra?.duration && (
              <span className="text-xs text-muted-foreground">
                • {item.extra.duration}
              </span>
            )}
            {item.extra?.platforms && (
              <span className="text-xs text-primary">
                {item.extra.platforms.slice(0, 2).join(', ')}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3 flex-shrink-0">
            {item.description || item.snippet}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto pt-4">
          {getActionButton()}
          
          <Button
            variant="outline"
            onClick={onReload}
            className="w-full gap-2 border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" />
            Not for me, next!
          </Button>
        </div>
      </main>
    </div>
  );
}
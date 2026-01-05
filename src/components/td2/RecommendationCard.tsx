import { EnrichedOption } from '@/types/td2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { RefreshCw, ExternalLink, Star, Clock, DollarSign, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecommendationCardProps {
  item: EnrichedOption;
  currentIndex: number;
  totalItems: number;
  onReload: () => void;
  onViewDetails: () => void;
  category: string;
}

export function RecommendationCard({
  item,
  currentIndex,
  totalItems,
  onReload,
  onViewDetails,
  category,
}: RecommendationCardProps) {
  const renderExtra = () => {
    if (!item.extra) return null;

    switch (category) {
      case 'entertainment':
        return (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.extra.year && (
              <Badge variant="secondary">{item.extra.year}</Badge>
            )}
            {item.extra.rating && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {item.extra.rating}
              </Badge>
            )}
            {item.extra.duration && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.extra.duration}
              </Badge>
            )}
            {item.extra.platforms && (
              <div className="w-full mt-2">
                <p className="text-xs text-muted-foreground mb-1">Available on:</p>
                <div className="flex gap-1 flex-wrap">
                  {item.extra.platforms.map((platform: string) => (
                    <Badge key={platform} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'eat':
        return (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.extra.rating && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {item.extra.rating}
              </Badge>
            )}
            {item.extra.priceRange && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {item.extra.priceRange}
              </Badge>
            )}
            {item.extra.distance && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.extra.distance}
              </Badge>
            )}
          </div>
        );

      case 'travel':
        return (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.extra.bestTime && (
              <Badge variant="secondary">Best: {item.extra.bestTime}</Badge>
            )}
            {item.extra.avgCost && (
              <Badge variant="secondary">{item.extra.avgCost}</Badge>
            )}
          </div>
        );

      case 'gift':
      case 'buy':
        return (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.extra.price && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {item.extra.price}
              </Badge>
            )}
            {item.extra.rating && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {item.extra.rating}
              </Badge>
            )}
            {item.extra.seller && (
              <Badge variant="outline">{item.extra.seller}</Badge>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col bg-card border-border hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video relative overflow-hidden">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
        <div className="absolute top-3 right-3">
          <Badge className="bg-background/90 text-foreground">
            {currentIndex + 1}/{totalItems}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold line-clamp-2">{item.title}</h3>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {item.snippet || item.description}
        </p>
        {renderExtra()}
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t border-border">
        <Button variant="reload" className="flex-1" onClick={onReload}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reload
        </Button>
        <Button className="flex-1" onClick={onViewDetails}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

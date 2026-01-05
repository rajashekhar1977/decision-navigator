import { EnrichedOption } from '@/types/td2';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, Star, Clock, DollarSign, MapPin } from 'lucide-react';

interface ReportModalProps {
  item: EnrichedOption | null;
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export function ReportModal({ item, isOpen, onClose, category }: ReportModalProps) {
  if (!item) return null;

  const renderCategorySpecificContent = () => {
    switch (category) {
      case 'entertainment':
        return (
          <div className="space-y-4">
            {item.extra?.platforms && (
              <div>
                <h4 className="font-semibold mb-2">Where to Watch</h4>
                <div className="flex gap-2 flex-wrap">
                  {item.extra.platforms.map((platform: string) => (
                    <Button key={platform} variant="outline" size="sm">
                      {platform}
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h4 className="font-semibold mb-2">Watch Trailer</h4>
              <Button variant="secondary" className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Play Trailer on YouTube
              </Button>
            </div>
          </div>
        );

      case 'eat':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Quick Actions</h4>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Open in Maps
                </Button>
                <Button variant="outline" size="sm">
                  Call Restaurant
                </Button>
                <Button size="sm">
                  Order Delivery
                </Button>
              </div>
            </div>
          </div>
        );

      case 'travel':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Plan Your Trip</h4>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">
                  Find Flights
                </Button>
                <Button variant="outline" size="sm">
                  Book Hotels
                </Button>
                <Button size="sm">
                  Create Itinerary
                </Button>
              </div>
            </div>
          </div>
        );

      case 'gift':
      case 'buy':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Purchase Options</h4>
              <div className="flex gap-2 flex-wrap">
                {item.extra?.seller && (
                  <Button size="sm">
                    Buy on {item.extra.seller}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Compare Prices
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.title}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.extra?.year && <Badge variant="secondary">{item.extra.year}</Badge>}
              {item.extra?.rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {item.extra.rating}
                </Badge>
              )}
              {item.extra?.duration && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.extra.duration}
                </Badge>
              )}
              {item.extra?.price && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {item.extra.price}
                </Badge>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {item.image && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Overview</h4>
            <p className="text-muted-foreground">
              {item.description || item.snippet}
            </p>
          </div>

          {renderCategorySpecificContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

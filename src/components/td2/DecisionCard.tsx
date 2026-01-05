import { EnrichedOption } from '@/types/td2';
import { RotateCcw, ExternalLink, Play, MapPin, Star, Clock, ArrowLeft, Sparkles, Home, ChevronDown, TrendingUp, Users, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface DecisionCardProps {
  item: EnrichedOption;
  category: string;
  onReload: () => void;
  onStartOver: () => void;
  currentIndex: number;
  totalItems: number;
}

const categoryGradients: Record<string, string> = {
  entertainment: 'from-purple-600 to-pink-600',
  travel: 'from-blue-600 to-cyan-600',
  eat: 'from-orange-600 to-red-600',
  gift: 'from-rose-600 to-pink-600',
  buy: 'from-green-600 to-emerald-600',
};

// Streaming platform URL patterns
const getStreamingPlatformUrl = (providerName: string, title: string): string => {
  const encodedTitle = encodeURIComponent(title);
  const lowerProvider = providerName.toLowerCase();
  
  // Map of provider names to their search/browse URLs
  if (lowerProvider.includes('netflix')) {
    return `https://www.netflix.com/search?q=${encodedTitle}`;
  }
  if (lowerProvider.includes('hulu')) {
    return `https://www.hulu.com/search?q=${encodedTitle}`;
  }
  if (lowerProvider.includes('disney')) {
    return `https://www.disneyplus.com/search?q=${encodedTitle}`;
  }
  if (lowerProvider.includes('amazon') || lowerProvider.includes('prime')) {
    return `https://www.amazon.com/s?k=${encodedTitle}&i=instant-video`;
  }
  if (lowerProvider.includes('hbo') || lowerProvider.includes('max')) {
    return `https://www.max.com/search?q=${encodedTitle}`;
  }
  if (lowerProvider.includes('apple')) {
    return `https://tv.apple.com/search?q=${encodedTitle}`;
  }
  if (lowerProvider.includes('paramount')) {
    return `https://www.paramountplus.com/search/?query=${encodedTitle}`;
  }
  if (lowerProvider.includes('peacock')) {
    return `https://www.peacocktv.com/search?q=${encodedTitle}`;
  }
  if (lowerProvider.includes('showtime')) {
    return `https://www.showtime.com/search/${encodedTitle}`;
  }
  if (lowerProvider.includes('starz')) {
    return `https://www.starz.com/us/en/search?query=${encodedTitle}`;
  }
  if (lowerProvider.includes('crunchyroll')) {
    return `https://www.crunchyroll.com/search?q=${encodedTitle}`;
  }
  if (lowerProvider.includes('funimation')) {
    return `https://www.funimation.com/search/?q=${encodedTitle}`;
  }
  
  // Default: return JustWatch/TMDB link as fallback
  return '';
};

export function DecisionCard({
  item,
  category,
  onReload,
  onStartOver,
  currentIndex,
  totalItems,
}: DecisionCardProps) {
  const [showStreamingMenu, setShowStreamingMenu] = useState(false);
  
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

  const hasStreamingServices = item.extra?.streamingServices && item.extra.streamingServices.length > 0;
  const hasRentalServices = item.extra?.rentalServices && item.extra.rentalServices.length > 0;
  const hasPurchaseServices = item.extra?.purchaseServices && item.extra.purchaseServices.length > 0;
  const hasAnyServices = hasStreamingServices || hasRentalServices || hasPurchaseServices;
  
  // Debug logging
  console.log(`[DecisionCard] "${item.title}":`, {
    hasImage: !!item.image,
    hasSourceUrl: !!item.sourceUrl,
    hasStreamingServices,
    hasRentalServices,
    hasPurchaseServices,
    sourceUrl: item.sourceUrl,
    tmdbLink: item.extra?.tmdbLink,
  });
  
  // sourceUrl is the JustWatch link that shows all streaming options
  const streamingLink = item.sourceUrl || item.extra?.tmdbLink;

  const getActionButton = () => {
    const gradient = categoryGradients[category] || 'from-purple-600 to-pink-600';

    switch (category) {
      case 'entertainment':
        // Check if it's a game with stores
        if (item.extra?.stores && item.extra.stores.length > 0) {
          return (
            <DropdownMenu open={showStreamingMenu} onOpenChange={setShowStreamingMenu}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2 relative overflow-hidden group`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Play className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Get Game</span>
                  <ChevronDown className="h-4 w-4 relative z-10" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 glass-strong border-white/30 dark:border-white/20" 
                align="center"
                sideOffset={8}
                avoidCollisions={true}
              >
                <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Available at these stores</DropdownMenuLabel>
                {item.extra.stores.map((store: any, idx: number) => (
                  <DropdownMenuItem
                    key={idx}
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => {
                      const url = store.url || item.extra?.rawgLink || item.sourceUrl;
                      console.log(`[DecisionCard] Opening ${store.name}: ${url}`);
                      window.open(url, '_blank');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-4 w-4" />
                      <span className="font-medium">{store.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => window.open(item.extra?.rawgLink || item.sourceUrl, '_blank')}
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>More Details</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        
        // Check if it's a movie/show with streaming services
        if (hasAnyServices) {
          return (
            <DropdownMenu open={showStreamingMenu} onOpenChange={setShowStreamingMenu}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2 relative overflow-hidden group`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Play className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Watch Now</span>
                  <ChevronDown className="h-4 w-4 relative z-10" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 glass-strong border-white/30 dark:border-white/20" 
                align="center"
                sideOffset={8}
                avoidCollisions={true}
              >
                {hasStreamingServices && (
                  <>
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Available on these platforms</DropdownMenuLabel>
                    {item.extra.streamingServices.map((service: any) => {
                      const platformUrl = getStreamingPlatformUrl(service.name, item.title) || streamingLink;
                      return (
                        <DropdownMenuItem
                          key={service.id}
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => {
                            console.log(`[DecisionCard] Opening ${service.name}: ${platformUrl}`);
                            window.open(platformUrl, '_blank');
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <img src={service.logo} alt={service.name} className="w-8 h-8 rounded" />
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                    {(hasRentalServices || hasPurchaseServices) && <DropdownMenuSeparator />}
                  </>
                )}
                {hasRentalServices && (
                  <>
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Rent</DropdownMenuLabel>
                    {item.extra.rentalServices.map((service: any) => {
                      const platformUrl = getStreamingPlatformUrl(service.name, item.title) || streamingLink;
                      return (
                        <DropdownMenuItem
                          key={service.id}
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => {
                            console.log(`[DecisionCard] Opening ${service.name} (Rent): ${platformUrl}`);
                            window.open(platformUrl, '_blank');
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <img src={service.logo} alt={service.name} className="w-8 h-8 rounded" />
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                    {hasPurchaseServices && <DropdownMenuSeparator />}
                  </>
                )}
                {hasPurchaseServices && (
                  <>
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Buy</DropdownMenuLabel>
                    {item.extra.purchaseServices.map((service: any) => {
                      const platformUrl = getStreamingPlatformUrl(service.name, item.title) || streamingLink;
                      return (
                        <DropdownMenuItem
                          key={service.id}
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => {
                            console.log(`[DecisionCard] Opening ${service.name} (Buy): ${platformUrl}`);
                            window.open(platformUrl, '_blank');
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <img src={service.logo} alt={service.name} className="w-8 h-8 rounded" />
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => window.open(item.extra?.tmdbLink || streamingLink, '_blank')}
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>More Details</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
        // Fallback if no streaming services
        return (
          <motion.button
            onClick={() => {
              const url = item.sourceUrl || item.extra?.tmdbLink || `https://www.themoviedb.org/search?query=${encodeURIComponent(item.title)}`;
              console.log(`[DecisionCard] Opening fallback URL: ${url}`);
              window.open(url, '_blank');
            }}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="h-5 w-5" />
            View Details
          </motion.button>
        );
      case 'travel':
        return (
          <motion.button
            onClick={() => window.open(item.sourceUrl, '_blank')}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2 relative overflow-hidden group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <MapPin className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Explore</span>
          </motion.button>
        );
      case 'eat':
        return (
          <motion.button
            onClick={() => window.open(item.sourceUrl, '_blank')}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2 relative overflow-hidden group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <ExternalLink className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Order Now</span>
          </motion.button>
        );
      default:
        return (
          <motion.button
            onClick={() => window.open(item.sourceUrl, '_blank')}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2 relative overflow-hidden group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <ExternalLink className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Get It</span>
          </motion.button>
        );
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden relative">
      <FloatingOrbs />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between px-4 md:px-6 pt-6 md:pt-8 pb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onStartOver}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors glass-strong px-3 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm font-medium hidden sm:inline">Start Over</span>
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
          <motion.div
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>{currentIndex + 1} of {totalItems}</span>
          </motion.div>
        </motion.header>

        {/* Main Content - Professional Redesign */}
        <AnimatePresence mode="wait">
          <motion.main
            key={item.id}
            className="flex-1 flex flex-col px-4 md:px-6 pb-6 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Badge */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${categoryGradients[category] || 'from-purple-600 to-pink-600'} text-white text-sm font-bold shadow-lg`}>
                <Sparkles className="h-4 w-4" />
                <span>Your Decision</span>
              </span>
            </motion.div>

            {/* Professional Card Layout */}
            <div className="max-w-2xl mx-auto w-full space-y-4">
              {/* Image with enhanced styling */}
              <motion.div
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl card-3d"
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className={`hidden w-full h-full bg-gradient-to-br ${categoryGradients[category] || 'from-purple-600 to-pink-600'} opacity-20 items-center justify-center`}>
                      <span className="text-8xl">{getCategoryIcon()}</span>
                    </div>
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${categoryGradients[category] || 'from-purple-600 to-pink-600'} opacity-20 flex items-center justify-center`}>
                    <span className="text-8xl">{getCategoryIcon()}</span>
                  </div>
                )}

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Rating badge */}
                {item.extra?.rating && (
                  <motion.div
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong border border-white/40 dark:border-white/30 text-sm font-bold shadow-xl backdrop-blur-md"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold">{item.extra.rating}</span>
                  </motion.div>
                )}
                
                {/* Year badge */}
                {item.extra?.year && (
                  <motion.div
                    className="absolute top-3 left-3 px-3 py-1.5 rounded-full glass-strong border border-white/40 dark:border-white/30 text-xs font-bold text-white shadow-xl backdrop-blur-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    {item.extra.year}
                  </motion.div>
                )}
              </motion.div>

              {/* Title & Info */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                  {item.title}
                </h2>
                
                {/* Meta info chips */}
                <div className="flex flex-wrap gap-2">
                  {item.extra?.genres && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong border border-white/30 dark:border-white/20 text-xs font-medium">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      <span>{item.extra.genres.split(',')[0].trim()}</span>
                    </div>
                  )}
                  {item.extra?.duration && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong border border-white/30 dark:border-white/20 text-xs font-medium">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span>{item.extra.duration}</span>
                    </div>
                  )}
                  {item.extra?.playtime && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong border border-white/30 dark:border-white/20 text-xs font-medium">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span>{item.extra.playtime}</span>
                    </div>
                  )}
                  {item.extra?.metacritic && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong border border-white/30 dark:border-white/20 text-xs font-medium">
                      <Star className="h-3.5 w-3.5 text-yellow-500" />
                      <span>Metacritic: {item.extra.metacritic}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {item.snippet && (
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {item.snippet}
                  </p>
                )}

                {/* Cast or Platforms */}
                {item.extra?.cast && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>Cast</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.extra.cast}
                    </p>
                  </div>
                )}
                {item.extra?.platforms && !item.extra?.cast && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>Platforms</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.extra.platforms}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {getActionButton()}
              </motion.div>

              {/* Reload button */}
              <motion.button
                onClick={onReload}
                className="w-full py-3 rounded-xl glass-strong border border-white/30 dark:border-white/20 flex items-center justify-center gap-2 text-foreground hover:border-primary/50 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <RotateCcw className="h-4 w-4" />
                <span>Show Another Option</span>
              </motion.button>
            </div>
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
import { EnrichedOption } from '@/types/td2';
import { RotateCcw, ExternalLink, Play, MapPin, Star, Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';

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
    const gradient = categoryGradients[category] || 'from-purple-600 to-pink-600';

    switch (category) {
      case 'entertainment':
        return (
          <motion.button
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="h-5 w-5" />
            Watch Now
          </motion.button>
        );
      case 'travel':
        return (
          <motion.button
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MapPin className="h-5 w-5" />
            Explore
          </motion.button>
        );
      case 'eat':
        return (
          <motion.button
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="h-5 w-5" />
            Order Now
          </motion.button>
        );
      default:
        return (
          <motion.button
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl bg-gradient-to-r ${gradient} flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="h-5 w-5" />
            Get It
          </motion.button>
        );
    }
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden relative">
      <FloatingOrbs />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between px-6 pt-6 pb-3 safe-area-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={onStartOver}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Start Over</span>
          </motion.button>
          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>{currentIndex + 1} of {totalItems}</span>
          </motion.div>
        </motion.header>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.main
            key={item.id}
            className="flex-1 flex flex-col px-6 pb-6 overflow-hidden"
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

            {/* Image */}
            <motion.div
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-5 shadow-2xl flex-shrink-0 glass border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${categoryGradients[category] || 'from-purple-600 to-pink-600'} opacity-20 flex items-center justify-center`}>
                  <span className="text-8xl">{getCategoryIcon()}</span>
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              {/* Rating badge */}
              {item.extra?.rating && (
                <motion.div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-full glass border border-white/20 text-sm font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{item.extra.rating}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl font-black text-foreground mb-3 line-clamp-2">
                {item.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap gap-3 mb-4">
                {item.extra?.year && (
                  <motion.span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/20 text-xs font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {item.extra.year}
                  </motion.span>
                )}
                {item.extra?.duration && (
                  <motion.span
                    className="inline-flex items-center px-3 py-1.5 rounded-full glass border border-white/20 text-xs font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {item.extra.duration}
                  </motion.span>
                )}
                {item.extra?.platforms && (
                  <motion.span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryGradients[category] || 'from-purple-600 to-pink-600'} text-white text-xs font-bold shadow-lg`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {item.extra.platforms.slice(0, 2).join(', ')}
                  </motion.span>
                )}
              </div>

              {/* Description */}
              <motion.p
                className="text-base text-muted-foreground line-clamp-3 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {item.description || item.snippet}
              </motion.p>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex flex-col gap-3 mt-auto pt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {getActionButton()}

              <motion.button
                onClick={onReload}
                className="w-full py-4 rounded-2xl font-bold glass border-2 border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="h-5 w-5" />
                Not for me, next!
              </motion.button>
            </motion.div>
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
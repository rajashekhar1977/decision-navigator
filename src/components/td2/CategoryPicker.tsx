import { CategoryConfig } from '@/types/td2';
import { Film, Plane, Utensils, Gift, ShoppingBag, Sparkles, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Link } from 'react-router-dom';

interface CategoryPickerProps {
  categories: CategoryConfig[];
  onSelect: (category: CategoryConfig) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  entertainment: <Film className="h-8 w-8" />,
  travel: <Plane className="h-8 w-8" />,
  eat: <Utensils className="h-8 w-8" />,
  gift: <Gift className="h-8 w-8" />,
  buy: <ShoppingBag className="h-8 w-8" />,
};

const categoryColors: Record<string, string> = {
  entertainment: 'from-purple-600 to-pink-600',
  travel: 'from-blue-600 to-cyan-600',
  eat: 'from-orange-600 to-red-600',
  gift: 'from-rose-600 to-pink-600',
  buy: 'from-green-600 to-emerald-600',
};

export function CategoryPicker({ categories, onSelect }: CategoryPickerProps) {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden relative">
      <FloatingOrbs />

      <div className="relative z-10 h-full flex flex-col">
        {/* Back to Home Button */}
        <motion.div
          className="absolute top-4 left-4 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/">
            <motion.button
              className="flex items-center gap-2 px-3 py-2 rounded-full glass-strong border border-white/30 dark:border-white/20 text-muted-foreground hover:text-foreground transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Home</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Header - Enhanced with glassmorphism */}
        <motion.header
          className="px-4 md:px-6 pt-16 md:pt-20 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-xl card-3d"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                rotateY: [0, 10, -10, 0],
                rotateX: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                TD²
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">The Decision Deck</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Can't decide? Let AI choose for you. Pick what you need help with.
          </p>
        </motion.header>

        {/* Categories Grid - 3D perspective and mobile-first */}
        <main className="flex-1 px-3 md:px-4 pb-6 md:pb-8 overflow-y-auto perspective">
          <div className="grid grid-cols-2 gap-3 md:gap-4 pb-6 max-w-2xl mx-auto min-h-full content-start">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => onSelect(category)}
                className="group relative p-4 md:p-6 rounded-3xl glass-strong border border-white/30 dark:border-white/20 overflow-hidden preserve-3d card-3d min-h-[160px] md:min-h-[200px]"
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category.id]} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                <div className="relative flex flex-col items-center gap-2 md:gap-3 text-center h-full justify-center">
                  <motion.div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${categoryColors[category.id]} flex items-center justify-center text-white shadow-xl rotate-3d`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {categoryIcons[category.id]}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-foreground text-base md:text-lg mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {getCategoryDescription(category.id)}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Footer hint - Mobile friendly */}
          <motion.div
            className="text-center pb-4 md:pb-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              Answer a few quick questions and get instant decisions
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function getCategoryDescription(id: string): string {
  switch (id) {
    case 'entertainment': return 'Movies, shows, games & more';
    case 'travel': return 'Destinations & experiences';
    case 'eat': return 'Restaurants, recipes & food';
    case 'gift': return 'Perfect presents for anyone';
    case 'buy': return 'Products & purchases';
    default: return '';
  }
}
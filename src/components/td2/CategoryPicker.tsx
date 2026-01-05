import { CategoryConfig } from '@/types/td2';
import { Film, Plane, Utensils, Gift, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';

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
    <div className="h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden relative">
      <FloatingOrbs />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.header
          className="px-6 pt-8 pb-4 safe-area-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-black text-foreground">TD²</h1>
              <p className="text-sm text-muted-foreground">The Decision Deck</p>
            </div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            Can't decide? Let AI choose for you. Pick what you need help with.
          </p>
        </motion.header>

        {/* Categories Grid */}
        <main className="flex-1 px-4 pb-safe-area-bottom overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 pb-6">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => onSelect(category)}
                className="group relative p-6 rounded-3xl glass border border-white/20 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category.id]} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                <div className="relative flex flex-col items-center gap-3 text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[category.id]} flex items-center justify-center text-white shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {categoryIcons[category.id]}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {getCategoryDescription(category.id)}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Footer hint */}
          <motion.div
            className="text-center pb-6"
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
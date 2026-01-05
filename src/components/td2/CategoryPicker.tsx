import { CategoryConfig } from '@/types/td2';
import { Film, Plane, Utensils, Gift, ShoppingBag, Sparkles } from 'lucide-react';

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
  entertainment: 'from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30',
  travel: 'from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30',
  eat: 'from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30',
  gift: 'from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30',
  buy: 'from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30',
};

export function CategoryPicker({ categories, onSelect }: CategoryPickerProps) {
  return (
    <div className="h-[100dvh] w-full flex flex-col bg-gradient-to-b from-background via-background to-card overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-muted/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 pt-8 pb-4 safe-area-top">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">TD²</h1>
            <p className="text-xs text-muted-foreground">The Decision Deck</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Can't decide? Let AI choose for you. Pick what you need help with.
        </p>
      </header>

      {/* Categories Grid */}
      <main className="relative z-10 flex-1 px-4 pb-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onSelect(category)}
              className={`
                relative p-5 rounded-3xl border border-border/50 
                bg-gradient-to-br ${categoryColors[category.id]}
                transition-all duration-300 transform
                hover:scale-[1.02] active:scale-[0.98]
                hover:shadow-lg hover:shadow-primary/10
                flex flex-col items-start gap-3
                overflow-hidden
              `}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-background/5 rounded-bl-[3rem]" />
              
              <div className="w-14 h-14 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground">
                {categoryIcons[category.id]}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {getCategoryDescription(category.id)}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Answer a few quick questions and get instant decisions
          </p>
        </div>
      </main>
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
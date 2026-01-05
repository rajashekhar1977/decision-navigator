import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types/budget';
import { budgetCategories } from '@/data/budgetCategories';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export function TransactionCard({ transaction, onDelete }: TransactionCardProps) {
  const category = budgetCategories.find((c) => c.id === transaction.category);
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-strong border border-white/30 dark:border-white/20 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category?.color || 'from-gray-500 to-slate-500'} flex items-center justify-center text-2xl shadow-lg`}>
                {category?.icon || '📌'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{transaction.description}</h3>
                <p className="text-xs text-muted-foreground">{category?.name || 'Other'}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`text-right ${isIncome ? 'text-green-500' : 'text-red-500'} font-bold text-lg`}>
                {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(transaction.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

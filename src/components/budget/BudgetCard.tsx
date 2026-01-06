import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Budget } from '@/types/budget';
import { budgetCategories } from '@/data/budgetCategories';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface BudgetCardProps {
  budget: Budget;
  currencySymbol?: string;
}

export function BudgetCard({ budget, currencySymbol = '$' }: BudgetCardProps) {
  const category = budgetCategories.find((c) => c.id === budget.category);
  const spent = budget.spent ?? 0;
  const limit = budget.limit ?? 0;
  const percentage = limit > 0 ? (spent / limit) * 100 : 0;
  const isOverBudget = percentage > 100;
  const isNearLimit = percentage > 80 && percentage <= 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`glass-strong border transition-all duration-300 ${
        isOverBudget 
          ? 'border-red-500/50 hover:border-red-500' 
          : isNearLimit 
          ? 'border-yellow-500/50 hover:border-yellow-500'
          : 'border-white/30 dark:border-white/20 hover:shadow-lg'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category?.color || 'from-gray-500 to-slate-500'} flex items-center justify-center text-xl shadow-lg`}>
                {category?.icon || '📌'}
              </div>
              <CardTitle className="text-base">{category?.name || 'Other'}</CardTitle>
            </div>
            {isOverBudget ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : percentage >= 100 ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className={`font-semibold ${isOverBudget ? 'text-red-500' : 'text-foreground'}`}>
              {currencySymbol}{spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / {currencySymbol}{limit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <Progress 
            value={Math.min(percentage, 100)} 
            className={`h-2 ${
              isOverBudget 
                ? '[&>div]:bg-red-500' 
                : isNearLimit 
                ? '[&>div]:bg-yellow-500'
                : '[&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-cyan-500'
            }`}
          />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground capitalize">{budget.period}</span>
            <span className={`font-medium ${
              isOverBudget ? 'text-red-500' : isNearLimit ? 'text-yellow-500' : 'text-muted-foreground'
            }`}>
              {percentage.toFixed(0)}%
            </span>
          </div>
          {isOverBudget && (
            <p className="text-xs text-red-500 font-medium">
              Over budget by {currencySymbol}{(spent - limit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

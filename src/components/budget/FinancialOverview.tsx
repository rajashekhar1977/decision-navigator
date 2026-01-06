import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialSummary } from '@/types/budget';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';

interface FinancialOverviewProps {
  summary: FinancialSummary;
  currencySymbol?: string;
}

export function FinancialOverview({ summary, currencySymbol = '$' }: FinancialOverviewProps) {
  const stats = [
    {
      title: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-500',
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: 'from-red-500 to-rose-500',
      textColor: 'text-red-500',
    },
    {
      title: 'Balance',
      value: summary.balance,
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500',
      textColor: summary.balance >= 0 ? 'text-blue-500' : 'text-red-500',
    },
    {
      title: 'Savings Rate',
      value: summary.savingsRate,
      icon: PiggyBank,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-500',
      isPercentage: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="glass-strong border border-white/30 dark:border-white/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.isPercentage ? `${stat.value.toFixed(1)}%` : `${currencySymbol}${stat.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

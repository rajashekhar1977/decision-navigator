import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types/budget';
import { budgetCategories } from '@/data/budgetCategories';
import { motion } from 'framer-motion';
import { Trash2, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
  onClick: (transaction: Transaction) => void;
  currencySymbol?: string;
}

export function TransactionCard({ transaction, onDelete, onClick, currencySymbol = '$' }: TransactionCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const category = budgetCategories.find((c) => c.id === transaction.category);
  const isIncome = transaction.type === 'income';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(transaction.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="relative group cursor-pointer"
        onClick={() => onClick(transaction)}
      >
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category?.color || 'from-gray-500 to-slate-500'} flex items-center justify-center text-2xl shadow-lg shrink-0 relative`}>
              {category?.icon || '📌'}
              {transaction.attachment_url && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Paperclip className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base truncate text-foreground">{transaction.description}</h3>
              <p className="text-sm text-muted-foreground">{category?.name || 'Other'}</p>
              <p className="text-xs text-muted-foreground/80 mt-0.5">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-right ${isIncome ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'} font-bold text-xl`}>
              {isIncome ? '+' : ''}{currencySymbol}{Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="glass-strong border border-white/30 dark:border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{transaction.description}"? This action cannot be undone and will affect your budget calculations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Transaction } from '@/types/budget';
import { budgetCategories } from '@/data/budgetCategories';
import { Calendar, Tag, FileText, Image as ImageIcon, FileImage } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currencySymbol?: string;
}

export function TransactionDetailsModal({ 
  transaction, 
  open, 
  onOpenChange,
  currencySymbol = '$' 
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const category = budgetCategories.find((c) => c.id === transaction.category);
  const isIncome = transaction.type === 'income';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border border-white/30 dark:border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category?.color || 'from-gray-500 to-slate-500'} flex items-center justify-center text-2xl shadow-lg`}>
              {category?.icon || '📌'}
            </div>
            <div>
              <h3 className="text-xl font-bold">{transaction.description}</h3>
              <p className="text-sm text-muted-foreground font-normal">{category?.name || 'Other'}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Amount */}
          <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border border-white/20">
            <span className="text-muted-foreground">Amount</span>
            <span className={`text-2xl font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
              {isIncome ? '+' : ''}{currencySymbol}{Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border border-white/20">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Notes */}
          {transaction.notes && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Notes</span>
              </div>
              <p className="text-foreground whitespace-pre-wrap">{transaction.notes}</p>
            </div>
          )}

          {/* Tags */}
          {transaction.tags && transaction.tags.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {transaction.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Attachment */}
          {transaction.attachment_url && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                {transaction.attachment_type === 'pdf' ? (
                  <FileImage className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">
                  {transaction.attachment_type === 'pdf' ? 'Receipt PDF' : 'Receipt Photo'}
                </span>
              </div>
              
              {transaction.attachment_type === 'image' ? (
                <img 
                  src={transaction.attachment_url} 
                  alt="Receipt" 
                  className="w-full rounded-lg border border-white/20 shadow-lg max-h-96 object-contain bg-white/5"
                />
              ) : (
                <a 
                  href={transaction.attachment_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <FileImage className="h-4 w-4" />
                  View PDF Receipt
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { budgetCategories } from '@/data/budgetCategories';
import { Budget } from '@/types/budget';
import { Target } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface SetBudgetModalProps {
  onSet: (budget: Budget) => void;
  currencySymbol?: string;
}

export function SetBudgetModal({ onSet, currencySymbol = '$' }: SetBudgetModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.limit) return;

    const budget: Budget = {
      id: uuidv4(),
      category: formData.category,
      limit: parseFloat(formData.limit),
      spent: 0,
      period: formData.period,
    };

    onSet(budget);
    setFormData({
      category: '',
      limit: '',
      period: 'monthly',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/30 dark:border-white/20">
          <Target className="h-5 w-5 mr-2" />
          Set Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border border-white/30 dark:border-white/20">
        <DialogHeader>
          <DialogTitle>Set Budget Limit</DialogTitle>
          <DialogDescription>
            Set a spending limit for a category to track your budget.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget-category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger id="budget-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {budgetCategories
                  .filter((cat) => cat.id !== 'income')
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </span>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Budget Limit ({currencySymbol})</Label>
            <Input
              id="limit"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Select value={formData.period} onValueChange={(value: 'monthly' | 'weekly' | 'yearly') => setFormData({ ...formData, period: value })}>
              <SelectTrigger id="period">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
            Set Budget
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

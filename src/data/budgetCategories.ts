import { Category } from '@/types/budget';

export const budgetCategories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: '🛒', color: 'from-green-500 to-emerald-500' },
  { id: 'dining', name: 'Dining Out', icon: '🍽️', color: 'from-orange-500 to-red-500' },
  { id: 'transport', name: 'Transportation', icon: '🚗', color: 'from-blue-500 to-cyan-500' },
  { id: 'utilities', name: 'Utilities', icon: '💡', color: 'from-yellow-500 to-orange-500' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮', color: 'from-purple-500 to-pink-500' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'from-pink-500 to-rose-500' },
  { id: 'health', name: 'Health', icon: '⚕️', color: 'from-red-500 to-pink-500' },
  { id: 'education', name: 'Education', icon: '📚', color: 'from-indigo-500 to-purple-500' },
  { id: 'housing', name: 'Housing', icon: '🏠', color: 'from-slate-500 to-gray-500' },
  { id: 'income', name: 'Income', icon: '💰', color: 'from-green-500 to-teal-500' },
  { id: 'savings', name: 'Savings', icon: '🏦', color: 'from-blue-500 to-indigo-500' },
  { id: 'other', name: 'Other', icon: '📌', color: 'from-gray-500 to-slate-500' },
];

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  attachment_url?: string;
  attachment_type?: 'image' | 'pdf' | 'none';
  notes?: string;
  tags?: string[];
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
}

export interface UserPreferences {
  currency: string;
  currencySymbol: string;
  locale: string;
}

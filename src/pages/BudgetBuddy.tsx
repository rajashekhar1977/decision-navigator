import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Transaction, Budget, FinancialSummary } from '@/types/budget';
import { FinancialOverview } from '@/components/budget/FinancialOverview';
import { TransactionCard } from '@/components/budget/TransactionCard';
import { BudgetCard } from '@/components/budget/BudgetCard';
import { AddTransactionModal } from '@/components/budget/AddTransactionModal';
import { SetBudgetModal } from '@/components/budget/SetBudgetModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, TrendingUp, Target, History, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const BudgetBuddy = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savingsRate: 0,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  // Load from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .order('date', { ascending: false });

        if (transactionsError) throw transactionsError;

        // Fetch budgets
        const { data: budgetsData, error: budgetsError } = await supabase
          .from('budgets')
          .select('*');

        if (budgetsError) throw budgetsError;

        // Initialize budgets with spent = 0
        const budgetsWithSpent = (budgetsData || []).map(budget => ({
          ...budget,
          limit: Number(budget.limit_amount),
          spent: 0,
        }));

        setTransactions(transactionsData || []);
        setBudgets(budgetsWithSpent);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load your budget data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Calculate summary when transactions change
  useEffect(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

    setSummary({
      totalIncome,
      totalExpenses,
      balance,
      savingsRate,
    });

    // Update budget spent amounts
    const updatedBudgets = budgets.map((budget) => {
      const spent = transactions
        .filter((t) => t.type === 'expense' && t.category === budget.category)
        .reduce((sum, t) => sum + Number(t.amount), 0);
      return { ...budget, spent };
    });
    
    if (JSON.stringify(updatedBudgets) !== JSON.stringify(budgets)) {
      setBudgets(updatedBudgets);
    }
  }, [transactions, budgets]);

  const handleAddTransaction = async (transaction: Transaction) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            description: transaction.description,
            amount: transaction.amount,
            category: transaction.category,
            date: transaction.date,
            type: transaction.type,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setTransactions([data, ...transactions]);
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Failed to delete transaction. Please try again.');
    }
  };

  const handleSetBudget = async (budget: Budget) => {
    if (!user) return;

    try {
      const existingIndex = budgets.findIndex((b) => b.category === budget.category);
      
      if (existingIndex >= 0) {
        // Update existing budget
        const { data, error } = await supabase
          .from('budgets')
          .update({ limit_amount: budget.limit })
          .eq('id', budgets[existingIndex].id)
          .select()
          .single();

        if (error) throw error;
        
        const updated = [...budgets];
        updated[existingIndex] = { 
          ...data, 
          limit: Number(data.limit_amount),
          spent: updated[existingIndex].spent 
        };
        setBudgets(updated);
      } else {
        // Insert new budget
        const { data, error } = await supabase
          .from('budgets')
          .insert([
            {
              user_id: user.id,
              category: budget.category,
              limit_amount: budget.limit,
              period: 'monthly',
            },
          ])
          .select()
          .single();

        if (error) throw error;
        setBudgets([...budgets, { 
          ...data, 
          limit: Number(data.limit_amount),
          spent: 0 
        }]);
      }
    } catch (err) {
      console.error('Error setting budget:', err);
      setError('Failed to set budget. Please try again.');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-blue-500/5 dark:to-blue-900/10">
        <AnimatedBackground />
        <FloatingOrbs />
        <div className="relative z-10 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your budget data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-500/5 dark:to-blue-900/10">
      <AnimatedBackground />
      <FloatingOrbs />

      <div className="relative z-10">
        <Header />

        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-white/30 dark:border-white/20 text-sm font-medium mb-4">
                <Wallet className="h-4 w-4 text-blue-500" />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent font-semibold">
                  Budget Buddy
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Smart Expense Tracking
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Take control of your finances with intelligent tracking and budgeting
              </p>
            </motion.div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert variant="destructive" className="glass-strong">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Financial Overview */}
            <div className="mb-8">
              <FinancialOverview summary={summary} />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <AddTransactionModal onAdd={handleAddTransaction} />
              <SetBudgetModal onSet={handleSetBudget} />
            </div>

            {/* Main Content */}
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="transactions">
                  <History className="h-4 w-4 mr-2" />
                  Transactions
                </TabsTrigger>
                <TabsTrigger value="budgets">
                  <Target className="h-4 w-4 mr-2" />
                  Budgets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="mt-0">
                <Card className="glass-strong border border-white/30 dark:border-white/20">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions.length === 0 ? (
                      <div className="text-center py-12">
                        <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground">No transactions yet</p>
                        <p className="text-sm text-muted-foreground">Add your first transaction to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {transactions.map((transaction) => (
                            <TransactionCard
                              key={transaction.id}
                              transaction={transaction}
                              onDelete={handleDeleteTransaction}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="budgets" className="mt-0">
                {budgets.length === 0 ? (
                  <Card className="glass-strong border border-white/30 dark:border-white/20">
                    <CardContent className="py-12">
                      <div className="text-center">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground">No budgets set yet</p>
                        <p className="text-sm text-muted-foreground mb-4">Set budget limits to track your spending</p>
                        <SetBudgetModal onSet={handleSetBudget} />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budgets.map((budget) => (
                      <BudgetCard key={budget.id} budget={budget} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default BudgetBuddy;

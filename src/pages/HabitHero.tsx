import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Habit, HabitStreak, Achievement } from '@/types/habit';
import { HabitCard } from '@/components/habit/HabitCard';
import { AddHabitModal } from '@/components/habit/AddHabitModal';
import { AchievementCard } from '@/components/habit/AchievementCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Target, Trophy, Flame, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const HabitHero = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Step',
      description: 'Complete your first habit',
      icon: '🎯',
      progress: 0,
      target: 1,
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '⚔️',
      progress: 0,
      target: 7,
    },
    {
      id: '3',
      title: 'Consistency King',
      description: 'Maintain a 30-day streak',
      icon: '👑',
      progress: 0,
      target: 30,
    },
    {
      id: '4',
      title: 'Century Club',
      description: 'Complete 100 total habits',
      icon: '💯',
      progress: 0,
      target: 100,
    },
    {
      id: '5',
      title: 'Habit Master',
      description: 'Track 10 different habits',
      icon: '🎓',
      progress: 0,
      target: 10,
    },
    {
      id: '6',
      title: 'Perfectionist',
      description: 'Complete all habits for a week',
      icon: '⭐',
      progress: 0,
      target: 7,
    },
  ]);

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

        // Fetch habits
        const { data: habitsData, error: habitsError } = await supabase
          .from('habits')
          .select('*')
          .order('created_at', { ascending: false });

        if (habitsError) throw habitsError;

        // Fetch completions for all habits
        const habitIds = habitsData?.map((h) => h.id) || [];
        let completionsData = [];

        if (habitIds.length > 0) {
          const { data: completions, error: completionsError } = await supabase
            .from('habit_completions')
            .select('*')
            .in('habit_id', habitIds);

          if (completionsError) throw completionsError;
          completionsData = completions || [];
        }

        // Combine habits with their completions
        const habitsWithCompletions = (habitsData || []).map((habit) => ({
          ...habit,
          completions: completionsData
            .filter((c) => c.habit_id === habit.id)
            .map((c) => ({
              date: c.date,
              completed: c.completed,
              note: c.note,
            })),
        }));

        setHabits(habitsWithCompletions);
        updateAchievements(habitsWithCompletions);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load your habit data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Calculate streaks
  const calculateStreak = (habit: Habit): HabitStreak => {
    const sortedCompletions = [...habit.completions]
      .filter((c) => c.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate current streak
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];

      const hasCompletion = sortedCompletions.some((c) => c.date === dateStr);

      if (hasCompletion) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    for (const completion of sortedCompletions) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    return {
      habitId: habit.id,
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      totalCompletions: sortedCompletions.length,
    };
  };

  const handleAddHabit = async (habit: Habit) => {
    if (!user) return;

    try {
      // Insert habit
      const { data: habitData, error: habitError } = await supabase
        .from('habits')
        .insert([
          {
            user_id: user.id,
            name: habit.name,
            description: habit.description,
            icon: habit.icon,
            color: habit.color,
            frequency: habit.frequency,
            target: habit.target,
          },
        ])
        .select()
        .single();

      if (habitError) throw habitError;

      const newHabits = [...habits, { ...habitData, completions: [] }];
      setHabits(newHabits);
      updateAchievements(newHabits);
    } catch (err) {
      console.error('Error adding habit:', err);
      setError('Failed to add habit. Please try again.');
    }
  };

  const handleToggleToday = async (habitId: string) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    try {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const existingCompletion = habit.completions.find((c) => c.date === today);

      if (existingCompletion) {
        // Update existing completion
        const { error } = await supabase
          .from('habit_completions')
          .update({ completed: !existingCompletion.completed })
          .eq('habit_id', habitId)
          .eq('date', today);

        if (error) throw error;
      } else {
        // Insert new completion
        const { error } = await supabase
          .from('habit_completions')
          .insert([
            {
              habit_id: habitId,
              date: today,
              completed: true,
            },
          ]);

        if (error) throw error;
      }

      // Update local state
      setHabits(habits.map((h) => {
        if (h.id !== habitId) return h;

        const existingIndex = h.completions.findIndex((c) => c.date === today);
        
        if (existingIndex >= 0) {
          const updated = [...h.completions];
          updated[existingIndex] = {
            ...updated[existingIndex],
            completed: !updated[existingIndex].completed,
          };
          return { ...h, completions: updated };
        } else {
          return {
            ...h,
            completions: [...h.completions, { date: today, completed: true }],
          };
        }
      }));

      updateAchievements(habits);
    } catch (err) {
      console.error('Error toggling habit:', err);
      setError('Failed to update habit. Please try again.');
    }
  };

  const updateAchievements = useCallback((currentHabits: Habit[]) => {
    const updatedAchievements = achievements.map((achievement) => {
      let progress = achievement.progress;
      
      // First Step - complete first habit
      if (achievement.id === '1') {
        const totalCompletions = currentHabits.reduce(
          (sum, h) => sum + h.completions.filter((c) => c.completed).length,
          0
        );
        progress = Math.min(totalCompletions, 1);
      }

      // Week Warrior - 7-day streak
      if (achievement.id === '2') {
        const maxStreak = Math.max(
          ...currentHabits.map((h) => calculateStreak(h).currentStreak),
          0
        );
        progress = Math.min(maxStreak, 7);
      }

      // Consistency King - 30-day streak
      if (achievement.id === '3') {
        const maxStreak = Math.max(
          ...currentHabits.map((h) => calculateStreak(h).currentStreak),
          0
        );
        progress = Math.min(maxStreak, 30);
      }

      // Century Club - 100 total completions
      if (achievement.id === '4') {
        const totalCompletions = currentHabits.reduce(
          (sum, h) => sum + h.completions.filter((c) => c.completed).length,
          0
        );
        progress = Math.min(totalCompletions, 100);
      }

      // Habit Master - 10 habits
      if (achievement.id === '5') {
        progress = Math.min(currentHabits.length, 10);
      }

      const isNowUnlocked = progress >= achievement.target && !achievement.unlockedAt;

      return {
        ...achievement,
        progress,
        unlockedAt: isNowUnlocked ? new Date().toISOString() : achievement.unlockedAt,
      };
    });

    setAchievements(updatedAchievements);
  }, [achievements, setAchievements]);

  const totalStreakDays = habits.reduce(
    (sum, habit) => sum + calculateStreak(habit).currentStreak,
    0
  );

  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completions.filter((c) => c.completed).length,
    0
  );

  const unlockedAchievements = achievements.filter((a) => a.unlockedAt).length;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-purple-500/5 dark:to-purple-900/10">
        <AnimatedBackground />
        <FloatingOrbs />
        <div className="relative z-10 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your habit data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-background via-background to-purple-500/5 dark:to-purple-900/10">
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
                <Target className="h-4 w-4 text-purple-500" />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">
                  Habit Hero
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Build Better Habits
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Track your habits, build streaks, and unlock achievements
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

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="glass-strong border border-white/30 dark:border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Streaks</p>
                      <p className="text-3xl font-bold text-orange-500">{totalStreakDays}</p>
                    </div>
                    <Flame className="h-10 w-10 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-strong border border-white/30 dark:border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completions</p>
                      <p className="text-3xl font-bold text-blue-500">{totalCompletions}</p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-strong border border-white/30 dark:border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Achievements</p>
                      <p className="text-3xl font-bold text-yellow-500">
                        {unlockedAchievements}/{achievements.length}
                      </p>
                    </div>
                    <Trophy className="h-10 w-10 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Button */}
            <div className="flex justify-center mb-8">
              <AddHabitModal onAdd={handleAddHabit} />
            </div>

            {/* Main Content */}
            <Tabs defaultValue="habits" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="habits">
                  <Target className="h-4 w-4 mr-2" />
                  My Habits
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <Trophy className="h-4 w-4 mr-2" />
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="habits" className="mt-0">
                {habits.length === 0 ? (
                  <Card className="glass-strong border border-white/30 dark:border-white/20">
                    <CardContent className="py-12">
                      <div className="text-center">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground">No habits yet</p>
                        <p className="text-sm text-muted-foreground mb-4">Create your first habit to get started</p>
                        <AddHabitModal onAdd={handleAddHabit} />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {habits.map((habit) => (
                      <HabitCard
                        key={habit.id}
                        habit={habit}
                        streak={calculateStreak(habit)}
                        onToggleToday={handleToggleToday}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default HabitHero;

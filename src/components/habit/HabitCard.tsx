import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Habit, HabitStreak } from '@/types/habit';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Flame, TrendingUp, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HabitCardProps {
  habit: Habit;
  streak: HabitStreak;
  onToggleToday: (habitId: string) => void;
}

export function HabitCard({ habit, streak, onToggleToday }: HabitCardProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayCompletion = habit.completions.find((c) => c.date === today);
  const isCompletedToday = todayCompletion?.completed || false;

  // Get last 7 days for visualization
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glass-strong border transition-all duration-300 ${
        isCompletedToday
          ? 'border-green-500/50 hover:border-green-500'
          : 'border-white/30 dark:border-white/20 hover:shadow-lg'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${habit.color} flex items-center justify-center text-2xl shadow-lg`}>
                {habit.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{habit.name}</CardTitle>
                <p className="text-xs text-muted-foreground capitalize">{habit.frequency}</p>
              </div>
            </div>
            <Button
              variant={isCompletedToday ? 'default' : 'outline'}
              size="sm"
              onClick={() => onToggleToday(habit.id)}
              className={isCompletedToday ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              {isCompletedToday ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {habit.description && (
            <p className="text-sm text-muted-foreground">{habit.description}</p>
          )}

          {/* 7-day visualization */}
          <div className="flex gap-1 justify-between">
            {last7Days.map((date, index) => {
              const completion = habit.completions.find((c) => c.date === date);
              const isCompleted = completion?.completed || false;
              const isToday = date === today;

              return (
                <div key={date} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full aspect-square rounded-lg ${
                      isCompleted
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                        : 'bg-muted'
                    } ${isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(date).getDay()]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-bold">{streak.currentStreak}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Current</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-bold">{streak.longestStreak}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Best</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-bold">{streak.totalCompletions}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

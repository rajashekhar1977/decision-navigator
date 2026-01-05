export interface Habit {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly';
  target: number; // target days per week or times
  completions: HabitCompletion[];
  createdAt: string;
}

export interface HabitCompletion {
  date: string;
  completed: boolean;
  note?: string;
}

export interface HabitStreak {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

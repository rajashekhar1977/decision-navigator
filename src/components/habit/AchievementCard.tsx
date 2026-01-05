import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Achievement } from '@/types/habit';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = achievement.unlockedAt !== undefined;
  const progress = (achievement.progress / achievement.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glass-strong border transition-all duration-300 ${
        isUnlocked
          ? 'border-yellow-500/50 hover:border-yellow-500 hover:shadow-lg'
          : 'border-white/20 dark:border-white/10 opacity-60'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className={`w-16 h-16 rounded-xl ${
              isUnlocked
                ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                : 'bg-muted'
            } flex items-center justify-center text-3xl shadow-lg`}>
              {isUnlocked ? achievement.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
            </div>
            {isUnlocked && (
              <div className="text-xs text-yellow-500 font-medium">
                {new Date(achievement.unlockedAt!).toLocaleDateString()}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <CardTitle className="text-base mb-1">{achievement.title}</CardTitle>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
          </div>

          {!isUnlocked && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{achievement.progress} / {achievement.target}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

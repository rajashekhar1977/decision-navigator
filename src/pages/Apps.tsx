import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppSuggestionModal } from '@/components/AppSuggestionModal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AppsPage = () => {
  const apps = [
    {
      id: 'td2',
      title: 'TD² - The Decision Deck',
      description: 'AI-powered recommendations for entertainment, dining, travel, gifts, and shopping. Answer a few questions and get personalized suggestions instantly.',
      icon: '🎴',
      href: '/td2',
      status: 'Available',
      features: ['5 Categories', 'AI Search', 'Instant Reload', 'Detailed Reports'],
    },
    {
      id: 'budget',
      title: 'Budget Buddy',
      description: 'Smart expense tracking and budget management. Visualize your spending patterns and reach your financial goals.',
      icon: '💰',
      href: '/budget',
      status: 'Available',
      features: ['Expense Tracking', 'Budget Goals', 'Analytics', 'Reports'],
    },
    {
      id: 'habit',
      title: 'Habit Hero',
      description: 'Build positive habits with gamified tracking. Earn streaks, unlock achievements, and transform your daily routines.',
      icon: '🎯',
      href: '/habit',
      status: 'Available',
      features: ['Habit Tracking', 'Streaks', 'Achievements', 'Reminders'],
    },
    {
      id: 'focus',
      title: 'Focus Flow',
      description: 'Pomodoro timer with ambient sounds and productivity insights. Stay focused and get more done.',
      icon: '⏱️',
      href: '#',
      status: 'Coming Soon',
      features: ['Pomodoro Timer', 'Ambient Sounds', 'Stats', 'Sessions'],
    },
    {
      id: 'meal',
      title: 'Meal Planner Pro',
      description: 'Weekly meal planning with recipes, shopping lists, and nutritional tracking. Eat better, stress less.',
      icon: '🥗',
      href: '#',
      status: 'Coming Soon',
      features: ['Meal Plans', 'Recipes', 'Shopping Lists', 'Nutrition'],
    },
    {
      id: 'travel',
      title: 'Trip Architect',
      description: 'Plan your perfect trip with AI-suggested itineraries, budget tracking, and collaborative planning.',
      icon: '🗺️',
      href: '#',
      status: 'Coming Soon',
      features: ['Itineraries', 'Budget', 'Collaboration', 'Maps'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-background via-background to-purple-500/5 dark:to-purple-900/10">
      <AnimatedBackground />
      <FloatingOrbs />

      <div className="relative z-10">
        <Header />

        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">All Apps</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our collection of intelligent micro-apps, each designed to solve specific 
                problems and help you make better decisions in different areas of life.
              </p>
            </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {apps.map((app) => (
              <Card 
                key={app.id} 
                className={`group flex flex-col transition-all duration-300 ${
                  app.status === 'Available' 
                    ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/50' 
                    : 'opacity-70'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-5xl">{app.icon}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === 'Available' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{app.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{app.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.features.map((feature) => (
                      <span 
                        key={feature}
                        className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  {app.status === 'Available' ? (
                    <Button asChild className="w-full">
                      <Link to={app.href}>
                        Launch App
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 py-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">Have an App Idea?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We're always looking to expand our collection. If you have an idea for a micro-app 
              that could help people make better decisions, we'd love to hear from you.
            </p>
            <AppSuggestionModal />
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppsPage;

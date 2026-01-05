import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <AnimatedBackground />
      <FloatingOrbs />

      <div className="relative z-10">
        <Header />

        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                About AppHub
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Empowering smarter decisions through AI-powered tools
              </p>
            </motion.div>

            {/* Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <Card className="glass-strong border border-white/30 dark:border-white/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        AppHub was born from a simple belief: decision-making shouldn't be overwhelming. 
                        In a world of endless choices, we provide AI-powered tools that help you make smarter, 
                        faster, and more confident decisions. Whether you're planning your entertainment, 
                        managing your budget, or building better habits, we're here to simplify your life.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">What We Stand For</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="glass-strong border border-white/30 dark:border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                        <Lightbulb className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Innovation</h3>
                      <p className="text-sm text-muted-foreground">
                        We leverage cutting-edge AI to create tools that truly make a difference in daily life
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong border border-white/30 dark:border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                        <Users className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">User-Centric</h3>
                      <p className="text-sm text-muted-foreground">
                        Every feature is designed with you in mind, focusing on simplicity and effectiveness
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong border border-white/30 dark:border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
                        <Heart className="h-8 w-8 text-orange-500" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Privacy First</h3>
                      <p className="text-sm text-muted-foreground">
                        Your data belongs to you. We protect your privacy with enterprise-grade security
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-strong border border-white/30 dark:border-white/20">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      AppHub started as a passion project to solve a common problem: decision fatigue. 
                      In 2026, we launched TD² (The Decision Deck), our first AI-powered recommendation 
                      engine that helps users discover movies, games, restaurants, and travel destinations.
                    </p>
                    <p>
                      The response was overwhelming. Users loved how AI could understand their preferences 
                      and provide personalized recommendations. This inspired us to expand into other areas 
                      of daily life - budgeting with Budget Buddy and habit tracking with Habit Hero.
                    </p>
                    <p>
                      Today, AppHub is a growing suite of AI-powered tools designed to make everyday 
                      decisions easier, faster, and smarter. We're constantly evolving, listening to our 
                      users, and building new features that matter.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default About;

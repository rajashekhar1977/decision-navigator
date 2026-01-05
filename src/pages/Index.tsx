import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, LayoutGrid, Star, TrendingUp } from 'lucide-react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';

const Index = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'AI-Powered',
      description: 'Smart recommendations using cutting-edge AI technology',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'Get instant results with our optimized infrastructure',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Privacy First',
      description: 'Your data stays secure and private, always',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const apps = [
    {
      id: 'td2',
      title: 'TD² - Decision Deck',
      description: 'AI-powered recommendations for entertainment, dining, travel, gifts, and shopping',
      icon: '🎴',
      href: '/td2',
      status: 'Available',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      id: 'coming1',
      title: 'Budget Buddy',
      description: 'Smart expense tracking and budget management',
      icon: '💰',
      href: '/budget',
      status: 'Available',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'coming2',
      title: 'Habit Hero',
      description: 'Build positive habits with gamified tracking',
      icon: '🎯',
      href: '/habit',
      status: 'Available',
      gradient: 'from-orange-600 to-red-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any, // Custom easing for smooth motion
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-background via-background to-purple-500/5 dark:to-purple-900/10">
      <AnimatedBackground />
      <FloatingOrbs />

      <div className="relative z-10">
        <Header />

        {/* Hero Section - Mobile-first with glassmorphism */}
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center container-mobile section-padding pt-24 md:pt-32">
          <motion.div
            className="w-full text-center max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full glass-strong border border-white/30 dark:border-white/20 text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-xl hover-glow">
                <LayoutGrid className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent font-semibold animate-gradient">
                  Multiple Apps, One Platform
                </span>
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-[1.1] tracking-tight px-4"
              variants={itemVariants}
            >
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient inline-block hover:scale-105 transition-transform duration-500">
                App Hub
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              variants={itemVariants}
            >
              A collection of intelligent micro-apps designed to simplify your daily life. From decisions to budgets, we've got you covered with{' '}
              <span className="text-primary font-semibold">smart tools</span>
            </motion.p>

            {/* CTA Buttons - Mobile optimized */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center px-4 mb-12 md:mb-20"
              variants={itemVariants}
            >
              <Button 
                asChild 
                size="lg" 
                className="text-base md:text-lg px-6 md:px-8 py-6 md:py-7 rounded-full shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 relative overflow-hidden group"
              >
                <Link to="/apps" className="relative z-10">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Explore Apps
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg px-6 md:px-8 py-6 md:py-7 rounded-full glass-strong border-2 border-white/30 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Link to="#features">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            {/* Stats - Mobile friendly */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-500 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                <span>50K+ Decisions Made</span>
              </div>
            </motion.div>
          </motion.div>
        </section>
        {/* Features Section - 3D Cards */}
        <section className="section-padding relative">
          <div className="container-mobile">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Why Choose AppHub?
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                We combine the power of AI with intuitive design to help you make decisions faster and smarter
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto perspective"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    rotateX: -5,
                    z: 50,
                    transition: { duration: 0.3 }
                  }}
                  className="preserve-3d"
                >
                  <Card className="text-center glass-strong border border-white/30 dark:border-white/20 hover:shadow-2xl group h-full card-3d">
                    <CardHeader className="space-y-4">
                      <div className={`mx-auto w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-xl rotate-3d`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm md:text-base leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Apps Section - Enhanced cards */}
        <section className="section-padding relative">
          <div className="container-mobile">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Our Apps
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Each app is independently powerful, designed to solve specific problems in your daily life
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {apps.map((app) => (
                <motion.div 
                  key={app.id} 
                  variants={cardVariants}
                  whileHover={app.status === 'Available' ? { 
                    scale: 1.05,
                    rotateY: 3,
                    rotateX: -3,
                    transition: { duration: 0.3 }
                  } : {}}
                  className="preserve-3d"
                >
                  <Card className={`group transition-all duration-500 h-full ${
                    app.status === 'Available'
                      ? 'hover:shadow-2xl cursor-pointer glass-strong border border-white/30 dark:border-white/20 card-3d'
                      : 'opacity-60 glass border border-white/20 dark:border-white/10 grayscale'
                  }`}>
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`text-5xl md:text-6xl ${app.status === 'Available' ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                          {app.icon}
                        </div>
                        <span className={`text-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-semibold whitespace-nowrap ${
                          app.status === 'Available'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg animate-pulse-glow'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-left">{app.title}</CardTitle>
                      <CardDescription className="text-sm md:text-base text-left leading-relaxed">{app.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {app.status === 'Available' ? (
                        <Button 
                          asChild 
                          className={`w-full bg-gradient-to-r ${app.gradient} hover:opacity-90 transition-all duration-300 shadow-lg text-sm md:text-base py-5 md:py-6 group/btn relative overflow-hidden`}
                        >
                          <Link to={app.href}>
                            <span className="relative z-10 flex items-center justify-center">
                              Launch App
                              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          </Link>
                        </Button>
                      ) : (
                        <Button disabled className="w-full text-sm md:text-base py-5 md:py-6">
                          Coming Soon
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Index;

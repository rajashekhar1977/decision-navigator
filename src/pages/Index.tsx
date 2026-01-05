import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, LayoutGrid, Star } from 'lucide-react';
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
      href: '#',
      status: 'Coming Soon',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'coming2',
      title: 'Habit Hero',
      description: 'Build positive habits with gamified tracking',
      icon: '🎯',
      href: '#',
      status: 'Coming Soon',
      gradient: 'from-orange-600 to-red-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AnimatedBackground />
      <FloatingOrbs />

      <div className="relative z-10">
        <Header />

        <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
          <motion.div
            className="container mx-auto text-center max-w-5xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/20 text-sm font-medium mb-8 shadow-lg">
                <LayoutGrid className="h-4 w-4 text-primary" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                  Multiple Apps, One Platform
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
              variants={itemVariants}
            >
              Make Better
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Decisions
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              A collection of intelligent micro-apps powered by AI to help you navigate life's choices with confidence
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/td2">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Try TD² Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full glass border-2 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Link to="/apps">
                  Explore All Apps
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-20 flex items-center justify-center gap-8 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>50K+ Decisions Made</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose AppHub?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine the power of AI with intuitive design to help you make decisions faster and smarter
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center glass border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl group h-full">
                    <CardHeader>
                      <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Apps</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each app is independently powerful, designed to solve specific problems in your daily life
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {apps.map((app) => (
                <motion.div key={app.id} variants={itemVariants}>
                  <Card className={`group transition-all duration-500 h-full ${
                    app.status === 'Available'
                      ? 'hover:scale-105 hover:shadow-2xl cursor-pointer glass border-white/20'
                      : 'opacity-60 glass border-white/10'
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`text-6xl group-hover:scale-110 transition-transform duration-300`}>
                          {app.icon}
                        </div>
                        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                          app.status === 'Available'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{app.title}</CardTitle>
                      <CardDescription className="text-base">{app.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {app.status === 'Available' ? (
                        <Button asChild className={`w-full bg-gradient-to-r ${app.gradient} hover:opacity-90 transition-all duration-300 shadow-lg text-base py-6`}>
                          <Link to={app.href}>
                            Launch App
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </Link>
                        </Button>
                      ) : (
                        <Button disabled className="w-full text-base py-6">
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

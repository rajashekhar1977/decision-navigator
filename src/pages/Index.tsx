import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, LayoutGrid } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Index = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'AI-Powered',
      description: 'Smart recommendations using cutting-edge AI technology',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'Get instant results with our optimized infrastructure',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Privacy First',
      description: 'Your data stays secure and private, always',
    },
  ];

  const apps = [
    {
      id: 'td2',
      title: 'TD² - The Decision Deck',
      description: 'AI-powered recommendations for entertainment, dining, travel, gifts, and shopping',
      icon: '🎴',
      href: '/td2',
      status: 'Available',
    },
    {
      id: 'coming1',
      title: 'Budget Buddy',
      description: 'Smart expense tracking and budget management',
      icon: '💰',
      href: '#',
      status: 'Coming Soon',
    },
    {
      id: 'coming2',
      title: 'Habit Hero',
      description: 'Build positive habits with gamified tracking',
      icon: '🎯',
      href: '#',
      status: 'Coming Soon',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center pt-16"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(var(--background)/0.8), hsl(var(--background))), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <LayoutGrid className="h-4 w-4" />
              <span>Multiple Apps, One Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Make Better Decisions with{' '}
              <span className="text-primary">AI-Powered</span> Apps
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A collection of intelligent micro-apps designed to help you navigate life's choices, 
              from what to watch tonight to planning your next adventure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="hero">
                <Link to="/td2">
                  Try TD² Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="heroOutline">
                <Link to="/apps">
                  Explore All Apps
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AppHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine the power of AI with intuitive design to help you make decisions faster and smarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-background">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Apps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each app is independently powerful, designed to solve specific problems in your daily life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {apps.map((app) => (
              <Card 
                key={app.id} 
                className={`group transition-all duration-300 ${
                  app.status === 'Available' 
                    ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 cursor-pointer' 
                    : 'opacity-60'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{app.icon}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === 'Available' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{app.title}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

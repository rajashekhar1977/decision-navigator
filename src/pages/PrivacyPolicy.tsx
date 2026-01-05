import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicy = () => {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-white/30 dark:border-white/20 text-sm font-medium mb-4">
                <Shield className="h-4 w-4 text-primary" />
                <span>Last Updated: January 6, 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your privacy is important to us
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <Card className="glass-strong border border-white/30 dark:border-white/20">
                <CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      It is AppHub's policy to respect your privacy and comply with applicable data protection 
                      regulations. This privacy policy describes how we collect, use, store, and protect your 
                      personal information when you use our services.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Account Information</h3>
                        <p>When you create an account, we collect your email address and password (encrypted).</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Usage Data</h3>
                        <p>We collect information about how you use our apps, including transactions, habits, 
                        and preferences to provide personalized recommendations.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Technical Information</h3>
                        <p>We automatically collect device information, IP address, browser type, and usage patterns 
                        for security and service improvement purposes.</p>
                      </div>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>To provide and maintain our services</li>
                      <li>To personalize your experience and provide AI-powered recommendations</li>
                      <li>To communicate with you about updates, security alerts, and support</li>
                      <li>To improve our services and develop new features</li>
                      <li>To detect and prevent fraud or abuse</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Data Storage and Security</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Your data is stored securely using Supabase, a PostgreSQL database with enterprise-grade 
                      security. We implement Row Level Security (RLS) to ensure that users can only access their 
                      own data.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      All data transmission is encrypted using industry-standard TLS/SSL protocols. Passwords 
                      are hashed and salted using bcrypt before storage.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Third-Party Services</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      We use the following third-party services to power our AI recommendations:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>TMDb (The Movie Database)</strong> - For movie and TV show recommendations</li>
                      <li><strong>RAWG</strong> - For video game recommendations</li>
                      <li><strong>Yelp</strong> - For restaurant recommendations</li>
                      <li><strong>Groq</strong> - For AI processing and natural language understanding</li>
                      <li><strong>Unsplash</strong> - For travel destination images</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Access your personal data</li>
                      <li>Correct inaccurate data</li>
                      <li>Request deletion of your account and data</li>
                      <li>Export your data in a portable format</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We retain your personal data only for as long as necessary to provide our services 
                      and fulfill the purposes outlined in this policy. When you delete your account, 
                      we will permanently delete your data within 30 days, except where we are required 
                      by law to retain certain information.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Children's Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our services are not intended for users under 13 years of age. We do not knowingly 
                      collect personal information from children. If you believe we have collected data 
                      from a child, please contact us immediately.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Changes to This Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this privacy policy from time to time. We will notify you of any 
                      changes by posting the new policy on this page and updating the "Last Updated" 
                      date.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      If you have questions about this privacy policy or how we handle your data, 
                      please contact us at{' '}
                      <a href="mailto:privacy@apphub.com" className="text-primary hover:underline">
                        privacy@apphub.com
                      </a>
                    </p>
                  </section>
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

export default PrivacyPolicy;

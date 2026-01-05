import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfService = () => {
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
                <FileText className="h-4 w-4 text-primary" />
                <span>Last Updated: January 6, 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Please read these terms carefully before using AppHub
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
                    <h2 className="text-2xl font-bold mb-3">Agreement to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using AppHub, you accept and agree to be bound by these Terms of Service. 
                      If you disagree with any part of these terms, you may not access the service.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Description of Service</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      AppHub provides a suite of AI-powered decision-making tools including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>TD² (The Decision Deck)</strong> - AI recommendations for movies, games, dining, and travel</li>
                      <li><strong>Budget Buddy</strong> - Personal finance tracking and budgeting</li>
                      <li><strong>Habit Hero</strong> - Habit tracking and achievement system</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">User Accounts</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>When you create an account with us, you must provide accurate, complete information. 
                      You are solely responsible for:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Maintaining the confidentiality of your account and password</li>
                        <li>All activities that occur under your account</li>
                        <li>Notifying us immediately of any unauthorized use</li>
                      </ul>
                      <p>We reserve the right to terminate accounts that violate these terms or remain inactive 
                      for extended periods.</p>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Acceptable Use</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      You agree not to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Use the service for any illegal purpose</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Interfere with or disrupt the service</li>
                      <li>Upload malicious code or viruses</li>
                      <li>Scrape or mine data from the service without permission</li>
                      <li>Impersonate others or provide false information</li>
                      <li>Harass, abuse, or harm other users</li>
                      <li>Reverse engineer or decompile any part of the service</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      The service and its original content, features, and functionality are owned by AppHub 
                      and are protected by international copyright, trademark, and other intellectual property laws.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      You retain ownership of any content you submit to the service. By submitting content, 
                      you grant us a worldwide, non-exclusive license to use, reproduce, and display your 
                      content solely for the purpose of providing the service.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Third-Party Services</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Our service integrates with third-party APIs and services to provide recommendations. 
                      These include TMDb, RAWG, Yelp, Groq, and Unsplash. Use of these services is subject 
                      to their respective terms and conditions.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We are not responsible for the content, privacy policies, or practices of any third-party 
                      services. We encourage you to review their terms before using our service.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Service Availability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We strive to provide reliable service but do not guarantee uninterrupted access. 
                      We reserve the right to modify, suspend, or discontinue any part of the service 
                      without notice. We are not liable for any modification, suspension, or discontinuation.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Disclaimer of Warranties</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                      EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE OR 
                      UNINTERRUPTED. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      IN NO EVENT SHALL APPHUB, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY 
                      INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF 
                      YOUR USE OF THE SERVICE.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Indemnification</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      You agree to indemnify and hold harmless AppHub from any claims, damages, losses, 
                      liabilities, and expenses arising from your use of the service or violation of these terms.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Termination</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may terminate or suspend your account immediately, without prior notice, for any 
                      violation of these terms. Upon termination, your right to use the service will cease 
                      immediately.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to modify these terms at any time. We will notify users of 
                      material changes via email or through the service. Continued use after changes 
                      constitutes acceptance of the new terms.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      These terms shall be governed by and construed in accordance with applicable 
                      international laws, without regard to conflict of law provisions.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-3">Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      If you have questions about these Terms of Service, please contact us at{' '}
                      <a href="mailto:legal@apphub.com" className="text-primary hover:underline">
                        legal@apphub.com
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

export default TermsOfService;

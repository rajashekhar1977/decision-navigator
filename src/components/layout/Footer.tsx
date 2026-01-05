import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-card/50 dark:from-background dark:to-card/30">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="container-mobile section-padding relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4 group">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <img 
                  src="/favicon.svg" 
                  alt="Rs AppHub Logo" 
                  className="h-7 w-7"
                />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-pink-500">
                Rs AppHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Your personal productivity suite featuring AI-powered tools to simplify your life and boost productivity.
            </p>
          </motion.div>

          {/* Apps Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Apps</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/td2"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    TD² - Decision Deck
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/budget"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Budget Buddy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/habit"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Habit Hero
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/apps"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Browse All Apps
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">About</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} AppHub. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> by developers, for everyone
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

import { LayoutGrid, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg mb-4">
              <LayoutGrid className="h-6 w-6 text-primary" />
              <span>AppHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A collection of powerful micro-apps to help you make better decisions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Apps</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/td2" className="hover:text-primary transition-colors">TD² - Decision Deck</Link>
              </li>
              <li>
                <span className="opacity-50">More coming soon...</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AppHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

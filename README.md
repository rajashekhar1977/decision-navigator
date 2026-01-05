# Rs AppHub - Your Personal Productivity Suite

A comprehensive web application featuring multiple productivity tools with secure authentication and cloud data storage.

## 🌟 Featured Apps

### TD² (The Decision Deck)
AI-powered recommendation engine that helps you make decisions across multiple categories:
- Entertainment (Movies, TV Shows, Games)
- Food & Dining (Restaurants, Cuisines)
- Travel Destinations
- Gift Ideas
- Shopping Recommendations

### Budget Buddy
Smart budget tracking and financial management:
- Track income and expenses
- Set category budgets (weekly, monthly, yearly)
- Visual progress indicators
- Transaction history
- Real-time spending analysis

### Habit Hero
Build better habits and track your progress:
- Create custom habits with icons and colors
- Daily/weekly tracking
- Streak counting
- Achievement system
- Completion notes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)
- API keys for TD² features (see [Backend Setup Guide](./BACKEND_SETUP.md))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd rs-apphub

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local and add your keys

# Start development server
npm run dev
```

Visit `http://localhost:8080`

## 🔑 Required Setup

### 1. Supabase Database

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in SQL Editor
3. Get your project URL and anon key from Settings → API

### 2. Environment Variables

Create `.env.local` with:

```env
# Supabase (Required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI & APIs (For TD² app)
VITE_GROQ_API_KEY=your_groq_api_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

📖 **See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed setup instructions**

## 💻 Development

```sh
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🛠️ Tech Stack

**Frontend**
- **React 18** + **TypeScript**
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching & caching

**Backend & Database**
- **Supabase** - PostgreSQL database with Row Level Security
- **Supabase Auth** - Secure authentication system
- **Groq AI** - Llama 3.3 for TD² recommendations
- **TMDB** - Movie & TV data
- **Yelp Fusion** - Restaurant data (optional)
- **Unsplash** - High-quality images (optional)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── td2/             # TD² decision components
│   ├── budget/          # Budget Buddy components
│   ├── habit/           # Habit Hero components
│   ├── ui/              # shadcn/ui components
│   └── AuthModal.tsx    # Authentication modal
├── services/
│   ├── groqService.ts        # AI recommendations
│   ├── tmdbService.ts        # Movie/TV data
│   ├── recommendationService.ts  # TD² orchestrator
│   └── ...
├── contexts/
│   └── AuthContext.tsx  # Authentication state
├── pages/
│   ├── TD2.tsx          # Decision Deck
│   ├── BudgetBuddy.tsx  # Budget tracking
│   ├── HabitHero.tsx    # Habit tracking
│   ├── About.tsx        # About page
│   ├── PrivacyPolicy.tsx
│   ├── TermsOfService.tsx
│   └── Contact.tsx
├── lib/
│   └── supabase.ts      # Supabase client
└── types/               # TypeScript types
```

## 🔐 Authentication & Security

- **Secure Authentication**: Email/password with JWT tokens
- **Row Level Security**: Users can only access their own data
- **Protected Routes**: Apps redirect to login if not authenticated
- **Password Reset**: Built-in recovery flow
- **Session Management**: Automatic token refresh

## 📊 Database Schema

```sql
Tables:
- transactions     # Budget Buddy expenses/income
- budgets          # Budget limits per category
- habits           # User habits
- habit_completions # Daily habit tracking
- app_suggestions  # User-submitted app ideas
```

All tables include:
- User isolation via RLS policies
- Automatic timestamps (created_at, updated_at)
- UUID primary keys
- Foreign key relationships

## 🚢 Deployment

### Quick Deploy to Vercel

1. **Database Setup**
   ```sh
   # Run SQL schema in Supabase SQL Editor
   # See supabase-schema.sql
   ```

2. **Create Admin Account**
   ```sh
   # Email: admin@apphub.com
   # See ADMIN_SETUP.md for details
   ```

3. **Deploy to Vercel**
   ```sh
   # Push to GitHub
   git push origin main
   
   # Import to Vercel
   # Add environment variables
   # Deploy!
   ```

📖 **See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions**
📋 **Use [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) to track progress**

### Environment Variables for Production

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

## 🎯 Features in Detail

### TD² (The Decision Deck)
1. Select category (Entertainment, Food, Travel, Gifts, Shopping)
2. Answer personalized survey questions
3. AI analyzes preferences using Groq
4. Receive 8 tailored recommendations
5. Each suggestion includes images, details, and actions

### Budget Buddy
1. Add income/expense transactions
2. Categorize spending (Food, Transport, Entertainment, etc.)
3. Set budget limits per category
4. Track spending vs. budget with visual progress
5. View transaction history
6. Filter and manage budgets

### Habit Hero
1. Create habits with custom icons and colors
2. Set frequency (daily or weekly)
3. Mark habits complete each day
4. Track streaks and achievements
5. Add notes to completions
6. View calendar history

## 👥 Admin Features

### App Suggestions Management

Users can submit app ideas through the `/apps` page. Admins (with `admin@apphub.com` account) can:
- View all submitted suggestions in Supabase
- Update suggestion status (pending → approved/rejected/implemented)
- Add admin notes
- Filter and search submissions

📖 **See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for admin configuration**

## 🤝 Contributing

Contributions welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- New app ideas (use the "Suggest an App" feature!)
- UI/UX improvements
- Bug fixes
- Documentation improvements
- New API integrations

## 📖 Documentation

- [Backend Setup Guide](./BACKEND_SETUP.md) - API configuration
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Vercel deployment steps
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Pre-launch verification
- [Admin Setup](./ADMIN_SETUP.md) - Admin account configuration

## 🐛 Known Issues & Roadmap

### Coming Soon
- **Focus Flow** - Pomodoro timer with task management
- **Meal Planner Pro** - Weekly meal planning with recipes
- **Trip Architect** - Travel itinerary builder
- Admin dashboard for managing app suggestions
- Email notifications for suggestion status updates
- Export data functionality
- Multi-language support

### Improvements
- Enhanced AI recommendations with more context
- Better mobile navigation
- Offline mode support
- Data export/import
- Charts and analytics for Budget Buddy

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Database & Auth by [Supabase](https://supabase.com)
- AI powered by [Groq](https://groq.com)
- Movie data from [TMDB](https://www.themoviedb.org)

## 📞 Support

- **Email**: support@apphub.com
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/rs-apphub/issues)
- **Suggestions**: Use the "Suggest an App" feature in the app!

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by Rs AppHub Team**

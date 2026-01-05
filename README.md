# Decision Navigator - AI-Powered Decision Making App

An intelligent web application that helps users make decisions across multiple categories using AI-powered recommendations.

## 🌟 Features

- **TD² (The Decision Deck)** - AI-powered recommendation engine
- **5 Categories**: Entertainment, Food & Dining, Travel, Gifts, Shopping
- **Real AI Integration**: Groq (Llama 3.3) for intelligent recommendations
- **Rich Data**: TMDB for movies, Yelp for restaurants, Unsplash for images
- **Beautiful UI**: Modern design with animations and glass-morphism
- **Mobile-First**: Fully responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- API keys (see [Backend Setup Guide](./BACKEND_SETUP.md))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd decision-navigator

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your API keys (see BACKEND_SETUP.md)

# Start development server
npm run dev
```

Visit `http://localhost:8080`

## 🔑 API Setup

**Required APIs** (Free Tier):
1. **Groq** - AI recommendations ([Get Key](https://console.groq.com))
2. **TMDB** - Entertainment data ([Get Key](https://www.themoviedb.org/settings/api))

**Optional APIs** (Enhance Experience):
3. **Unsplash** - High-quality images ([Get Key](https://unsplash.com/developers))
4. **Yelp** - Restaurant data ([Get Key](https://www.yelp.com/developers))

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

**Backend/APIs**
- **Groq AI** - Llama 3.3 for recommendations
- **TMDB** - Movie & TV data
- **Yelp Fusion** - Restaurant data
- **Unsplash** - High-quality images
- **Amadeus** - Travel data (optional)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── td2/             # TD² app components
│   └── ui/              # shadcn/ui components
├── services/
│   ├── groqService.ts        # AI recommendations
│   ├── tmdbService.ts        # Movie/TV data
│   ├── yelpService.ts        # Restaurant data
│   ├── unsplashService.ts    # Image fetching
│   └── recommendationService.ts  # Main orchestrator
├── pages/               # Route pages
├── data/                # Static data & configs
├── types/               # TypeScript types
└── lib/                 # Utilities
```

## 🎯 How It Works

1. **User selects a category** (Entertainment, Food, Travel, Gifts, Shopping)
2. **Answers survey questions** about preferences
3. **Groq AI analyzes** answers and generates personalized recommendations
4. **System enriches** recommendations with real data from category-specific APIs
5. **User receives** 8 personalized suggestions with images, details, and actions

## 🚢 Deployment

### Build

```sh
npm run build
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Add environment variables in dashboard
3. Deploy!

**Environment variables needed:**
- `VITE_GROQ_API_KEY`
- `VITE_TMDB_API_KEY`
- `VITE_UNSPLASH_ACCESS_KEY` (optional)
- `VITE_YELP_API_KEY` (optional)

## 🤝 Contributing

Contributions welcome! Please read the contributing guidelines first.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- Built with [Lovable.dev](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)

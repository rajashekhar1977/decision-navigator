import { CategoryConfig } from '@/types/td2';

export const categories: CategoryConfig[] = [
  {
    id: 'entertainment',
    title: 'Entertainment',
    description: 'Movies, TV shows, games, and more',
    icon: '🎬',
    color: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'intent',
        text: 'What would you like to do?',
        type: 'single',
        options: [
          { value: 'watch', label: 'Watch something' },
          { value: 'play', label: 'Play a game' },
          { value: 'listen', label: 'Listen to music' },
          { value: 'read', label: 'Read a book' },
        ],
      },
      {
        id: 'mediaType',
        text: 'What type of content?',
        type: 'single',
        options: [
          { value: 'movie', label: 'Movie' },
          { value: 'series', label: 'TV Series' },
          { value: 'documentary', label: 'Documentary' },
          { value: 'anime', label: 'Anime' },
        ],
      },
      {
        id: 'genre',
        text: 'Select your preferred genres',
        type: 'multi',
        options: [
          { value: 'action', label: 'Action' },
          { value: 'comedy', label: 'Comedy' },
          { value: 'drama', label: 'Drama' },
          { value: 'sci-fi', label: 'Sci-Fi' },
          { value: 'thriller', label: 'Thriller' },
          { value: 'romance', label: 'Romance' },
          { value: 'horror', label: 'Horror' },
          { value: 'fantasy', label: 'Fantasy' },
        ],
      },
      {
        id: 'mood',
        text: 'What mood are you in?',
        type: 'single',
        options: [
          { value: 'relaxed', label: 'Relaxed & Chill' },
          { value: 'excited', label: 'Excited & Thrilling' },
          { value: 'thoughtful', label: 'Thoughtful & Deep' },
          { value: 'happy', label: 'Happy & Uplifting' },
        ],
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Destinations, activities, and experiences',
    icon: '✈️',
    color: 'from-blue-500 to-cyan-600',
    questions: [
      {
        id: 'travelType',
        text: 'What type of trip are you planning?',
        type: 'single',
        options: [
          { value: 'adventure', label: 'Adventure' },
          { value: 'relaxation', label: 'Relaxation' },
          { value: 'culture', label: 'Cultural Experience' },
          { value: 'nature', label: 'Nature & Wildlife' },
        ],
      },
      {
        id: 'duration',
        text: 'How long is your trip?',
        type: 'single',
        options: [
          { value: 'weekend', label: 'Weekend Getaway' },
          { value: 'week', label: 'One Week' },
          { value: 'twoweeks', label: 'Two Weeks' },
          { value: 'month', label: 'Month or More' },
        ],
      },
      {
        id: 'budget',
        text: 'What\'s your budget range?',
        type: 'single',
        options: [
          { value: 'budget', label: 'Budget-Friendly' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'luxury', label: 'Luxury' },
          { value: 'unlimited', label: 'No Limit' },
        ],
      },
    ],
  },
  {
    id: 'eat',
    title: 'Food & Dining',
    description: 'Restaurants, recipes, and delivery',
    icon: '🍽️',
    color: 'from-orange-500 to-red-600',
    questions: [
      {
        id: 'diningType',
        text: 'How would you like to eat?',
        type: 'single',
        options: [
          { value: 'dineIn', label: 'Dine In' },
          { value: 'delivery', label: 'Delivery' },
          { value: 'cook', label: 'Cook at Home' },
          { value: 'takeout', label: 'Takeout' },
        ],
      },
      {
        id: 'cuisine',
        text: 'What cuisine are you craving?',
        type: 'multi',
        options: [
          { value: 'italian', label: 'Italian' },
          { value: 'asian', label: 'Asian' },
          { value: 'mexican', label: 'Mexican' },
          { value: 'american', label: 'American' },
          { value: 'indian', label: 'Indian' },
          { value: 'mediterranean', label: 'Mediterranean' },
        ],
      },
      {
        id: 'priceRange',
        text: 'Price range?',
        type: 'single',
        options: [
          { value: 'cheap', label: '$' },
          { value: 'moderate', label: '$$' },
          { value: 'expensive', label: '$$$' },
          { value: 'fine', label: '$$$$' },
        ],
      },
    ],
  },
  {
    id: 'gift',
    title: 'Gifts',
    description: 'Perfect presents for any occasion',
    icon: '🎁',
    color: 'from-pink-500 to-rose-600',
    questions: [
      {
        id: 'recipient',
        text: 'Who is this gift for?',
        type: 'single',
        options: [
          { value: 'partner', label: 'Partner' },
          { value: 'friend', label: 'Friend' },
          { value: 'family', label: 'Family Member' },
          { value: 'coworker', label: 'Coworker' },
        ],
      },
      {
        id: 'occasion',
        text: 'What\'s the occasion?',
        type: 'single',
        options: [
          { value: 'birthday', label: 'Birthday' },
          { value: 'holiday', label: 'Holiday' },
          { value: 'anniversary', label: 'Anniversary' },
          { value: 'justBecause', label: 'Just Because' },
        ],
      },
      {
        id: 'giftBudget',
        text: 'Budget for the gift?',
        type: 'single',
        options: [
          { value: 'under25', label: 'Under $25' },
          { value: '25to50', label: '$25 - $50' },
          { value: '50to100', label: '$50 - $100' },
          { value: 'over100', label: '$100+' },
        ],
      },
    ],
  },
  {
    id: 'buy',
    title: 'Shopping',
    description: 'Products and deals',
    icon: '🛒',
    color: 'from-green-500 to-emerald-600',
    questions: [
      {
        id: 'productType',
        text: 'What are you looking for?',
        type: 'single',
        options: [
          { value: 'electronics', label: 'Electronics' },
          { value: 'fashion', label: 'Fashion' },
          { value: 'home', label: 'Home & Garden' },
          { value: 'sports', label: 'Sports & Outdoors' },
        ],
      },
      {
        id: 'priority',
        text: 'What matters most?',
        type: 'single',
        options: [
          { value: 'price', label: 'Best Price' },
          { value: 'quality', label: 'Best Quality' },
          { value: 'reviews', label: 'Best Reviews' },
          { value: 'brand', label: 'Brand Name' },
        ],
      },
    ],
  },
];

import { EnrichedOption } from '@/types/td2';

export const mockEntertainmentResults: EnrichedOption[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    snippet: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    description: 'An epic sci-fi adventure directed by Denis Villeneuve, continuing the story from the first Dune film.',
    extra: {
      year: 2024,
      rating: '8.8/10',
      duration: '166 min',
      platforms: ['Max', 'Prime Video'],
    },
  },
  {
    id: '2',
    title: 'Oppenheimer',
    snippet: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    description: 'A biographical thriller directed by Christopher Nolan about the father of the atomic bomb.',
    extra: {
      year: 2023,
      rating: '8.4/10',
      duration: '180 min',
      platforms: ['Peacock', 'Prime Video'],
    },
  },
  {
    id: '3',
    title: 'Everything Everywhere All at Once',
    snippet: 'A middle-aged Chinese immigrant is swept up in an insane adventure, where she alone can save the world.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
    description: 'A mind-bending action comedy about the multiverse and family bonds.',
    extra: {
      year: 2022,
      rating: '7.8/10',
      duration: '139 min',
      platforms: ['Netflix', 'Prime Video'],
    },
  },
  {
    id: '4',
    title: 'The Batman',
    snippet: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800',
    description: 'A dark and gritty take on the Dark Knight directed by Matt Reeves.',
    extra: {
      year: 2022,
      rating: '7.8/10',
      duration: '176 min',
      platforms: ['Max', 'Netflix'],
    },
  },
  {
    id: '5',
    title: 'Interstellar',
    snippet: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    description: 'Christopher Nolan\'s epic science fiction film about love, time, and space exploration.',
    extra: {
      year: 2014,
      rating: '8.7/10',
      duration: '169 min',
      platforms: ['Paramount+', 'Prime Video'],
    },
  },
  {
    id: '6',
    title: 'Blade Runner 2049',
    snippet: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    description: 'A visually stunning sequel to the sci-fi classic, directed by Denis Villeneuve.',
    extra: {
      year: 2017,
      rating: '8.0/10',
      duration: '164 min',
      platforms: ['Netflix', 'Max'],
    },
  },
  {
    id: '7',
    title: 'Arrival',
    snippet: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
    description: 'A thought-provoking sci-fi drama about language, time, and human connection.',
    extra: {
      year: 2016,
      rating: '7.9/10',
      duration: '116 min',
      platforms: ['Paramount+', 'Hulu'],
    },
  },
  {
    id: '8',
    title: 'Ex Machina',
    snippet: 'A young programmer is selected to participate in a groundbreaking experiment in synthetic intelligence.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    description: 'A captivating thriller about artificial intelligence and what it means to be human.',
    extra: {
      year: 2014,
      rating: '7.7/10',
      duration: '108 min',
      platforms: ['Netflix', 'Prime Video'],
    },
  },
  {
    id: '9',
    title: 'The Matrix',
    snippet: 'A computer programmer discovers that reality as he knows it is a simulation created by machines.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    description: 'The groundbreaking sci-fi action film that redefined the genre.',
    extra: {
      year: 1999,
      rating: '8.7/10',
      duration: '136 min',
      platforms: ['Max', 'Prime Video'],
    },
  },
  {
    id: '10',
    title: 'Inception',
    snippet: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    description: 'Christopher Nolan\'s mind-bending heist film set within the architecture of the mind.',
    extra: {
      year: 2010,
      rating: '8.8/10',
      duration: '148 min',
      platforms: ['Netflix', 'Max'],
    },
  },
];

export const mockTravelResults: EnrichedOption[] = [
  {
    id: '1',
    title: 'Kyoto, Japan',
    snippet: 'Ancient temples, serene gardens, and traditional tea houses await in this cultural treasure.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    description: 'Experience the heart of Japanese culture with stunning shrines and peaceful zen gardens.',
    extra: { bestTime: 'Spring/Fall', avgCost: '$150/day' },
  },
  {
    id: '2',
    title: 'Santorini, Greece',
    snippet: 'Iconic white-washed buildings and breathtaking sunsets over the Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    description: 'A romantic island paradise known for its stunning architecture and wine.',
    extra: { bestTime: 'May-October', avgCost: '$200/day' },
  },
  {
    id: '3',
    title: 'Iceland Ring Road',
    snippet: 'Glaciers, volcanoes, hot springs, and the Northern Lights on an epic road trip.',
    image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800',
    description: 'An adventure through one of the most dramatic landscapes on Earth.',
    extra: { bestTime: 'Summer/Winter', avgCost: '$250/day' },
  },
  {
    id: '4',
    title: 'Bali, Indonesia',
    snippet: 'Tropical paradise with ancient temples, rice terraces, and world-class surfing.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    description: 'A spiritual haven blending relaxation with adventure.',
    extra: { bestTime: 'Apr-Oct', avgCost: '$80/day' },
  },
  {
    id: '5',
    title: 'Swiss Alps',
    snippet: 'Majestic mountain peaks, charming villages, and world-class skiing.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    description: 'Experience breathtaking alpine scenery year-round.',
    extra: { bestTime: 'Dec-Mar/Jun-Sep', avgCost: '$300/day' },
  },
];

export const mockFoodResults: EnrichedOption[] = [
  {
    id: '1',
    title: 'The Rustic Kitchen',
    snippet: 'Farm-to-table Italian cuisine with handmade pasta and locally sourced ingredients.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    description: 'An intimate dining experience celebrating seasonal Italian flavors.',
    extra: { rating: '4.8', priceRange: '$$$', distance: '0.5 mi' },
  },
  {
    id: '2',
    title: 'Sakura Sushi',
    snippet: 'Authentic Japanese omakase experience with the freshest fish flown in daily.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    description: 'A culinary journey through traditional Japanese cuisine.',
    extra: { rating: '4.9', priceRange: '$$$$', distance: '1.2 mi' },
  },
  {
    id: '3',
    title: 'Taco Libre',
    snippet: 'Street-style Mexican tacos with bold flavors and craft margaritas.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    description: 'Casual cantina serving authentic Mexican street food.',
    extra: { rating: '4.5', priceRange: '$', distance: '0.3 mi' },
  },
  {
    id: '4',
    title: 'The Spice Route',
    snippet: 'Modern Indian cuisine with a contemporary twist on classic dishes.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    description: 'Elevated Indian dining with stunning presentations.',
    extra: { rating: '4.7', priceRange: '$$', distance: '0.8 mi' },
  },
  {
    id: '5',
    title: 'Burger & Beyond',
    snippet: 'Gourmet burgers with premium ingredients and creative toppings.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    description: 'The ultimate burger experience for meat lovers.',
    extra: { rating: '4.6', priceRange: '$$', distance: '0.4 mi' },
  },
];

export const mockGiftResults: EnrichedOption[] = [
  {
    id: '1',
    title: 'Personalized Star Map',
    snippet: 'A custom print showing the night sky from any date and location.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
    description: 'Capture the stars from a meaningful moment in time.',
    extra: { price: '$45', rating: '4.9', delivery: '3-5 days' },
  },
  {
    id: '2',
    title: 'Artisan Chocolate Box',
    snippet: 'Handcrafted chocolates from award-winning chocolatiers.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800',
    description: 'Luxurious chocolate assortment for the discerning palate.',
    extra: { price: '$65', rating: '4.8', delivery: '2-3 days' },
  },
  {
    id: '3',
    title: 'Smart Home Speaker',
    snippet: 'Premium sound quality with voice assistant integration.',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800',
    description: 'The perfect blend of style and smart technology.',
    extra: { price: '$99', rating: '4.7', delivery: '1-2 days' },
  },
  {
    id: '4',
    title: 'Leather Journal Set',
    snippet: 'Hand-stitched leather journal with premium paper.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
    description: 'A timeless gift for writers and dreamers.',
    extra: { price: '$35', rating: '4.9', delivery: '3-5 days' },
  },
  {
    id: '5',
    title: 'Experience Gift Card',
    snippet: 'Choose from hundreds of experiences - dining, spa, adventures.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
    description: 'Give the gift of unforgettable memories.',
    extra: { price: 'Varies', rating: '4.8', delivery: 'Instant' },
  },
];

export const mockShoppingResults: EnrichedOption[] = [
  {
    id: '1',
    title: 'Wireless Noise-Canceling Headphones',
    snippet: 'Premium audio with 30-hour battery life and adaptive noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    description: 'Studio-quality sound meets all-day comfort.',
    extra: { price: '$349', rating: '4.8', seller: 'Amazon' },
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    snippet: 'Track workouts, sleep, and health metrics with GPS and heart rate monitoring.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    description: 'Your personal health and fitness companion.',
    extra: { price: '$249', rating: '4.7', seller: 'Best Buy' },
  },
  {
    id: '3',
    title: 'Mechanical Gaming Keyboard',
    snippet: 'RGB backlit with hot-swappable switches and aluminum frame.',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
    description: 'Built for gamers who demand precision and style.',
    extra: { price: '$129', rating: '4.9', seller: 'Newegg' },
  },
  {
    id: '4',
    title: 'Portable Power Station',
    snippet: '500Wh capacity with solar charging and multiple output ports.',
    image: 'https://images.unsplash.com/photo-1609592424117-59c3c0598f95?w=800',
    description: 'Power anywhere for camping, emergencies, or remote work.',
    extra: { price: '$399', rating: '4.6', seller: 'Amazon' },
  },
  {
    id: '5',
    title: '4K Action Camera',
    snippet: 'Waterproof to 33ft with image stabilization and voice control.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
    description: 'Capture your adventures in stunning detail.',
    extra: { price: '$299', rating: '4.8', seller: 'B&H Photo' },
  },
];

export function getMockResults(category: string): EnrichedOption[] {
  switch (category) {
    case 'entertainment':
      return mockEntertainmentResults;
    case 'travel':
      return mockTravelResults;
    case 'eat':
      return mockFoodResults;
    case 'gift':
      return mockGiftResults;
    case 'buy':
      return mockShoppingResults;
    default:
      return mockEntertainmentResults;
  }
}

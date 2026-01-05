import { API_CONFIG } from '@/config/api';

// Color gradients for fallback images (avoids CORS)
const colorPairs = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#30cfd0', '#330867'],
  ['#a8edea', '#fed6e3'],
  ['#ff9a9e', '#fecfef'],
  ['#ffecd2', '#fcb69f'],
  ['#ff6e7f', '#bfe9ff'],
];

function getGradientIndex(text: string): number {
  const hash = text.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return Math.abs(hash) % colorPairs.length;
}

function getFallbackImage(query: string = 'abstract'): string {
  // Generate SVG with gradient based on query hash to avoid CORS
  const gradientIndex = getGradientIndex(query);
  const [color1, color2] = colorPairs[gradientIndex];
  
  const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#grad)" />
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export async function getUnsplashImage(query: string): Promise<string | undefined> {
  // Use gradient SVG to avoid CORS issues
  // Provides consistent, beautiful backgrounds
  return getFallbackImage(query);
}

export async function getRandomImage(category?: string): Promise<string | undefined> {
  return getFallbackImage(category || 'abstract');
}

// =============================================================================
// Beautiful Bangladesh — Application Constants
// =============================================================================

/** Site-wide constants */
export const SITE_CONFIG = {
  name: 'Beautiful Bangladesh',
  url: 'https://bangladesh-tour.vercel.app',
  description:
    'Discover the breathtaking beauty of Bangladesh — from the world\'s longest beach to ancient UNESCO heritage sites, lush tea gardens, and the majestic Sundarbans.',
  locale: 'en_US',
  twitterHandle: '@beautifulbd',
} as const;

/** Design system color tokens (matches Tailwind @theme) */
export const COLORS = {
  sundarbans: '#0B6E4F',
  'paddy-gold': '#D4A843',
  'coxs-azure': '#1B6B93',
  terracotta: '#C2704E',
  'monsoon-slate': '#1E293B',
  'river-mist': '#F0F4F8',
} as const;

/** Navigation links */
export const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Divisions', href: '/divisions' },
  { label: 'Categories', href: '/categories' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
] as const;

/** Season configuration */
export const SEASONS = {
  summer: {
    label: 'Summer',
    months: [3, 4, 5], // April, May, June (0-indexed: March, April, May)
    icon: '☀️',
    description: 'Hot and humid with occasional rain showers',
  },
  monsoon: {
    label: 'Monsoon',
    months: [6, 7, 8, 9], // July, August, September, October
    icon: '🌧️',
    description: 'Heavy rainfall with lush green landscapes',
  },
  winter: {
    label: 'Winter',
    months: [10, 11, 0, 1, 2], // November through March
    icon: '❄️',
    description: 'Cool and pleasant — the best time to travel',
  },
} as const;

/** Category icons mapping */
export const CATEGORY_ICONS: Record<string, string> = {
  beaches: '🏖️',
  'hills-mountains': '⛰️',
  'forests-wildlife': '🌿',
  'historical-sites': '🏛️',
  'archaeological-sites': '🏺',
  'rivers-lakes': '🌊',
  islands: '🏝️',
  'tea-gardens': '🍃',
  'religious-sites': '🕌',
  'unesco-world-heritage': '🌍',
};

/** Image dimensions for Next.js Image component */
export const IMAGE_SIZES = {
  hero: { width: 1920, height: 1080 },
  card: { width: 800, height: 600 },
  thumbnail: { width: 400, height: 300 },
  gallery: { width: 1200, height: 800 },
  og: { width: 1200, height: 630 },
} as const;

/** Animation timing presets */
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 0.8,
} as const;

/** Breakpoints (matches Tailwind defaults) */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/** Unsplash attribution */
export const UNSPLASH_UTM = '?utm_source=beautiful_bangladesh&utm_medium=referral';

// =============================================================================
// Beautiful Bangladesh — Core Type Definitions
// =============================================================================

/** Photographer attribution for Unsplash images */
export interface Photographer {
  name: string;
  profileUrl: string;
}

/** Image with full attribution metadata */
export interface ImageWithAttribution {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  photographer: Photographer;
}

/** Geographic coordinates */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** Weather information by season */
export interface WeatherInfo {
  summer: string;
  monsoon: string;
  winter: string;
}

/** SEO metadata for a page */
export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
}

// =============================================================================
// Destination
// =============================================================================

export interface Destination {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  division: string;
  district: string;
  category: string[];
  coordinates: Coordinates;
  heroImage: ImageWithAttribution;
  gallery: ImageWithAttribution[];
  bestTimeToVisit: string;
  entryFee: string;
  openingHours: string;
  travelTips: string[];
  nearbyAttractions: string[];
  transportationGuide: string;
  recommendedDuration: string;
  activities: string[];
  weather: WeatherInfo;
  seo: SeoMetadata;
  youtubeVideoUrl?: string;
}

// =============================================================================
// Division & District
// =============================================================================

export interface Division {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: ImageWithAttribution;
  destinationCount: number;
  featured: boolean;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  division: string;
  description: string;
}

export interface MapDivisionData {
  id: string;
  slug: string;
  name: string;
  bn_name: string;
  lat: number;
  long: number;
  center: [number, number];
  color: string;
  districtCount: number;
  upazilaCount: number;
  combinedPath: string;
}

// =============================================================================
// Category
// =============================================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  heroImage: ImageWithAttribution;
  destinationCount: number;
}

// =============================================================================
// Travel Guide
// =============================================================================

export interface Guide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  heroImage: ImageWithAttribution;
  relatedDestinations: string[];
  tags: string[];
  seo: SeoMetadata;
}

// =============================================================================
// Festival
// =============================================================================

export interface Festival {
  id: string;
  name: string;
  slug: string;
  description: string;
  month: string;
  duration: string;
  location: string;
  heroImage: ImageWithAttribution;
  relatedDestinations: string[];
}

// =============================================================================
// Site Metadata
// =============================================================================

export interface SiteMeta {
  siteName: string;
  siteUrl: string;
  description: string;
  defaultOgImage: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

// =============================================================================
// Search & Filtering
// =============================================================================

export interface SearchParams {
  query?: string;
  category?: string;
  division?: string;
  season?: 'summer' | 'monsoon' | 'winter';
  sortBy?: 'name' | 'popular' | 'newest';
}

export interface FilterState {
  categories: string[];
  divisions: string[];
  season: string | null;
  sortBy: 'name' | 'popular' | 'newest';
}

// =============================================================================
// Component Variant Types
// =============================================================================

export type DestinationCardVariant = 'default' | 'featured' | 'compact';
export type BadgeVariant = 'default' | 'category' | 'season' | 'info';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type AnimationVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'stagger' | 'scaleUp';

// =============================================================================
// Season Detection
// =============================================================================

export type Season = 'summer' | 'monsoon' | 'winter';

# Beautiful Bangladesh - Data Schemas

This document defines the TypeScript interfaces and validation rules for the JSON static data files powering the Beautiful Bangladesh platform.

## Validation Rules
- **Slug Format:** Must be lowercase and contain only alphanumeric characters and hyphens (e.g., `sundarbans-mangrove-forest`).
- **URL Format:** Must be a valid absolute or relative URL.
- **Coordinate Ranges:** Bangladesh boundaries roughly fall between:
  - Latitude: `20.5` to `26.6`
  - Longitude: `88.0` to `92.7`

## Core Interfaces

### ImageWithAttribution
```typescript
interface ImageWithAttribution {
  url: string;
  alt: string;
  width: number;
  height: number;
  photographer: {
    name: string;
    profileUrl: string;
    unsplashUrl?: string; // Optional if from a source other than Unsplash
  };
}
```

### Destination
```typescript
interface Destination {
  id: string;
  name: string;
  slug: string;
  shortDescription: string; // Max 160 chars
  detailedDescription: string; // HTML-safe markdown
  division: string; // Reference to Division slug
  district: string; // Reference to District slug
  category: string[]; // References to Category slugs
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: ImageWithAttribution;
  gallery: ImageWithAttribution[];
  bestTimeToVisit: string;
  entryFee: string | 'Free';
  openingHours: string;
  travelTips: string[];
  nearbyAttractions: string[]; // Array of Destination slugs
  transportationGuide: string;
  recommendedDuration: string;
  activities: string[];
  weather: {
    summer: string;
    monsoon: string;
    winter: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
```

### Division
```typescript
interface Division {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: ImageWithAttribution;
  destinationCount: number;
  featured: boolean;
}
```

### District
```typescript
interface District {
  id: string;
  name: string;
  slug: string;
  division: string; // Reference to Division slug
  description: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Emoji or icon name (e.g., Lucide icon name)
  heroImage: ImageWithAttribution;
  destinationCount: number;
}
```

### Guide
```typescript
interface Guide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML-safe markdown
  author: string;
  publishedDate: string; // ISO 8601 date string
  readingTime: string;
  heroImage: ImageWithAttribution;
  relatedDestinations: string[]; // Array of Destination slugs
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
```

### Festival
```typescript
interface Festival {
  id: string;
  name: string;
  slug: string;
  description: string;
  month: string;
  duration: string;
  location: string;
  heroImage: ImageWithAttribution;
  relatedDestinations: string[]; // Array of Destination slugs
}
```

### SiteMeta
```typescript
interface SiteMeta {
  siteName: string;
  siteUrl: string;
  description: string;
  defaultOgImage: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}
```

## Example JSON Snippets

**Destination Example (`/data/destinations/sundarbans.json`)**
```json
{
  "id": "dest-001",
  "name": "Sundarbans",
  "slug": "sundarbans",
  "shortDescription": "The largest mangrove forest in the world, home to the majestic Royal Bengal Tiger.",
  "detailedDescription": "The Sundarbans is a vast mangrove forest...",
  "division": "khulna",
  "district": "khulna",
  "category": ["nature", "wildlife"],
  "coordinates": {
    "lat": 21.9497,
    "lng": 89.1833
  },
  "heroImage": {
    "url": "/images/sundarbans-hero.jpg",
    "alt": "River flowing through the Sundarbans mangrove forest",
    "width": 1920,
    "height": 1080,
    "photographer": {
      "name": "John Doe",
      "profileUrl": "https://unsplash.com/@johndoe",
      "unsplashUrl": "https://unsplash.com/photos/xyz123"
    }
  },
  "gallery": [],
  "videos": [],
  "bestTimeToVisit": "November to February",
  "entryFee": "150 BDT",
  "openingHours": "6:00 AM - 6:00 PM",
  "travelTips": [
    "Carry mosquito repellent",
    "Hire a registered guide"
  ],
  "nearbyAttractions": ["karamjal-wildlife-center", "hiron-point"],
  "transportationGuide": "Accessible by boat from Mongla port.",
  "recommendedDuration": "2-3 Days",
  "activities": ["boat-safari", "bird-watching", "trekking"],
  "weather": {
    "summer": "Hot and humid",
    "monsoon": "Heavy rainfall, river water levels rise",
    "winter": "Pleasant and cool, best for spotting wildlife"
  },
  "seo": {
    "title": "Sundarbans - The Largest Mangrove Forest | Beautiful Bangladesh",
    "description": "Explore the Sundarbans, a UNESCO World Heritage site.",
    "keywords": ["Sundarbans", "Mangrove", "Royal Bengal Tiger", "Bangladesh Tourism"]
  }
}
```

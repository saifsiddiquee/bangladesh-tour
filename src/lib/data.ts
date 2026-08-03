// =============================================================================
// Beautiful Bangladesh — Data Loading Utilities
// =============================================================================
// All data is loaded from static JSON files at build time.
// Functions are async-ready for future migration to a database.

import type {
  Destination,
  Division,
  Category,
  Guide,
  Festival,
  SiteMeta,
  SearchParams,
} from './types';
import { searchRelevanceScore, getCurrentSeason } from './utils';

// =============================================================================
// Raw Data Imports (resolved at build time via resolveJsonModule)
// =============================================================================

import destinationsData from '../../data/destinations.json';
import divisionsData from '../../data/divisions.json';
import categoriesData from '../../data/categories.json';
import guidesData from '../../data/guides.json';
import festivalsData from '../../data/festivals.json';
import metaData from '../../data/meta.json';

// Cast to typed arrays
const destinations = destinationsData as Destination[];
const divisions = divisionsData as Division[];
const categories = categoriesData as Category[];
const guides = guidesData as Guide[];
const festivals = festivalsData as Festival[];
const siteMeta = metaData as SiteMeta;

// =============================================================================
// Destination Queries
// =============================================================================

/** Returns all destinations */
export async function getAllDestinations(): Promise<Destination[]> {
  return destinations;
}

/** Returns a single destination by its slug */
export async function getDestinationBySlug(
  slug: string
): Promise<Destination | undefined> {
  return destinations.find((d) => d.slug === slug);
}

/** Returns all destination slugs (for generateStaticParams) */
export async function getAllDestinationSlugs(): Promise<string[]> {
  return destinations.map((d) => d.slug);
}

/** Returns destinations filtered by category slug */
export async function getDestinationsByCategory(
  categorySlug: string
): Promise<Destination[]> {
  return destinations.filter((d) => d.category.includes(categorySlug));
}

/** Returns destinations filtered by division slug */
export async function getDestinationsByDivision(
  divisionSlug: string
): Promise<Destination[]> {
  return destinations.filter((d) => d.division === divisionSlug);
}

/** Returns featured destinations (first 6 with diverse categories) */
export async function getFeaturedDestinations(): Promise<Destination[]> {
  const seen = new Set<string>();
  const featured: Destination[] = [];

  for (const dest of destinations) {
    const primaryCategory = dest.category[0];
    if (!seen.has(primaryCategory) && featured.length < 6) {
      seen.add(primaryCategory);
      featured.push(dest);
    }
  }

  // Fill remaining slots if we have fewer than 6 categories
  if (featured.length < 6) {
    for (const dest of destinations) {
      if (!featured.includes(dest) && featured.length < 6) {
        featured.push(dest);
      }
    }
  }

  return featured;
}

/** Returns related destinations (same category, excluding the current one) */
export async function getRelatedDestinations(
  currentSlug: string,
  limit: number = 4
): Promise<Destination[]> {
  const current = destinations.find((d) => d.slug === currentSlug);
  if (!current) return [];

  const related = destinations
    .filter(
      (d) =>
        d.slug !== currentSlug &&
        d.category.some((c) => current.category.includes(c))
    )
    .slice(0, limit);

  return related;
}

/** Returns nearby attractions for a destination */
export async function getNearbyDestinations(
  slugs: string[]
): Promise<Destination[]> {
  return destinations.filter((d) => slugs.includes(d.slug));
}

/** Returns seasonal recommendations based on current month */
export async function getSeasonalDestinations(
  limit: number = 6
): Promise<Destination[]> {
  const season = getCurrentSeason();

  // Score destinations by season relevance
  const scored = destinations.map((dest) => {
    let score = 0;
    const bestTime = dest.bestTimeToVisit.toLowerCase();

    if (season === 'winter') {
      if (
        bestTime.includes('november') ||
        bestTime.includes('december') ||
        bestTime.includes('january') ||
        bestTime.includes('february') ||
        bestTime.includes('march') ||
        bestTime.includes('winter')
      ) {
        score += 10;
      }
    } else if (season === 'monsoon') {
      if (bestTime.includes('monsoon') || bestTime.includes('june') || bestTime.includes('july')) {
        score += 10;
      }
      // During monsoon, swamp forests and lush areas are great
      if (dest.category.includes('forests-wildlife')) score += 5;
    } else {
      if (bestTime.includes('summer') || bestTime.includes('april') || bestTime.includes('may')) {
        score += 10;
      }
      // Hill stations are great in summer
      if (dest.category.includes('hills-mountains')) score += 5;
    }

    return { dest, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.dest);
}

// =============================================================================
// Search
// =============================================================================

/** Searches destinations with fuzzy matching and relevance scoring */
export async function searchDestinations(
  params: SearchParams
): Promise<Destination[]> {
  let results = [...destinations];

  // Filter by category
  if (params.category) {
    results = results.filter((d) => d.category.includes(params.category!));
  }

  // Filter by division
  if (params.division) {
    results = results.filter((d) => d.division === params.division);
  }

  // Text search with relevance scoring
  if (params.query && params.query.trim()) {
    const query = params.query.trim();
    const scored = results
      .map((d) => ({
        dest: d,
        score: searchRelevanceScore(query, d.name, d.shortDescription),
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    results = scored.map((s) => s.dest);
  }

  // Sort
  if (params.sortBy === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  return results;
}

// =============================================================================
// Division Queries
// =============================================================================

export async function getAllDivisions(): Promise<Division[]> {
  return divisions;
}

export async function getDivisionBySlug(
  slug: string
): Promise<Division | undefined> {
  return divisions.find((d) => d.slug === slug);
}

export async function getFeaturedDivisions(): Promise<Division[]> {
  return divisions.filter((d) => d.featured);
}

// =============================================================================
// Category Queries
// =============================================================================

export async function getAllCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

// =============================================================================
// Guide Queries
// =============================================================================

export async function getAllGuides(): Promise<Guide[]> {
  return guides;
}

export async function getGuideBySlug(
  slug: string
): Promise<Guide | undefined> {
  return guides.find((g) => g.slug === slug);
}

export async function getAllGuideSlugs(): Promise<string[]> {
  return guides.map((g) => g.slug);
}

// =============================================================================
// Festival Queries
// =============================================================================

export async function getAllFestivals(): Promise<Festival[]> {
  return festivals;
}

// =============================================================================
// Site Meta
// =============================================================================

export async function getSiteMeta(): Promise<SiteMeta> {
  return siteMeta;
}

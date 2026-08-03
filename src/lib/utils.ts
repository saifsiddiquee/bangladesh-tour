// =============================================================================
// Beautiful Bangladesh — Utility Functions
// =============================================================================

import { type Season, type Coordinates } from './types';
import { SEASONS, UNSPLASH_UTM } from './constants';

/**
 * Determines the current season in Bangladesh based on the month.
 */
export function getCurrentSeason(): Season {
  const month = new Date().getMonth();

  if ((SEASONS.monsoon.months as readonly number[]).includes(month)) return 'monsoon';
  if ((SEASONS.summer.months as readonly number[]).includes(month)) return 'summer';
  return 'winter';
}

/**
 * Formats a slug into a readable title.
 * "coxs-bazar" → "Coxs Bazar"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates a URL-safe slug from a string.
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Truncates text to a maximum length, adding ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Calculates approximate reading time for content.
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Appends Unsplash UTM parameters to a photographer profile URL.
 */
export function unsplashProfileUrl(profileUrl: string): string {
  return `${profileUrl}${UNSPLASH_UTM}`;
}

/**
 * Generates a Google Maps link from coordinates.
 */
export function googleMapsUrl(coordinates: Coordinates): string {
  return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
}

/**
 * Creates a class string from conditional class names.
 * Simple cn utility — avoids adding clsx/tailwind-merge dependency.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Debounce function for search input.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Formats a date string to a readable format.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Simple fuzzy match for search.
 * Returns true if all characters in the query appear in order within the target.
 */
export function fuzzyMatch(query: string, target: string): boolean {
  const lowerQuery = query.toLowerCase();
  const lowerTarget = target.toLowerCase();

  // First check simple includes for better relevance
  if (lowerTarget.includes(lowerQuery)) return true;

  // Then do fuzzy character matching
  let queryIndex = 0;
  for (let i = 0; i < lowerTarget.length && queryIndex < lowerQuery.length; i++) {
    if (lowerTarget[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }
  return queryIndex === lowerQuery.length;
}

/**
 * Returns a score for search relevance (higher is better).
 */
export function searchRelevanceScore(query: string, name: string, description: string): number {
  const lowerQuery = query.toLowerCase();
  const lowerName = name.toLowerCase();
  const lowerDesc = description.toLowerCase();

  let score = 0;

  // Exact match in name
  if (lowerName === lowerQuery) score += 100;
  // Name starts with query
  else if (lowerName.startsWith(lowerQuery)) score += 80;
  // Name contains query
  else if (lowerName.includes(lowerQuery)) score += 60;
  // Description contains query
  if (lowerDesc.includes(lowerQuery)) score += 20;
  // Fuzzy match
  if (fuzzyMatch(lowerQuery, lowerName)) score += 10;

  return score;
}

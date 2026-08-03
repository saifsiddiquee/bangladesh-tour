'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Destination, SearchParams, FilterState } from '@/lib/types';
import { searchRelevanceScore, fuzzyMatch } from '@/lib/utils';
import { debounce } from '@/lib/utils';

/**
 * Hook for client-side destination search and filtering.
 * Operates on pre-loaded destination data to avoid network calls.
 */
export function useSearch(allDestinations: Destination[]) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    divisions: [],
    season: null,
    sortBy: 'name',
  });
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
        setIsSearching(false);
      }, 300),
    []
  );

  const handleQueryChange = useCallback(
    (value: string) => {
      setIsSearching(true);
      debouncedSetQuery(value);
    },
    [debouncedSetQuery]
  );

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleCategory = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  }, []);

  const toggleDivision = useCallback((division: string) => {
    setFilters((prev) => ({
      ...prev,
      divisions: prev.divisions.includes(division)
        ? prev.divisions.filter((d) => d !== division)
        : [...prev.divisions, division],
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setQuery('');
    setFilters({
      categories: [],
      divisions: [],
      season: null,
      sortBy: 'name',
    });
  }, []);

  // Compute filtered results
  const results = useMemo(() => {
    let filtered = [...allDestinations];

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter((d) =>
        d.category.some((c) => filters.categories.includes(c))
      );
    }

    // Apply division filters
    if (filters.divisions.length > 0) {
      filtered = filtered.filter((d) => filters.divisions.includes(d.division));
    }

    // Apply text search
    if (query.trim()) {
      const scored = filtered
        .map((d) => ({
          dest: d,
          score: searchRelevanceScore(query, d.name, d.shortDescription),
        }))
        .filter((s) => s.score > 0 || fuzzyMatch(query, s.dest.name))
        .sort((a, b) => b.score - a.score);

      filtered = scored.map((s) => s.dest);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // 'popular' and 'newest' would need additional data fields
    }

    return filtered;
  }, [allDestinations, query, filters]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    filters.categories.length > 0 ||
    filters.divisions.length > 0 ||
    filters.season !== null;

  return {
    query,
    filters,
    results,
    isSearching,
    hasActiveFilters,
    handleQueryChange,
    updateFilter,
    toggleCategory,
    toggleDivision,
    clearFilters,
    setQuery,
  };
}

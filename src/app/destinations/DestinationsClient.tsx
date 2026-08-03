'use client';

import { useState, useMemo } from 'react';
import type { Destination, Category, Division, FilterState } from '@/lib/types';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';

interface DestinationsClientProps {
  initialDestinations: Destination[];
  categories: Category[];
  divisions: Division[];
}

export function DestinationsClient({ initialDestinations, categories, divisions }: DestinationsClientProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    divisions: [],
    season: null,
    sortBy: 'name'
  });

  const toggleCategory = (categorySlug: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categorySlug)
        ? prev.categories.filter(c => c !== categorySlug)
        : [...prev.categories, categorySlug]
    }));
  };

  const toggleDivision = (divisionSlug: string) => {
    setFilters(prev => ({
      ...prev,
      divisions: prev.divisions.includes(divisionSlug)
        ? prev.divisions.filter(d => d !== divisionSlug)
        : [...prev.divisions, divisionSlug]
    }));
  };

  const clearFilters = () => {
    setFilters({ categories: [], divisions: [], season: null, sortBy: 'name' });
  };

  const filteredDestinations = useMemo(() => {
    return initialDestinations.filter(dest => {
      // Text search
      const searchStr = query.toLowerCase();
      const matchesSearch = !query || 
        dest.name.toLowerCase().includes(searchStr) ||
        dest.district.toLowerCase().includes(searchStr) ||
        dest.division.toLowerCase().includes(searchStr) ||
        dest.category.some(c => c.toLowerCase().includes(searchStr));

      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.some(c => dest.category.includes(c));

      // Division filter
      const matchesDivision = filters.divisions.length === 0 || 
        filters.divisions.includes(dest.division);

      return matchesSearch && matchesCategory && matchesDivision;
    });
  }, [initialDestinations, query, filters]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* Sidebar Filters */}
      <div className="w-full lg:sticky lg:top-24 lg:w-1/4">
        <SearchFilters
          categories={categories}
          divisions={divisions}
          activeFilters={filters}
          onToggleCategory={toggleCategory}
          onToggleDivision={toggleDivision}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <SearchBar 
          onSearch={(q) => {
            setIsSearching(true);
            setQuery(q);
            setTimeout(() => setIsSearching(false), 300); // Simulate network latency
          }}
          className="max-w-none"
        />
        
        <SearchResults 
          results={filteredDestinations}
          isSearching={isSearching}
          query={query}
        />
      </div>
    </div>
  );
}

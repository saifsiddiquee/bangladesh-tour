'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Destination, Category, Division, FilterState } from '@/lib/types';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';

interface SearchPageClientProps {
  initialQuery: string;
  destinations: Destination[];
  categories: Category[];
  divisions: Division[];
}

export function SearchPageClient({ 
  initialQuery, 
  destinations, 
  categories, 
  divisions 
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    divisions: [],
    season: null,
    sortBy: 'name'
  });

  // Sync query state with URL param changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== query) {
      setQuery(q);
    }
  }, [searchParams, query]);

  const handleSearch = (newQuery: string) => {
    setIsSearching(true);
    setQuery(newQuery);
    
    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    router.push(`/search?${params.toString()}`, { scroll: false });
    
    setTimeout(() => setIsSearching(false), 300);
  };

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleDivision = (division: string) => {
    setFilters(prev => ({
      ...prev,
      divisions: prev.divisions.includes(division)
        ? prev.divisions.filter(d => d !== division)
        : [...prev.divisions, division]
    }));
  };

  const clearFilters = () => {
    setFilters({ categories: [], divisions: [], season: null, sortBy: 'name' });
  };

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
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
  }, [destinations, query, filters]);

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
          defaultQuery={query}
          onSearch={handleSearch}
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

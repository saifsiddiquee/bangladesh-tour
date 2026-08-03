'use client';

import { Filter, X } from 'lucide-react';
import type { Category, Division, FilterState } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  categories: Category[];
  divisions: Division[];
  activeFilters: FilterState;
  onToggleCategory: (categorySlug: string) => void;
  onToggleDivision: (divisionSlug: string) => void;
  onClearFilters: () => void;
}

export function SearchFilters({
  categories,
  divisions,
  activeFilters,
  onToggleCategory,
  onToggleDivision,
  onClearFilters
}: SearchFiltersProps) {
  const activeCount = activeFilters.categories.length + activeFilters.divisions.length;

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-monsoon-slate dark:text-river-mist">
          <Filter className="h-5 w-5" />
          <h3 className="font-semibold">Filters</h3>
          {activeCount > 0 && (
            <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sundarbans text-xs font-medium text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-slate-500 hover:text-sundarbans dark:text-slate-400 dark:hover:text-sundarbans"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeFilters.categories.includes(category.slug);
              return (
                <button
                  key={category.slug}
                  onClick={() => onToggleCategory(category.slug)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
                    isActive 
                      ? "bg-sundarbans border-sundarbans text-white" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-sundarbans hover:bg-sundarbans/5 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                  )}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divisions */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Divisions</h4>
          <div className="flex flex-wrap gap-2">
            {divisions.map((division) => {
              const isActive = activeFilters.divisions.includes(division.slug);
              return (
                <button
                  key={division.slug}
                  onClick={() => onToggleDivision(division.slug)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
                    isActive 
                      ? "bg-coxs-azure border-coxs-azure text-white" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-coxs-azure hover:bg-coxs-azure/5 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                  )}
                >
                  {division.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

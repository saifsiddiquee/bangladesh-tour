'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  defaultQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  defaultQuery = '', 
  onSearch, 
  placeholder = 'Search destinations, districts, or activities...',
  className
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onSearch?.(value);
    }, 300);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <div className={cn("relative w-full max-w-3xl", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-12 text-base text-slate-900 shadow-sm transition-all focus:border-sundarbans focus:outline-none focus:ring-2 focus:ring-sundarbans/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-sundarbans"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

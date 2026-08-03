'use client';

import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import type { Destination } from '@/lib/types';
import { DestinationCard } from '../destinations/DestinationCard';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface SearchResultsProps {
  results: Destination[];
  isSearching: boolean;
  query: string;
}

export function SearchResults({ results, isSearching, query }: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] w-full rounded-t-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="rounded-b-2xl border border-t-0 border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-monsoon-slate/50">
              <div className="mb-4 h-6 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mb-2 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700">
        <SearchX className="mb-4 h-12 w-12 text-slate-400" />
        <h3 className="font-display mb-2 text-xl font-semibold text-slate-900 dark:text-white">
          No destinations found
        </h3>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          We couldn't find any destinations matching {query ? `"${query}"` : 'your filters'}. 
          Try adjusting your search or removing some filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm font-medium text-slate-600 dark:text-slate-400">
        Showing {results.length} destination{results.length !== 1 ? 's' : ''}
      </p>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {results.map((destination) => (
          <motion.div key={destination.id} variants={staggerItem}>
            <DestinationCard destination={destination} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

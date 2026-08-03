import { Suspense } from 'react';
import { getAllDestinations, getAllCategories, getAllDivisions } from '@/lib/data';
import { SearchPageClient } from './SearchPageClient';

export const metadata = {
  title: 'Search Destinations | Beautiful Bangladesh',
  description: 'Search for your next travel destination in Bangladesh.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || '';
  
  const destinations = await getAllDestinations();
  const categories = await getAllCategories();
  const divisions = await getAllDivisions();

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12 dark:bg-monsoon-slate lg:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display mb-8 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Search Results
        </h1>
        
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchPageClient 
            initialQuery={query}
            destinations={destinations}
            categories={categories}
            divisions={divisions}
          />
        </Suspense>
      </div>
    </main>
  );
}

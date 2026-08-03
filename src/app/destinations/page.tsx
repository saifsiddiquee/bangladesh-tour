import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllDestinations, getAllCategories, getAllDivisions } from '@/lib/data';
import { DestinationsClient } from './DestinationsClient';
import { generateBreadcrumbJsonLd, generateItemListJsonLd } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bangladesh Tour Destinations & Places to Visit | Beautiful Bangladesh',
  description:
    'Discover top Bangladesh tour spots & destinations: Cox\'s Bazar, Sundarbans mangrove forest, Sylhet tea estates, and historical landmarks for your Bangladesh tour.',
  keywords: [
    'bangladesh tour',
    'bangladesh tour spots',
    'tourist places in bangladesh',
    'bangladesh tourist destinations',
    'best places for bangladesh tour',
    'cox\'s bazar tour',
    'sundarbans tour',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/destinations`,
  },
};

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();
  const categories = await getAllCategories();
  const divisions = await getAllDivisions();

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Bangladesh Tour Destinations', url: `${SITE_CONFIG.url}/destinations` },
  ]);

  const itemListSchema = generateItemListJsonLd(
    destinations.map((d) => ({
      name: d.name,
      url: `${SITE_CONFIG.url}/destinations/${d.slug}`,
      image: d.heroImage.url,
      description: d.shortDescription,
    })),
    'Top Bangladesh Tour Destinations'
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-monsoon-slate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* Header */}
      <div className="bg-sundarbans py-20 text-white pt-32">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-wider text-paddy-gold uppercase mb-2 block font-body">
            Bangladesh Tour Directory
          </span>
          <h1 className="font-display mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Bangladesh Tour Destinations & Spots
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90 font-body">
            Discover {destinations.length} incredible tour destinations across Bangladesh — from sea beaches and ancient heritage sites to lush hill tracts.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Loading...</div>}>
          <DestinationsClient 
            initialDestinations={destinations}
            categories={categories}
            divisions={divisions}
          />
        </Suspense>
      </div>
    </main>
  );
}

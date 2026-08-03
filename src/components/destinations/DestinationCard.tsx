import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { CATEGORY_ICONS } from '@/lib/constants';

const CATEGORY_NAMES: Record<string, string> = {
  beaches: 'Beaches',
  'hills-mountains': 'Hills & Mountains',
  'forests-wildlife': 'Forests & Wildlife',
  'historical-sites': 'Historical Sites',
  'archaeological-sites': 'Archaeological Sites',
  'rivers-lakes': 'Rivers & Lakes',
  islands: 'Islands',
  'tea-gardens': 'Tea Gardens',
  'religious-sites': 'Religious Sites',
  'unesco-world-heritage': 'UNESCO Heritage',
};

function getCategoryLabel(slug: string): string {
  if (CATEGORY_NAMES[slug]) return CATEGORY_NAMES[slug];
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface DestinationCardProps {
  destination: Destination;
  variant?: 'default' | 'featured' | 'compact';
}

export function DestinationCard({ destination, variant = 'default' }: DestinationCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  const categorySlug = destination.category?.[0] || 'beaches';
  const categoryLabel = getCategoryLabel(categorySlug);
  const categoryIcon = CATEGORY_ICONS[categorySlug] || '📍';

  return (
    <Link href={`/destinations/${destination.slug}`} className="group block h-full">
      <div
        className={cn(
          'relative flex h-full overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/90 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-sundarbans/40 dark:hover:border-emerald-500/40',
          isCompact ? 'flex-row' : 'flex-col'
        )}
      >
        {/* Image Section */}
        <div
          className={cn(
            'image-zoom-container relative overflow-hidden bg-slate-100 dark:bg-slate-800',
            isCompact ? 'w-1/3 min-w-[120px]' : 'w-full',
            isFeatured ? 'aspect-[16/9] md:aspect-[3/2]' : isCompact ? 'aspect-square' : 'aspect-[4/3]'
          )}
        >
          <Image
            src={destination.heroImage?.url || '/placeholder.jpg'}
            alt={destination.heroImage?.alt || destination.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Dark gradient overlay for text & badge contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Category Badge on Image (for non-compact cards) */}
          {!isCompact && (
            <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-md">
                <span className="text-sm leading-none">{categoryIcon}</span>
                <span>{categoryLabel}</span>
              </span>
            </div>
          )}

          {/* Quick arrow indicator on hover */}
          <div className="absolute bottom-3 right-3 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Content Section */}
        <div
          className={cn(
            'flex flex-1 flex-col justify-between',
            isCompact ? 'p-4' : 'p-5'
          )}
        >
          <div>
            {/* Category Badge (Compact mode) */}
            {isCompact && (
              <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 text-xs font-semibold text-sundarbans dark:text-emerald-300">
                <span>{categoryIcon}</span>
                <span>{categoryLabel}</span>
              </span>
            )}

            <h3
              className={cn(
                'font-display font-bold text-slate-900 dark:text-white transition-colors group-hover:text-sundarbans dark:group-hover:text-emerald-400 leading-snug',
                isFeatured ? 'text-2xl mb-2' : 'text-lg mb-1.5'
              )}
            >
              {destination.name}
            </h3>

            <div className="mb-3 flex items-center text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">
              <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-sundarbans dark:text-emerald-400" />
              <span className="truncate">{destination.district}, {destination.division}</span>
            </div>

            {!isCompact && (
              <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {destination.shortDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

import type { Destination } from '@/lib/types';
import { DestinationCard } from './DestinationCard';

interface RelatedDestinationsProps {
  destinations: Destination[];
}

export function RelatedDestinations({ destinations }: RelatedDestinationsProps) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section className="my-16 bg-slate-50 py-16 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display mb-8 text-2xl font-bold text-monsoon-slate dark:text-river-mist sm:text-3xl">
          You Might Also Like
        </h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}

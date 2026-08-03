import type { Destination } from '@/lib/types';
import { DestinationCard } from './DestinationCard';

interface NearbyAttractionsProps {
  destinations: Destination[];
}

export function NearbyAttractions({ destinations }: NearbyAttractionsProps) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section className="my-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display mb-8 text-2xl font-bold text-monsoon-slate dark:text-river-mist sm:text-3xl">
          Nearby Attractions
        </h2>
        
        <div className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4">
          {destinations.map((destination) => (
            <div key={destination.id} className="w-[300px] shrink-0 snap-start sm:w-[350px]">
              <DestinationCard destination={destination} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

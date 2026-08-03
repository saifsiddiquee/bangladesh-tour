import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SeasonalPicksProps {
  destinations: Destination[];
  currentSeason: string;
}

export function SeasonalPicks({ destinations, currentSeason }: SeasonalPicksProps) {
  if (!destinations?.length) return null;

  // Determine season aesthetics
  let seasonData = {
    title: `Perfect for ${currentSeason}`,
    subtitle: 'Handpicked destinations for current weather',
    gradient: 'from-sundarbans/10 to-transparent',
    icon: '🌤️'
  };

  const lowerSeason = currentSeason.toLowerCase();
  if (lowerSeason.includes('monsoon') || lowerSeason.includes('rain')) {
    seasonData = {
      title: 'Monsoon Magic 🌧️',
      subtitle: 'Experience the lush greenery of the rainy season',
      gradient: 'from-coxs-azure/10 to-transparent',
      icon: '🌧️'
    };
  } else if (lowerSeason.includes('winter') || lowerSeason.includes('cold')) {
    seasonData = {
      title: 'Winter Escapes ❄️',
      subtitle: 'Cool breezes and clear skies await',
      gradient: 'from-monsoon-slate/10 to-transparent',
      icon: '❄️'
    };
  } else if (lowerSeason.includes('summer') || lowerSeason.includes('hot')) {
    seasonData = {
      title: 'Summer Retreats ☀️',
      subtitle: 'Beat the heat at these refreshing spots',
      gradient: 'from-paddy-gold/10 to-transparent',
      icon: '☀️'
    };
  }

  return (
    <section className={cn("py-20 w-full bg-gradient-to-b overflow-hidden", seasonData.gradient)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-monsoon-slate mb-4">
            {seasonData.title}
          </h2>
          <p className="text-lg text-monsoon-slate/70 font-body">
            {seasonData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((destination) => (
            <Link 
              key={destination.id} 
              href={`/destinations/${destination.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden image-zoom-container">
                <Image
                  src={destination.heroImage.url}
                  alt={destination.heroImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-monsoon-slate mb-2">
                  {destination.name}
                </h3>
                <p className="text-monsoon-slate/70 font-body text-sm line-clamp-2 mb-4">
                  {destination.shortDescription}
                </p>
                <div className="inline-flex items-center text-sundarbans text-sm font-semibold font-body group-hover:text-paddy-gold transition-colors">
                  Explore {destination.name}
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDivisions } from '@/lib/data';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Divisions of Bangladesh — Explore All 8 Divisions',
  description:
    'Explore all 8 administrative divisions of Bangladesh. Each division offers unique landscapes, cultures, and destinations worth discovering.',
};

export default async function DivisionsPage() {
  const divisions = await getAllDivisions();

  return (
    <div>
      {/* Hero */}
      <section className="gradient-monsoon py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Explore by Division
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Bangladesh is divided into 8 administrative divisions, each with its own unique
            character and attractions
          </p>
        </div>
      </section>

      {/* Division Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((division) => (
              <Link
                key={division.id}
                href={`/divisions/${division.slug}`}
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden image-zoom-container"
              >
                <Image
                  src={division.heroImage.url}
                  alt={division.heroImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="gradient-card absolute inset-0" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h2 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-paddy-gold transition-colors">
                    {division.name}
                  </h2>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {division.description}
                  </p>
                  <p className="text-paddy-gold text-sm mt-2 font-medium">
                    {division.destinationCount} destination
                    {division.destinationCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

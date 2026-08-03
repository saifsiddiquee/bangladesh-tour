import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllDivisions, getDestinationsByDivision } from '@/lib/data';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SITE_CONFIG } from '@/lib/constants';

interface DivisionPageProps {
  params: Promise<{ division: string }>;
}

export async function generateStaticParams() {
  const divisions = await getAllDivisions();
  return divisions.map((div) => ({ division: div.slug }));
}

export async function generateMetadata({ params }: DivisionPageProps): Promise<Metadata> {
  const { division: slug } = await params;
  const divisions = await getAllDivisions();
  const division = divisions.find((d) => d.slug === slug);

  if (!division) return { title: 'Division Not Found' };

  return {
    title: `${division.name} Division — Explore Bangladesh`,
    description: division.description,
    openGraph: {
      title: `${division.name} Division | ${SITE_CONFIG.name}`,
      description: division.description,
      images: [{ url: division.heroImage.url }],
    },
  };
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const { division: slug } = await params;
  const divisions = await getAllDivisions();
  const division = divisions.find((d) => d.slug === slug);

  if (!division) notFound();

  const destinations = await getDestinationsByDivision(slug);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end">
        <Image
          src={division.heroImage.url}
          alt={division.heroImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="gradient-hero absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <p className="text-paddy-gold font-medium mb-2 text-sm uppercase tracking-wider">
            Division
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {division.name}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">{division.description}</p>
          <p className="text-white/60 mt-2">
            {destinations.length} destination{destinations.length !== 1 ? 's' : ''} to explore
          </p>
        </div>
      </section>

      {/* Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </AnimatedSection>

        {destinations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-lg">
              No destinations found in this division yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

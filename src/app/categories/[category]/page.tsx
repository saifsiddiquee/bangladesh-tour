import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllCategories, getDestinationsByCategory } from '@/lib/data';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SITE_CONFIG } from '@/lib/constants';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} — Destinations in Bangladesh`,
    description: category.description,
    openGraph: {
      title: `${category.name} | ${SITE_CONFIG.name}`,
      description: category.description,
      images: [{ url: category.heroImage.url }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const destinations = await getDestinationsByCategory(slug);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end">
        <Image
          src={category.heroImage.url}
          alt={category.heroImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="gradient-hero absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <span className="text-5xl mb-3 block">{category.icon}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {category.name}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">{category.description}</p>
          <p className="text-white/60 mt-2">
            {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
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
              No destinations found in this category yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

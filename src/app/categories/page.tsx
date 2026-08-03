import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/lib/data';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Categories — Explore Bangladesh by Type',
  description:
    'Browse Bangladesh destinations by category — beaches, hills, historical sites, wildlife, tea gardens, and more.',
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      {/* Hero */}
      <section className="gradient-monsoon py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Explore by Category
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            From pristine beaches to ancient ruins, discover Bangladesh through the lens of your interests
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative block aspect-[3/2] rounded-2xl overflow-hidden image-zoom-container"
              >
                <Image
                  src={category.heroImage.url}
                  alt={category.heroImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="gradient-card absolute inset-0" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                  <span className="text-4xl mb-3">{category.icon}</span>
                  <h2 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-paddy-gold transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-white/70 text-sm max-w-xs">{category.description}</p>
                  <p className="text-paddy-gold text-sm mt-3 font-medium">
                    {category.destinationCount} destination
                    {category.destinationCount !== 1 ? 's' : ''}
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

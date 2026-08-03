import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllGuides } from '@/lib/data';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { generateBreadcrumbJsonLd } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bangladesh Travel Guide — Practical Tips, Itineraries & Expert Advice',
  description:
    'Essential Bangladesh Travel Guide: Discover expert tips, custom itineraries, visa details, safety guidelines, and local cultural insights for your trip to Bangladesh.',
  keywords: [
    'bangladesh travel',
    'bangladesh travel guide',
    'bangladesh travel tips',
    'bangladesh tour itinerary',
    'how to travel in bangladesh',
    'bangladesh tourist guide',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/guides`,
  },
};

export default async function GuidesPage() {
  const guides = await getAllGuides();
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Bangladesh Travel Guides', url: `${SITE_CONFIG.url}/guides` },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="gradient-monsoon py-24 md:py-32 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm font-semibold tracking-wider text-paddy-gold uppercase mb-2 block font-body">
            Comprehensive Travel Resources
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Bangladesh Travel Guides & Tips
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-body">
            Expert travel advice, step-by-step itineraries, cultural insights, and essential tips for Bangladesh travel.
          </p>
        </div>
      </section>

      {/* Guide List */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="relative aspect-[16/9] image-zoom-container">
                    <Image
                      src={guide.heroImage.url}
                      alt={guide.heroImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {guide.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="category">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-monsoon-slate mb-3 group-hover:text-sundarbans transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-muted line-clamp-3 mb-4">{guide.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted">
                      <span>{guide.author}</span>
                      <span>·</span>
                      <span>{guide.readingTime}</span>
                      <span>·</span>
                      <span>{formatDate(guide.publishedDate)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

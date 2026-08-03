import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllGuides, getGuideBySlug } from '@/lib/data';
import { generateGuideMetadata } from '@/lib/seo';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageAttribution } from '@/components/ui/ImageAttribution';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return { title: 'Guide Not Found' };
  return generateGuideMetadata(guide);
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) notFound();

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <Image
          src={guide.heroImage.url}
          alt={guide.heroImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="gradient-hero absolute inset-0" />
        <ImageAttribution
          photographer={guide.heroImage.photographer}
          className="absolute bottom-4 right-4 z-10"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-white transition-colors">
              Guides
            </Link>
            <span>/</span>
            <span className="text-white/80">{guide.title}</span>
          </nav>

          <div className="flex gap-2 mb-4">
            {guide.tags.map((tag) => (
              <Badge key={tag} variant="category">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 text-shadow-lg">
            {guide.title}
          </h1>

          <div className="flex items-center gap-4 text-white/70 text-sm">
            <span>By {guide.author}</span>
            <span>·</span>
            <span>{guide.readingTime}</span>
            <span>·</span>
            <span>{formatDate(guide.publishedDate)}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-monsoon-slate prose-a:text-sundarbans hover:prose-a:text-sundarbans-light prose-img:rounded-xl">
            {/* Render markdown content as HTML-safe paragraphs */}
            {guide.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-bold mt-8 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-monsoon-slate-light leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Related Destinations */}
        {guide.relatedDestinations.length > 0 && (
          <AnimatedSection animation="fadeUp">
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="font-display text-2xl font-bold text-monsoon-slate mb-6">
                Related Destinations
              </h2>
              <div className="flex flex-wrap gap-3">
                {guide.relatedDestinations.map((slug) => (
                  <Button key={slug} variant="secondary" size="sm" href={`/destinations/${slug}`}>
                    {slug
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')}
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </section>
    </article>
  );
}

import { notFound } from 'next/navigation';
import { getDestinationBySlug, getAllDestinations, getNearbyDestinations, getRelatedDestinations } from '@/lib/data';
import { generateDestinationMetadata } from '@/lib/seo';
import { DestinationHero } from '@/components/destinations/DestinationHero';
import { ImageGallery } from '@/components/destinations/ImageGallery';
import { TravelInfo } from '@/components/destinations/TravelInfo';
import { NearbyAttractions } from '@/components/destinations/NearbyAttractions';
import { RelatedDestinations } from '@/components/destinations/RelatedDestinations';
import { VideoPlayerSection } from '@/components/destinations/VideoPlayerSection';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  return generateDestinationMetadata(destination);
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  
  if (!destination) {
    notFound();
  }

  const nearbyDestinations = await getNearbyDestinations(destination.nearbyAttractions);
  const relatedDestinations = await getRelatedDestinations(destination.slug);

  // Basic JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: destination.name,
    description: destination.shortDescription,
    image: [destination.heroImage.url],
    address: {
      '@type': 'PostalAddress',
      addressLocality: destination.district,
      addressRegion: destination.division,
      addressCountry: 'BD'
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 dark:bg-monsoon-slate pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <DestinationHero destination={destination} />
      
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <h2 className="font-display text-3xl font-bold text-monsoon-slate dark:text-river-mist">
                About {destination.name}
              </h2>
              <p className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                {destination.detailedDescription}
              </p>
            </div>
            
            <ImageGallery images={destination.gallery} />
            <VideoPlayerSection videoUrl={destination.youtubeVideoUrl} destinationName={destination.name} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <TravelInfo destination={destination} />
            </div>
          </div>
        </div>
      </div>
      
      <NearbyAttractions destinations={nearbyDestinations} />
      <RelatedDestinations destinations={relatedDestinations} />
    </main>
  );
}

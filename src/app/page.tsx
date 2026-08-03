import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { CategoryExplorer } from '@/components/home/CategoryExplorer';
import { InteractiveMap } from '@/components/home/InteractiveMap';
import { TravelGuides } from '@/components/home/TravelGuides';
import { SeasonalPicks } from '@/components/home/SeasonalPicks';
import { FaqSection } from '@/components/home/FaqSection';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { 
  getFeaturedDestinations, 
  getAllCategories, 
  getAllDivisions, 
  getAllDestinations, 
  getAllGuides, 
  getSeasonalDestinations 
} from '@/lib/data';
import { getCurrentSeason } from '@/lib/utils';
import { generateWebsiteJsonLd, generateOrganizationJsonLd, generateItemListJsonLd } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bangladesh Tourism — Travel Guide & Tour Destinations',
  description:
    'Discover Bangladesh Tourism: Cox\'s Bazar beach, Sundarbans mangrove forest, Sylhet tea gardens, and top tour destinations across Bangladesh.',
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default async function HomePage() {
  // Fetch all required data in parallel
  const [
    featuredDestinations,
    categories,
    divisions,
    allDestinations,
    guides,
    seasonalDestinations
  ] = await Promise.all([
    getFeaturedDestinations(),
    getAllCategories(),
    getAllDivisions(),
    getAllDestinations(),
    getAllGuides(),
    getSeasonalDestinations()
  ]);

  const currentSeason = getCurrentSeason();
  const websiteSchema = generateWebsiteJsonLd();
  const organizationSchema = generateOrganizationJsonLd();
  const destinationsSchema = generateItemListJsonLd(
    featuredDestinations.map((d) => ({
      name: d.name,
      url: `${SITE_CONFIG.url}/destinations/${d.slug}`,
      image: d.heroImage.url,
      description: d.shortDescription,
    })),
    'Top Bangladesh Tourism & Tour Destinations'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationsSchema) }}
      />
      <main className="flex min-h-screen flex-col items-center justify-between w-full">
        <HeroSection destinations={allDestinations} />
        
        <AnimatedSection>
          <FeaturedDestinations destinations={featuredDestinations} />
        </AnimatedSection>
        
        <AnimatedSection>
          <CategoryExplorer categories={categories} />
        </AnimatedSection>
        
        <AnimatedSection>
          <InteractiveMap divisions={divisions} destinations={allDestinations} />
        </AnimatedSection>
        
        <AnimatedSection>
          <SeasonalPicks destinations={seasonalDestinations} currentSeason={currentSeason} />
        </AnimatedSection>
        
        <AnimatedSection>
          <TravelGuides guides={guides} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <FaqSection />
        </AnimatedSection>
      </main>
    </>
  );
}

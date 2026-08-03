import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About — Beautiful Bangladesh',
  description:
    'Beautiful Bangladesh is a passion project dedicated to showcasing the natural beauty, rich culture, and heritage of Bangladesh to the world.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-monsoon py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            About Beautiful Bangladesh
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            A love letter to a land of rivers, resilience, and remarkable beauty
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <AnimatedSection animation="fadeUp">
          <div className="space-y-8 text-monsoon-slate-light text-lg leading-relaxed">
            <p>
              Beautiful Bangladesh was born from a simple belief: that one of the world&apos;s most
              naturally diverse and culturally rich countries deserves a platform that does justice
              to its splendor. From the endless golden sands of Cox&apos;s Bazar — the world&apos;s
              longest unbroken sea beach — to the ethereal silence of the Sundarbans mangrove
              forest, Bangladesh is a land that astonishes at every turn.
            </p>

            <p>
              This platform is a carefully curated guide designed to inspire both local and
              international travelers to explore Bangladesh&apos;s hidden gems and iconic
              landmarks. Every destination page tells a story, every photograph captures a moment,
              and every travel tip comes from genuine experience.
            </p>

            <h2 className="font-display text-3xl font-bold text-monsoon-slate pt-4">
              Our Mission
            </h2>

            <p>
              We believe travel transforms perspectives. Our mission is to present Bangladesh as
              the world-class destination it truly is — a country where ancient archaeological
              sites stand alongside vibrant cities, where emerald tea gardens cascade down misty
              hills, and where the warmth of its people leaves every visitor with stories to tell
              for a lifetime.
            </p>

            <h2 className="font-display text-3xl font-bold text-monsoon-slate pt-4">
              Photography
            </h2>

            <p>
              All photography on this platform is sourced from{' '}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sundarbans hover:text-sundarbans-light underline transition-colors"
              >
                Unsplash
              </a>
              , a platform for freely-usable images. We are deeply grateful to the photographers
              who share their work with the world. Every image on Beautiful Bangladesh includes
              proper attribution to the photographer who captured it.
            </p>

            <div className="pt-8 text-center">
              <Button variant="primary" size="lg" href="/destinations">
                Start Exploring
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

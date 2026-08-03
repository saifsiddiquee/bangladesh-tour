'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/lib/types';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  if (!destinations?.length) return null;

  return (
    <section className="py-20 w-full bg-river-mist overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-monsoon-slate mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg text-monsoon-slate/70 font-body">
            Where beauty meets adventure
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          {destinations.slice(0, 5).map((destination, index) => {
            const isLarge = index === 0;
            return (
              <motion.div
                key={destination.id}
                variants={staggerItem}
                className={`group relative overflow-hidden rounded-2xl ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <Link href={`/destinations/${destination.slug}`} className="block w-full h-full">
                  <div className="absolute inset-0 image-zoom-container">
                    <Image
                      src={destination.heroImage.url}
                      alt={destination.heroImage.alt}
                      fill
                      sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-monsoon-slate/90 via-monsoon-slate/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="mb-3">
                      <Badge variant="category" className="bg-paddy-gold text-monsoon-slate border-none font-medium">
                        {destination.category[0]}
                      </Badge>
                    </div>
                    <h3 className={`font-display text-white mb-2 ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      {destination.name}
                    </h3>
                    <p className="text-river-mist line-clamp-2 font-body text-sm">
                      {destination.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Destination } from '@/lib/types';
import { fadeUp } from '@/lib/animations';
import { MapPin, Clock, Calendar, Ticket, ChevronRight } from 'lucide-react';

interface DestinationHeroProps {
  destination: Destination;
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainImage = destination.heroImage;

  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-monsoon-slate">
      {/* Parallax Image */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <Image
          src={mainImage?.url || '/placeholder.jpg'}
          alt={mainImage?.alt || destination.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-monsoon-slate via-monsoon-slate/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-12 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl text-white"
          >
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center text-sm font-medium text-white/80">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="mx-2 h-4 w-4" />
              <Link href="/destinations" className="hover:text-white">Destinations</Link>
              <ChevronRight className="mx-2 h-4 w-4" />
              <span className="text-white">{destination.name}</span>
            </nav>

            <h1 className="font-display mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-shadow-lg">
              {destination.name}
            </h1>
            
            <p className="mb-8 max-w-2xl text-lg text-white/90 text-shadow">
              {destination.shortDescription}
            </p>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-md border border-white/10">
                <MapPin className="mr-2 h-4 w-4 text-paddy-gold" />
                <span className="text-sm font-medium">{destination.district}, {destination.division}</span>
              </div>
              <div className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-md border border-white/10">
                <Clock className="mr-2 h-4 w-4 text-paddy-gold" />
                <span className="text-sm font-medium">{destination.recommendedDuration}</span>
              </div>
              <div className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-md border border-white/10">
                <Calendar className="mr-2 h-4 w-4 text-paddy-gold" />
                <span className="text-sm font-medium">{destination.bestTimeToVisit}</span>
              </div>
              <div className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-md border border-white/10">
                <Ticket className="mr-2 h-4 w-4 text-paddy-gold" />
                <span className="text-sm font-medium">{destination.entryFee}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Photographer Attribution */}
      {mainImage?.photographer && (
        <div className="absolute bottom-4 right-4 text-xs text-white/60">
          Photo by {mainImage.photographer.name}
        </div>
      )}
    </div>
  );
}

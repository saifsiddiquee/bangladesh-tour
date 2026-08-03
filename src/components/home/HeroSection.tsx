'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Destination } from '@/lib/types';
import { heroTextReveal, heroWord, heroSubtitle, heroCta } from '@/lib/animations';
import { ImageAttribution } from '@/components/ui/ImageAttribution';

interface HeroSectionProps {
  destinations: Destination[];
}

export function HeroSection({ destinations }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroDestinations = destinations.slice(0, 4);

  useEffect(() => {
    if (heroDestinations.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroDestinations.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroDestinations.length]);

  if (!heroDestinations.length) return null;

  const currentDestination = heroDestinations[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-monsoon-slate">
      {/* Background Images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 z-10 gradient-hero" />
          <div className="relative w-full h-full animate-ken-burns">
            <Image
              src={currentDestination.heroImage.url}
              alt={currentDestination.heroImage.alt}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {currentDestination.heroImage.photographer && (
            <div className="absolute bottom-12 right-6 z-20">
              <ImageAttribution
                photographer={currentDestination.heroImage.photographer}
                light
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={heroTextReveal}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          <motion.span
            variants={heroSubtitle}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-paddy-gold md:text-base font-body"
          >
            Official Travel & Tourism Guide
          </motion.span>
          
          <h1 className="mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl font-display text-shadow-lg">
            {['Bangladesh', 'Tourism'].map((word, i) => (
              <motion.span key={i} variants={heroWord}>
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={heroSubtitle}
            className="mb-10 max-w-2xl text-lg text-river-mist md:text-xl lg:text-2xl font-body text-shadow"
          >
            Your ultimate guide for Bangladesh travel, tour packages, pristine beaches, ancient UNESCO heritage, and nature safaris.
          </motion.p>

          <motion.div variants={heroCta} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/destinations"
              className="inline-block rounded-full bg-sundarbans px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-opacity-90 hover:scale-105 focus-ring shadow-lg font-body"
            >
              Explore Tour Destinations
            </Link>
            <Link
              href="/guides"
              className="inline-block rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-white/20 hover:scale-105 focus-ring shadow-lg font-body"
            >
              Bangladesh Travel Guide
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-river-mist font-body">Scroll</span>
          <div className="h-6 w-4 rounded-full border-2 border-river-mist p-0.5 animate-scroll-hint">
            <div className="h-1.5 w-1.5 rounded-full bg-river-mist" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

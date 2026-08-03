'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface CategoryExplorerProps {
  categories: Category[];
}

export function CategoryExplorer({ categories }: CategoryExplorerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!categories?.length) return null;

  return (
    <section className="py-20 w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-monsoon-slate mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-monsoon-slate/70 font-body">
              Find your perfect kind of adventure
            </p>
          </div>
          
          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-monsoon-slate/20 flex items-center justify-center text-monsoon-slate hover:bg-monsoon-slate hover:text-white transition-colors focus-ring"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-monsoon-slate/20 flex items-center justify-center text-monsoon-slate hover:bg-monsoon-slate hover:text-white transition-colors focus-ring"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <motion.div 
            ref={scrollContainerRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2 -my-2"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={staggerItem} className="snap-start shrink-0">
                <Link 
                  href={`/categories/${category.slug}`}
                  className="group block relative w-[240px] sm:w-[280px] h-[340px] sm:h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-monsoon-slate">
                    {category.heroImage?.url && (
                      <Image
                        src={category.heroImage.url}
                        alt={category.name}
                        fill
                        sizes="280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-monsoon-slate via-monsoon-slate/40 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-4xl mb-4 block drop-shadow-md">{category.icon || '📍'}</span>
                    <h3 className="font-display text-white text-2xl mb-1">{category.name}</h3>
                    <p className="text-river-mist font-body text-sm font-medium">
                      {category.destinationCount} Destinations
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

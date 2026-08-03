'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { ImageWithAttribution } from '@/lib/types';
import { staggerContainer, staggerItem, lightboxOverlay, lightboxImage } from '@/lib/animations';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface ImageGalleryProps {
  images: ImageWithAttribution[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const showNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  }, [selectedIndex, images.length]);
  
  const showPrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  if (!images || images.length === 0) return null;

  return (
    <div className="my-12">
      <h2 className="font-display mb-6 text-2xl font-bold text-monsoon-slate dark:text-river-mist">Gallery</h2>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        {images.map((image, index) => (
          <motion.div
            key={`${image.url}-${index}`}
            variants={staggerItem}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            variants={lightboxOverlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          >
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <motion.div
              key={selectedIndex}
              variants={lightboxImage}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex h-[85vh] w-[90vw] flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full">
                <Image
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              
              <div className="mt-4 flex w-full items-center justify-between px-4 text-white">
                <p className="text-sm font-medium">{images[selectedIndex].alt}</p>
                {images[selectedIndex].photographer && (
                  <div className="flex items-center text-xs text-white/70">
                    <Camera className="mr-1.5 h-3 w-3" />
                    {images[selectedIndex].photographer.name}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

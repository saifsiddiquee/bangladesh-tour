'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ImageAttribution } from './ImageAttribution';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  priority?: boolean;
  photographer?: {
    name: string;
    profileUrl: string;
  };
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
  priority = false,
  photographer,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <div ref={ref} className={cn('relative overflow-hidden w-full h-full bg-monsoon-slate/10', className)}>
      <motion.div style={{ y, height: '140%', top: '-20%', left: 0, right: 0, position: 'absolute' }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      {photographer && <ImageAttribution photographer={photographer} />}
    </div>
  );
}

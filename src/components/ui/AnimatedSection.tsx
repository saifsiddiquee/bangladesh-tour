'use client';
import { motion } from 'framer-motion';
import { getVariant } from '@/lib/animations';
import type { AnimationVariant } from '@/lib/types';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationVariant;
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = 'w-full',
}: AnimatedSectionProps) {
  const variant = getVariant(animation);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variant}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

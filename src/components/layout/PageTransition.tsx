'use client';
import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import React from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  // Use pageTransition from lib/animations if available, otherwise fallback
  const variants = pageTransition || {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

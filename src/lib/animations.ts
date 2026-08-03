// =============================================================================
// Beautiful Bangladesh — Animation Presets
// =============================================================================
// Shared Framer Motion variants and GSAP configurations.
// All animations respect prefers-reduced-motion.

import type { Variants, Transition } from 'framer-motion';

// =============================================================================
// Transition Presets
// =============================================================================

export const easeOut: Transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const easeInOut: Transition = {
  duration: 0.5,
  ease: [0.42, 0, 0.58, 1],
};

export const spring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

// =============================================================================
// Framer Motion Variant Presets
// =============================================================================

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// =============================================================================
// Hero-specific Animations
// =============================================================================

export const heroTextReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export const heroWord: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: 'easeOut',
    },
  },
};

export const heroCta: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 1.1,
      ease: 'easeOut',
    },
  },
};

// =============================================================================
// Card Hover Animations
// =============================================================================

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  hover: {
    y: -6,
    boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const imageZoom = {
  rest: { scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.08, transition: { duration: 0.6, ease: 'easeOut' } },
};

// =============================================================================
// Page Transition
// =============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// =============================================================================
// Gallery Animations
// =============================================================================

export const galleryReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export const lightboxOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const lightboxImage: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25 },
  },
};

// =============================================================================
// Map Animations
// =============================================================================

export const mapPinBounce: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  }),
};

export const mapTooltip: Variants = {
  hidden: { opacity: 0, y: 5, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// =============================================================================
// Scroll Progress (River Flow)
// =============================================================================

export const riverFlowPath: Variants = {
  hidden: { pathLength: 0, opacity: 0.3 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
};

// =============================================================================
// Utility: Variant Selector
// =============================================================================

const variantMap: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  fadeDown,
  slideLeft,
  slideRight,
  scaleUp,
  stagger: staggerContainer,
};

export function getVariant(name: string): Variants {
  return variantMap[name] ?? fadeUp;
}

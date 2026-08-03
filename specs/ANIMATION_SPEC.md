# Beautiful Bangladesh - Animation System

This document outlines the animation philosophy and technical specifications using Framer Motion and GSAP for the Beautiful Bangladesh platform.

## Animation Philosophy
- **Purposeful Motion:** Animations should guide the user's attention and provide feedback, never acting as decorative noise.
- **Brand Alignment:** Flowing, natural movements reminiscent of Bangladesh's rivers and organic landscapes.

## Performance Budgets
- Target: 60fps at all times.
- Limit the use of `will-change`.
- Prefer animating `transform` and `opacity` over layout-affecting properties (like `width`, `height`, `margin`).

## Reduced Motion
Respect user preferences for reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Framer Motion Variant Presets

Standard variants to be used across the application:

```typescript
import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5 } 
  }
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const heroReveal: Variants = {
  // Complex multi-step animation for hero text
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

## GSAP ScrollTrigger Configurations

Used for scroll-linked animations and complex timelines.

### Parallax Effect
```javascript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Parallax depths
// Background: 0.3
// Midground: 0.6
// Foreground: 1.0

gsap.to('.parallax-bg', {
  yPercent: 30, // Background moves slower
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});
```

### River Progress Tracking
A path animation that acts as a scroll progress indicator.
```javascript
gsap.to('#river-path', {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
  }
});
```

## Page Transitions
- **Exit:** Fade out + slight slide down (Duration: 0.3s)
- **Enter:** Fade in + slight slide up (Duration: 0.3s)

## Micro-Interactions
- **Button Hover:** Scale `1.02`, Duration `150ms`, Easing `ease-out`.
- **Card Hover:** TranslateY `-4px`, Increase Box Shadow, Duration `200ms`, Easing `ease-out`.
- **Link Hover:** Underline slide-in from left to right.

## Specific Animation Sequences
- **Hero Cinematic:** 
  - Text Reveal: Word by word with an 80ms delay stagger.
  - Image Ken-Burns: Slow, continuous zoom-in over 15 seconds.
  - Overlay: Subtle gradient pulse.
- **Gallery Animations:**
  - Image Reveal: CSS clip-path wipe effect.
  - Lightbox Enter: Image scales up from its thumbnail bounding box position.
- **Interactive Map:**
  - Division Highlight: SVG fill color transition over 200ms on hover.
  - Pin Drop: Map pins bounce slightly on initial appearance.
  - Tooltip: Fade-in on hover.
```

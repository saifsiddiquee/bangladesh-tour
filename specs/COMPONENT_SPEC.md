# Beautiful Bangladesh - Component Specifications

This document outlines the API specifications for the UI components used throughout the application. 

## Layout Components

### Header
- **Props:** None (uses internal scroll state).
- **Description:** Main navigation bar.
- **Behavior:** Transparent initially, becomes solid on scroll with a glassmorphism backdrop.
- **Server/Client:** `CLIENT` (due to scroll state tracking).
- **Accessibility:** Ensure `nav` tag is used and links are keyboard navigable.

### Footer
- **Props:** None (fetches categories/divisions internally or accepts them as props from a server layout).
- **Description:** Global footer with links, categories, and divisions.
- **Server/Client:** `SERVER`.

### MobileNav
- **Props:** `interface MobileNavProps { isOpen: boolean; onClose: () => void; }`
- **Description:** Off-canvas navigation menu for mobile devices.
- **Behavior:** Slide-in drawer with a semi-transparent backdrop.
- **Server/Client:** `CLIENT`.
- **Accessibility:** Manage focus trap and `aria-hidden` when open.

### PageTransition
- **Props:** `interface PageTransitionProps { children: React.ReactNode; }`
- **Description:** Wraps page content with Framer Motion's `AnimatePresence` for route transitions.
- **Server/Client:** `CLIENT`.

---

## Home Components

### HeroSection
- **Props:** `interface HeroSectionProps { destinations: Destination[]; }`
- **Description:** Auto-rotating image carousel showcasing top destinations.
- **Behavior:** Features a parallax background effect and cinematic text reveal.
- **Server/Client:** `CLIENT`.

### FeaturedDestinations
- **Props:** `interface FeaturedDestinationsProps { destinations: Destination[]; }`
- **Description:** Magazine-style asymmetric grid highlighting key spots.
- **Server/Client:** `SERVER` with client card wrappers (for hover/animation).

### InteractiveMap
- **Props:** `interface InteractiveMapProps { divisions: Division[]; destinations: Destination[]; }`
- **Description:** SVG map of Bangladesh with hover effects and clickable regions.
- **Server/Client:** `CLIENT`.

### CategoryExplorer
- **Props:** `interface CategoryExplorerProps { categories: Category[]; }`
- **Description:** Horizontal scrollable list with CSS scroll snap.
- **Server/Client:** `CLIENT`.

### SeasonalPicks
- **Props:** `interface SeasonalPicksProps { destinations: Destination[]; }`
- **Description:** Recommends destinations based on the auto-detected current season.
- **Server/Client:** `SERVER`.

### TravelGuides
- **Props:** `interface TravelGuidesProps { guides: Guide[]; }`
- **Description:** Editorial-style card grid for blog posts and travel guides.
- **Server/Client:** `SERVER`.

---

## Destination Components

### DestinationCard
- **Props:** `interface DestinationCardProps { destination: Destination; variant: 'default' | 'featured' | 'compact'; }`
- **Description:** Reusable card component for destinations.
- **Server/Client:** `SERVER`.

### DestinationHero
- **Props:** `interface DestinationHeroProps { destination: Destination; }`
- **Description:** Full-width hero banner with parallax depth and large typography.
- **Server/Client:** `CLIENT`.

### ImageGallery
- **Props:** `interface ImageGalleryProps { images: ImageWithAttribution[]; }`
- **Description:** Masonry grid of destination photos with an integrated lightbox.
- **Server/Client:** `CLIENT`.

### TravelInfo
- **Props:** `interface TravelInfoProps { destination: Destination; }`
- **Description:** Structured information panels (entry fee, best time, transport).
- **Server/Client:** `SERVER`.

### NearbyAttractions
- **Props:** `interface NearbyAttractionsProps { destinations: Destination[]; }`
- **Description:** Horizontal scrolling card list of nearby spots.
- **Server/Client:** `SERVER`.

### RelatedDestinations
- **Props:** `interface RelatedDestinationsProps { destinations: Destination[]; }`
- **Description:** Grid of related destination cards.
- **Server/Client:** `SERVER`.

---

## Search Components

### SearchBar
- **Props:** `interface SearchBarProps { defaultQuery?: string; }`
- **Description:** Command palette-style search invoked via `Cmd+K` or click.
- **Server/Client:** `CLIENT`.

### SearchFilters
- **Props:** `interface SearchFiltersProps { categories: Category[]; divisions: Division[]; activeFilters: Record<string, any>; onChange: (filters: any) => void; }`
- **Description:** Filter panel for refining search results.
- **Server/Client:** `CLIENT`.

### SearchResults
- **Props:** `interface SearchResultsProps { results: Destination[]; isLoading: boolean; }`
- **Description:** Grid displaying search results or a loading state.
- **Server/Client:** `CLIENT`.

---

## UI Primitives

### AnimatedSection
- **Props:** `interface AnimatedSectionProps { children: React.ReactNode; animation: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'stagger'; delay?: number; className?: string; }`
- **Description:** Wrapper utilizing IntersectionObserver and Framer Motion.
- **Server/Client:** `CLIENT`.

### ParallaxImage
- **Props:** `interface ParallaxImageProps { src: string; alt: string; speed?: number; className?: string; photographer?: ImageWithAttribution['photographer']; }`
- **Description:** Image with scroll-driven parallax effect using GSAP.
- **Server/Client:** `CLIENT`.

### Badge
- **Props:** `interface BadgeProps { children: React.ReactNode; variant: 'default' | 'category' | 'season' | 'info'; }`
- **Description:** Small label element.
- **Server/Client:** `SERVER`.

### Button
- **Props:** `interface ButtonProps { children: React.ReactNode; variant: 'primary' | 'secondary' | 'ghost'; size: 'sm' | 'md' | 'lg'; href?: string; onClick?: () => void; }`
- **Description:** Standard button component. Renders as an `a` tag if `href` is provided.
- **Server/Client:** Depends (Client if `onClick` provided, otherwise Server).

### Card
- **Props:** `interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; }`
- **Description:** Base container with theme borders and shadows.
- **Server/Client:** `SERVER`.

### ImageAttribution
- **Props:** `interface ImageAttributionProps { photographer: { name: string; profileUrl: string; }; }`
- **Description:** Small overlay credit for Unsplash photos.
- **Server/Client:** `SERVER`.

### RiverProgress
- **Props:** None
- **Description:** Signature SVG path progress indicator mimicking river flow.
- **Server/Client:** `CLIENT`.

### Skeleton
- **Props:** `interface SkeletonProps { className?: string; variant: 'text' | 'image' | 'card'; }`
- **Description:** Loading placeholder.
- **Server/Client:** `SERVER`.

### WeatherBadge
- **Props:** `interface WeatherBadgeProps { weather: string; season: 'summer' | 'monsoon' | 'winter'; }`
- **Description:** Badge showing weather icon and description.
- **Server/Client:** `SERVER`.

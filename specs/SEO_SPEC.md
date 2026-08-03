# SEO & Structured Data Specification

## Next.js Metadata API
- Use the built-in Metadata API (`generateMetadata` for dynamic pages, `metadata` export for static pages).
- **Template**: Use a consistent title template in the root layout.
```typescript
export const metadata: Metadata = {
  title: {
    template: '%s | Beautiful Bangladesh',
    default: 'Beautiful Bangladesh | Discover the Unseen Beauty',
  },
  description: 'Explore the natural beauty, heritage, and culture of Bangladesh.',
};
```

## Open Graph & Twitter Cards
- Configure Open Graph (OG) and Twitter Card metadata globally and override per page.
- **OG Images**: Standardize on 1200x630 resolution for optimal sharing. Provide `alt` text.
- **Locale**: Set to `en_US` (or appropriate localized value).
- **Twitter**: Use `card: 'summary_large_image'`.

## Schema.org Structured Data
Implement JSON-LD for rich snippets using standard Schema.org types:
- **`TouristDestination`**: For individual destination pages (`/destinations/[slug]`).
- **`BreadcrumbList`**: For navigation paths, aiding search engines in understanding site structure.
- **`WebSite`**: With `SearchAction` on the homepage to enable site-search boxes in search results.
- **`ImageGallery`**: For pages heavily featuring photos.
- **`TouristTrip`**: For curated guides (`/guides/[slug]`).

### JSON-LD Utility Signature
Create a utility function to inject JSON-LD safely:
```typescript
export function generateStructuredData<T>(data: T): string {
  return JSON.stringify(data);
}
// Usage in component:
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateStructuredData(schemaData) }} />
```

## Sitemap Generation
- Generate `sitemap.xml` dynamically using `app/sitemap.ts`.
- Ensure all static destinations, categories, and guide routes are included.
- Assign appropriate priority levels (e.g., Homepage: 1.0, Categories: 0.8, Destinations: 0.7).

## Robots.txt
- Use `app/robots.ts` to generate `robots.txt`.
- Allow all crawlers by default (`User-agent: *`, `Allow: /`).
- Explicitly reference the absolute URL of the sitemap.

## Canonical URLs
- Define canonical URLs for every page to prevent duplicate content issues, especially when search parameters might alter the URL without changing core content.

## Image SEO
- **Alt Text**: Every `next/image` MUST have descriptive, keyword-rich (but not stuffed) `alt` text.
- **Sizing**: Provide correct `width` and `height` to prevent Layout Shifts.
- **Lazy Loading**: `next/image` handles this by default. Ensure above-the-fold images use `priority={true}` to prevent delayed LCP.

## Core Web Vitals Targets
Optimize the application to consistently hit these targets:
- **LCP (Largest Contentful Paint)**: < 2.5s (Critical for hero images).
- **FID (First Input Delay) / INP (Interaction to Next Paint)**: < 100ms.
- **CLS (Cumulative Layout Shift)**: < 0.1 (Ensure no un-sized images or dynamic content shifts the layout).

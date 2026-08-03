// =============================================================================
// Beautiful Bangladesh — SEO Utilities
// =============================================================================

import type { Metadata } from 'next';
import type { Destination, Guide } from './types';
import { SITE_CONFIG } from './constants';

// =============================================================================
// Base Metadata
// =============================================================================

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Bangladesh Tourism — Official Travel Guide, Tours & Destinations',
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    'Discover Bangladesh Tourism: explore Cox\'s Bazar, Sundarbans, Sylhet tea gardens, top tour packages, and travel guides for an unforgettable Bangladesh tour.',
  keywords: [
    'bangladesh tourism',
    'bangladesh travel',
    'bangladesh tour',
    'bangladesh travel guide',
    'bangladesh tourism board',
    'tourist places in bangladesh',
    'cox\'s bazar tour',
    'sundarbans tour package',
    'sylhet travel guide',
    'bangladesh heritage tours',
    'visit bangladesh',
  ],
  authors: [{ name: 'Beautiful Bangladesh Team' }],
  creator: 'Beautiful Bangladesh',
  publisher: 'Beautiful Bangladesh',
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Bangladesh Tourism — Travel Guide & Tour Destinations',
    description:
      'Plan your ultimate trip to Bangladesh with our official travel guide. Discover top destinations, tour itineraries, and insider tips.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Bangladesh Tourism — Beautiful Bangladesh Travel Guide & Tours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangladesh Tourism — Travel Guide & Tour Destinations',
    description:
      'Plan your ultimate trip to Bangladesh with our official travel guide. Discover top destinations, tour itineraries, and insider tips.',
    images: ['https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'google984523b937f4a4a9',
  },
};

// =============================================================================
// Dynamic Metadata Generators
// =============================================================================

export function generateDestinationMetadata(destination: Destination): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}/destinations/${destination.slug}`;
  return {
    title: `${destination.name} Tour & Travel Guide | Bangladesh Tourism`,
    description: destination.seo.description,
    keywords: destination.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${destination.name} — Bangladesh Travel & Tour Destination`,
      description: destination.seo.description,
      url: canonicalUrl,
      images: [
        {
          url: destination.heroImage.url,
          width: 1200,
          height: 630,
          alt: destination.heroImage.alt,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${destination.name} Tour Guide — Beautiful Bangladesh`,
      description: destination.seo.description,
      images: [destination.heroImage.url],
    },
  };
}

export function generateGuideMetadata(guide: Guide): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}/guides/${guide.slug}`;
  return {
    title: `${guide.title} | Bangladesh Travel Guide`,
    description: guide.seo.description,
    keywords: guide.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.seo.title,
      description: guide.seo.description,
      url: canonicalUrl,
      images: [
        {
          url: guide.heroImage.url,
          width: 1200,
          height: 630,
          alt: guide.heroImage.alt,
        },
      ],
      type: 'article',
    },
  };
}

// =============================================================================
// Schema.org Structured Data (JSON-LD)
// =============================================================================

export function generateOrganizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/favicon.ico`,
    description: 'Official Travel Guide and Tourism Information Portal for Bangladesh.',
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    sameAs: [
      'https://facebook.com/beautifulbangladesh',
      'https://twitter.com/beautifulbd',
      'https://instagram.com/beautifulbangladesh',
    ],
  };
}

export function generateFaqJsonLd(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateItemListJsonLd(
  items: Array<{ name: string; url: string; image?: string; description?: string }>,
  title: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      image: item.image,
      description: item.description,
    })),
  };
}

export function generateDestinationJsonLd(destination: Destination): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.shortDescription,
    url: `${SITE_CONFIG.url}/destinations/${destination.slug}`,
    image: destination.heroImage.url,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: destination.coordinates.lat,
      longitude: destination.coordinates.lng,
    },
    touristType: destination.activities,
    address: {
      '@type': 'PostalAddress',
      addressRegion: destination.district,
      addressCountry: 'BD',
    },
    openingHours: destination.openingHours,
    isAccessibleForFree: destination.entryFee === 'Free',
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebsiteJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

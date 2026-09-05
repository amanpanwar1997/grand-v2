/**
 * 🎯 MASTER SEO SYSTEM - SINGLE SOURCE OF TRUTH
 *
 * Version: 4.1 - REAL BUSINESS DATA
 *
 * IMPORTANT:
 * Business identity data in this file must stay consistent with:
 * - Google Business Profile
 * - Website footer/contact page
 * - Organization schema
 * - LocalBusiness schema
 *
 * Primary Location:
 * Vijay Nagar, Indore, Madhya Pradesh 452010
 */

import { useLocation } from 'react-router';
import { useMemo } from 'react';
import { COMPLETE_SEO_DATA } from './seo-database-complete';

// ============================================================================
// SITE-WIDE CONSTANTS
// ============================================================================

export const SITE_CONFIG = {
  /**
   * Short public-facing brand name.
   * Google currently recognizes the entity as "Inchtomilez".
   */
  name: 'Inchtomilez',

  /**
   * Full business/agency name.
   */
  fullName:
    'Inchtomilez Digital Marketing And Advertising Agency | Indore',

  url: 'https://www.inchtomilez.com',

  logo: 'https://www.inchtomilez.com/logo.png',

  ogImage: 'https://www.inchtomilez.com/og-image.jpg',

  /**
   * Primary GBP phone number.
   */
  phone: '+91-9009970709',

  /**
   * Primary website contact email.
   */
  email: 'inchtomilez@gmail.com',

  /**
   * GBP states that Inchtomilez was founded in 2017.
   */
  foundingDate: '2017',

  /**
   * Exact business address aligned with Google Business Profile.
   */
  address: {
    street:
      '7th Floor Block A, Metro Tower, Sch No 54, Vijay Nagar, Scheme 54 PU4',
    city: 'Indore',
    state: 'Madhya Pradesh',
    postal: '452010',
    country: 'India',
    countryCode: 'IN'
  },

  /**
   * Keep only real official social profiles here.
   * We can verify these individually in a later SEO step.
   */
  social: {
    facebook: 'https://facebook.com/inchtomilez',
    twitter: 'https://twitter.com/inchtomilez',
    linkedin: 'https://linkedin.com/company/inchtomilez',
    instagram: 'https://instagram.com/inchtomilez'
  }
} as const;

// ============================================================================
// WEBSITE / SITELINKS SCHEMA
// ============================================================================

/**
 * Existing export name is intentionally preserved so other files importing
 * SITELINKS_SEARCH_BOX do not break.
 */
export const SITELINKS_SEARCH_BOX = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.url}/#website`,
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.fullName,
  url: SITE_CONFIG.url,

  /**
   * NOTE:
   * We are intentionally NOT adding a SearchAction here until we verify that
   * https://www.inchtomilez.com/search?q= actually works as a public search
   * results page.
   */
  publisher: {
    '@id': `${SITE_CONFIG.url}/#organization`
  }
};

// ============================================================================
// ORGANIZATION SCHEMA
// ============================================================================

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.url}/#organization`,

  name: SITE_CONFIG.name,

  legalName: SITE_CONFIG.fullName,

  alternateName: [
    'Inchtomilez',
    'Inchtomilez Digital Marketing And Advertising Agency',
    'Inchtomilez Digital Marketing Agency Indore'
  ],

  url: SITE_CONFIG.url,

  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_CONFIG.url}/#logo`,
    url: SITE_CONFIG.logo,
    contentUrl: SITE_CONFIG.logo
  },

  image: SITE_CONFIG.ogImage,

  description:
    'Inchtomilez is a digital marketing and advertising agency in Indore, Madhya Pradesh, providing SEO, Google Ads, social media marketing, branding, website development, advertising and performance marketing services.',

  foundingDate: SITE_CONFIG.foundingDate,

  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.postal,
    addressCountry: SITE_CONFIG.address.countryCode
  },

  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      contactType: 'customer service',
      email: SITE_CONFIG.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    }
  ],

  areaServed: [
    {
      '@type': 'City',
      name: 'Indore'
    },
    {
      '@type': 'State',
      name: 'Madhya Pradesh'
    },
    {
      '@type': 'Country',
      name: 'India'
    }
  ],

  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.twitter,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.instagram
  ]
};

// ============================================================================
// LOCAL BUSINESS SCHEMA
// ============================================================================

/**
 * This is especially important for the Indore SEO strategy.
 *
 * We intentionally omit:
 * - geo coordinates until exact office coordinates are verified
 * - openingHoursSpecification until full GBP hours are verified
 * - priceRange because it is not needed unless we have a real value
 */
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.url}/#localbusiness`,

  name: SITE_CONFIG.fullName,

  alternateName: SITE_CONFIG.name,

  url: SITE_CONFIG.url,

  telephone: SITE_CONFIG.phone,

  email: SITE_CONFIG.email,

  logo: SITE_CONFIG.logo,

  image: SITE_CONFIG.ogImage,

  description:
    'Inchtomilez Digital Marketing And Advertising Agency in Indore helps businesses grow through SEO, Google Ads, social media marketing, branding, website development, advertising and digital strategy.',

  foundingDate: SITE_CONFIG.foundingDate,

  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.postal,
    addressCountry: SITE_CONFIG.address.countryCode
  },

  areaServed: {
    '@type': 'City',
    name: 'Indore'
  },

  parentOrganization: {
    '@id': `${SITE_CONFIG.url}/#organization`
  },

  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.twitter,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.instagram
  ]
};

// ============================================================================
// BREADCRUMB GENERATOR
// ============================================================================

export function generateBreadcrumbs(path: string) {
  const segments = path.split('/').filter(Boolean);

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_CONFIG.url
    }
  ];

  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    const name = segment
      .split('-')
      .map(
        word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(' ');

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${SITE_CONFIG.url}${currentPath}`
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_CONFIG.url}${path}#breadcrumb`,
    itemListElement: items
  };
}

// ============================================================================
// SEO DATA
// ============================================================================

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  ogType?: string;
  ogImage?: string;
  schemaType?:
    | 'website'
    | 'article'
    | 'service'
    | 'faq'
    | 'organization';
  author?: string;
  datePublished?: string;
  dateModified?: string;
  category?: string;
}

export const SEO_DATABASE: Record<string, SEOData> =
  COMPLETE_SEO_DATA;

// ============================================================================
// ARTICLE SCHEMA
// ============================================================================

export function generateArticleSchema(
  seoData: SEOData,
  path: string
) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',

    headline: seoData.h1,

    description: seoData.description,

    image:
      seoData.ogImage ||
      SITE_CONFIG.ogImage,

    author: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url
    },

    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo
      }
    },

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}${path}`
    }
  };

  /**
   * Do not fabricate publication dates.
   * Only output dates when real dates exist in SEO data.
   */
  if (seoData.datePublished) {
    schema.datePublished =
      seoData.datePublished;
  }

  if (seoData.dateModified) {
    schema.dateModified =
      seoData.dateModified;
  }

  return schema;
}

// ============================================================================
// SERVICE SCHEMA
// ============================================================================

export function generateServiceSchema(
  seoData: SEOData,
  path: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',

    '@id':
      `${SITE_CONFIG.url}${path}#service`,

    name: seoData.h1,

    description: seoData.description,

    url: `${SITE_CONFIG.url}${path}`,

    provider: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url
    },

    areaServed: [
      {
        '@type': 'City',
        name: 'Indore'
      },
      {
        '@type': 'State',
        name: 'Madhya Pradesh'
      },
      {
        '@type': 'Country',
        name: 'India'
      }
    ],

    serviceType:
      seoData.category ||
      'Digital Marketing'
  };
}

// ============================================================================
// MASTER SEO HOOK
// ============================================================================

export function useSEO() {
  const location = useLocation();

  const path = location.pathname;

  return useMemo(() => {
    /**
     * Get SEO information for current URL.
     *
     * Existing fallback is retained so we do not risk
     * breaking routes during this first SEO phase.
     */
    const seoData =
      SEO_DATABASE[path] ||
      SEO_DATABASE['/'];

    /**
     * Canonical URL.
     */
    const canonicalUrl =
      path === '/'
        ? SITE_CONFIG.url
        : `${SITE_CONFIG.url}${path}`;

    /**
     * Breadcrumb schema.
     */
    const breadcrumbs =
      generateBreadcrumbs(path);

    /**
     * Schemas injected for current page.
     */
    const structuredData: any[] = [
      breadcrumbs
    ];

    // ------------------------------------------------------------------------
    // HOMEPAGE
    // ------------------------------------------------------------------------

    if (path === '/') {
      structuredData.push(
        SITELINKS_SEARCH_BOX
      );

      structuredData.push(
        ORGANIZATION_SCHEMA
      );

      structuredData.push(
        LOCAL_BUSINESS_SCHEMA
      );
    }

    // ------------------------------------------------------------------------
    // BLOG ARTICLES
    // ------------------------------------------------------------------------

    if (
      seoData.schemaType === 'article' ||
      path.startsWith('/blogs/')
    ) {
      const isBlogCategory =
        /^\/blogs\/(seo|ppc|social-media|content-marketing|branding|video|web-design|email-marketing|analytics|trends)$/.test(
          path
        );

      if (
        path !== '/blogs' &&
        !isBlogCategory
      ) {
        structuredData.push(
          generateArticleSchema(
            seoData,
            path
          )
        );
      }
    }

    // ------------------------------------------------------------------------
    // SERVICES
    // ------------------------------------------------------------------------

    else if (
      seoData.schemaType === 'service' ||
      path.startsWith('/services/')
    ) {
      structuredData.push(
        generateServiceSchema(
          seoData,
          path
        )
      );
    }

    // ------------------------------------------------------------------------
    // ORGANIZATION PAGES
    // ------------------------------------------------------------------------

    else if (
      seoData.schemaType ===
      'organization'
    ) {
      structuredData.push(
        ORGANIZATION_SCHEMA
      );
    }

    return {
      title: seoData.title,

      description:
        seoData.description,

      keywords:
        seoData.keywords.join(', '),

      h1: seoData.h1,

      canonicalUrl,

      ogImage:
        seoData.ogImage ||
        SITE_CONFIG.ogImage,

      ogType:
        seoData.ogType ||
        'website',

      structuredData,

      breadcrumbs
    };
  }, [path]);
}

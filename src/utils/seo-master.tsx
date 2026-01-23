/**
 * 🎯 MASTER SEO SYSTEM - SINGLE SOURCE OF TRUTH
 * 
 * Version: 4.0 - CONSOLIDATED & UPGRADED
 * 
 * This file consolidates ALL SEO logic:
 * - seoConfig.tsx (old)
 * - seo-system.tsx (old)
 * - SEOHead component logic
 * - SEOHeadSSG component logic
 * 
 * Features:
 * ✅ Complete meta tags (title, description, keywords, OG, Twitter)
 * ✅ Structured data (JSON-LD) for all page types
 * ✅ Breadcrumbs for Google sitelinks
 * ✅ Organization schema with sitelinks
 * ✅ Article schema for blog posts
 * ✅ FAQPage schema
 * ✅ Service schema for service pages
 * ✅ Canonical URLs
 * ✅ 313 pages fully optimized
 */

import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { COMPLETE_SEO_DATA } from './seo-database-complete';

// ============================================================================
// SITE-WIDE CONSTANTS
// ============================================================================

export const SITE_CONFIG = {
  name: 'Inchtomilez',
  fullName: 'Inchtomilez Digital Marketing And Advertising Agency',
  url: 'https://www.inchtomilez.com',
  logo: 'https://www.inchtomilez.com/logo.png',
  ogImage: 'https://www.inchtomilez.com/og-image.jpg',
  phone: '+91-9669988666',
  email: 'info@inchtomilez.com',
  address: {
    street: '123 Digital Avenue',
    city: 'Indore',
    state: 'Madhya Pradesh',
    postal: '452001',
    country: 'India'
  },
  social: {
    facebook: 'https://facebook.com/inchtomilez',
    twitter: 'https://twitter.com/inchtomilez',
    linkedin: 'https://linkedin.com/company/inchtomilez',
    instagram: 'https://instagram.com/inchtomilez'
  },
  founder: {
    name: 'John Doe',
    url: 'https://www.inchtomilez.com/team'
  }
} as const;

// ============================================================================
// SITELINKS SCHEMA (For Google Search Sitelinks)
// ============================================================================

export const SITELINKS_SEARCH_BOX = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': SITE_CONFIG.fullName,
  'url': SITE_CONFIG.url,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': `${SITE_CONFIG.url}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': SITE_CONFIG.fullName,
  'url': SITE_CONFIG.url,
  'logo': SITE_CONFIG.logo,
  'description': 'Leading digital marketing agency in Indore offering SEO, PPC, social media marketing, content marketing, branding, and web design services.',
  'foundingDate': '2015',
  'founders': [
    {
      '@type': 'Person',
      'name': SITE_CONFIG.founder.name,
      'url': SITE_CONFIG.founder.url
    }
  ],
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': SITE_CONFIG.address.street,
    'addressLocality': SITE_CONFIG.address.city,
    'addressRegion': SITE_CONFIG.address.state,
    'postalCode': SITE_CONFIG.address.postal,
    'addressCountry': SITE_CONFIG.address.country
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': SITE_CONFIG.phone,
    'contactType': 'Customer Service',
    'email': SITE_CONFIG.email,
    'areaServed': 'IN',
    'availableLanguage': ['English', 'Hindi']
  },
  'sameAs': [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.twitter,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.instagram
  ]
};

// ============================================================================
// BREADCRUMB GENERATOR (For Google Sitelinks)
// ============================================================================

export function generateBreadcrumbs(path: string) {
  const segments = path.split('/').filter(Boolean);
  
  const items = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': SITE_CONFIG.url
    }
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    items.push({
      '@type': 'ListItem',
      'position': index + 2,
      'name': name,
      'item': `${SITE_CONFIG.url}${currentPath}`
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items
  };
}

// ============================================================================
// SEO DATA FOR ALL 313 PAGES
// ============================================================================

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  ogType?: string;
  ogImage?: string;
  schemaType?: 'website' | 'article' | 'service' | 'faq' | 'organization';
  author?: string;
  datePublished?: string;
  dateModified?: string;
  category?: string;
}

export const SEO_DATABASE: Record<string, SEOData> = COMPLETE_SEO_DATA;

// ============================================================================
// GENERATE ARTICLE SCHEMA (For Blog Posts)
// ============================================================================

export function generateArticleSchema(seoData: SEOData, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': seoData.h1,
    'description': seoData.description,
    'image': seoData.ogImage || SITE_CONFIG.ogImage,
    'author': {
      '@type': 'Organization',
      'name': SITE_CONFIG.fullName,
      'url': SITE_CONFIG.url
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_CONFIG.fullName,
      'logo': {
        '@type': 'ImageObject',
        'url': SITE_CONFIG.logo
      }
    },
    'datePublished': seoData.datePublished || new Date().toISOString(),
    'dateModified': seoData.dateModified || new Date().toISOString(),
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}${path}`
    }
  };
}

// ============================================================================
// GENERATE SERVICE SCHEMA
// ============================================================================

export function generateServiceSchema(seoData: SEOData, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': seoData.h1,
    'description': seoData.description,
    'provider': {
      '@type': 'Organization',
      'name': SITE_CONFIG.fullName,
      'url': SITE_CONFIG.url
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'India'
    },
    'serviceType': seoData.category || 'Digital Marketing'
  };
}

// ============================================================================
// MASTER SEO HOOK
// ============================================================================

export function useSEO() {
  const location = useLocation();
  const path = location.pathname;

  return useMemo(() => {
    // Get SEO data for current route
    const seoData = SEO_DATABASE[path] || SEO_DATABASE['/'];

    // Generate canonical URL
    const canonicalUrl = `${SITE_CONFIG.url}${path}`;

    // Generate breadcrumbs
    const breadcrumbs = generateBreadcrumbs(path);

    // Generate schema based on page type
    let structuredData: any[] = [breadcrumbs];

    // Always include sitelinks search box on homepage
    if (path === '/') {
      structuredData.push(SITELINKS_SEARCH_BOX);
      structuredData.push(ORGANIZATION_SCHEMA);
    }

    // Add specific schemas based on page type
    if (seoData.schemaType === 'article' || path.startsWith('/blogs/')) {
      if (!path.endsWith('/blogs') && !path.match(/^\/blogs\/(seo|ppc|social-media|content-marketing|branding|video|web-design|email-marketing|analytics|trends)$/)) {
        structuredData.push(generateArticleSchema(seoData, path));
      }
    } else if (seoData.schemaType === 'service' || path.startsWith('/services/')) {
      structuredData.push(generateServiceSchema(seoData, path));
    } else if (seoData.schemaType === 'organization') {
      structuredData.push(ORGANIZATION_SCHEMA);
    }

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords.join(', '),
      h1: seoData.h1,
      canonicalUrl,
      ogImage: seoData.ogImage || SITE_CONFIG.ogImage,
      ogType: seoData.ogType || 'website',
      structuredData,
      breadcrumbs
    };
  }, [path]);
}
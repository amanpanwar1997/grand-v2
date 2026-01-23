/**
 * 🎯 UNIFIED SEO HEAD COMPONENT
 * 
 * Version: 4.0 - Works for BOTH CSR and SSG
 * 
 * This component replaces:
 * - SEOHead.tsx (old CSR version)
 * - SEOHeadSSG.tsx (old SSG version)
 * 
 * Features:
 * ✅ React Helmet Async for dynamic meta tags
 * ✅ Complete meta tags (title, description, OG, Twitter, canonical)
 * ✅ Structured data (JSON-LD) with breadcrumbs
 * ✅ Sitelinks support for Google Search
 * ✅ Works perfectly with react-snap
 * ✅ SSG-optimized (pre-renders with meta tags)
 */

import { Helmet } from 'react-helmet-async';
import { useSEO, SITE_CONFIG } from '../utils/seo-master';

export function SEOHeadUnified() {
  const seo = useSEO();

  return (
    <Helmet>
      {/* ========================================
          PRIMARY META TAGS
      ======================================== */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* ========================================
          CANONICAL URL
      ======================================== */}
      <link rel="canonical" href={seo.canonicalUrl} />
      
      {/* ========================================
          OPEN GRAPH (Facebook, LinkedIn)
      ======================================== */}
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.canonicalUrl} />
      <meta property="og:site_name" content={SITE_CONFIG.fullName} />
      <meta property="og:locale" content="en_US" />
      
      {/* ========================================
          TWITTER CARD
      ======================================== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />
      <meta name="twitter:site" content="@inchtomilez" />
      <meta name="twitter:creator" content="@inchtomilez" />
      
      {/* ========================================
          ADDITIONAL META TAGS
      ======================================== */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en" />
      <link rel="alternate" hrefLang="en" href={seo.canonicalUrl} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Indore" />
      <meta name="geo.position" content="22.7196;75.8577" />
      <meta name="ICBM" content="22.7196, 75.8577" />
      
      {/* Mobile */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* ========================================
          STRUCTURED DATA (JSON-LD)
          Includes: Breadcrumbs, Sitelinks, Organization, Article/Service
      ======================================== */}
      {seo.structuredData && seo.structuredData.length > 0 && (
        <>
          {seo.structuredData.map((schema, index) => (
            <script
              key={`schema-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}
        </>
      )}
    </Helmet>
  );
}

// Export as default and named export for compatibility
export default SEOHeadUnified;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MASTER SEO COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Universal SEO component using react-helmet-async
 * Works for both CSR and SSG
 * 
 * Features:
 * ✅ Meta tags (title, description, keywords, OG, Twitter)
 * ✅ Structured data (JSON-LD)
 * ✅ Canonical URLs
 * ✅ Breadcrumbs
 * ✅ Sitelinks optimization
 * ✅ Mobile optimization
 * ✅ Social media optimization
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Helmet } from 'react-helmet-async';
import { useMasterSEO } from '../utils/master-seo-system';

export function MasterSEO() {
  const seo = useMasterSEO();
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.canonical} />
      
      {/* Robots */}
      {seo.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={seo.siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.canonical} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />
      <meta name="twitter:site" content="@inchtomilez" />
      <meta name="twitter:creator" content="@inchtomilez" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content={seo.siteConfig.fullName} />
      <meta name="publisher" content={seo.siteConfig.fullName} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${seo.siteConfig.name}`} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={seo.siteConfig.name} />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
      <html lang="en" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {/* Structured Data - JSON-LD */}
      {seo.structuredData.map((schema, index) => (
        <script 
          key={`schema-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export default MasterSEO;

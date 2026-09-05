/**
 * ============================================================================
 * ADVANCED UNIFIED SEO HEAD COMPONENT
 * ============================================================================
 *
 * Version: 5.0
 *
 * Central SEO output component for Inchtomilez.
 *
 * Supports:
 * - Existing CSR pages
 * - SSG / prerendered pages
 * - Direct SEO props from legacy components
 * - seo-master.tsx fallback
 * - Canonical URL normalization
 * - Open Graph
 * - Twitter / X Cards
 * - Robots directives
 * - Hreflang
 * - Structured Data / JSON-LD
 * - Local Indore relevance
 *
 * IMPORTANT:
 * This component only OUTPUTS SEO metadata.
 * Actual page SEO data should come from seo-master / SEO database.
 * ============================================================================
 */

import { Helmet } from "react-helmet-async";
import {
  useSEO,
  SITE_CONFIG,
} from "../utils/seo-master";


// ============================================================================
// TYPES
// ============================================================================

export interface SEOHeadUnifiedProps {
  title?: string;

  description?: string;

  keywords?: string | string[];

  /**
   * Supporting both names protects older components.
   */
  canonical?: string;
  canonicalUrl?: string;

  ogType?: string;
  ogImage?: string;

  /**
   * Optional social image alt text.
   */
  ogImageAlt?: string;

  /**
   * Structured data passed directly from page.
   */
  structuredData?: any[];

  /**
   * Search engines should not index this page.
   */
  noindex?: boolean;

  /**
   * Search engines should not follow links.
   */
  nofollow?: boolean;

  /**
   * Optional article author.
   */
  author?: string;

  /**
   * Optional article dates.
   */
  datePublished?: string;
  dateModified?: string;
}


// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_IMAGE_ALT =
  "Inchtomilez Digital Marketing And Advertising Agency in Indore";


// ============================================================================
// CANONICAL NORMALIZATION
// ============================================================================

function normalizeCanonical(
  requestedUrl: string | undefined,
  fallbackUrl: string
): string {

  if (!requestedUrl) {
    return fallbackUrl;
  }

  let url = requestedUrl.trim();


  // --------------------------------------------------------------------------
  // RELATIVE URL
  // --------------------------------------------------------------------------

  if (
    !url.startsWith("https://") &&
    !url.startsWith("http://")
  ) {
    const path =
      url.startsWith("/")
        ? url
        : `/${url}`;

    url = `${SITE_CONFIG.url}${path}`;
  }


  // --------------------------------------------------------------------------
  // MIGRATE OLD .IN DOMAIN TO CURRENT .COM DOMAIN
  // --------------------------------------------------------------------------

  url = url
    .replace(
      "https://www.inchtomilez.in",
      SITE_CONFIG.url
    )
    .replace(
      "https://inchtomilez.in",
      SITE_CONFIG.url
    );


  // --------------------------------------------------------------------------
  // FORCE HTTPS ON OUR OWN DOMAIN
  // --------------------------------------------------------------------------

  url = url
    .replace(
      "http://www.inchtomilez.com",
      SITE_CONFIG.url
    )
    .replace(
      "http://inchtomilez.com",
      SITE_CONFIG.url
    );


  // --------------------------------------------------------------------------
  // FORCE WWW VERSION
  // --------------------------------------------------------------------------

  url = url.replace(
    "https://inchtomilez.com",
    SITE_CONFIG.url
  );


  // --------------------------------------------------------------------------
  // REMOVE TRAILING SLASH
  // EXCEPT HOMEPAGE
  // --------------------------------------------------------------------------

  if (
    url !== SITE_CONFIG.url &&
    url.endsWith("/")
  ) {
    url = url.slice(0, -1);
  }


  return url;
}


// ============================================================================
// STRUCTURED DATA SANITIZER
// ============================================================================

function cleanStructuredData(
  schemas: any[]
): any[] {

  if (!Array.isArray(schemas)) {
    return [];
  }

  return schemas.filter(
    (schema) =>
      schema &&
      typeof schema === "object" &&
      schema["@context"] &&
      schema["@type"]
  );
}


// ============================================================================
// COMPONENT
// ============================================================================

export function SEOHeadUnified(
  props: SEOHeadUnifiedProps = {}
) {

  /**
   * seo-master is the fallback source.
   *
   * Existing page-specific props override this data.
   */
  const seo = useSEO();


  // ==========================================================================
  // TITLE
  // ==========================================================================

  const title =
    props.title?.trim() ||
    seo.title;


  // ==========================================================================
  // DESCRIPTION
  // ==========================================================================

  const description =
    props.description?.trim() ||
    seo.description;


  // ==========================================================================
  // KEYWORDS
  // ==========================================================================

  const keywords =
    Array.isArray(props.keywords)
      ? props.keywords.join(", ")
      : props.keywords?.trim() ||
        seo.keywords;


  // ==========================================================================
  // CANONICAL
  // ==========================================================================

  const requestedCanonical =
    props.canonicalUrl ||
    props.canonical;

  const canonicalUrl =
    normalizeCanonical(
      requestedCanonical,
      seo.canonicalUrl
    );


  // ==========================================================================
  // OPEN GRAPH
  // ==========================================================================

  const ogType =
    props.ogType ||
    seo.ogType ||
    "website";


  const ogImage =
    props.ogImage ||
    seo.ogImage ||
    SITE_CONFIG.ogImage;


  const ogImageAlt =
    props.ogImageAlt ||
    DEFAULT_IMAGE_ALT;


  // ==========================================================================
  // AUTHOR
  // ==========================================================================

  const author =
    props.author ||
    SITE_CONFIG.fullName;


  // ==========================================================================
  // STRUCTURED DATA
  // ==========================================================================

  const rawStructuredData =
    props.structuredData ||
    seo.structuredData ||
    [];

  const structuredData =
    cleanStructuredData(
      rawStructuredData
    );


  // ==========================================================================
  // ROBOTS
  // ==========================================================================

  const robotsDirectives: string[] =
    [];


  if (props.noindex) {
    robotsDirectives.push(
      "noindex"
    );
  } else {
    robotsDirectives.push(
      "index"
    );
  }


  if (props.nofollow) {
    robotsDirectives.push(
      "nofollow"
    );
  } else {
    robotsDirectives.push(
      "follow"
    );
  }


  if (!props.noindex) {
    robotsDirectives.push(
      "max-image-preview:large",
      "max-snippet:-1",
      "max-video-preview:-1"
    );
  }


  const robotsContent =
    robotsDirectives.join(", ");


  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <Helmet>

      {/* ====================================================================
          DOCUMENT LANGUAGE
      ===================================================================== */}

      <html lang="en-IN" />


      {/* ====================================================================
          PRIMARY SEO
      ===================================================================== */}

      <title>
        {title}
      </title>


      <meta
        name="description"
        content={description}
      />


      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}


      <meta
        name="author"
        content={author}
      />


      {/* ====================================================================
          CANONICAL
      ===================================================================== */}

      <link
        rel="canonical"
        href={canonicalUrl}
      />


      {/* ====================================================================
          ROBOTS
      ===================================================================== */}

      <meta
        name="robots"
        content={robotsContent}
      />


      <meta
        name="googlebot"
        content={robotsContent}
      />


      <meta
        name="bingbot"
        content={robotsContent}
      />


      {/* ====================================================================
          OPEN GRAPH
      ===================================================================== */}

      <meta
        property="og:type"
        content={ogType}
      />


      <meta
        property="og:title"
        content={title}
      />


      <meta
        property="og:description"
        content={description}
      />


      <meta
        property="og:url"
        content={canonicalUrl}
      />


      <meta
        property="og:image"
        content={ogImage}
      />


      <meta
        property="og:image:alt"
        content={ogImageAlt}
      />


      <meta
        property="og:site_name"
        content={SITE_CONFIG.fullName}
      />


      <meta
        property="og:locale"
        content="en_IN"
      />


      {/* ====================================================================
          TWITTER / X
      ===================================================================== */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />


      <meta
        name="twitter:title"
        content={title}
      />


      <meta
        name="twitter:description"
        content={description}
      />


      <meta
        name="twitter:image"
        content={ogImage}
      />


      <meta
        name="twitter:image:alt"
        content={ogImageAlt}
      />


      <meta
        name="twitter:site"
        content="@inchtomilez"
      />


      {/* ====================================================================
          HREFLANG
      ===================================================================== */}

      <link
        rel="alternate"
        hrefLang="en-IN"
        href={canonicalUrl}
      />


      <link
        rel="alternate"
        hrefLang="x-default"
        href={canonicalUrl}
      />


      {/* ====================================================================
          LANGUAGE / REGIONAL SIGNALS
      ===================================================================== */}

      <meta
        httpEquiv="content-language"
        content="en-IN"
      />


      <meta
        name="geo.region"
        content="IN-MP"
      />


      <meta
        name="geo.placename"
        content="Indore"
      />


      {/*
        Exact latitude and longitude intentionally NOT added.

        We should only add geo.position / ICBM once the exact
        Google Business Profile office coordinates are verified.
      */}


      {/* ====================================================================
          ARTICLE METADATA
      ===================================================================== */}

      {props.datePublished && (
        <meta
          property="article:published_time"
          content={props.datePublished}
        />
      )}


      {props.dateModified && (
        <meta
          property="article:modified_time"
          content={props.dateModified}
        />
      )}


      {/* ====================================================================
          MOBILE / APP
      ===================================================================== */}

      <meta
        name="mobile-web-app-capable"
        content="yes"
      />


      <meta
        name="apple-mobile-web-app-capable"
        content="yes"
      />


      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />


      {/* ====================================================================
          STRUCTURED DATA / JSON-LD
      ===================================================================== */}

      {structuredData.map(
        (schema, index) => (
          <script
            key={`seo-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html:
                JSON.stringify(
                  schema
                ),
            }}
          />
        )
      )}

    </Helmet>
  );
}


// ============================================================================
// EXPORT
// ============================================================================

export default SEOHeadUnified;

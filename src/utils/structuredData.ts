/**
 * Structured Data Utility
 * Generates Schema.org JSON-LD structured data for SEO
 * 
 * This file provides legacy support for any imports that might reference it.
 * For new code, use the StructuredData component from seo-system.tsx
 */

export type StructuredDataType = 'WebPage' | 'Article' | 'Organization' | 'LocalBusiness' | 'FAQPage' | 'BreadcrumbList';

export interface StructuredDataProps {
  type?: StructuredDataType;
  data?: Record<string, any>;
}

/**
 * Creates structured data object for Schema.org
 * @param type - Schema.org type (default: 'WebPage')
 * @param data - Additional schema properties
 * @returns Schema.org JSON-LD object
 */
export const structuredData = ({
  type = 'WebPage',
  data = {},
}: StructuredDataProps) => {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
};

export default structuredData;

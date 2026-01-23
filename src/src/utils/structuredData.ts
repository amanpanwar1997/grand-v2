/**
 * LEGACY COMPATIBILITY FILE
 * This file exists for build compatibility only
 * All pages should import from '../../utils/seo-system' instead
 */

type StructuredDataProps = {
  type?: string;
  data?: Record<string, any>;
};

/**
 * Simple structured data helper
 * @deprecated Use StructuredData component from seo-system.tsx instead
 */
const structuredData = ({
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

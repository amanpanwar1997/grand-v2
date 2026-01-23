/**
 * ============================================================================
 * FAQ SCHEMA GENERATOR
 * ============================================================================
 * 
 * Generates FAQ structured data (JSON-LD) for Google Rich Results
 * 
 * Usage:
 * ```tsx
 * import { generateFAQSchema } from '../utils/faqSchema';
 * 
 * const faqs = [
 *   { question: 'What is SEO?', answer: 'SEO is...' },
 *   { question: 'How much does it cost?', answer: 'Pricing starts at...' },
 * ];
 * 
 * const faqSchema = generateFAQSchema(faqs);
 * 
 * <SEOHead
 *   {...seo.meta}
 *   structuredData={faqSchema}
 * />
 * ```
 * ============================================================================
 */

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQ structured data for Google Rich Results
 * 
 * @param faqs - Array of FAQ items with question and answer
 * @returns JSON-LD structured data object
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function generateFAQSchema(faqs: FAQItem[]): Record<string, any> {
  if (!faqs || faqs.length === 0) {
    return {};
  }

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

/**
 * Merge multiple structured data schemas into array
 * Useful when page needs both Organization + FAQ schemas
 * 
 * @param schemas - Array of schema objects
 * @returns Combined schema array or single object
 */
export function mergeSchemas(...schemas: Array<Record<string, any> | undefined>): Record<string, any> | Record<string, any>[] {
  const validSchemas = schemas.filter(schema => schema && Object.keys(schema).length > 0);
  
  if (validSchemas.length === 0) {
    return {};
  }
  
  if (validSchemas.length === 1) {
    return validSchemas[0];
  }
  
  return validSchemas;
}

/**
 * Common FAQ questions for reuse across pages
 */
export const COMMON_FAQS = {
  pricing: {
    question: 'How much do your services cost?',
    answer: 'Our pricing varies based on your specific needs and goals. We offer customized packages starting from ₹15,000/month for basic digital marketing services. Contact us for a detailed quote tailored to your business.',
  },
  timeline: {
    question: 'How long does it take to see results?',
    answer: 'SEO typically shows results in 3-6 months, while PPC and social media ads can generate leads within days. We set realistic expectations and provide regular progress reports throughout your campaign.',
  },
  contract: {
    question: 'Do you require long-term contracts?',
    answer: 'We offer flexible month-to-month contracts with no long-term commitments. However, we recommend at least 3-6 months for SEO campaigns to see meaningful results.',
  },
  location: {
    question: 'Do you only serve clients in Indore?',
    answer: 'While we are based in Indore, we serve clients across India and internationally. We have successfully managed campaigns for businesses in 12+ cities and multiple countries.',
  },
  reporting: {
    question: 'What kind of reporting do you provide?',
    answer: 'We provide detailed monthly reports showing traffic, rankings, conversions, ad performance, and ROI. You also get 24/7 access to our analytics dashboard for real-time insights.',
  },
};

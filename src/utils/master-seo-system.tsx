/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MASTER SEO SYSTEM - CONSOLIDATED & COMPLETE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Version: 4.0.0 - CONSOLIDATED FINAL
 * Last Updated: November 23, 2025
 * 
 * This is the SINGLE SOURCE OF TRUTH for ALL SEO data across the website.
 * 
 * Features:
 * ✅ Meta tags (title, description, keywords, OG, Twitter)
 * ✅ Structured data (Organization, WebSite, BreadcrumbList, Article, etc.)
 * ✅ Sitelinks SearchBox for Google
 * ✅ Navigation schema for proper sitelinks
 * ✅ Breadcrumbs for all pages
 * ✅ Canonical URLs
 * ✅ 313 pages fully optimized
 * ✅ Dynamic routing support
 * ✅ SSG-ready
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useLocation } from 'react-router-dom';
import { services } from '../components/data/servicesData';
import { industries } from '../components/data/industriesData';
import { blogPosts } from '../components/data/blogData';

// ═══════════════════════════════════════════════════════════════════════════
// SITE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const SITE_CONFIG = {
  name: 'Inchtomilez',
  fullName: 'Inchtomilez Digital Marketing And Advertising Agency',
  tagline: 'Digital Marketing Agency in Indore',
  url: 'https://www.inchtomilez.com',
  logo: 'https://www.inchtomilez.com/logo.png',
  ogImage: 'https://www.inchtomilez.com/og-image.jpg',
  
  // Contact
  email: 'info@inchtomilez.com',
  phone: '+91-9669988666',
  address: {
    street: '123 Business District',
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    postalCode: '452001'
  },
  
  // Social
  social: {
    facebook: 'https://facebook.com/inchtomilez',
    twitter: 'https://twitter.com/inchtomilez',
    instagram: 'https://instagram.com/inchtomilez',
    linkedin: 'https://linkedin.com/company/inchtomilez',
    youtube: 'https://youtube.com/@inchtomilez'
  },
  
  // Sitelinks - Primary navigation for Google sitelinks
  sitelinks: [
    { name: 'Services', url: '/services' },
    { name: 'Industries', url: '/industries' },
    { name: 'Blog', url: '/blogs' },
    { name: 'About Us', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'FAQs', url: '/faqs' }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// BREADCRUMB GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

export function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', url: '/' }
  ];
  
  let currentPath = '';
  
  for (let i = 0; i < paths.length; i++) {
    currentPath += '/' + paths[i];
    
    // Convert slug to title
    let name = paths[i]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Special cases
    if (paths[i] === 'seo') name = 'SEO';
    if (paths[i] === 'ppc') name = 'PPC';
    if (paths[i] === 'faqs') name = 'FAQs';
    
    breadcrumbs.push({
      name,
      url: currentPath
    });
  }
  
  return breadcrumbs;
}

// ═══════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA GENERATORS
// ═══════════════════════════════════════════════════════════════════════════

// Organization Schema (Site-wide)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.fullName,
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: SITE_CONFIG.logo,
      width: 512,
      height: 512
    },
    description: 'Leading digital marketing agency in Indore offering SEO, PPC, social media marketing, content marketing, branding, and web design services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      contactType: 'Customer Service',
      email: SITE_CONFIG.email,
      areaServed: 'IN',
      availableLanguage: 'English'
    },
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube
    ]
  };
}

// Website Schema with Sitelinks SearchBox
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_CONFIG.url}${crumb.url}`
    }))
  };
}

// Article Schema (for blog posts)
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || SITE_CONFIG.ogImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.fullName,
      url: SITE_CONFIG.url
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.fullName,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo
      }
    },
    articleSection: article.category || 'Digital Marketing',
    inLanguage: 'en-US'
  };
}

// Service Schema
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${SITE_CONFIG.url}/#organization`
    },
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    url: `${SITE_CONFIG.url}${service.url}`
  };
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO DATA - ALL 313 PAGES
// ═══════════════════════════════════════════════════════════════════════════

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noindex?: boolean;
  structuredData?: any[];
}

export const SEO_DATABASE: Record<string, SEOData> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // HOMEPAGE
  // ═══════════════════════════════════════════════════════════════════════════
  '/': {
    title: 'Inchtomilez - Digital Marketing Agency in Indore | SEO, PPC, Social Media',
    description: 'Leading digital marketing agency in Indore offering SEO, PPC, social media marketing, content marketing, branding, and web design services. Drive growth with data-driven strategies.',
    keywords: 'digital marketing agency Indore, SEO services Indore, PPC agency, social media marketing, content marketing, web design Indore, branding agency',
    ogType: 'website',
    structuredData: [
      generateOrganizationSchema(),
      generateWebsiteSchema()
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN PAGES
  // ═══════════════════════════════════════════════════════════════════════════
  '/about': {
    title: 'About Us - Inchtomilez Digital Marketing Agency | Our Story & Team',
    description: 'Learn about Inchtomilez, a leading digital marketing agency in Indore. Our team of experts delivers innovative marketing solutions and measurable results since 2015.',
    keywords: 'about Inchtomilez, digital marketing team, marketing agency Indore, marketing experts, agency story',
    ogType: 'website'
  },

  '/services': {
    title: 'Digital Marketing Services | SEO, PPC, Social Media & More - Inchtomilez',
    description: 'Comprehensive digital marketing services including SEO, PPC, social media marketing, content creation, branding, web design, and analytics. Customized solutions for your business growth.',
    keywords: 'digital marketing services, SEO services, PPC management, social media marketing, content marketing services, web design, branding services',
    ogType: 'website'
  },

  '/industries': {
    title: 'Industries We Serve - Specialized Digital Marketing Solutions | Inchtomilez',
    description: 'Industry-specific digital marketing solutions for healthcare, education, real estate, ecommerce, hospitality, and more. Expertise across 18+ industries with proven results.',
    keywords: 'industry marketing solutions, healthcare marketing, education marketing, real estate marketing, ecommerce marketing, B2B marketing',
    ogType: 'website'
  },

  '/blogs': {
    title: 'Digital Marketing Blog | SEO, PPC, Social Media Tips & Trends',
    description: 'Expert insights on digital marketing, SEO strategies, PPC campaigns, social media trends, content marketing, and industry best practices. Updated regularly with actionable tips.',
    keywords: 'digital marketing blog, SEO tips, PPC strategies, social media trends, marketing insights, content marketing blog',
    ogType: 'website'
  },

  '/contact': {
    title: 'Contact Us - Get in Touch with Inchtomilez | Free Consultation',
    description: 'Contact Inchtomilez for digital marketing services. Call +91-9669988666 or visit our office in Indore. Free consultation available. Get a custom quote today.',
    keywords: 'contact Inchtomilez, digital marketing inquiry, marketing consultation, Indore marketing agency, free consultation',
    ogType: 'website'
  },

  '/faqs': {
    title: 'FAQs - Digital Marketing Questions Answered | Inchtomilez',
    description: 'Frequently asked questions about digital marketing, SEO, PPC, social media, pricing, and our services. Get answers from marketing experts.',
    keywords: 'digital marketing FAQs, SEO questions, PPC FAQ, marketing services questions, pricing information',
    ogType: 'website'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SERVICE PAGES
  // ═══════════════════════════════════════════════════════════════════════════
  '/services/search-engine-optimization-seo': {
    title: 'SEO Services in Indore | Search Engine Optimization Agency - Inchtomilez',
    description: 'Professional SEO services in Indore. Increase organic traffic, improve rankings, and dominate search results. Local SEO, technical SEO, and content optimization.',
    keywords: 'SEO services Indore, search engine optimization, local SEO, technical SEO, SEO agency, organic traffic',
    ogType: 'website'
  },

  '/services/ppc-google-ads': {
    title: 'PPC Management & Google Ads Services | Certified Agency - Inchtomilez',
    description: 'Expert PPC management and Google Ads services. Maximize ROI with targeted campaigns, conversion optimization, and transparent reporting. Certified Google Ads specialists.',
    keywords: 'PPC management, Google Ads services, paid advertising, PPC agency, Google Ads specialist, conversion optimization',
    ogType: 'website'
  },

  '/services/social-media-marketing': {
    title: 'Social Media Marketing Services | Facebook, Instagram, LinkedIn - Inchtomilez',
    description: 'Full-service social media marketing including strategy, content creation, community management, and paid advertising. Grow your brand across all platforms.',
    keywords: 'social media marketing, Facebook marketing, Instagram marketing, LinkedIn marketing, social media management, SMM services',
    ogType: 'website'
  },

  '/services/content-marketing': {
    title: 'Content Marketing Services | Blog Writing, Copywriting & Strategy',
    description: 'Strategic content marketing services including blog writing, copywriting, video content, and content strategy. Engage audiences and drive conversions.',
    keywords: 'content marketing, blog writing services, copywriting, content strategy, video content, content creation',
    ogType: 'website'
  },

  '/services/branding-identity': {
    title: 'Branding & Identity Design Services | Logo, Brand Strategy - Inchtomilez',
    description: 'Professional branding and identity design services. Logo design, brand strategy, visual identity, and brand guidelines. Build a memorable brand.',
    keywords: 'branding services, brand identity design, logo design, brand strategy, visual identity, brand guidelines',
    ogType: 'website'
  },

  '/services/web-design-development': {
    title: 'Web Design & Development Services | Custom Websites - Inchtomilez',
    description: 'Custom web design and development services. Responsive websites, ecommerce platforms, WordPress development, and web applications. User-friendly and SEO-optimized.',
    keywords: 'web design services, web development, custom websites, responsive design, ecommerce development, WordPress development',
    ogType: 'website'
  },

  '/services/video-media-production': {
    title: 'Video Production & Media Services | Commercial Videos - Inchtomilez',
    description: 'Professional video production and media services. Commercial videos, explainer videos, social media content, and corporate videos. High-quality production.',
    keywords: 'video production, commercial videos, explainer videos, media production, corporate videos, video marketing',
    ogType: 'website'
  },

  '/services/email-marketing': {
    title: 'Email Marketing Services | Campaigns, Automation & Analytics',
    description: 'Effective email marketing services including campaign management, automation, list building, and performance tracking. Increase engagement and conversions.',
    keywords: 'email marketing, email campaigns, marketing automation, email newsletter, drip campaigns, email analytics',
    ogType: 'website'
  },

  '/services/ecommerce-marketing': {
    title: 'Ecommerce Marketing Services | Online Store Growth - Inchtomilez',
    description: 'Comprehensive ecommerce marketing services. Product listing optimization, marketplace management, conversion rate optimization, and customer acquisition.',
    keywords: 'ecommerce marketing, online store marketing, marketplace management, product optimization, ecommerce SEO, conversion optimization',
    ogType: 'website'
  },

  '/services/analytics-reporting': {
    title: 'Analytics & Reporting Services | Data-Driven Marketing Insights',
    description: 'Advanced analytics and reporting services. Google Analytics setup, custom dashboards, performance tracking, and actionable insights for better decision-making.',
    keywords: 'marketing analytics, Google Analytics, reporting services, performance tracking, data analysis, marketing insights',
    ogType: 'website'
  },

  '/services/btl-activations': {
    title: 'BTL Activations & Events | Below The Line Marketing - Inchtomilez',
    description: 'Creative BTL activations and event marketing services. Brand activations, product launches, experiential marketing, and promotional events.',
    keywords: 'BTL activations, below the line marketing, brand activations, event marketing, experiential marketing, promotional events',
    ogType: 'website'
  },

  '/services/ooh-advertising': {
    title: 'OOH Advertising Services | Outdoor & Billboard Advertising',
    description: 'Out-of-home advertising services including billboards, transit ads, street furniture, and digital displays. High-impact outdoor advertising campaigns.',
    keywords: 'OOH advertising, outdoor advertising, billboard advertising, transit ads, out of home marketing, outdoor media',
    ogType: 'website'
  },

  '/services/influencer-marketing': {
    title: 'Influencer Marketing Services | Influencer Campaigns & Management',
    description: 'Professional influencer marketing services. Influencer identification, campaign management, content collaboration, and performance tracking.',
    keywords: 'influencer marketing, influencer campaigns, social media influencers, brand collaborations, influencer management',
    ogType: 'website'
  },

  '/services/digital-marketing': {
    title: 'Integrated Digital Marketing Services | 360° Marketing Solutions',
    description: 'Comprehensive digital marketing services combining SEO, PPC, social media, content, and more. Integrated strategies for maximum impact and ROI.',
    keywords: 'integrated digital marketing, 360 marketing, full service digital marketing, omnichannel marketing, digital strategy',
    ogType: 'website'
  },

  // Sub-service pages
  '/services/seo/local-seo': {
    title: 'Local SEO Services | Google My Business Optimization - Inchtomilez',
    description: 'Specialized local SEO services to dominate local search. Google My Business optimization, local citations, reviews management, and map pack rankings.',
    keywords: 'local SEO, Google My Business, local search optimization, local citations, GMB optimization, local rankings',
    ogType: 'website'
  },

  '/services/seo/technical-seo': {
    title: 'Technical SEO Services | Site Speed, Core Web Vitals & Indexing',
    description: 'Advanced technical SEO services. Site speed optimization, Core Web Vitals, mobile optimization, structured data, and crawl optimization.',
    keywords: 'technical SEO, site speed optimization, Core Web Vitals, mobile SEO, structured data, crawl optimization',
    ogType: 'website'
  },

  '/services/ppc/google-shopping': {
    title: 'Google Shopping Ads Management | Product Listing Ads - Inchtomilez',
    description: 'Expert Google Shopping Ads management. Product feed optimization, bidding strategies, and campaign management for maximum ecommerce sales.',
    keywords: 'Google Shopping Ads, product listing ads, shopping campaigns, ecommerce PPC, product feed optimization',
    ogType: 'website'
  },

  '/services/ppc/display-ads': {
    title: 'Display Advertising Services | Banner Ads & Remarketing',
    description: 'Strategic display advertising services. Banner ads, remarketing campaigns, audience targeting, and creative optimization for brand awareness.',
    keywords: 'display advertising, banner ads, remarketing, retargeting, display campaigns, programmatic advertising',
    ogType: 'website'
  },

  '/services/social-media/instagram': {
    title: 'Instagram Marketing Services | Content, Stories & Ads',
    description: 'Professional Instagram marketing services. Content strategy, Stories, Reels, influencer collaborations, and Instagram Ads management.',
    keywords: 'Instagram marketing, Instagram ads, Instagram Stories, Reels marketing, Instagram growth, social media Instagram',
    ogType: 'website'
  },

  '/services/social-media/facebook': {
    title: 'Facebook Marketing Services | Ads, Pages & Community Management',
    description: 'Complete Facebook marketing services. Page management, Facebook Ads, community engagement, and conversion optimization.',
    keywords: 'Facebook marketing, Facebook ads, Facebook page management, social media Facebook, FB marketing',
    ogType: 'website'
  },

  '/services/content/copywriting': {
    title: 'Copywriting Services | Website Copy, Sales Copy & Ad Copy',
    description: 'Professional copywriting services. Website copy, sales pages, ad copy, email copy, and landing pages that convert.',
    keywords: 'copywriting services, website copywriting, sales copy, ad copywriting, content writing, conversion copywriting',
    ogType: 'website'
  },

  '/services/content/blog-writing': {
    title: 'Blog Writing Services | SEO Blog Posts & Content Creation',
    description: 'Expert blog writing services. SEO-optimized blog posts, article writing, and content creation that ranks and engages.',
    keywords: 'blog writing services, SEO blog posts, article writing, content creation, blog content, professional blog writers',
    ogType: 'website'
  },

  '/services/web-design/ecommerce': {
    title: 'Ecommerce Website Development | Online Store Design - Inchtomilez',
    description: 'Custom ecommerce website development. Shopify, WooCommerce, and custom platforms. User-friendly design and conversion-focused development.',
    keywords: 'ecommerce website development, online store design, Shopify development, WooCommerce development, ecommerce platform',
    ogType: 'website'
  },

  '/services/web-design/wordpress': {
    title: 'WordPress Development Services | Custom WordPress Websites',
    description: 'Professional WordPress development services. Custom themes, plugin development, WordPress optimization, and maintenance.',
    keywords: 'WordPress development, custom WordPress, WordPress themes, WordPress plugins, WordPress website design',
    ogType: 'website'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPANY PAGES
  // ═══════════════════════════════════════════════════════════════════════════
  '/careers': {
    title: 'Careers at Inchtomilez | Join Our Digital Marketing Team',
    description: 'Explore career opportunities at Inchtomilez. Join our innovative digital marketing team in Indore. Growth opportunities, competitive benefits, and exciting projects.',
    keywords: 'careers Inchtomilez, digital marketing jobs, marketing careers Indore, job opportunities, marketing agency jobs',
    ogType: 'website'
  },

  '/team': {
    title: 'Our Team - Meet the Experts at Inchtomilez | Leadership & Staff',
    description: 'Meet the talented team behind Inchtomilez. Our digital marketing experts, strategists, designers, and developers delivering exceptional results.',
    keywords: 'Inchtomilez team, marketing team, agency team, marketing experts, digital marketing professionals',
    ogType: 'website'
  },

  '/testimonials': {
    title: 'Client Testimonials & Reviews | What Our Clients Say - Inchtomilez',
    description: 'Read testimonials and reviews from our satisfied clients. Real results, verified reviews, and success stories from businesses we\'ve helped grow.',
    keywords: 'client testimonials, customer reviews, client feedback, success stories, Inchtomilez reviews',
    ogType: 'website'
  },

  '/case-studies': {
    title: 'Case Studies | Digital Marketing Success Stories - Inchtomilez',
    description: 'Explore our case studies showcasing successful digital marketing campaigns. Real results, detailed strategies, and measurable outcomes.',
    keywords: 'case studies, marketing case studies, success stories, campaign results, marketing portfolio',
    ogType: 'website'
  },

  '/portfolio': {
    title: 'Our Portfolio | Digital Marketing Work & Projects - Inchtomilez',
    description: 'View our portfolio of digital marketing projects, campaigns, and creative work. See what we\'ve created for clients across industries.',
    keywords: 'marketing portfolio, agency portfolio, creative work, marketing projects, campaign examples',
    ogType: 'website'
  },

  '/press': {
    title: 'Press & Media | Inchtomilez in the News | Media Coverage',
    description: 'Press releases, media coverage, and news about Inchtomilez. Stay updated with our latest achievements and industry recognition.',
    keywords: 'press releases, media coverage, Inchtomilez news, agency news, industry recognition',
    ogType: 'website'
  },

  '/partners': {
    title: 'Our Partners | Technology & Business Partners - Inchtomilez',
    description: 'Meet our technology and business partners. Google Partner, Meta Business Partner, and other strategic partnerships.',
    keywords: 'business partners, technology partners, Google Partner, Meta Partner, agency partnerships',
    ogType: 'website'
  },

  '/awards': {
    title: 'Awards & Recognition | Industry Awards & Achievements',
    description: 'Awards and recognition received by Inchtomilez. Industry awards, certifications, and achievements in digital marketing excellence.',
    keywords: 'marketing awards, industry recognition, agency awards, certifications, achievements',
    ogType: 'website'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESOURCE PAGES
  // ═══════════════════════════════════════════════════════════════════════════
  '/resources': {
    title: 'Free Digital Marketing Resources | Guides, Tools & Templates',
    description: 'Free digital marketing resources including guides, templates, checklists, and tools. Learn and implement effective marketing strategies.',
    keywords: 'marketing resources, free guides, marketing templates, marketing tools, learning resources',
    ogType: 'website'
  },

  '/downloads': {
    title: 'Free Downloads | Marketing Templates, Guides & Checklists',
    description: 'Download free marketing templates, guides, checklists, and resources. Practical tools to improve your digital marketing.',
    keywords: 'free downloads, marketing templates, downloadable guides, marketing checklists, free resources',
    ogType: 'website'
  },

  '/ebooks': {
    title: 'Free Marketing Ebooks | In-Depth Digital Marketing Guides',
    description: 'Download free marketing ebooks covering SEO, PPC, social media, content marketing, and more. Comprehensive guides for marketers.',
    keywords: 'marketing ebooks, free ebooks, digital marketing guides, SEO ebook, PPC guide',
    ogType: 'website'
  },

  '/webinars': {
    title: 'Digital Marketing Webinars | Free Online Training & Workshops',
    description: 'Join our free digital marketing webinars and workshops. Learn from experts, ask questions, and implement proven strategies.',
    keywords: 'marketing webinars, online training, marketing workshops, free webinars, digital marketing training',
    ogType: 'website'
  },

  '/tools': {
    title: 'Free Marketing Tools | SEO, Analytics & Productivity Tools',
    description: 'Free digital marketing tools including SEO analyzers, keyword research tools, social media planners, and productivity apps.',
    keywords: 'marketing tools, free tools, SEO tools, keyword tools, analytics tools, productivity tools',
    ogType: 'website'
  },

  '/glossary': {
    title: 'Digital Marketing Glossary | Terms & Definitions A-Z',
    description: 'Comprehensive digital marketing glossary. Definitions of marketing terms, acronyms, and jargon explained in simple language.',
    keywords: 'marketing glossary, marketing terms, digital marketing dictionary, marketing definitions, SEO terms',
    ogType: 'website'
  },

  '/sitemap-page': {
    title: 'Site Map | Complete Navigation - Inchtomilez',
    description: 'Complete sitemap of Inchtomilez website. Browse all pages, services, industries, blog categories, and resources.',
    keywords: 'sitemap, site navigation, website map, all pages',
    ogType: 'website'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEGAL PAGES
  // ═══════════════════════════════════════════════════════════════════════════
  '/privacy-policy': {
    title: 'Privacy Policy | How We Protect Your Data - Inchtomilez',
    description: 'Inchtomilez privacy policy. Learn how we collect, use, and protect your personal information and data privacy practices.',
    keywords: 'privacy policy, data protection, GDPR compliance, data privacy, user privacy',
    ogType: 'website',
    noindex: false
  },

  '/terms-of-service': {
    title: 'Terms of Service | Website Terms & Conditions - Inchtomilez',
    description: 'Terms of service for using Inchtomilez website and services. Read our terms and conditions, user agreements, and service policies.',
    keywords: 'terms of service, terms and conditions, user agreement, service terms, website terms',
    ogType: 'website',
    noindex: false
  },

  '/cookie-policy': {
    title: 'Cookie Policy | How We Use Cookies - Inchtomilez',
    description: 'Inchtomilez cookie policy. Learn about cookies we use, why we use them, and how to manage cookie preferences.',
    keywords: 'cookie policy, cookies, browser cookies, tracking cookies, cookie consent',
    ogType: 'website',
    noindex: false
  },

  '/disclaimer': {
    title: 'Disclaimer | Legal Disclaimer - Inchtomilez',
    description: 'Legal disclaimer for Inchtomilez website and services. Information accuracy, liability limitations, and external links policy.',
    keywords: 'disclaimer, legal disclaimer, liability, terms disclaimer',
    ogType: 'website',
    noindex: false
  },

  '/refund-policy': {
    title: 'Refund Policy | Returns & Cancellations - Inchtomilez',
    description: 'Inchtomilez refund policy. Learn about our refund, cancellation, and money-back guarantee policies for services.',
    keywords: 'refund policy, cancellation policy, money back guarantee, returns policy',
    ogType: 'website',
    noindex: false
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// DYNAMIC SEO HOOK
// ═══════════════════════════════════════════════════════════════════════════

export function useMasterSEO() {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Get SEO data from database or generate dynamically
  let seoData = SEO_DATABASE[pathname];
  
  // Handle dynamic routes (services, industries, blogs)
  if (!seoData) {
    if (pathname.startsWith('/services/')) {
      const slug = pathname.replace('/services/', '');
      const service = services.find(s => s.slug === slug);
      
      if (service) {
        seoData = {
          title: `${service.title} Services | Digital Marketing - Inchtomilez`,
          description: service.description,
          keywords: `${service.title}, digital marketing services, ${slug.replace(/-/g, ' ')}`,
          ogType: 'website',
          structuredData: [generateServiceSchema({
            name: service.title,
            description: service.description,
            url: pathname
          })]
        };
      }
    }
    
    if (pathname.startsWith('/industries/')) {
      const slug = pathname.replace('/industries/', '');
      const industry = industries.find(i => i.slug === slug);
      
      if (industry) {
        seoData = {
          title: `${industry.title} Digital Marketing Services | Industry Solutions`,
          description: industry.description,
          keywords: `${industry.title} marketing, ${slug.replace(/-/g, ' ')} digital marketing, industry marketing`,
          ogType: 'website'
        };
      }
    }
    
    if (pathname.startsWith('/blogs/')) {
      const parts = pathname.split('/');
      
      // Blog category
      if (parts.length === 3) {
        const category = parts[2];
        seoData = {
          title: `${category.toUpperCase()} Blog | Digital Marketing Tips & Strategies`,
          description: `Expert articles and insights about ${category.replace(/-/g, ' ')}. Stay updated with latest trends and best practices.`,
          keywords: `${category} blog, ${category} tips, ${category} strategies, digital marketing`,
          ogType: 'website'
        };
      }
      
      // Blog post
      if (parts.length === 4) {
        const slug = parts[3];
        const post = blogPosts.find(p => p.slug === slug);
        
        if (post) {
          seoData = {
            title: `${post.title} | Inchtomilez Blog`,
            description: post.excerpt,
            keywords: post.tags?.join(', ') || 'digital marketing',
            ogType: 'article',
            structuredData: [generateArticleSchema({
              title: post.title,
              description: post.excerpt,
              image: post.image,
              datePublished: post.publishedDate,
              author: post.author,
              category: post.category
            })]
          };
        }
      }
    }
  }
  
  // Fallback SEO
  if (!seoData) {
    seoData = {
      title: 'Inchtomilez - Digital Marketing Agency',
      description: 'Professional digital marketing services in Indore',
      keywords: 'digital marketing, Indore, SEO, PPC',
      ogType: 'website'
    };
  }
  
  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs(pathname);
  
  // Add breadcrumb schema
  const structuredData = [
    ...(seoData.structuredData || []),
    generateBreadcrumbSchema(breadcrumbs)
  ];
  
  // Add organization and website schema to homepage
  if (pathname === '/') {
    structuredData.push(
      generateOrganizationSchema(),
      generateWebsiteSchema()
    );
  }
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: `${SITE_CONFIG.url}${pathname}`,
    ogImage: seoData.ogImage || SITE_CONFIG.ogImage,
    ogType: seoData.ogType || 'website',
    noindex: seoData.noindex || false,
    structuredData,
    breadcrumbs,
    siteConfig: SITE_CONFIG
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default useMasterSEO;

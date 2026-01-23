/**
 * 🎯 COMPLETE SEO DATABASE - ALL 313 PAGES
 * 
 * This file contains SEO data for ALL pages:
 * - Main pages (12)
 * - Company pages (11)
 * - Service pages (26)
 * - Industry pages (19)
 * - Blog categories (10)
 * - Blog posts (224)
 * - Legal pages (5)
 * - Resource pages (6)
 * 
 * Import this into seo-master.tsx
 */

import { SEOData } from './seo-master';

// This will be merged with SEO_DATABASE in seo-master.tsx
export const COMPLETE_SEO_DATA: Record<string, SEOData> = {
  
  // ============================================================================
  // MAIN PAGES
  // ============================================================================
  '/': {
    title: 'Inchtomilez - Digital Marketing Agency in Indore | SEO, PPC, Social Media',
    description: 'Leading digital marketing agency in Indore offering SEO, PPC, social media marketing, content marketing, branding, and web design services. Drive growth with data-driven strategies.',
    keywords: ['digital marketing agency Indore', 'SEO services Indore', 'PPC agency', 'social media marketing', 'content marketing', 'web design Indore'],
    h1: 'Transform Your Business with Data-Driven Digital Marketing',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/about': {
    title: 'About Us - Inchtomilez Digital Marketing Agency | Our Story & Mission',
    description: 'Learn about Inchtomilez, a leading digital marketing agency in Indore. Discover our team of experts, our mission to drive measurable results, and our client-first approach.',
    keywords: ['about Inchtomilez', 'digital marketing team', 'marketing agency Indore', 'marketing experts', 'agency mission'],
    h1: 'About Inchtomilez - Your Digital Marketing Partner',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/contact': {
    title: 'Contact Us - Get in Touch with Inchtomilez | Free Consultation',
    description: 'Contact Inchtomilez for digital marketing services. Call +91-9669988666, email us, or visit our office in Indore. Free consultation available.',
    keywords: ['contact Inchtomilez', 'digital marketing inquiry', 'marketing consultation', 'Indore marketing agency', 'free consultation'],
    h1: 'Get in Touch - Let\'s Grow Your Business Together',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/services': {
    title: 'Digital Marketing Services | SEO, PPC, Social Media & More',
    description: 'Comprehensive digital marketing services including SEO, PPC, social media marketing, content creation, branding, web design, and analytics. Customized solutions for your business.',
    keywords: ['digital marketing services', 'SEO services', 'PPC management', 'social media marketing', 'content marketing services'],
    h1: 'Our Digital Marketing Services',
    ogType: 'website',
    schemaType: 'service'
  },

  '/faqs': {
    title: 'FAQs - Digital Marketing Questions Answered | Inchtomilez',
    description: 'Frequently asked questions about digital marketing, SEO, PPC, social media, pricing, and our services. Get expert answers from marketing professionals.',
    keywords: ['digital marketing FAQs', 'SEO questions', 'PPC FAQ', 'marketing services questions', 'pricing questions'],
    h1: 'Frequently Asked Questions',
    ogType: 'website',
    schemaType: 'faq'
  },

  '/team': {
    title: 'Our Team - Meet the Digital Marketing Experts | Inchtomilez',
    description: 'Meet our team of certified digital marketing professionals. SEO specialists, PPC experts, content strategists, and creative designers driving client success.',
    keywords: ['marketing team', 'digital marketing experts', 'SEO specialists', 'PPC experts', 'Indore team'],
    h1: 'Meet Our Expert Team',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/careers': {
    title: 'Careers - Join Our Digital Marketing Team | Inchtomilez Jobs',
    description: 'Explore career opportunities at Inchtomilez. Join our team of digital marketing professionals in Indore. Open positions in SEO, PPC, content, and design.',
    keywords: ['digital marketing careers', 'marketing jobs Indore', 'SEO jobs', 'PPC jobs', 'content writer jobs'],
    h1: 'Join Our Growing Team',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/testimonials': {
    title: 'Client Testimonials - Success Stories | Inchtomilez Reviews',
    description: 'Read what our clients say about working with Inchtomilez. Real testimonials from businesses that achieved measurable growth through our digital marketing services.',
    keywords: ['client testimonials', 'marketing reviews', 'client success stories', 'agency reviews', 'Inchtomilez reviews'],
    h1: 'What Our Clients Say',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/case-studies': {
    title: 'Case Studies - Digital Marketing Success Stories | Inchtomilez',
    description: 'Explore our case studies showcasing real results: increased traffic, higher conversions, better ROI. See how we helped businesses grow with digital marketing.',
    keywords: ['marketing case studies', 'SEO success stories', 'PPC results', 'marketing ROI', 'client results'],
    h1: 'Our Success Stories',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/portfolio': {
    title: 'Portfolio - Our Digital Marketing Projects | Inchtomilez Work',
    description: 'Browse our portfolio of digital marketing projects. Website designs, branding campaigns, content marketing, and social media success stories.',
    keywords: ['marketing portfolio', 'digital projects', 'website design portfolio', 'branding projects', 'creative work'],
    h1: 'Our Portfolio',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/press': {
    title: 'Press & Media - Inchtomilez in the News | Media Coverage',
    description: 'Press releases, media coverage, and news about Inchtomilez. Stay updated with our latest achievements, partnerships, and industry insights.',
    keywords: ['press releases', 'media coverage', 'company news', 'industry news', 'Inchtomilez news'],
    h1: 'Press & Media',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/partners': {
    title: 'Partners - Our Technology & Business Partners | Inchtomilez',
    description: 'Meet our technology and business partners. Google Partner, Meta Business Partner, and leading SaaS platforms we work with.',
    keywords: ['business partners', 'technology partners', 'Google Partner', 'Meta Partner', 'agency partnerships'],
    h1: 'Our Partners',
    ogType: 'website',
    schemaType: 'organization'
  },

  '/awards': {
    title: 'Awards & Recognition - Industry Achievements | Inchtomilez',
    description: 'Our awards and industry recognition. Best Digital Marketing Agency, Top SEO Company, and client satisfaction awards.',
    keywords: ['marketing awards', 'industry recognition', 'best agency', 'SEO awards', 'marketing excellence'],
    h1: 'Awards & Recognition',
    ogType: 'website',
    schemaType: 'organization'
  },
  
  // ============================================================================
  // INDUSTRIES (19 pages)
  // ============================================================================
  '/industries': {
    title: 'Industries We Serve - Specialized Digital Marketing Solutions',
    description: 'Industry-specific digital marketing solutions for healthcare, education, real estate, ecommerce, hospitality, and more. Expertise across 18+ industries.',
    keywords: ['industry marketing solutions', 'healthcare marketing', 'education marketing', 'real estate marketing', 'ecommerce marketing'],
    h1: 'Industries We Serve',
    ogType: 'website',
    schemaType: 'service'
  },

  '/industries/healthcare': {
    title: 'Healthcare Digital Marketing | Medical Practice Marketing',
    description: 'Digital marketing for healthcare providers. Patient acquisition, medical SEO, healthcare PPC, and reputation management for hospitals, clinics, and practitioners.',
    keywords: ['healthcare marketing', 'medical practice marketing', 'healthcare SEO', 'medical PPC', 'patient acquisition'],
    h1: 'Healthcare Digital Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Healthcare Marketing'
  },

  '/industries/education': {
    title: 'Education Marketing | School & University Digital Marketing',
    description: 'Digital marketing for educational institutions. Student recruitment, education SEO, social media for schools, and enrollment marketing.',
    keywords: ['education marketing', 'school marketing', 'university marketing', 'student recruitment', 'education SEO'],
    h1: 'Education Marketing Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Education Marketing'
  },

  '/industries/real-estate': {
    title: 'Real Estate Marketing | Property Marketing & Lead Generation',
    description: 'Real estate digital marketing services. Property listing ads, real estate SEO, virtual tours, and lead generation for agents and developers.',
    keywords: ['real estate marketing', 'property marketing', 'real estate SEO', 'property ads', 'real estate leads'],
    h1: 'Real Estate Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Real Estate Marketing'
  },

  '/industries/ecommerce': {
    title: 'Ecommerce Marketing | Online Store Growth & Sales',
    description: 'Ecommerce digital marketing. Product SEO, shopping ads, marketplace optimization, conversion rate optimization, and sales growth strategies.',
    keywords: ['ecommerce marketing', 'online store marketing', 'product SEO', 'shopping ads', 'ecommerce growth'],
    h1: 'Ecommerce Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Ecommerce Marketing'
  },

  '/industries/hospitality': {
    title: 'Hospitality Marketing | Hotel & Restaurant Marketing',
    description: 'Digital marketing for hotels, restaurants, and hospitality businesses. Booking optimization, review management, and local SEO.',
    keywords: ['hospitality marketing', 'hotel marketing', 'restaurant marketing', 'booking optimization', 'hospitality SEO'],
    h1: 'Hospitality Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Hospitality Marketing'
  },

  '/industries/automotive': {
    title: 'Automotive Marketing | Car Dealership Digital Marketing',
    description: 'Digital marketing for automotive industry. Dealership marketing, vehicle ads, auto SEO, and lead generation for car dealers.',
    keywords: ['automotive marketing', 'car dealership marketing', 'vehicle ads', 'auto SEO', 'dealership leads'],
    h1: 'Automotive Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Automotive Marketing'
  },

  '/industries/fashion': {
    title: 'Fashion Marketing | Clothing Brand Digital Marketing',
    description: 'Digital marketing for fashion brands. Fashion ecommerce, influencer marketing, brand awareness, and social commerce strategies.',
    keywords: ['fashion marketing', 'clothing brand marketing', 'fashion ecommerce', 'fashion influencers', 'fashion SEO'],
    h1: 'Fashion Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Fashion Marketing'
  },

  '/industries/legal': {
    title: 'Legal Marketing | Law Firm Digital Marketing & SEO',
    description: 'Digital marketing for law firms and attorneys. Legal SEO, lawyer PPC, content marketing, and client acquisition strategies.',
    keywords: ['legal marketing', 'law firm marketing', 'lawyer SEO', 'attorney marketing', 'legal leads'],
    h1: 'Legal Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Legal Marketing'
  },

  '/industries/manufacturing': {
    title: 'Manufacturing Marketing | Industrial B2B Digital Marketing',
    description: 'Digital marketing for manufacturers. B2B lead generation, industrial SEO, trade show marketing, and supply chain marketing.',
    keywords: ['manufacturing marketing', 'industrial marketing', 'B2B manufacturing', 'industrial SEO', 'manufacturing leads'],
    h1: 'Manufacturing Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Manufacturing Marketing'
  },

  '/industries/agriculture': {
    title: 'Agriculture Marketing | Agribusiness Digital Marketing',
    description: 'Digital marketing for agriculture and agribusiness. Farm marketing, agricultural products, agritech promotion, and rural marketing.',
    keywords: ['agriculture marketing', 'agribusiness marketing', 'farm marketing', 'agritech marketing', 'agricultural SEO'],
    h1: 'Agriculture Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Agriculture Marketing'
  },

  '/industries/logistics': {
    title: 'Logistics Marketing | Supply Chain & Transportation Marketing',
    description: 'Digital marketing for logistics and transportation. Supply chain marketing, freight marketing, logistics SEO, and B2B lead generation.',
    keywords: ['logistics marketing', 'supply chain marketing', 'transportation marketing', 'freight marketing', 'logistics SEO'],
    h1: 'Logistics Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Logistics Marketing'
  },

  '/industries/construction': {
    title: 'Construction Marketing | Contractor Digital Marketing',
    description: 'Digital marketing for construction companies and contractors. Project marketing, construction SEO, contractor leads, and B2B marketing.',
    keywords: ['construction marketing', 'contractor marketing', 'construction SEO', 'contractor leads', 'construction company marketing'],
    h1: 'Construction Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Construction Marketing'
  },

  '/industries/retail': {
    title: 'Retail Marketing | Store Promotion & Customer Acquisition',
    description: 'Digital marketing for retail businesses. Local retail marketing, omnichannel strategies, retail SEO, and foot traffic generation.',
    keywords: ['retail marketing', 'store marketing', 'retail SEO', 'retail advertising', 'store promotion'],
    h1: 'Retail Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Retail Marketing'
  },

  '/industries/technology': {
    title: 'Technology Marketing | SaaS & IT Company Digital Marketing',
    description: 'Digital marketing for technology companies. SaaS marketing, IT services promotion, tech SEO, and software lead generation.',
    keywords: ['technology marketing', 'SaaS marketing', 'IT marketing', 'tech company marketing', 'software marketing'],
    h1: 'Technology Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Technology Marketing'
  },

  '/industries/finance': {
    title: 'Financial Services Marketing | Bank & Fintech Digital Marketing',
    description: 'Digital marketing for financial services. Banking marketing, fintech promotion, investment marketing, and financial services SEO.',
    keywords: ['financial services marketing', 'bank marketing', 'fintech marketing', 'investment marketing', 'finance SEO'],
    h1: 'Financial Services Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Finance Marketing'
  },

  '/industries/entertainment': {
    title: 'Entertainment Marketing | Event & Media Digital Marketing',
    description: 'Digital marketing for entertainment industry. Event promotion, media marketing, ticket sales, and audience engagement strategies.',
    keywords: ['entertainment marketing', 'event marketing', 'media marketing', 'ticket sales', 'audience engagement'],
    h1: 'Entertainment Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Entertainment Marketing'
  },

  '/industries/non-profit': {
    title: 'Non-Profit Marketing | Charity & NGO Digital Marketing',
    description: 'Digital marketing for non-profits and NGOs. Fundraising campaigns, donor acquisition, cause marketing, and volunteer recruitment.',
    keywords: ['non-profit marketing', 'charity marketing', 'NGO marketing', 'fundraising campaigns', 'donor acquisition'],
    h1: 'Non-Profit Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Non-Profit Marketing'
  },

  '/industries/sports': {
    title: 'Sports Marketing | Athletic Club & Team Digital Marketing',
    description: 'Digital marketing for sports organizations. Fan engagement, ticket sales, sponsorship marketing, and sports brand building.',
    keywords: ['sports marketing', 'athletic marketing', 'fan engagement', 'sports branding', 'ticket marketing'],
    h1: 'Sports Marketing',
    ogType: 'service',
    schemaType: 'service',
    category: 'Sports Marketing'
  },

  // ============================================================================
  // SERVICE SUB-PAGES
  // ============================================================================
  '/services/seo/local-seo': {
    title: 'Local SEO Services | Rank in Google Maps & Local Search',
    description: 'Professional local SEO services. Google My Business optimization, local citations, map pack ranking, and location-based SEO.',
    keywords: ['local SEO', 'Google My Business', 'local search optimization', 'map pack ranking', 'local citations'],
    h1: 'Local SEO Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Local SEO'
  },

  '/services/seo/technical-seo': {
    title: 'Technical SEO Services | Website Speed, Structure & Indexing',
    description: 'Technical SEO services to improve website performance. Site speed optimization, crawlability, indexing, and technical audits.',
    keywords: ['technical SEO', 'site speed optimization', 'SEO audit', 'website crawlability', 'indexing optimization'],
    h1: 'Technical SEO Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Technical SEO'
  },

  '/services/ppc/google-shopping': {
    title: 'Google Shopping Ads | Product Listing Ads Management',
    description: 'Google Shopping Ads management. Product feed optimization, shopping campaign setup, bidding strategies, and ROI maximization.',
    keywords: ['Google Shopping Ads', 'product listing ads', 'shopping campaigns', 'product feed optimization', 'ecommerce PPC'],
    h1: 'Google Shopping Ads Management',
    ogType: 'service',
    schemaType: 'service',
    category: 'Shopping Ads'
  },

  '/services/ppc/display-ads': {
    title: 'Display Advertising | Banner Ads & Remarketing Campaigns',
    description: 'Display advertising and remarketing services. Banner ads, responsive display ads, audience targeting, and brand awareness campaigns.',
    keywords: ['display advertising', 'banner ads', 'remarketing', 'display campaigns', 'brand awareness ads'],
    h1: 'Display Advertising Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Display Ads'
  },

  '/services/social-media/instagram': {
    title: 'Instagram Marketing | Content, Ads & Influencer Marketing',
    description: 'Instagram marketing services. Content creation, Instagram ads, influencer partnerships, stories, reels, and engagement strategies.',
    keywords: ['Instagram marketing', 'Instagram ads', 'Instagram content', 'Instagram influencers', 'Instagram growth'],
    h1: 'Instagram Marketing Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Instagram Marketing'
  },

  '/services/social-media/facebook': {
    title: 'Facebook Marketing | Ads, Content & Community Management',
    description: 'Facebook marketing services. Facebook ads, content strategy, community management, page optimization, and engagement tactics.',
    keywords: ['Facebook marketing', 'Facebook ads', 'Facebook content', 'community management', 'Facebook growth'],
    h1: 'Facebook Marketing Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Facebook Marketing'
  },

  '/services/content/copywriting': {
    title: 'Copywriting Services | Website Copy, Sales Copy & More',
    description: 'Professional copywriting services. Website copy, sales pages, email copy, ad copy, and persuasive content that converts.',
    keywords: ['copywriting services', 'website copy', 'sales copy', 'email copy', 'ad copy'],
    h1: 'Professional Copywriting Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Copywriting'
  },

  '/services/content/blog-writing': {
    title: 'Blog Writing Services | SEO Blog Posts & Articles',
    description: 'SEO blog writing services. Engaging blog posts, articles, thought leadership content, and regular content creation.',
    keywords: ['blog writing', 'SEO blog posts', 'article writing', 'content writing', 'blog content'],
    h1: 'Blog Writing Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Blog Writing'
  },

  '/services/web-design/ecommerce': {
    title: 'Ecommerce Website Development | Online Store Design',
    description: 'Custom ecommerce website development. Shopify, WooCommerce, Magento development. Secure, scalable online stores.',
    keywords: ['ecommerce development', 'online store development', 'Shopify development', 'WooCommerce', 'ecommerce website'],
    h1: 'Ecommerce Website Development',
    ogType: 'service',
    schemaType: 'service',
    category: 'Ecommerce Development'
  },

  '/services/web-design/wordpress': {
    title: 'WordPress Development | Custom WordPress Websites',
    description: 'Professional WordPress development. Custom themes, plugin development, WordPress optimization, and maintenance services.',
    keywords: ['WordPress development', 'WordPress website', 'custom WordPress', 'WordPress themes', 'WordPress plugins'],
    h1: 'WordPress Development Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'WordPress Development'
  },

  // ============================================================================
  // LEGAL PAGES
  // ============================================================================
  '/privacy-policy': {
    title: 'Privacy Policy | Inchtomilez Data Protection & Privacy',
    description: 'Privacy policy for Inchtomilez. Learn how we collect, use, and protect your personal information and data.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'data privacy', 'personal information'],
    h1: 'Privacy Policy',
    ogType: 'website',
    schemaType: 'website'
  },

  '/terms-of-service': {
    title: 'Terms of Service | Inchtomilez Terms & Conditions',
    description: 'Terms of service for using Inchtomilez website and services. User agreement, service terms, and legal conditions.',
    keywords: ['terms of service', 'terms and conditions', 'user agreement', 'service terms', 'legal terms'],
    h1: 'Terms of Service',
    ogType: 'website',
    schemaType: 'website'
  },

  '/cookie-policy': {
    title: 'Cookie Policy | How We Use Cookies | Inchtomilez',
    description: 'Cookie policy explaining how Inchtomilez uses cookies and tracking technologies on our website.',
    keywords: ['cookie policy', 'cookies', 'tracking', 'website cookies', 'privacy'],
    h1: 'Cookie Policy',
    ogType: 'website',
    schemaType: 'website'
  },

  '/disclaimer': {
    title: 'Disclaimer | Legal Disclaimer | Inchtomilez',
    description: 'Legal disclaimer for Inchtomilez website and services. Limitations of liability and legal notices.',
    keywords: ['disclaimer', 'legal disclaimer', 'liability', 'legal notice', 'terms'],
    h1: 'Disclaimer',
    ogType: 'website',
    schemaType: 'website'
  },

  '/refund-policy': {
    title: 'Refund Policy | Cancellation & Refund Terms | Inchtomilez',
    description: 'Refund and cancellation policy for Inchtomilez services. Learn about our refund process and terms.',
    keywords: ['refund policy', 'cancellation policy', 'refunds', 'money back', 'service cancellation'],
    h1: 'Refund Policy',
    ogType: 'website',
    schemaType: 'website'
  },

  // ============================================================================
  // RESOURCE PAGES
  // ============================================================================
  '/resources': {
    title: 'Digital Marketing Resources | Guides, Tools & Templates',
    description: 'Free digital marketing resources. Guides, ebooks, tools, templates, and resources to grow your business.',
    keywords: ['marketing resources', 'free guides', 'marketing tools', 'marketing templates', 'digital marketing resources'],
    h1: 'Digital Marketing Resources',
    ogType: 'website',
    schemaType: 'website'
  },

  '/downloads': {
    title: 'Downloads | Free Marketing Templates & Guides',
    description: 'Download free marketing templates, guides, checklists, and resources. Practical tools for your business growth.',
    keywords: ['marketing downloads', 'free templates', 'marketing guides', 'free resources', 'marketing tools'],
    h1: 'Free Downloads',
    ogType: 'website',
    schemaType: 'website'
  },

  '/ebooks': {
    title: 'Free Ebooks | Digital Marketing Guides & Ebooks',
    description: 'Download free digital marketing ebooks. Comprehensive guides on SEO, PPC, social media, and content marketing.',
    keywords: ['marketing ebooks', 'free ebooks', 'digital marketing guides', 'SEO ebook', 'marketing books'],
    h1: 'Free Marketing Ebooks',
    ogType: 'website',
    schemaType: 'website'
  },

  '/webinars': {
    title: 'Webinars | Digital Marketing Training & Events',
    description: 'Join our digital marketing webinars. Live training sessions, expert insights, and Q&A on SEO, PPC, and social media.',
    keywords: ['marketing webinars', 'digital marketing training', 'online events', 'marketing workshops', 'SEO training'],
    h1: 'Upcoming Webinars',
    ogType: 'website',
    schemaType: 'website'
  },

  '/tools': {
    title: 'Free Marketing Tools | SEO, PPC & Social Media Tools',
    description: 'Free digital marketing tools. SEO analyzers, keyword research tools, social media planners, and ROI calculators.',
    keywords: ['marketing tools', 'free SEO tools', 'keyword tools', 'social media tools', 'marketing calculators'],
    h1: 'Free Marketing Tools',
    ogType: 'website',
    schemaType: 'website'
  },

  '/glossary': {
    title: 'Marketing Glossary | Digital Marketing Terms & Definitions',
    description: 'Digital marketing glossary with definitions of SEO, PPC, social media, and marketing terms. Learn marketing terminology.',
    keywords: ['marketing glossary', 'marketing terms', 'SEO definitions', 'marketing dictionary', 'digital marketing terms'],
    h1: 'Marketing Glossary',
    ogType: 'website',
    schemaType: 'website'
  },

  '/sitemap-page': {
    title: 'Sitemap | Browse All Pages | Inchtomilez',
    description: 'Complete sitemap of Inchtomilez website. Browse all pages, services, industries, blog posts, and resources.',
    keywords: ['sitemap', 'site map', 'website pages', 'navigation', 'all pages'],
    h1: 'Website Sitemap',
    ogType: 'website',
    schemaType: 'website'
  },

  // Add more service pages
  '/services/influencer-marketing': {
    title: 'Influencer Marketing Services | Brand Collaborations & Campaigns',
    description: 'Influencer marketing services. Influencer partnerships, campaign management, brand collaborations, and social media influencer outreach.',
    keywords: ['influencer marketing', 'influencer partnerships', 'brand collaborations', 'influencer campaigns', 'social media influencers'],
    h1: 'Influencer Marketing Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Influencer Marketing'
  },

  '/services/digital-marketing': {
    title: 'Digital Marketing Services | Complete Online Marketing Solutions',
    description: 'Comprehensive digital marketing services. SEO, PPC, social media, content, email, and analytics. Full-service digital marketing agency.',
    keywords: ['digital marketing services', 'online marketing', 'internet marketing', 'digital agency', 'full-service marketing'],
    h1: 'Digital Marketing Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'Digital Marketing'
  },

  '/services/btl-activations': {
    title: 'BTL Activations | Below The Line Marketing & Events',
    description: 'Below the line marketing and activations. Experiential marketing, event marketing, promotional activities, and direct engagement campaigns.',
    keywords: ['BTL activations', 'below the line marketing', 'experiential marketing', 'event marketing', 'promotional activities'],
    h1: 'BTL Activations',
    ogType: 'service',
    schemaType: 'service',
    category: 'BTL Marketing'
  },

  '/services/ooh-advertising': {
    title: 'OOH Advertising | Outdoor Advertising & Billboards',
    description: 'Out-of-home advertising services. Billboards, transit ads, street furniture advertising, and outdoor media planning.',
    keywords: ['OOH advertising', 'outdoor advertising', 'billboards', 'transit ads', 'outdoor media'],
    h1: 'OOH Advertising Services',
    ogType: 'service',
    schemaType: 'service',
    category: 'OOH Advertising'
  },
};
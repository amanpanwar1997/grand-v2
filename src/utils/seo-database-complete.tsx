/**
 * ============================================================================
 * INCHTOMILEZ - ADVANCED SEO DATABASE
 * ============================================================================
 *
 * Version: 5.0
 *
 * PURPOSE
 * -------
 * Central SEO metadata database for all important indexable static routes.
 *
 * PRIMARY SEO OBJECTIVE
 * ---------------------
 * Establish Inchtomilez as a highly relevant entity for:
 *
 * - Digital Marketing Agency in Indore
 * - Advertising Agency in Indore
 * - SEO Company in Indore
 * - Google Ads Agency in Indore
 * - Social Media Marketing Agency in Indore
 * - Website Development Company in Indore
 * - Branding Agency in Indore
 * - Local SEO Services in Indore
 *
 * IMPORTANT ARCHITECTURE
 * ----------------------
 *
 * 1. Homepage owns:
 *    "Digital Marketing Agency in Indore"
 *
 * 2. Service pages own individual service intent.
 *
 * 3. Sub-service pages own long-tail service intent.
 *
 * 4. Industry pages own industry-specific marketing intent.
 *
 * 5. Blog article SEO is generated dynamically by BlogDetailPage.
 *    We DO NOT hardcode hundreds of article entries here.
 *
 * This reduces:
 * - keyword cannibalization
 * - outdated URLs
 * - duplicate metadata
 * - maintenance problems
 *
 * ============================================================================
 */

import type { SEOData } from "./seo-master";


// ============================================================================
// CONSTANTS
// ============================================================================

const BRAND = "Inchtomilez";

const CITY = "Indore";


// ============================================================================
// SEO FACTORIES
// ============================================================================

/**
 * Standard website / informational page.
 */
function websiteSEO(
  title: string,
  description: string,
  keywords: string[],
  h1: string
): SEOData {
  return {
    title,
    description,
    keywords,
    h1,
    ogType: "website",
    schemaType: "website",
  };
}


/**
 * Organization / company page.
 */
function organizationSEO(
  title: string,
  description: string,
  keywords: string[],
  h1: string
): SEOData {
  return {
    title,
    description,
    keywords,
    h1,
    ogType: "website",
    schemaType: "organization",
  };
}


/**
 * Commercial service page.
 */
function serviceSEO(
  title: string,
  description: string,
  keywords: string[],
  h1: string,
  category: string
): SEOData {
  return {
    title,
    description,
    keywords,
    h1,
    ogType: "service",
    schemaType: "service",
    category,
  };
}


// ============================================================================
// COMPLETE SEO DATA
// ============================================================================

export const COMPLETE_SEO_DATA: Record<string, SEOData> = {

  // ==========================================================================
  // HOMEPAGE
  // PRIMARY KEYWORD: DIGITAL MARKETING AGENCY IN INDORE
  // ==========================================================================

  "/": {
    title:
      "Digital Marketing & Advertising Agency in Indore | Inchtomilez",

    description:
      "Inchtomilez is a digital marketing and advertising agency in Indore offering SEO, Google Ads, social media marketing, branding and website development.",

    keywords: [
      "digital marketing agency in Indore",
      "digital marketing company Indore",
      "advertising agency in Indore",
      "online marketing agency Indore",
      "performance marketing agency Indore",
      "SEO company Indore",
      "Google Ads agency Indore",
      "social media marketing agency Indore",
      "website development company Indore",
      "branding agency Indore",
      "Inchtomilez",
    ],

    h1:
      "Digital Marketing Agency in Indore for Measurable Business Growth",

    ogType: "website",

    schemaType: "organization",
  },


  // ==========================================================================
  // MAIN PAGES
  // ==========================================================================

  "/about": organizationSEO(
    "About Inchtomilez | Digital Marketing Agency in Indore",

    "Learn about Inchtomilez, an Indore-based digital marketing and advertising agency focused on transparent strategy, measurable growth and long-term client partnerships.",

    [
      "about Inchtomilez",
      "digital marketing agency Indore",
      "advertising agency Indore",
      "marketing company Indore",
      "Inchtomilez team",
      "Inchtomilez Indore",
    ],

    "About Inchtomilez"
  ),


  "/services": serviceSEO(
    "Marketing & Advertising Services in Indore | Inchtomilez",

    "Explore SEO, Google Ads, social media marketing, branding, web development, digital marketing, BTL and advertising services from Inchtomilez in Indore.",

    [
      "digital marketing services Indore",
      "advertising services Indore",
      "SEO services Indore",
      "Google Ads services Indore",
      "social media marketing Indore",
      "website development Indore",
      "branding services Indore",
    ],

    "Marketing & Advertising Services in Indore",

    "Marketing and Advertising"
  ),


  "/industries": serviceSEO(
    "Industry-Focused Digital Marketing Solutions | Inchtomilez",

    "Digital marketing solutions for healthcare, real estate, education, ecommerce, automotive, manufacturing, hospitality and other growth-focused industries.",

    [
      "industry digital marketing",
      "healthcare marketing Indore",
      "real estate marketing Indore",
      "education marketing Indore",
      "ecommerce marketing",
      "B2B marketing agency Indore",
    ],

    "Digital Marketing Solutions for Different Industries",

    "Industry Marketing"
  ),


  "/blogs": websiteSEO(
    "Digital Marketing Blog | SEO, Google Ads & Growth | Inchtomilez",

    "Read practical guides on SEO, Google Ads, social media, content marketing, website development, branding and digital growth from the Inchtomilez team.",

    [
      "digital marketing blog",
      "SEO blog India",
      "Google Ads guides",
      "social media marketing blog",
      "digital marketing tips",
      "marketing blog Indore",
    ],

    "Digital Marketing Insights, Guides & Strategies"
  ),


  "/faqs": {
    title:
      "Digital Marketing FAQs | SEO, Ads & Services | Inchtomilez",

    description:
      "Get answers to common questions about SEO, Google Ads, social media marketing, websites, digital marketing costs, timelines and working with Inchtomilez.",

    keywords: [
      "digital marketing FAQs",
      "SEO FAQ",
      "Google Ads questions",
      "digital marketing pricing Indore",
      "marketing agency questions",
    ],

    h1:
      "Frequently Asked Questions",

    ogType: "website",

    schemaType: "faq",
  },


  "/contact": organizationSEO(
    "Contact Inchtomilez | Digital Marketing Agency in Indore",

    "Contact Inchtomilez Digital Marketing And Advertising Agency in Vijay Nagar, Indore. Call +91-9009970709 to discuss SEO, Google Ads, social media and website growth.",

    [
      "contact Inchtomilez",
      "digital marketing agency Vijay Nagar Indore",
      "marketing agency near me",
      "advertising agency Vijay Nagar",
      "SEO company Indore contact",
      "Inchtomilez phone",
    ],

    "Contact Inchtomilez in Indore"
  ),


  // ==========================================================================
  // CORE SERVICE PAGES
  // ==========================================================================

  "/services/search-engine-optimization-seo": serviceSEO(
    "SEO Company in Indore | Local & Technical SEO | Inchtomilez",

    "SEO services in Indore focused on organic rankings, qualified traffic and leads. Get local SEO, technical SEO, on-page SEO and content optimization from Inchtomilez.",

    [
      "SEO company in Indore",
      "SEO agency Indore",
      "SEO services Indore",
      "best SEO company Indore",
      "local SEO Indore",
      "technical SEO Indore",
      "organic SEO services Indore",
      "Google ranking company Indore",
    ],

    "SEO Company in Indore Focused on Rankings, Traffic & Leads",

    "Search Engine Optimization"
  ),


  "/services/ppc-google-ads": serviceSEO(
    "Google Ads Agency in Indore | PPC Management | Inchtomilez",

    "Google Ads and PPC management in Indore for businesses focused on qualified leads, measurable conversions, lower acquisition costs and transparent campaign reporting.",

    [
      "Google Ads agency Indore",
      "PPC company Indore",
      "Google Ads expert Indore",
      "PPC management Indore",
      "Google advertising agency Indore",
      "paid search agency Indore",
      "lead generation agency Indore",
    ],

    "Google Ads Agency in Indore for Performance-Driven Campaigns",

    "Google Ads and PPC"
  ),


  "/services/social-media-marketing": serviceSEO(
    "Social Media Marketing Agency in Indore | Inchtomilez",

    "Social media marketing in Indore including strategy, creative content, reels, community management, Meta Ads and campaigns built to grow visibility and generate leads.",

    [
      "social media marketing agency Indore",
      "social media company Indore",
      "Instagram marketing Indore",
      "Facebook marketing Indore",
      "Meta Ads agency Indore",
      "social media management Indore",
    ],

    "Social Media Marketing Agency in Indore",

    "Social Media Marketing"
  ),


  "/services/content-marketing": serviceSEO(
    "Content Marketing Agency in Indore | Inchtomilez",

    "Content marketing services in Indore covering strategy, SEO content, blogs, website copy and campaign content designed to build visibility, trust and conversions.",

    [
      "content marketing agency Indore",
      "content writing services Indore",
      "SEO content Indore",
      "blog writing Indore",
      "website content writing Indore",
      "copywriting agency Indore",
    ],

    "Content Marketing Services That Build Authority & Demand",

    "Content Marketing"
  ),


  "/services/branding-identity": serviceSEO(
    "Branding Agency in Indore | Brand Identity | Inchtomilez",

    "Branding services in Indore including brand strategy, identity design, visual systems, positioning and communication built for memorable and consistent brands.",

    [
      "branding agency Indore",
      "brand identity Indore",
      "branding company Indore",
      "logo design Indore",
      "brand strategy Indore",
      "creative agency Indore",
    ],

    "Branding & Identity Agency in Indore",

    "Branding and Identity"
  ),


  "/services/web-design-development": serviceSEO(
    "Website Development Company in Indore | Inchtomilez",

    "Website design and development in Indore for fast, responsive and conversion-focused business websites, ecommerce stores, WordPress sites and custom web experiences.",

    [
      "website development company Indore",
      "web development company Indore",
      "website designer Indore",
      "web design agency Indore",
      "React development Indore",
      "WordPress development Indore",
      "ecommerce website development Indore",
    ],

    "Website Development Company in Indore",

    "Web Design and Development"
  ),


  "/services/video-media-production": serviceSEO(
    "Video Production Company in Indore | Inchtomilez",

    "Professional video and media production in Indore for advertisements, social media content, corporate films, product videos, reels and digital campaigns.",

    [
      "video production company Indore",
      "video agency Indore",
      "corporate video Indore",
      "advertising video Indore",
      "social media video production Indore",
      "media production Indore",
    ],

    "Video & Media Production in Indore",

    "Video and Media Production"
  ),


  "/services/email-marketing": serviceSEO(
    "Email Marketing Services in Indore | Inchtomilez",

    "Email marketing strategy, campaigns, automation, segmentation and performance optimization designed to nurture leads, retain customers and increase revenue.",

    [
      "email marketing services Indore",
      "email marketing agency Indore",
      "email automation services",
      "email campaign management",
      "lead nurturing services",
    ],

    "Email Marketing & Automation Services",

    "Email Marketing"
  ),


  "/services/ecommerce-marketing": serviceSEO(
    "Ecommerce Marketing Agency in Indore | Inchtomilez",

    "Ecommerce marketing services for online brands including paid ads, product marketing, SEO, marketplace optimization, conversion strategy and customer acquisition.",

    [
      "ecommerce marketing agency Indore",
      "ecommerce SEO Indore",
      "online store marketing",
      "Shopify marketing Indore",
      "ecommerce advertising",
      "marketplace marketing",
    ],

    "Ecommerce Marketing for Sustainable Online Growth",

    "Ecommerce Marketing"
  ),


  "/services/analytics-reporting": serviceSEO(
    "Marketing Analytics & Reporting Services | Inchtomilez Indore",

    "Marketing analytics and reporting services with campaign tracking, performance dashboards, conversion analysis and actionable insights for better business decisions.",

    [
      "marketing analytics Indore",
      "digital marketing reporting",
      "campaign analytics",
      "Google Analytics services Indore",
      "marketing dashboard",
      "ROI reporting",
    ],

    "Marketing Analytics & Transparent Reporting",

    "Analytics and Reporting"
  ),


  "/services/btl-activations": serviceSEO(
    "BTL Activation Agency in Indore | Inchtomilez",

    "BTL activation and experiential marketing in Indore including brand activations, product launches, events, on-ground promotions and direct consumer engagement.",

    [
      "BTL activation agency Indore",
      "BTL marketing Indore",
      "brand activation Indore",
      "event marketing Indore",
      "experiential marketing Indore",
      "on ground promotion Indore",
    ],

    "BTL Activations & Experiential Marketing in Indore",

    "BTL Marketing"
  ),


  "/services/ooh-advertising": serviceSEO(
    "Outdoor Advertising Agency in Indore | OOH | Inchtomilez",

    "OOH and outdoor advertising services in Indore including billboards, hoardings, transit advertising, media planning and high-visibility outdoor campaigns.",

    [
      "outdoor advertising agency Indore",
      "OOH advertising Indore",
      "hoarding advertising Indore",
      "billboard advertising Indore",
      "outdoor media agency Indore",
      "transit advertising Indore",
    ],

    "OOH & Outdoor Advertising in Indore",

    "OOH Advertising"
  ),


  "/services/influencer-marketing": serviceSEO(
    "Influencer Marketing Agency in Indore | Inchtomilez",

    "Influencer marketing campaigns for brands including creator discovery, outreach, campaign strategy, content coordination and performance measurement.",

    [
      "influencer marketing agency Indore",
      "influencer agency Indore",
      "creator marketing Indore",
      "Instagram influencer marketing",
      "brand collaboration agency",
    ],

    "Influencer Marketing Campaigns for Brands",

    "Influencer Marketing"
  ),


  "/services/digital-marketing": serviceSEO(
    "Digital Marketing Services in Indore | Inchtomilez",

    "Integrated digital marketing services in Indore combining SEO, Google Ads, social media, content, websites and analytics into one measurable growth strategy.",

    [
      "digital marketing services Indore",
      "online marketing services Indore",
      "internet marketing Indore",
      "performance marketing Indore",
      "digital marketing solutions Indore",
    ],

    "Integrated Digital Marketing Services in Indore",

    "Digital Marketing"
  ),


  // ==========================================================================
  // SEO SUB-SERVICES
  // ==========================================================================

  "/services/search-engine-optimization-seo/local-seo": serviceSEO(
    "Local SEO Services in Indore | Google Maps Ranking | Inchtomilez",

    "Local SEO services in Indore focused on Google Business Profile optimization, local rankings, Maps visibility, citations and location-based customer acquisition.",

    [
      "local SEO services Indore",
      "Google Maps ranking Indore",
      "Google Business Profile optimization Indore",
      "GMB SEO Indore",
      "local search company Indore",
      "map pack ranking Indore",
    ],

    "Local SEO Services in Indore for Google Maps Visibility",

    "Local SEO"
  ),


  "/services/search-engine-optimization-seo/technical-seo": serviceSEO(
    "Technical SEO Services in Indore | Inchtomilez",

    "Technical SEO services covering crawlability, indexing, site architecture, Core Web Vitals, structured data, internal linking and technical search performance.",

    [
      "technical SEO services Indore",
      "technical SEO audit Indore",
      "Core Web Vitals optimization",
      "website indexing SEO",
      "crawlability optimization",
      "schema markup services",
    ],

    "Technical SEO Services for Stronger Search Performance",

    "Technical SEO"
  ),


  // ==========================================================================
  // PPC SUB-SERVICES
  // ==========================================================================

  "/services/ppc-google-ads/google-shopping": serviceSEO(
    "Google Shopping Ads Agency in Indore | Inchtomilez",

    "Google Shopping Ads management for ecommerce brands including Merchant Center setup, product feed optimization, campaign structure, bidding and ROAS improvement.",

    [
      "Google Shopping Ads Indore",
      "Google Merchant Center Indore",
      "shopping ads agency",
      "product listing ads",
      "ecommerce Google Ads Indore",
    ],

    "Google Shopping Ads Management",

    "Google Shopping Ads"
  ),


  "/services/ppc-google-ads/display-ads": serviceSEO(
    "Display Advertising Agency in Indore | Inchtomilez",

    "Display advertising and remarketing campaigns using audience targeting, responsive display ads, visual creatives and performance optimization.",

    [
      "display advertising Indore",
      "Google Display Ads Indore",
      "remarketing agency Indore",
      "banner advertising Indore",
      "retargeting campaigns",
    ],

    "Display Advertising & Remarketing Services",

    "Display Advertising"
  ),


  // ==========================================================================
  // SOCIAL MEDIA SUB-SERVICES
  // ==========================================================================

  "/services/social-media-marketing/instagram": serviceSEO(
    "Instagram Marketing Agency in Indore | Inchtomilez",

    "Instagram marketing in Indore with reels, content strategy, creatives, community management, influencer collaboration and Instagram advertising.",

    [
      "Instagram marketing agency Indore",
      "Instagram management Indore",
      "Instagram Ads Indore",
      "reels marketing Indore",
      "Instagram content agency Indore",
    ],

    "Instagram Marketing Services in Indore",

    "Instagram Marketing"
  ),


  "/services/social-media-marketing/facebook": serviceSEO(
    "Facebook Marketing Agency in Indore | Inchtomilez",

    "Facebook marketing services in Indore including Meta Ads, page management, creative campaigns, audience targeting, lead generation and remarketing.",

    [
      "Facebook marketing agency Indore",
      "Facebook Ads Indore",
      "Meta Ads agency Indore",
      "Facebook lead generation Indore",
      "Facebook page management Indore",
    ],

    "Facebook Marketing & Meta Ads in Indore",

    "Facebook Marketing"
  ),


  "/services/social-media-marketing/influencer-marketing": serviceSEO(
    "Social Media Influencer Marketing | Inchtomilez Indore",

    "Influencer campaign strategy, creator identification, outreach, collaboration management and performance tracking for social media campaigns.",

    [
      "influencer marketing Indore",
      "social media influencer agency",
      "creator collaborations",
      "Instagram influencer campaign",
      "brand influencer marketing",
    ],

    "Social Media Influencer Marketing",

    "Influencer Marketing"
  ),


  // ==========================================================================
  // CONTENT SUB-SERVICES
  // ==========================================================================

  "/services/content-marketing/copywriting": serviceSEO(
    "Copywriting Services in Indore | Website & Ad Copy | Inchtomilez",

    "Professional copywriting for websites, advertisements, landing pages, campaigns, social media and sales content designed to communicate clearly and convert.",

    [
      "copywriting services Indore",
      "website copywriting Indore",
      "ad copywriter Indore",
      "sales copywriting",
      "landing page copywriting",
    ],

    "Professional Copywriting Services",

    "Copywriting"
  ),


  "/services/content-marketing/blog-writing": serviceSEO(
    "SEO Blog Writing Services in Indore | Inchtomilez",

    "SEO-focused blog writing services including keyword-led articles, informative content, topical authority development and ongoing content creation.",

    [
      "blog writing services Indore",
      "SEO content writing Indore",
      "article writing Indore",
      "SEO blogs",
      "content writer Indore",
    ],

    "SEO Blog Writing & Content Services",

    "Blog Writing"
  ),


  // ==========================================================================
  // WEB DEVELOPMENT SUB-SERVICES
  // ==========================================================================

  "/services/web-design-development/ecommerce": serviceSEO(
    "Ecommerce Website Development in Indore | Inchtomilez",

    "Ecommerce website development in Indore for responsive, secure and conversion-focused online stores across Shopify, WooCommerce and custom platforms.",

    [
      "ecommerce website development Indore",
      "Shopify developer Indore",
      "WooCommerce development Indore",
      "online store development Indore",
      "ecommerce web design Indore",
    ],

    "Ecommerce Website Development in Indore",

    "Ecommerce Development"
  ),


  "/services/web-design-development/wordpress": serviceSEO(
    "WordPress Development Company in Indore | Inchtomilez",

    "WordPress development in Indore including custom business websites, responsive design, performance optimization, theme customization and maintenance.",

    [
      "WordPress development Indore",
      "WordPress developer Indore",
      "WordPress company Indore",
      "WordPress website design Indore",
      "WordPress maintenance Indore",
    ],

    "WordPress Development Services in Indore",

    "WordPress Development"
  ),


  // ==========================================================================
  // INDUSTRIES
  // ==========================================================================

  "/industries/healthcare": serviceSEO(
    "Healthcare Digital Marketing Agency | Inchtomilez Indore",

    "Healthcare marketing for hospitals, clinics and doctors with patient lead generation, healthcare SEO, Google Ads, social media and reputation-focused strategies.",

    [
      "healthcare digital marketing Indore",
      "hospital marketing agency Indore",
      "doctor marketing Indore",
      "patient lead generation",
      "medical SEO Indore",
    ],

    "Healthcare Digital Marketing for Hospitals, Clinics & Doctors",

    "Healthcare Marketing"
  ),


  "/industries/education": serviceSEO(
    "Education Digital Marketing Agency | Inchtomilez Indore",

    "Digital marketing for schools, colleges, institutes and education brands focused on student enquiries, admissions, visibility and long-term brand growth.",

    [
      "education marketing agency Indore",
      "school marketing Indore",
      "college marketing Indore",
      "student lead generation",
      "education SEO",
    ],

    "Digital Marketing for Education & Admissions",

    "Education Marketing"
  ),


  "/industries/real-estate": serviceSEO(
    "Real Estate Digital Marketing Agency | Inchtomilez Indore",

    "Real estate marketing for developers, projects, agents and property businesses using lead generation, Meta Ads, Google Ads, creatives and digital strategy.",

    [
      "real estate marketing agency Indore",
      "property lead generation Indore",
      "real estate Google Ads Indore",
      "real estate Meta Ads",
      "property marketing agency",
    ],

    "Real Estate Marketing & Property Lead Generation",

    "Real Estate Marketing"
  ),


  "/industries/ecommerce": serviceSEO(
    "Ecommerce Digital Marketing Agency | Inchtomilez",

    "Growth marketing for ecommerce businesses with Google Ads, Meta Ads, SEO, marketplace optimization, content and conversion-focused acquisition strategies.",

    [
      "ecommerce digital marketing",
      "ecommerce marketing agency Indore",
      "online store marketing",
      "ecommerce SEO",
      "ecommerce advertising",
    ],

    "Ecommerce Digital Marketing & Sales Growth",

    "Ecommerce Marketing"
  ),


  "/industries/hospitality": serviceSEO(
    "Hotel & Hospitality Marketing Agency | Inchtomilez Indore",

    "Digital marketing for hotels, restaurants and hospitality businesses focused on bookings, local visibility, reviews, social media and customer acquisition.",

    [
      "hotel marketing Indore",
      "restaurant marketing Indore",
      "hospitality marketing agency",
      "hotel SEO",
      "restaurant social media marketing",
    ],

    "Digital Marketing for Hotels & Hospitality Brands",

    "Hospitality Marketing"
  ),


  "/industries/automotive": serviceSEO(
    "Automotive Digital Marketing Agency | Inchtomilez Indore",

    "Marketing for automotive dealerships, service centres and auto businesses using lead generation, paid advertising, SEO and social media campaigns.",

    [
      "automotive marketing Indore",
      "car dealership marketing Indore",
      "automobile lead generation",
      "auto SEO",
      "automotive advertising",
    ],

    "Automotive Digital Marketing & Lead Generation",

    "Automotive Marketing"
  ),


  "/industries/fashion": serviceSEO(
    "Fashion & Apparel Digital Marketing | Inchtomilez",

    "Digital marketing for fashion, apparel and lifestyle brands through social media, ecommerce campaigns, influencer marketing, branding and paid advertising.",

    [
      "fashion marketing agency",
      "fashion social media marketing",
      "apparel marketing",
      "fashion ecommerce marketing",
      "influencer marketing fashion",
    ],

    "Digital Marketing for Fashion & Apparel Brands",

    "Fashion Marketing"
  ),


  "/industries/legal": serviceSEO(
    "Digital Marketing for Law Firms | Inchtomilez",

    "Digital marketing for law firms and legal service providers using SEO, content, paid search and professional online visibility strategies.",

    [
      "law firm digital marketing",
      "legal SEO",
      "lawyer marketing",
      "legal Google Ads",
      "law firm lead generation",
    ],

    "Digital Marketing for Law Firms & Legal Services",

    "Legal Marketing"
  ),


  "/industries/manufacturing": serviceSEO(
    "Manufacturing & B2B Digital Marketing | Inchtomilez",

    "B2B digital marketing for manufacturers and industrial companies through SEO, lead generation, websites, content and performance-focused campaigns.",

    [
      "manufacturing marketing agency",
      "B2B marketing Indore",
      "industrial SEO",
      "manufacturer lead generation",
      "industrial digital marketing",
    ],

    "Digital Marketing for Manufacturing & B2B Companies",

    "Manufacturing Marketing"
  ),


  "/industries/agriculture": serviceSEO(
    "Agriculture & Agribusiness Digital Marketing | Inchtomilez",

    "Marketing for agriculture, agritech, farm equipment and agribusiness brands through digital campaigns, branding, websites and targeted customer acquisition.",

    [
      "agriculture marketing",
      "agribusiness marketing",
      "agritech digital marketing",
      "agriculture advertising",
      "farm equipment marketing",
    ],

    "Digital Marketing for Agriculture & Agribusiness",

    "Agriculture Marketing"
  ),


  "/industries/logistics": serviceSEO(
    "Logistics & Supply Chain Digital Marketing | Inchtomilez",

    "Digital marketing for logistics, transport, freight and supply-chain businesses focused on B2B visibility, lead generation, SEO and website performance.",

    [
      "logistics marketing",
      "transport marketing",
      "freight marketing",
      "logistics SEO",
      "B2B logistics lead generation",
    ],

    "Digital Marketing for Logistics & Supply Chain Companies",

    "Logistics Marketing"
  ),


  "/industries/construction": serviceSEO(
    "Construction Digital Marketing Agency | Inchtomilez",

    "Digital marketing for contractors, builders and construction companies using SEO, websites, paid advertising, lead generation and brand development.",

    [
      "construction marketing agency",
      "contractor marketing",
      "builder marketing Indore",
      "construction SEO",
      "construction lead generation",
    ],

    "Digital Marketing for Construction Companies",

    "Construction Marketing"
  ),


  "/industries/retail": serviceSEO(
    "Retail Digital Marketing Agency | Inchtomilez",

    "Retail marketing strategies combining local SEO, social media, advertising, customer acquisition and omnichannel campaigns for stores and retail brands.",

    [
      "retail marketing agency",
      "store marketing Indore",
      "retail advertising",
      "local retail SEO",
      "retail social media",
    ],

    "Digital Marketing for Retail Brands",

    "Retail Marketing"
  ),


  "/industries/technology": serviceSEO(
    "Technology & SaaS Digital Marketing | Inchtomilez",

    "Digital marketing for technology, software, SaaS and IT companies with B2B lead generation, SEO, content, paid campaigns and growth strategy.",

    [
      "SaaS marketing agency",
      "technology marketing",
      "IT company marketing",
      "software lead generation",
      "B2B SaaS SEO",
    ],

    "Digital Marketing for Technology & SaaS Companies",

    "Technology Marketing"
  ),


  "/industries/finance": serviceSEO(
    "Finance & Fintech Digital Marketing | Inchtomilez",

    "Digital marketing for financial services and fintech companies with compliant acquisition campaigns, content, SEO, paid media and digital brand strategy.",

    [
      "fintech marketing",
      "financial services marketing",
      "finance SEO",
      "financial advertising",
      "fintech lead generation",
    ],

    "Digital Marketing for Finance & Fintech",

    "Finance Marketing"
  ),


  "/industries/entertainment": serviceSEO(
    "Entertainment & Media Digital Marketing | Inchtomilez",

    "Digital campaigns for entertainment, media, events and production brands focused on audience growth, promotion, social engagement and visibility.",

    [
      "entertainment marketing",
      "media marketing",
      "event promotion",
      "entertainment social media",
      "audience marketing",
    ],

    "Digital Marketing for Entertainment & Media",

    "Entertainment Marketing"
  ),


  "/industries/non-profit": serviceSEO(
    "Non-Profit & NGO Digital Marketing | Inchtomilez",

    "Purpose-driven digital marketing for NGOs and non-profit organizations covering awareness, campaigns, fundraising communication and community engagement.",

    [
      "NGO digital marketing",
      "non-profit marketing",
      "charity marketing",
      "fundraising campaigns",
      "social cause marketing",
    ],

    "Digital Marketing for NGOs & Non-Profit Organizations",

    "Non-Profit Marketing"
  ),


  "/industries/sports": serviceSEO(
    "Sports & Fitness Digital Marketing | Inchtomilez",

    "Marketing for sports teams, gyms, fitness businesses and athletic brands through social media, lead generation, branding and digital advertising.",

    [
      "sports marketing",
      "gym marketing Indore",
      "fitness marketing agency",
      "sports social media",
      "fitness lead generation",
    ],

    "Digital Marketing for Sports & Fitness Brands",

    "Sports Marketing"
  ),


  // ==========================================================================
  // COMPANY / TRUST PAGES
  // ==========================================================================

  "/team": organizationSEO(
    "Our Team | Digital Marketing Experts at Inchtomilez",

    "Meet the people behind Inchtomilez across SEO, paid media, social media, web development, branding, creative production and digital strategy.",

    [
      "Inchtomilez team",
      "digital marketing experts Indore",
      "SEO experts Indore",
      "marketing professionals Indore",
    ],

    "Meet the Inchtomilez Team"
  ),


  "/careers": organizationSEO(
    "Digital Marketing Jobs in Indore | Careers at Inchtomilez",

    "Explore career opportunities at Inchtomilez in Indore across SEO, paid advertising, social media, content, design, development and digital marketing.",

    [
      "digital marketing jobs Indore",
      "SEO jobs Indore",
      "social media jobs Indore",
      "Inchtomilez careers",
      "marketing agency jobs Indore",
    ],

    "Build Your Career at Inchtomilez"
  ),


  "/testimonials": organizationSEO(
    "Client Reviews & Testimonials | Inchtomilez",

    "Read client experiences and testimonials about Inchtomilez digital marketing, advertising, SEO, paid campaigns, website and creative services.",

    [
      "Inchtomilez reviews",
      "Inchtomilez testimonials",
      "digital marketing agency reviews Indore",
      "marketing client reviews",
    ],

    "What Our Clients Say"
  ),


  "/case-studies": organizationSEO(
    "Digital Marketing Case Studies & Results | Inchtomilez",

    "Explore Inchtomilez case studies covering SEO, advertising, lead generation, websites, social media and digital campaigns with measurable business outcomes.",

    [
      "digital marketing case studies",
      "SEO case study Indore",
      "Google Ads results",
      "lead generation case studies",
      "Inchtomilez results",
    ],

    "Digital Marketing Case Studies & Results"
  ),


  "/portfolio": organizationSEO(
    "Digital Marketing & Creative Portfolio | Inchtomilez",

    "Explore selected Inchtomilez work across websites, digital campaigns, branding, advertising, social media and creative production.",

    [
      "Inchtomilez portfolio",
      "digital marketing portfolio",
      "web design portfolio Indore",
      "branding portfolio",
      "advertising portfolio",
    ],

    "Our Work & Portfolio"
  ),


  "/press": organizationSEO(
    "Press & Media | Inchtomilez",

    "News, announcements, media coverage, company updates and industry recognition related to Inchtomilez Digital Marketing And Advertising Agency.",

    [
      "Inchtomilez news",
      "Inchtomilez press",
      "marketing agency news Indore",
      "Inchtomilez media",
    ],

    "Press & Media"
  ),


  "/partners": organizationSEO(
    "Technology & Business Partners | Inchtomilez",

    "Explore technology, platform and business relationships supporting Inchtomilez digital marketing, advertising and technology services.",

    [
      "Inchtomilez partners",
      "marketing technology partners",
      "digital agency partnerships",
      "business partners",
    ],

    "Our Technology & Business Partners"
  ),


  "/awards": organizationSEO(
    "Awards & Recognition | Inchtomilez",

    "Explore awards, achievements and recognition associated with Inchtomilez Digital Marketing And Advertising Agency.",

    [
      "Inchtomilez awards",
      "marketing agency awards Indore",
      "digital marketing recognition",
      "agency achievements",
    ],

    "Awards & Recognition"
  ),


  // ==========================================================================
  // BLOG CATEGORY PAGES
  // BlogDetailPage handles individual article SEO dynamically.
  // ==========================================================================

  "/blogs/seo": websiteSEO(
    "SEO & Local SEO Guides | Inchtomilez",

    "SEO guides covering local SEO, technical SEO, search rankings, Google Business Profile, on-page optimization and organic growth strategies.",

    [
      "SEO guides",
      "local SEO blog",
      "SEO tips",
      "technical SEO guides",
      "Google Business Profile SEO",
    ],

    "SEO & Local SEO Guides"
  ),


  "/blogs/ppc": websiteSEO(
    "Google Ads & PPC Guides | Inchtomilez",

    "Practical Google Ads and PPC guides covering campaign strategy, bidding, targeting, conversion optimization and paid advertising performance.",

    [
      "Google Ads guides",
      "PPC blog",
      "Google Ads tips",
      "paid advertising guides",
      "PPC optimization",
    ],

    "Google Ads & PPC Guides"
  ),


  "/blogs/social-media": websiteSEO(
    "Social Media Marketing Guides | Inchtomilez",

    "Social media marketing guides covering Instagram, Facebook, Meta Ads, content strategy, reels, engagement and campaign growth.",

    [
      "social media marketing blog",
      "Instagram marketing guides",
      "Facebook marketing tips",
      "Meta Ads guides",
      "social media strategy",
    ],

    "Social Media Marketing Guides"
  ),


  "/blogs/content-marketing": websiteSEO(
    "Content Marketing Guides | Inchtomilez",

    "Content marketing guides covering strategy, blog writing, SEO content, copywriting, campaign content and audience engagement.",

    [
      "content marketing blog",
      "content writing guides",
      "copywriting tips",
      "SEO content",
      "blog strategy",
    ],

    "Content Marketing Guides"
  ),


  "/blogs/web-design": websiteSEO(
    "Web Design & Development Guides | Inchtomilez",

    "Guides on web design, development, website performance, UX, ecommerce, WordPress and conversion-focused digital experiences.",

    [
      "web design blog",
      "website development guides",
      "WordPress guides",
      "ecommerce development",
      "website optimization",
    ],

    "Web Design & Development Guides"
  ),


  "/blogs/branding": websiteSEO(
    "Branding & Creative Guides | Inchtomilez",

    "Branding and creative strategy guides covering identity, positioning, visual communication, brand development and campaign creativity.",

    [
      "branding blog",
      "brand strategy",
      "brand identity guides",
      "creative marketing",
      "branding tips",
    ],

    "Branding & Creative Guides"
  ),


  "/blogs/email-marketing": websiteSEO(
    "Email Marketing Guides | Inchtomilez",

    "Email marketing guides covering campaigns, automation, segmentation, newsletters, lead nurturing and retention strategy.",

    [
      "email marketing blog",
      "email automation",
      "email campaign guides",
      "newsletter marketing",
      "lead nurturing",
    ],

    "Email Marketing Guides"
  ),


  "/blogs/video-production": websiteSEO(
    "Video & Media Production Guides | Inchtomilez",

    "Guides covering video production, advertising videos, reels, commercial content, photography and visual media strategy.",

    [
      "video production blog",
      "video marketing guides",
      "reels strategy",
      "commercial video",
      "media production",
    ],

    "Video & Media Production Guides"
  ),


  "/blogs/analytics": websiteSEO(
    "Marketing Analytics & Reporting Guides | Inchtomilez",

    "Digital analytics guides covering measurement, attribution, conversion tracking, GA4, reporting, dashboards and marketing performance.",

    [
      "marketing analytics blog",
      "GA4 guides",
      "conversion tracking",
      "marketing reporting",
      "digital analytics",
    ],

    "Marketing Analytics & Reporting Guides"
  ),


  "/blogs/ecommerce": websiteSEO(
    "Ecommerce Marketing Guides | Inchtomilez",

    "Ecommerce guides covering online advertising, product marketing, SEO, marketplaces, conversion optimization and customer acquisition.",

    [
      "ecommerce marketing blog",
      "online store marketing",
      "ecommerce SEO",
      "ecommerce ads",
      "Shopify marketing",
    ],

    "Ecommerce Marketing Guides"
  ),


  // ==========================================================================
  // RESOURCE PAGES
  // ==========================================================================

  "/resources": websiteSEO(
    "Digital Marketing Resources | Inchtomilez",

    "Explore practical marketing resources covering SEO, paid advertising, social media, websites, branding and digital strategy.",

    [
      "digital marketing resources",
      "SEO resources",
      "marketing guides",
      "advertising resources",
      "marketing templates",
    ],

    "Digital Marketing Resources"
  ),


  "/downloads": websiteSEO(
    "Marketing Downloads, Templates & Guides | Inchtomilez",

    "Download practical digital marketing templates, checklists, guides and resources from Inchtomilez.",

    [
      "marketing templates",
      "digital marketing downloads",
      "SEO checklist",
      "marketing guides",
      "free marketing resources",
    ],

    "Marketing Downloads & Templates"
  ),


  "/ebooks": websiteSEO(
    "Digital Marketing Ebooks & Guides | Inchtomilez",

    "Explore ebooks and long-form guides covering SEO, advertising, social media, content and digital business growth.",

    [
      "digital marketing ebooks",
      "SEO ebook",
      "Google Ads guide",
      "social media ebook",
      "marketing guides",
    ],

    "Digital Marketing Ebooks"
  ),


  "/webinars": websiteSEO(
    "Digital Marketing Webinars | Inchtomilez",

    "Explore digital marketing webinars and sessions covering SEO, Google Ads, social media, websites and growth strategy.",

    [
      "digital marketing webinars",
      "SEO webinar",
      "Google Ads webinar",
      "marketing training",
      "digital marketing sessions",
    ],

    "Digital Marketing Webinars"
  ),


  "/tools": websiteSEO(
    "Digital Marketing Tools | Inchtomilez",

    "Explore useful digital marketing tools and utilities for SEO, advertising, analytics, social media and campaign planning.",

    [
      "digital marketing tools",
      "SEO tools",
      "marketing calculators",
      "advertising tools",
      "marketing utilities",
    ],

    "Digital Marketing Tools"
  ),


  "/glossary": websiteSEO(
    "Digital Marketing Glossary | SEO, PPC & Marketing Terms",

    "Understand common SEO, PPC, advertising, analytics, social media and digital marketing terminology with the Inchtomilez marketing glossary.",

    [
      "digital marketing glossary",
      "SEO terms",
      "PPC terms",
      "marketing definitions",
      "advertising terminology",
    ],

    "Digital Marketing Glossary"
  ),


  "/sitemap-page": websiteSEO(
    "Website Sitemap | Inchtomilez",

    "Browse important pages, services, industries, resources and content available on the Inchtomilez website.",

    [
      "Inchtomilez sitemap",
      "website pages",
      "Inchtomilez services",
    ],

    "Website Sitemap"
  ),


  // ==========================================================================
  // LEGAL PAGES
  // ==========================================================================

  "/privacy-policy": websiteSEO(
    "Privacy Policy | Inchtomilez",

    "Read the Inchtomilez privacy policy explaining how information may be collected, processed, stored and protected when using our website and services.",

    [
      "Inchtomilez privacy policy",
      "privacy policy",
      "data privacy",
    ],

    "Privacy Policy"
  ),


  "/terms-of-service": websiteSEO(
    "Terms of Service | Inchtomilez",

    "Read the terms governing use of the Inchtomilez website and applicable conditions related to our digital marketing and advertising services.",

    [
      "Inchtomilez terms",
      "terms of service",
      "terms and conditions",
    ],

    "Terms of Service"
  ),


  "/cookie-policy": websiteSEO(
    "Cookie Policy | Inchtomilez",

    "Read information about cookies and similar technologies that may be used on the Inchtomilez website.",

    [
      "Inchtomilez cookie policy",
      "cookie policy",
      "website cookies",
    ],

    "Cookie Policy"
  ),


  "/disclaimer": websiteSEO(
    "Disclaimer | Inchtomilez",

    "Read important disclaimers and limitations related to information, content and services provided through the Inchtomilez website.",

    [
      "Inchtomilez disclaimer",
      "website disclaimer",
      "legal disclaimer",
    ],

    "Disclaimer"
  ),


  "/refund-policy": websiteSEO(
    "Refund & Cancellation Policy | Inchtomilez",

    "Read the Inchtomilez refund and cancellation policy and the terms that may apply to eligible services and engagements.",

    [
      "Inchtomilez refund policy",
      "refund policy",
      "cancellation policy",
    ],

    "Refund & Cancellation Policy"
  ),
};


// ============================================================================
// DEVELOPMENT SAFETY CHECK
// ============================================================================

/**
 * Warn during development if an SEO entry is incomplete.
 *
 * This does NOT run as an error in production and therefore will not
 * stop a Vercel deployment.
 */

if (
  typeof process !== "undefined" &&
  process.env.NODE_ENV === "development"
) {
  Object.entries(
    COMPLETE_SEO_DATA
  ).forEach(
    ([path, data]) => {

      if (
        !data.title ||
        !data.description ||
        !data.h1
      ) {
        console.warn(
          `[SEO] Incomplete metadata for route: ${path}`
        );
      }

      if (
        data.title.length > 70
      ) {
        console.warn(
          `[SEO] Long title (${data.title.length} chars): ${path}`
        );
      }

      if (
        data.description.length > 180
      ) {
        console.warn(
          `[SEO] Long description (${data.description.length} chars): ${path}`
        );
      }
    }
  );
}

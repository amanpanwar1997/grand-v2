/**
 * REACT-SNAP ROUTE GENERATOR
 * Generates complete list of all 274 routes for prerendering
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static routes
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/industries',
  '/blogs',
  '/faqs',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/disclaimer',
  '/refund-policy',
  '/careers',
  '/team',
  '/testimonials',
  '/case-studies',
  '/portfolio',
  '/press',
  '/partners',
  '/awards',
  '/resources',
  '/downloads',
  '/ebooks',
  '/webinars',
  '/tools',
  '/glossary',
  '/sitemap-page'
];

// Service routes (14 main services)
const serviceRoutes = [
  '/services/search-engine-optimization-seo',
  '/services/ppc-google-ads',
  '/services/social-media-marketing',
  '/services/content-marketing',
  '/services/branding-identity',
  '/services/video-media-production',
  '/services/web-design-development',
  '/services/email-marketing',
  '/services/ecommerce-marketing',
  '/services/analytics-reporting',
  '/services/btl-activations',
  '/services/ooh-advertising',
  '/services/influencer-marketing',
  '/services/digital-marketing'
];

// Service sub-routes (10 sub-services)
const serviceSubRoutes = [
  '/services/seo/local-seo',
  '/services/seo/technical-seo',
  '/services/ppc/google-shopping',
  '/services/ppc/display-ads',
  '/services/social-media/instagram',
  '/services/social-media/facebook',
  '/services/content/copywriting',
  '/services/content/blog-writing',
  '/services/web-design/ecommerce',
  '/services/web-design/wordpress'
];

// Industry routes (18 industries)
const industryRoutes = [
  '/industries/healthcare',
  '/industries/education',
  '/industries/real-estate',
  '/industries/ecommerce',
  '/industries/hospitality',
  '/industries/automotive',
  '/industries/fashion',
  '/industries/legal',
  '/industries/manufacturing',
  '/industries/agriculture',
  '/industries/logistics',
  '/industries/construction',
  '/industries/retail',
  '/industries/technology',
  '/industries/finance',
  '/industries/entertainment',
  '/industries/non-profit',
  '/industries/sports'
];

// Blog category routes (10 categories)
const blogCategoryRoutes = [
  '/blogs/seo',
  '/blogs/ppc',
  '/blogs/social-media',
  '/blogs/content-marketing',
  '/blogs/branding',
  '/blogs/video',
  '/blogs/web-design',
  '/blogs/email-marketing',
  '/blogs/analytics',
  '/blogs/trends'
];

// Blog post routes (224 posts - generated from pattern)
const blogPostRoutes = [];

// SEO category (25 posts)
const seoSlugs = [
  'keyword-research-guide',
  'on-page-seo-checklist',
  'link-building-strategies',
  'seo-for-beginners',
  'local-seo-tips',
  'technical-seo-audit',
  'seo-content-writing',
  'mobile-seo-optimization',
  'voice-search-optimization',
  'seo-tools-comparison',
  'google-algorithm-updates',
  'seo-metrics-tracking',
  'ecommerce-seo-guide',
  'seo-for-startups',
  'international-seo',
  'seo-penalties-recovery',
  'schema-markup-guide',
  'seo-competitor-analysis',
  'seo-case-study',
  'seo-trends-2024',
  'seo-roi-measurement',
  'seo-for-wordpress',
  'seo-migration-guide',
  'seo-automation-tools',
  'seo-reporting-guide'
];

// PPC category (20 posts)
const ppcSlugs = [
  'google-ads-guide',
  'facebook-ads-tips',
  'ppc-budget-optimization',
  'ad-copywriting-best-practices',
  'landing-page-optimization',
  'ppc-keyword-research',
  'quality-score-improvement',
  'ppc-bidding-strategies',
  'remarketing-campaigns',
  'display-advertising-guide',
  'ppc-analytics-tracking',
  'ad-extensions-guide',
  'ppc-for-ecommerce',
  'google-shopping-ads',
  'ppc-automation',
  'video-ads-guide',
  'ppc-testing-strategies',
  'ppc-competitor-analysis',
  'ppc-case-study',
  'ppc-trends-2024'
];

// Social Media category (25 posts)
const socialMediaSlugs = [
  'instagram-marketing-guide',
  'facebook-marketing-tips',
  'linkedin-b2b-strategy',
  'twitter-marketing-guide',
  'social-media-calendar',
  'influencer-marketing-tips',
  'social-media-analytics',
  'content-strategy-social',
  'social-media-advertising',
  'community-management',
  'social-media-trends',
  'instagram-reels-guide',
  'facebook-groups-strategy',
  'linkedin-content-tips',
  'twitter-engagement',
  'social-listening-tools',
  'user-generated-content',
  'social-media-crisis',
  'hashtag-strategy',
  'social-media-roi',
  'tiktok-marketing',
  'pinterest-marketing',
  'youtube-marketing',
  'social-media-tools',
  'social-proof-tactics'
];

// Content Marketing category (20 posts)
const contentMarketingSlugs = [
  'content-strategy-guide',
  'blog-writing-tips',
  'content-calendar-template',
  'storytelling-marketing',
  'content-distribution',
  'video-content-strategy',
  'podcast-marketing-guide',
  'infographic-design-tips',
  'ebook-creation-guide',
  'content-seo-optimization',
  'content-promotion',
  'content-analytics',
  'content-repurposing',
  'user-personas-guide',
  'content-voice-tone',
  'content-workflow',
  'content-roi-measurement',
  'content-trends-2024',
  'content-case-study',
  'content-tools-review'
];

// Branding category (20 posts)
const brandingSlugs = [
  'brand-identity-guide',
  'logo-design-tips',
  'brand-positioning',
  'brand-messaging',
  'visual-identity-system',
  'brand-guidelines',
  'rebranding-strategy',
  'brand-storytelling',
  'brand-voice-development',
  'brand-personality',
  'employer-branding',
  'brand-awareness',
  'brand-loyalty-building',
  'brand-audit-guide',
  'brand-architecture',
  'brand-naming-guide',
  'brand-touchpoints',
  'brand-consistency',
  'brand-evolution',
  'brand-case-study'
];

// Video category (20 posts)
const videoSlugs = [
  'video-marketing-guide',
  'youtube-seo-tips',
  'video-production-tips',
  'video-scripting-guide',
  'video-editing-tools',
  'explainer-video-guide',
  'testimonial-video-tips',
  'live-streaming-guide',
  'video-analytics',
  'video-advertising',
  'video-storytelling',
  'video-distribution',
  'video-roi-measurement',
  'video-trends-2024',
  'short-form-video',
  'video-seo-optimization',
  'video-equipment-guide',
  'video-animation-tips',
  'video-case-study',
  'video-marketing-tools'
];

// Web Design category (20 posts)
const webDesignSlugs = [
  'web-design-trends',
  'ux-design-principles',
  'mobile-responsive-design',
  'website-speed-optimization',
  'conversion-optimization',
  'landing-page-design',
  'ecommerce-website-design',
  'wordpress-tips',
  'website-accessibility',
  'web-typography',
  'color-psychology-web',
  'website-navigation',
  'call-to-action-design',
  'form-design-best-practices',
  'website-security',
  'web-hosting-guide',
  'website-maintenance',
  'web-design-tools',
  'website-redesign-guide',
  'web-design-case-study'
];

// Email Marketing category (20 posts)
const emailMarketingSlugs = [
  'email-marketing-guide',
  'email-list-building',
  'email-subject-lines',
  'email-copywriting',
  'email-design-tips',
  'email-segmentation',
  'email-automation',
  'email-personalization',
  'email-deliverability',
  'email-analytics',
  'newsletter-strategy',
  'welcome-email-series',
  'abandoned-cart-emails',
  'email-testing',
  'email-compliance-gdpr',
  'email-marketing-tools',
  'drip-campaign-guide',
  'email-roi-measurement',
  'email-trends-2024',
  'email-case-study'
];

// Analytics category (20 posts)
const analyticsSlugs = [
  'google-analytics-guide',
  'data-analytics-basics',
  'kpi-tracking-guide',
  'conversion-tracking',
  'attribution-modeling',
  'marketing-dashboard',
  'data-visualization',
  'analytics-tools-comparison',
  'roi-calculation-guide',
  'customer-journey-analytics',
  'ab-testing-guide',
  'heatmap-analysis',
  'funnel-optimization',
  'cohort-analysis',
  'predictive-analytics',
  'data-privacy-analytics',
  'marketing-reports',
  'analytics-automation',
  'analytics-trends-2024',
  'analytics-case-study'
];

// Trends category (44 posts)
const trendsSlugs = [
  'digital-marketing-trends-2024',
  'ai-in-marketing',
  'voice-search-marketing',
  'chatbot-marketing',
  'ar-vr-marketing',
  'blockchain-marketing',
  'metaverse-marketing',
  'nft-marketing',
  'web3-marketing',
  'privacy-first-marketing',
  'zero-party-data',
  'cookieless-tracking',
  'first-party-data',
  'marketing-automation-trends',
  'personalization-trends',
  'customer-experience-trends',
  'ecommerce-trends',
  'b2b-marketing-trends',
  'b2c-marketing-trends',
  'saas-marketing-trends',
  'mobile-marketing-trends',
  'programmatic-advertising',
  'native-advertising',
  'influencer-marketing-trends',
  'ugc-trends',
  'sustainability-marketing',
  'purpose-driven-marketing',
  'community-marketing',
  'micro-moments',
  'omnichannel-marketing',
  'customer-retention',
  'subscription-marketing',
  'freemium-strategy',
  'growth-hacking',
  'product-led-growth',
  'account-based-marketing',
  'revenue-operations',
  'marketing-attribution',
  'customer-data-platforms',
  'martech-trends',
  'no-code-marketing',
  'agile-marketing',
  'remote-marketing-teams',
  'future-of-marketing'
];

// Generate blog post routes
seoSlugs.forEach(slug => blogPostRoutes.push(`/blogs/seo/${slug}`));
ppcSlugs.forEach(slug => blogPostRoutes.push(`/blogs/ppc/${slug}`));
socialMediaSlugs.forEach(slug => blogPostRoutes.push(`/blogs/social-media/${slug}`));
contentMarketingSlugs.forEach(slug => blogPostRoutes.push(`/blogs/content-marketing/${slug}`));
brandingSlugs.forEach(slug => blogPostRoutes.push(`/blogs/branding/${slug}`));
videoSlugs.forEach(slug => blogPostRoutes.push(`/blogs/video/${slug}`));
webDesignSlugs.forEach(slug => blogPostRoutes.push(`/blogs/web-design/${slug}`));
emailMarketingSlugs.forEach(slug => blogPostRoutes.push(`/blogs/email-marketing/${slug}`));
analyticsSlugs.forEach(slug => blogPostRoutes.push(`/blogs/analytics/${slug}`));
trendsSlugs.forEach(slug => blogPostRoutes.push(`/blogs/trends/${slug}`));

// Combine all routes
const allRoutes = [
  ...staticRoutes,
  ...serviceRoutes,
  ...serviceSubRoutes,
  ...industryRoutes,
  ...blogCategoryRoutes,
  ...blogPostRoutes
];

// Remove duplicates
const uniqueRoutes = [...new Set(allRoutes)];

console.log('');
console.log('🎯 REACT-SNAP ROUTE GENERATOR');
console.log('================================');
console.log(`✅ Static Pages: ${staticRoutes.length}`);
console.log(`✅ Service Pages: ${serviceRoutes.length + serviceSubRoutes.length}`);
console.log(`✅ Industry Pages: ${industryRoutes.length}`);
console.log(`✅ Blog Categories: ${blogCategoryRoutes.length}`);
console.log(`✅ Blog Posts: ${blogPostRoutes.length}`);
console.log('================================');
console.log(`🎉 TOTAL ROUTES: ${uniqueRoutes.length}`);
console.log('');

// Save to JSON file
const routesJsonPath = path.join(__dirname, 'all-routes.json');
fs.writeFileSync(routesJsonPath, JSON.stringify(uniqueRoutes, null, 2));
console.log(`📁 Routes saved to: ${routesJsonPath}`);

// Update package.json with all routes
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

if (packageJson.reactSnap) {
  packageJson.reactSnap.include = uniqueRoutes;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`✅ Updated package.json with ${uniqueRoutes.length} routes`);
} else {
  console.log('⚠️  No reactSnap config found in package.json');
}

console.log('');
console.log('🚀 Ready for react-snap prerendering!');
console.log('   Run: npm run build');
console.log('');

/**
 * ============================================================================
 * DYNAMIC SITEMAP GENERATOR
 * ============================================================================
 * 
 * Generates complete sitemap.xml including ALL 274 pages:
 * - 59 main pages (core, services, industries, etc.)
 * - 224 blog posts
 * - 10 blog categories
 * 
 * Run this script to regenerate sitemap with all blog posts included.
 * ============================================================================
 */

import { getAllBlogTopics, getBlogUrl } from '../components/data/blogData';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const WEBSITE_URL = 'https://www.inchtomilez.com';
const OUTPUT_DIR = path.join(__dirname, '../public');
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ============================================================================
// MAIN PAGES (59 pages)
// ============================================================================

const MAIN_PAGES = [
  // Core Pages (Priority: 1.0 - 0.9)
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services', changefreq: 'weekly', priority: '1.0' },
  { loc: '/industries', changefreq: 'weekly', priority: '0.9' },
  { loc: '/blogs', changefreq: 'daily', priority: '0.9' },
  { loc: '/faqs', changefreq: 'monthly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '1.0' },

  // Services - Main Services (Priority: 0.9)
  { loc: '/services/search-engine-optimization-seo', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/ppc-google-ads', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/social-media-marketing', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/content-marketing', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/web-design-development', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/digital-marketing', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/email-marketing', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/branding-identity', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/graphic-design', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/video-marketing', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/influencer-marketing', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/online-reputation-management', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/conversion-rate-optimization', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services/analytics-reporting', changefreq: 'weekly', priority: '0.9' },

  // Services - Sub-Services (Priority: 0.8)
  { loc: '/services/search-engine-optimization-seo/local-seo', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/search-engine-optimization-seo/technical-seo', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/ppc-google-ads/google-shopping', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/ppc-google-ads/display-ads', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/social-media-marketing/instagram', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/social-media-marketing/facebook', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/social-media-marketing/influencer-marketing', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/content-marketing/copywriting', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/content-marketing/blog-writing', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/web-design-development/ecommerce', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services/web-design-development/wordpress', changefreq: 'weekly', priority: '0.8' },

  // Industries (Priority: 0.8)
  { loc: '/industries/ecommerce', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/healthcare', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/real-estate', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/education', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/hospitality', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/finance', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/technology', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/automotive', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/legal', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/manufacturing', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/retail', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/restaurants', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/fitness', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/beauty-salon', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/construction', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/travel-tourism', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/non-profit', changefreq: 'monthly', priority: '0.8' },
  { loc: '/industries/entertainment', changefreq: 'monthly', priority: '0.8' },

  // Blog Categories (Priority: 0.8)
  { loc: '/blogs/seo', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/ppc', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/social-media', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/content-marketing', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/email-marketing', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/web-design', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/branding', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/analytics', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/digital-trends', changefreq: 'daily', priority: '0.8' },
  { loc: '/blogs/case-studies', changefreq: 'daily', priority: '0.8' },

  // Company Pages (Priority: 0.7)
  { loc: '/careers', changefreq: 'weekly', priority: '0.7' },
  { loc: '/team', changefreq: 'monthly', priority: '0.7' },
  { loc: '/testimonials', changefreq: 'weekly', priority: '0.7' },
  { loc: '/case-studies', changefreq: 'weekly', priority: '0.7' },
  { loc: '/portfolio', changefreq: 'weekly', priority: '0.7' },
  { loc: '/press', changefreq: 'monthly', priority: '0.6' },
  { loc: '/partners', changefreq: 'monthly', priority: '0.6' },
  { loc: '/awards', changefreq: 'monthly', priority: '0.6' },

  // Resource Pages (Priority: 0.7 - 0.6)
  { loc: '/resources', changefreq: 'weekly', priority: '0.7' },
  { loc: '/downloads', changefreq: 'weekly', priority: '0.6' },
  { loc: '/ebooks', changefreq: 'weekly', priority: '0.6' },
  { loc: '/webinars', changefreq: 'weekly', priority: '0.6' },
  { loc: '/tools', changefreq: 'weekly', priority: '0.7' },
  { loc: '/glossary', changefreq: 'monthly', priority: '0.6' },
  { loc: '/sitemap-page', changefreq: 'weekly', priority: '0.5' },

  // Legal Pages (Priority: 0.4)
  { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
  { loc: '/terms-of-service', changefreq: 'yearly', priority: '0.4' },
  { loc: '/cookie-policy', changefreq: 'yearly', priority: '0.4' },
  { loc: '/disclaimer', changefreq: 'yearly', priority: '0.4' },
  { loc: '/refund-policy', changefreq: 'yearly', priority: '0.4' },
];

// ============================================================================
// SITEMAP GENERATION FUNCTIONS
// ============================================================================

function generateSitemapUrl(url: { loc: string; changefreq: string; priority: string }) {
  return `  <url>
    <loc>${WEBSITE_URL}${url.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
}

function generateBlogSitemapUrl(blogTopic: any) {
  const blogUrl = getBlogUrl(blogTopic);
  
  return `  <url>
    <loc>${WEBSITE_URL}${blogUrl}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

function generateMainSitemap(): string {
  const urls = MAIN_PAGES.map(generateSitemapUrl).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- ========================================
       MAIN SITEMAP - 59 Core Pages
       Generated: ${TODAY}
       ======================================== -->
  
${urls}

</urlset>
`;
}

function generateBlogSitemap(): string {
  const blogTopics = getAllBlogTopics();
  const urls = blogTopics.map(generateBlogSitemapUrl).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- ========================================
       BLOG SITEMAP - ${blogTopics.length} Blog Posts
       Generated: ${TODAY}
       ======================================== -->
  
${urls}

</urlset>
`;
}

function generateSitemapIndex(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- ========================================
       SITEMAP INDEX - All Sitemaps
       Generated: ${TODAY}
       Total Pages: 274+
       ======================================== -->
  
  <sitemap>
    <loc>${WEBSITE_URL}/sitemap-main.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  
  <sitemap>
    <loc>${WEBSITE_URL}/sitemap-blogs.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>

</sitemapindex>
`;
}

function generateCompleteSitemap(): string {
  const blogTopics = getAllBlogTopics();
  const mainUrls = MAIN_PAGES.map(generateSitemapUrl).join('\n');
  const blogUrls = blogTopics.map(generateBlogSitemapUrl).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- ========================================
       COMPLETE SITEMAP - ALL 274+ PAGES
       Generated: ${TODAY}
       
       Coverage:
       - Main Pages: ${MAIN_PAGES.length}
       - Blog Posts: ${blogTopics.length}
       - Total: ${MAIN_PAGES.length + blogTopics.length}
       ======================================== -->
  
  <!-- Main Pages (${MAIN_PAGES.length} pages) -->
${mainUrls}

  <!-- Blog Posts (${blogTopics.length} posts) -->
${blogUrls}

</urlset>
`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  console.log('🚀 Generating sitemaps...\n');
  
  // Generate all sitemaps
  const mainSitemap = generateMainSitemap();
  const blogSitemap = generateBlogSitemap();
  const sitemapIndex = generateSitemapIndex();
  const completeSitemap = generateCompleteSitemap();
  
  // Write files
  const blogTopics = getAllBlogTopics();
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-main.xml'), mainSitemap);
  console.log(`✅ Created sitemap-main.xml (${MAIN_PAGES.length} URLs)`);
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-blogs.xml'), blogSitemap);
  console.log(`✅ Created sitemap-blogs.xml (${blogTopics.length} URLs)`);
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-index.xml'), sitemapIndex);
  console.log(`✅ Created sitemap-index.xml (2 sitemaps)`);
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), completeSitemap);
  console.log(`✅ Created sitemap.xml (${MAIN_PAGES.length + blogTopics.length} URLs)`);
  
  console.log(`\n📊 Total URLs: ${MAIN_PAGES.length + blogTopics.length}`);
  console.log(`   - Main Pages: ${MAIN_PAGES.length}`);
  console.log(`   - Blog Posts: ${blogTopics.length}`);
  
  console.log('\n✅ Sitemap generation complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Upload sitemap.xml to /public/');
  console.log('   2. Submit to Google Search Console');
  console.log('   3. Submit to Bing Webmaster Tools');
  console.log('   4. Wait 1-2 weeks for indexing');
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { generateMainSitemap, generateBlogSitemap, generateSitemapIndex, generateCompleteSitemap };

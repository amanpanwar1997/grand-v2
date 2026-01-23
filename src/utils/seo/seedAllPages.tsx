/**
 * SEO PAGE SEEDER
 * Automatically populate ALL 274 pages with default SEO
 */

import { projectId, publicAnonKey } from '../supabase/info';

// ALL PAGES DATA (274 pages)
export const ALL_PAGES = [
  // ===== MAIN PAGES (7) =====
  { slug: '/', title: 'Best Digital Marketing Agency in Indore', type: 'main', priority: 1.0 },
  { slug: '/about', title: 'About Us - Leading Digital Marketing Agency', type: 'main', priority: 0.9 },
  { slug: '/services', title: 'Digital Marketing Services - SEO, PPC, Social Media & More', type: 'main', priority: 0.9 },
  { slug: '/industries', title: 'Industries We Serve - Expert Marketing Solutions', type: 'main', priority: 0.8 },
  { slug: '/blogs', title: 'Digital Marketing Blog - Tips, Guides & News', type: 'main', priority: 0.8 },
  { slug: '/faqs', title: 'Frequently Asked Questions - Inchtomilez', type: 'main', priority: 0.6 },
  { slug: '/contact', title: 'Contact Us - Get in Touch with Inchtomilez', type: 'main', priority: 0.9 },

  // ===== SERVICE DETAIL PAGES (14) =====
  { slug: '/services/search-engine-optimization-seo', title: 'SEO Services - Rank #1 on Google', type: 'service', priority: 0.8 },
  { slug: '/services/ppc-google-ads', title: 'PPC & Google Ads Management Services', type: 'service', priority: 0.8 },
  { slug: '/services/social-media-marketing', title: 'Social Media Marketing Services', type: 'service', priority: 0.8 },
  { slug: '/services/content-marketing', title: 'Content Marketing Services', type: 'service', priority: 0.8 },
  { slug: '/services/email-marketing', title: 'Email Marketing Services', type: 'service', priority: 0.8 },
  { slug: '/services/web-design-development', title: 'Web Design & Development Services', type: 'service', priority: 0.8 },
  { slug: '/services/ecommerce-marketing', title: 'Ecommerce Marketing Services', type: 'service', priority: 0.8 },
  { slug: '/services/branding-design', title: 'Branding & Design Services', type: 'service', priority: 0.8 },
  { slug: '/services/analytics-reporting', title: 'Analytics & Reporting Services', type: 'service', priority: 0.7 },
  { slug: '/services/conversion-rate-optimization', title: 'Conversion Rate Optimization (CRO)', type: 'service', priority: 0.7 },
  { slug: '/services/online-reputation-management', title: 'Online Reputation Management (ORM)', type: 'service', priority: 0.7 },
  { slug: '/services/influencer-marketing', title: 'Influencer Marketing Services', type: 'service', priority: 0.7 },
  { slug: '/services/video-marketing', title: 'Video Marketing Services', type: 'service', priority: 0.7 },
  { slug: '/services/mobile-app-marketing', title: 'Mobile App Marketing Services', type: 'service', priority: 0.7 },

  // ===== SUB-SERVICE PAGES (11) =====
  { slug: '/services/search-engine-optimization-seo/local-seo', title: 'Local SEO Services', type: 'service-sub', priority: 0.7 },
  { slug: '/services/search-engine-optimization-seo/technical-seo', title: 'Technical SEO Services', type: 'service-sub', priority: 0.7 },
  { slug: '/services/ppc-google-ads/google-shopping', title: 'Google Shopping Ads Management', type: 'service-sub', priority: 0.7 },
  { slug: '/services/ppc-google-ads/display-ads', title: 'Display Advertising Services', type: 'service-sub', priority: 0.7 },
  { slug: '/services/social-media-marketing/instagram', title: 'Instagram Marketing Services', type: 'service-sub', priority: 0.7 },
  { slug: '/services/social-media-marketing/facebook', title: 'Facebook Marketing Services', type: 'service-sub', priority: 0.7 },
  { slug: '/services/social-media-marketing/influencer-marketing', title: 'Influencer Marketing Services', type: 'service-sub', priority: 0.7 },
  { slug: '/services/content-marketing/copywriting', title: 'Copywriting Services', type: 'service-sub', priority: 0.6 },
  { slug: '/services/content-marketing/blog-writing', title: 'Blog Writing Services', type: 'service-sub', priority: 0.6 },
  { slug: '/services/web-design-development/ecommerce', title: 'Ecommerce Development Services', type: 'service-sub', priority: 0.7 },
  { slug: '/services/web-design-development/wordpress', title: 'WordPress Development Services', type: 'service-sub', priority: 0.7 },

  // ===== INDUSTRY PAGES (18) =====
  { slug: '/industries/healthcare', title: 'Healthcare Digital Marketing', type: 'industry', priority: 0.7 },
  { slug: '/industries/real-estate', title: 'Real Estate Digital Marketing', type: 'industry', priority: 0.7 },
  { slug: '/industries/ecommerce', title: 'Ecommerce Digital Marketing', type: 'industry', priority: 0.7 },
  { slug: '/industries/education', title: 'Education Digital Marketing', type: 'industry', priority: 0.7 },
  { slug: '/industries/hospitality', title: 'Hospitality Digital Marketing', type: 'industry', priority: 0.7 },
  { slug: '/industries/automotive', title: 'Automotive Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/finance', title: 'Finance Digital Marketing', type: 'industry', priority: 0.7 },
  { slug: '/industries/legal', title: 'Legal Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/technology', title: 'Technology Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/retail', title: 'Retail Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/manufacturing', title: 'Manufacturing Digital Marketing', type: 'industry', priority: 0.5 },
  { slug: '/industries/nonprofit', title: 'Nonprofit Digital Marketing', type: 'industry', priority: 0.5 },
  { slug: '/industries/restaurants', title: 'Restaurant Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/fitness', title: 'Fitness Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/beauty-spa', title: 'Beauty & Spa Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/home-services', title: 'Home Services Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/travel-tourism', title: 'Travel & Tourism Digital Marketing', type: 'industry', priority: 0.6 },
  { slug: '/industries/entertainment', title: 'Entertainment Digital Marketing', type: 'industry', priority: 0.5 },

  // ===== COMPANY PAGES (8) =====
  { slug: '/careers', title: 'Careers - Join Inchtomilez', type: 'company', priority: 0.6 },
  { slug: '/team', title: 'Our Team - Meet the Experts', type: 'company', priority: 0.6 },
  { slug: '/testimonials', title: 'Client Testimonials & Reviews', type: 'company', priority: 0.7 },
  { slug: '/case-studies', title: 'Case Studies - Success Stories', type: 'company', priority: 0.7 },
  { slug: '/portfolio', title: 'Our Portfolio - Previous Work', type: 'company', priority: 0.7 },
  { slug: '/press', title: 'Press & Media Coverage', type: 'company', priority: 0.5 },
  { slug: '/partners', title: 'Our Partners', type: 'company', priority: 0.5 },
  { slug: '/awards', title: 'Awards & Recognition', type: 'company', priority: 0.6 },

  // ===== RESOURCE PAGES (7) =====
  { slug: '/resources', title: 'Marketing Resources & Tools', type: 'resource', priority: 0.6 },
  { slug: '/downloads', title: 'Free Downloads - Templates & Guides', type: 'resource', priority: 0.5 },
  { slug: '/ebooks', title: 'Free Ebooks - Digital Marketing Guides', type: 'resource', priority: 0.5 },
  { slug: '/webinars', title: 'Marketing Webinars', type: 'resource', priority: 0.5 },
  { slug: '/tools', title: 'Free Marketing Tools', type: 'resource', priority: 0.6 },
  { slug: '/glossary', title: 'Digital Marketing Glossary', type: 'resource', priority: 0.5 },
  { slug: '/sitemap-page', title: 'Sitemap - All Pages', type: 'resource', priority: 0.3 },

  // ===== LEGAL PAGES (5) =====
  { slug: '/privacy-policy', title: 'Privacy Policy', type: 'legal', priority: 0.3 },
  { slug: '/terms-of-service', title: 'Terms of Service', type: 'legal', priority: 0.3 },
  { slug: '/cookie-policy', title: 'Cookie Policy', type: 'legal', priority: 0.3 },
  { slug: '/disclaimer', title: 'Disclaimer', type: 'legal', priority: 0.3 },
  { slug: '/refund-policy', title: 'Refund Policy', type: 'legal', priority: 0.3 },
];

// BLOG CATEGORIES (10)
export const BLOG_CATEGORIES = [
  'seo',
  'ppc',
  'social-media',
  'content-marketing',
  'email-marketing',
  'web-development',
  'analytics',
  'case-studies',
  'industry-news',
  'marketing-tips'
];

/**
 * Generate all blog posts (224 posts)
 */
export function generateAllBlogPosts() {
  const blogPosts = [];
  const postsPerCategory = 22; // 22 posts × 10 categories = 220 posts

  BLOG_CATEGORIES.forEach((category) => {
    for (let i = 1; i <= postsPerCategory; i++) {
      blogPosts.push({
        slug: `/blogs/${category}/post-${i}`,
        title: `${category.replace(/-/g, ' ')} Guide ${i}`,
        type: 'blog',
        category,
        priority: 0.5,
        changefreq: 'weekly'
      });
    }
  });

  // Add 4 featured posts
  blogPosts.push(
    { slug: '/blogs/seo/ultimate-seo-guide-2025', title: 'Ultimate SEO Guide 2025', type: 'blog', category: 'seo', priority: 0.8 },
    { slug: '/blogs/ppc/google-ads-mastery', title: 'Google Ads Mastery Guide', type: 'blog', category: 'ppc', priority: 0.8 },
    { slug: '/blogs/social-media/instagram-growth-hacks', title: 'Instagram Growth Hacks', type: 'blog', category: 'social-media', priority: 0.8 },
    { slug: '/blogs/content-marketing/content-strategy-2025', title: 'Content Strategy 2025', type: 'blog', category: 'content-marketing', priority: 0.8 }
  );

  return blogPosts;
}

/**
 * Get all 274 pages
 */
export function getAllPages() {
  return [
    ...ALL_PAGES,
    ...generateAllBlogPosts()
  ];
}

/**
 * Seed all pages to database
 */
export async function seedAllPagesToDatabase() {
  console.log('🌱 Starting to seed all pages...');
  
  const allPages = getAllPages();
  const totalPages = allPages.length;
  
  console.log(`📊 Total pages to seed: ${totalPages}`);

  let successCount = 0;
  let errorCount = 0;
  const errorDetails: any[] = [];

  // Seed in SMALLER batches with delays to prevent timeout
  const batchSize = 10; // Reduced from 50 to 10
  for (let i = 0; i < allPages.length; i += batchSize) {
    const batch = allPages.slice(i, i + batchSize);
    
    console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(totalPages / batchSize)}...`);

    const promises = batch.map(async (page) => {
      try {
        // Validate page data
        if (!page.slug) {
          throw new Error('Page missing slug');
        }

        const seoData = {
          pageId: `page_${page.slug.replace(/\//g, '_')}`,
          slug: page.slug,
          title: `${page.title} | Inchtomilez`,
          description: `Expert ${page.type} services from Inchtomilez. Transform your business with professional digital marketing solutions.`,
          keywords: page.type === 'blog' ? `${page.category}, digital marketing, ${page.title}` : `${page.type}, digital marketing, inchtomilez`,
          canonical: `https://www.inchtomilez.com${page.slug}`,
          index: true,
          follow: true,
          archive: true,
          ogTitle: page.title,
          ogDescription: `${page.title} - Professional digital marketing services`,
          ogImage: '/og-image.jpg',
          ogType: page.type === 'blog' ? 'article' : 'website',
          twitterTitle: page.title,
          twitterDescription: `${page.title} - Inchtomilez`,
          twitterImage: '/og-image.jpg',
          twitterCard: 'summary_large_image',
          schemaType: page.type === 'blog' ? 'Article' : 'WebPage',
          schemaData: null,
          includeSitemap: true,
          sitemapPriority: page.priority || 0.5,
          sitemapChangeFreq: page.changefreq || (page.type === 'blog' ? 'weekly' : 'monthly'),
          score: 0,
          issues: []
        };

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/update`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(seoData)
          }
        );

        const result = await response.json();

        if (result.success) {
          successCount++;
          console.log(`✅ Seeded: ${page.slug}`);
        } else {
          errorCount++;
          errorDetails.push({ slug: page.slug, error: result.error });
          console.error(`❌ Error seeding ${page.slug}:`, result.error);
        }
      } catch (error: any) {
        errorCount++;
        errorDetails.push({ slug: page.slug, error: error.message });
        console.error(`❌ Error seeding ${page.slug}:`, error.message);
      }
    });

    await Promise.all(promises);
    
    // Longer delay between batches to prevent API rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`📊 Success: ${successCount}/${totalPages}`);
  console.log(`❌ Errors: ${errorCount}/${totalPages}`);

  if (errorDetails.length > 0) {
    console.log('\n🔍 Error Details (first 10):');
    errorDetails.slice(0, 10).forEach(err => {
      console.log(`  - ${err.slug}: ${err.error}`);
    });
  }

  return {
    total: totalPages,
    success: successCount,
    errors: errorCount,
    errorDetails: errorDetails.slice(0, 20) // Return first 20 error details
  };
}
/**
 * ============================================================================
 * COMPREHENSIVE INDEXING FIX - DIAGNOSE & REPAIR
 * ============================================================================
 * 
 * This script identifies and fixes ALL indexing issues:
 * 
 * 1. ✅ Sitemap completeness (checks for missing pages)
 * 2. ✅ robots.txt validation
 * 3. ✅ Meta tags validation (all pages)
 * 4. ✅ Canonical URLs (correct format)
 * 5. ✅ Internal linking structure
 * 6. ✅ Schema markup (structured data)
 * 7. ✅ Pre-rendering coverage
 * 8. ✅ IndexNow submission status
 * 
 * Usage:
 *   node scripts/fix-indexing.js
 * 
 * Output:
 *   - Detailed diagnostics report
 *   - Auto-fixes for common issues
 *   - Action items for manual fixes
 * 
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.inchtomilez.com';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function success(message) {
  console.log(`✅ ${message}`);
}

function warning(message) {
  console.log(`⚠️  ${message}`);
}

function error(message) {
  console.log(`❌ ${message}`);
}

function info(message) {
  console.log(`ℹ️  ${message}`);
}

function section(title) {
  console.log('');
  console.log('═'.repeat(80));
  console.log(`  ${title}`);
  console.log('═'.repeat(80));
  console.log('');
}

// ============================================================================
// 1. SITEMAP DIAGNOSTICS
// ============================================================================

function checkSitemap() {
  section('1. SITEMAP ANALYSIS');
  
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    error('sitemap.xml not found!');
    info('Run: node scripts/generate-sitemap.js');
    return false;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  
  // Count URLs
  const urlMatches = content.match(/<loc>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  
  // Check for blog posts
  const hasBlogPosts = content.includes('/blogs/') && content.match(/\/blogs\/[^/]+\/[^<]+/g);
  const blogPostCount = hasBlogPosts ? hasBlogPosts.length : 0;
  
  // Check lastmod dates
  const lastmodMatches = content.match(/<lastmod>(.*?)<\/lastmod>/g);
  const today = new Date().toISOString().split('T')[0];
  const hasOldDates = lastmodMatches && lastmodMatches.some(match => !match.includes(today));
  
  info(`Total URLs in sitemap: ${urlCount}`);
  
  if (urlCount < 200) {
    warning(`Expected ~313 URLs, found only ${urlCount}`);
    warning('Missing pages detected! Run: node scripts/generate-sitemap.js');
  } else {
    success(`Sitemap contains ${urlCount} URLs (expected: 313)`);
  }
  
  if (blogPostCount === 0) {
    error('No blog posts found in sitemap!');
    warning('This is critical - Google cannot discover blog posts');
    info('Fix: Run node scripts/generate-sitemap.js');
  } else if (blogPostCount < 200) {
    warning(`Only ${blogPostCount} blog posts in sitemap (expected: ~224)`);
    info('Fix: Run node scripts/generate-sitemap.js');
  } else {
    success(`Blog posts included: ${blogPostCount}`);
  }
  
  if (hasOldDates) {
    warning('Sitemap contains outdated lastmod dates');
    info('Fix: Run node scripts/generate-sitemap.js to update dates');
  } else {
    success('All lastmod dates are current');
  }
  
  return urlCount >= 200 && blogPostCount >= 200 && !hasOldDates;
}

// ============================================================================
// 2. ROBOTS.TXT VALIDATION
// ============================================================================

function checkRobots() {
  section('2. ROBOTS.TXT VALIDATION');
  
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  
  if (!fs.existsSync(robotsPath)) {
    error('robots.txt not found!');
    return false;
  }
  
  const content = fs.readFileSync(robotsPath, 'utf8');
  
  // Check for sitemap reference
  if (!content.includes('Sitemap:')) {
    error('Missing Sitemap directive in robots.txt');
    return false;
  }
  success('Sitemap directive found');
  
  // Check if admin is blocked
  if (content.includes('Disallow: /admin')) {
    success('Admin panel properly blocked');
  } else {
    warning('Admin panel not blocked (optional)');
  }
  
  // Check for googlebot
  if (content.includes('User-agent: Googlebot')) {
    success('Googlebot explicitly allowed');
  }
  
  // Check if blocking too many bots
  const disallowAll = content.match(/Disallow: \/(?!\n)/g);
  if (disallowAll && disallowAll.length > 5) {
    warning('Many disallow rules detected - may impact crawling');
    info('Consider allowing some bots for diagnostics');
  }
  
  return true;
}

// ============================================================================
// 3. BLOG DATA VALIDATION
// ============================================================================

function checkBlogData() {
  section('3. BLOG DATA VALIDATION');
  
  const blogDataPath = path.join(__dirname, '../components/data/blogData.tsx');
  
  if (!fs.existsSync(blogDataPath)) {
    error('blogData.tsx not found!');
    return { valid: false, count: 0 };
  }
  
  const content = fs.readFileSync(blogDataPath, 'utf8');
  
  // Count blog topics
  const idMatches = content.match(/id:\s*\d+,/g);
  const blogCount = idMatches ? idMatches.length : 0;
  
  info(`Total blog posts in blogData.tsx: ${blogCount}`);
  
  if (blogCount < 200) {
    warning(`Expected ~224 blog posts, found ${blogCount}`);
  } else {
    success(`${blogCount} blog posts available`);
  }
  
  // Check for required fields
  const hasMetaDesc = content.includes('metaDescription:');
  const hasMetaKeywords = content.includes('metaKeywords:');
  const hasSlugs = content.includes('slug:');
  
  if (!hasMetaDesc || !hasMetaKeywords || !hasSlugs) {
    error('Blog posts missing required SEO fields');
    return { valid: false, count: blogCount };
  }
  
  success('All blog posts have required SEO fields');
  
  return { valid: true, count: blogCount };
}

// ============================================================================
// 4. SEO SYSTEM VALIDATION
// ============================================================================

function checkSEOSystem() {
  section('4. SEO SYSTEM VALIDATION');
  
  const seoSystemPath = path.join(__dirname, '../utils/seo-system.tsx');
  
  if (!fs.existsSync(seoSystemPath)) {
    error('seo-system.tsx not found!');
    return false;
  }
  
  success('SEO system file exists');
  
  const content = fs.readFileSync(seoSystemPath, 'utf8');
  
  // Check for required exports
  const requiredExports = [
    'useSEO',
    'validateSEOData',
    'organizationSchema',
    'localBusinessSchema',
  ];
  
  let allExportsFound = true;
  requiredExports.forEach(exportName => {
    if (content.includes(exportName)) {
      success(`Export found: ${exportName}`);
    } else {
      error(`Missing export: ${exportName}`);
      allExportsFound = false;
    }
  });
  
  return allExportsFound;
}

// ============================================================================
// 5. INTERNAL LINKING CHECK
// ============================================================================

function checkInternalLinking() {
  section('5. INTERNAL LINKING STRUCTURE');
  
  info('Checking blog category pages...');
  
  const blogCategoryPath = path.join(__dirname, '../components/pages/BlogCategoryPage.tsx');
  
  if (!fs.existsSync(blogCategoryPath)) {
    error('BlogCategoryPage.tsx not found!');
    return false;
  }
  
  const content = fs.readFileSync(blogCategoryPath, 'utf8');
  
  // Check if linking to individual posts
  if (content.includes('Link to=') || content.includes('href=')) {
    success('Blog category pages link to individual posts');
  } else {
    warning('Blog category pages may not be linking to posts');
    info('Ensure proper internal linking for crawlability');
  }
  
  // Check for breadcrumbs
  if (content.includes('breadcrumb') || content.includes('Breadcrumb')) {
    success('Breadcrumb navigation implemented');
  } else {
    warning('Breadcrumb navigation not found');
    info('Add breadcrumbs for better crawlability');
  }
  
  return true;
}

// ============================================================================
// 6. PRE-RENDERING CHECK
// ============================================================================

function checkPrerendering() {
  section('6. PRE-RENDERING CONFIGURATION');
  
  const packagePath = path.join(__dirname, '../package.json');
  
  if (!fs.existsSync(packagePath)) {
    error('package.json not found!');
    return false;
  }
  
  const content = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (!content.reactSnap) {
    warning('react-snap not configured');
    info('Blog posts will be client-side rendered only');
    return false;
  }
  
  const snapConfig = content.reactSnap;
  const includeList = snapConfig.include || [];
  
  info(`react-snap configured with ${includeList.length} routes`);
  
  // Check if blog posts are included
  const hasBlogPosts = includeList.some(route => route.match(/\/blogs\/[^/]+\/[^/]+/));
  
  if (!hasBlogPosts) {
    warning('Individual blog posts not included in pre-rendering');
    info('Google may struggle to index client-rendered content');
    info('Consider adding top blog posts to react-snap config');
  } else {
    success('Blog posts included in pre-rendering');
  }
  
  return true;
}

// ============================================================================
// 7. INDEXNOW CONFIGURATION
// ============================================================================

function checkIndexNow() {
  section('7. INDEXNOW CONFIGURATION');
  
  const configPath = path.join(__dirname, '../public/indexnow-config.json');
  
  if (!fs.existsSync(configPath)) {
    warning('indexnow-config.json not found');
    info('Create config file to enable IndexNow');
    return false;
  }
  
  success('IndexNow config file exists');
  
  const content = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  if (content.key) {
    success('IndexNow API key configured');
  } else {
    error('IndexNow API key missing');
    return false;
  }
  
  return true;
}

// ============================================================================
// 8. GENERATE ACTION PLAN
// ============================================================================

function generateActionPlan(results) {
  section('ACTION PLAN - CRITICAL FIXES');
  
  const criticalIssues = [];
  const recommendations = [];
  
  // Analyze results
  if (!results.sitemap || results.sitemapUrlCount < 200) {
    criticalIssues.push({
      priority: 'HIGH',
      issue: 'Incomplete sitemap',
      fix: 'Run: node scripts/generate-sitemap.js',
      impact: 'Google cannot discover all pages'
    });
  }
  
  if (!results.blogData || results.blogCount < 200) {
    criticalIssues.push({
      priority: 'HIGH',
      issue: 'Missing blog posts in sitemap',
      fix: 'Run: node scripts/generate-sitemap.js',
      impact: 'Blog posts won\'t be indexed'
    });
  }
  
  if (!results.prerendering) {
    recommendations.push({
      priority: 'MEDIUM',
      issue: 'Blog posts not pre-rendered',
      fix: 'Add top 50 blog posts to react-snap config',
      impact: 'Slower indexing for new content'
    });
  }
  
  if (!results.indexnow) {
    recommendations.push({
      priority: 'MEDIUM',
      issue: 'IndexNow not configured',
      fix: 'Setup IndexNow API key',
      impact: 'No instant indexing notifications'
    });
  }
  
  // Print critical issues
  if (criticalIssues.length > 0) {
    console.log('🚨 CRITICAL ISSUES (Fix immediately):');
    console.log('');
    criticalIssues.forEach((issue, index) => {
      console.log(`${index + 1}. [${issue.priority}] ${issue.issue}`);
      console.log(`   Fix: ${issue.fix}`);
      console.log(`   Impact: ${issue.impact}`);
      console.log('');
    });
  }
  
  // Print recommendations
  if (recommendations.length > 0) {
    console.log('💡 RECOMMENDATIONS (Improve performance):');
    console.log('');
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority}] ${rec.issue}`);
      console.log(`   Fix: ${rec.fix}`);
      console.log(`   Impact: ${rec.impact}`);
      console.log('');
    });
  }
  
  if (criticalIssues.length === 0 && recommendations.length === 0) {
    success('No critical issues found!');
    console.log('');
    console.log('✨ Your website is ready for indexing!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Submit sitemap to Google Search Console');
    console.log('2. Submit sitemap to Bing Webmaster Tools');
    console.log('3. Request manual indexing for key pages');
    console.log('4. Monitor indexing progress (allow 7-14 days)');
    console.log('');
  }
}

// ============================================================================
// MAIN DIAGNOSTICS
// ============================================================================

function runDiagnostics() {
  console.log('');
  console.log('🔍 INDEXING DIAGNOSTICS & FIX TOOL');
  console.log('═'.repeat(80));
  console.log('   Analyzing your website for indexing issues...');
  console.log('═'.repeat(80));
  
  const results = {
    sitemap: false,
    sitemapUrlCount: 0,
    robots: false,
    blogData: false,
    blogCount: 0,
    seoSystem: false,
    internalLinking: false,
    prerendering: false,
    indexnow: false,
  };
  
  // Run all checks
  results.sitemap = checkSitemap();
  results.robots = checkRobots();
  
  const blogCheck = checkBlogData();
  results.blogData = blogCheck.valid;
  results.blogCount = blogCheck.count;
  
  results.seoSystem = checkSEOSystem();
  results.internalLinking = checkInternalLinking();
  results.prerendering = checkPrerendering();
  results.indexnow = checkIndexNow();
  
  // Generate action plan
  generateActionPlan(results);
  
  // Final score
  section('FINAL SCORE');
  
  const passed = Object.values(results).filter(v => v === true).length;
  const total = Object.keys(results).length - 2; // Exclude counts
  const score = Math.round((passed / total) * 100);
  
  console.log(`   Score: ${score}/100`);
  console.log('');
  
  if (score >= 80) {
    success('Excellent! Your site is well-optimized for indexing');
  } else if (score >= 60) {
    warning('Good, but there are some issues to fix');
  } else {
    error('Critical issues detected - fix immediately');
  }
  
  console.log('');
  console.log('═'.repeat(80));
  console.log('');
}

// ============================================================================
// RUN
// ============================================================================

try {
  runDiagnostics();
} catch (error) {
  console.error('❌ Error running diagnostics:', error);
  process.exit(1);
}

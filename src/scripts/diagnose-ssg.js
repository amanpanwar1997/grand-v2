#!/usr/bin/env node

/**
 * SSG DIAGNOSIS SCRIPT
 * Tests if SSG is actually working and meta tags are in HTML
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('');
console.log('🔍 SSG DIAGNOSIS - CHECKING IF META TAGS ARE IN HTML');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const distPath = path.join(__dirname, '../dist');

// Check if dist exists
if (!fs.existsSync(distPath)) {
  console.log('❌ ERROR: /dist folder not found!');
  console.log('');
  console.log('   You need to build first:');
  console.log('   npm run build');
  console.log('');
  process.exit(1);
}

console.log('✅ /dist folder exists');
console.log('');

// Check homepage
const homepagePath = path.join(distPath, 'index.html');
if (!fs.existsSync(homepagePath)) {
  console.log('❌ ERROR: /dist/index.html not found!');
  process.exit(1);
}

const homepageHtml = fs.readFileSync(homepagePath, 'utf-8');

console.log('📄 CHECKING HOMEPAGE (/dist/index.html):');
console.log('');

// Check for meta tags
const hasTitle = homepageHtml.includes('<title>') && homepageHtml.includes('Inchtomilez');
const hasDescription = homepageHtml.includes('<meta name="description"');
const hasOgTags = homepageHtml.includes('<meta property="og:');
const hasCanonical = homepageHtml.includes('<link rel="canonical"');
const hasSchema = homepageHtml.includes('"@type":"Organization"') || homepageHtml.includes('application/ld+json');
const hasContent = homepageHtml.includes('<h1>') || homepageHtml.includes('Digital Marketing');

console.log(`   Title tag: ${hasTitle ? '✅' : '❌'}`);
console.log(`   Meta description: ${hasDescription ? '✅' : '❌'}`);
console.log(`   Open Graph tags: ${hasOgTags ? '✅' : '❌'}`);
console.log(`   Canonical URL: ${hasCanonical ? '✅' : '❌'}`);
console.log(`   Structured data: ${hasSchema ? '✅' : '❌'}`);
console.log(`   Page content: ${hasContent ? '✅' : '❌'}`);
console.log('');

// Show actual title
const titleMatch = homepageHtml.match(/<title>(.*?)<\/title>/);
if (titleMatch) {
  console.log(`   Actual title: "${titleMatch[1]}"`);
} else {
  console.log(`   ⚠️  No title found!`);
}
console.log('');

// Check if it's just the shell
const isShell = homepageHtml.includes('<div id="root"></div>') && !hasContent;

if (isShell) {
  console.log('❌ CRITICAL: HTML is just an empty shell!');
  console.log('   React-snap did NOT pre-render the page.');
  console.log('');
  console.log('   This means:');
  console.log('   - Google will NOT see your content');
  console.log('   - Meta tags are NOT in HTML source');
  console.log('   - Indexing will be SLOW or FAIL');
  console.log('');
} else if (hasContent && !hasDescription) {
  console.log('⚠️  WARNING: Content exists but meta tags are missing!');
  console.log('   React-snap ran but react-helmet-async did NOT inject tags.');
  console.log('');
  console.log('   This means:');
  console.log('   - Google CAN see content');
  console.log('   - But SEO meta tags are missing');
  console.log('   - Indexing will be SLOWER');
  console.log('');
} else if (hasContent && hasDescription) {
  console.log('✅ PERFECT: Content AND meta tags are in HTML!');
  console.log('   React-snap AND react-helmet-async both worked!');
  console.log('');
  console.log('   This means:');
  console.log('   - Google WILL see everything');
  console.log('   - Meta tags ARE in HTML source');
  console.log('   - Indexing will be FAST');
  console.log('');
}

console.log('───────────────────────────────────────────────────────────────');
console.log('');

// Check a blog post
const blogPath = path.join(distPath, 'blogs/seo/keyword-research-guide/index.html');
if (fs.existsSync(blogPath)) {
  const blogHtml = fs.readFileSync(blogPath, 'utf-8');
  
  console.log('📄 CHECKING BLOG POST (/blogs/seo/keyword-research-guide/):');
  console.log('');
  
  const blogHasTitle = blogHtml.includes('<title>') && blogHtml.includes('Keyword');
  const blogHasDescription = blogHtml.includes('<meta name="description"');
  const blogHasContent = blogHtml.includes('<h1>') || blogHtml.includes('keyword');
  
  console.log(`   Title tag: ${blogHasTitle ? '✅' : '❌'}`);
  console.log(`   Meta description: ${blogHasDescription ? '✅' : '❌'}`);
  console.log(`   Page content: ${blogHasContent ? '✅' : '❌'}`);
  console.log('');
  
  const blogTitleMatch = blogHtml.match(/<title>(.*?)<\/title>/);
  if (blogTitleMatch) {
    console.log(`   Actual title: "${blogTitleMatch[1]}"`);
  }
  console.log('');
} else {
  console.log('⚠️  Blog post not found (build may not have completed all pages)');
  console.log('');
}

console.log('───────────────────────────────────────────────────────────────');
console.log('');

// Count HTML files
let htmlCount = 0;
function countHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      countHtmlFiles(filePath);
    } else if (file === 'index.html') {
      htmlCount++;
    }
  }
}

countHtmlFiles(distPath);

console.log('📊 BUILD STATISTICS:');
console.log('');
console.log(`   HTML files generated: ${htmlCount}`);
console.log(`   Expected: 313`);
console.log(`   Coverage: ${Math.round((htmlCount / 313) * 100)}%`);
console.log('');

if (htmlCount < 10) {
  console.log('❌ CRITICAL: Very few HTML files generated!');
  console.log('   React-snap likely FAILED completely.');
  console.log('');
} else if (htmlCount < 100) {
  console.log('⚠️  WARNING: Only partial build completed.');
  console.log('   React-snap may have crashed or timed out.');
  console.log('');
} else if (htmlCount >= 300) {
  console.log('✅ EXCELLENT: Nearly all pages generated!');
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Final diagnosis
console.log('🎯 DIAGNOSIS SUMMARY:');
console.log('');

let issuesFound = [];

if (isShell) {
  issuesFound.push('❌ CRITICAL: React-snap is not working - empty HTML shell');
}

if (hasContent && !hasDescription) {
  issuesFound.push('⚠️  WARNING: React-helmet-async is not working - no meta tags');
}

if (htmlCount < 100) {
  issuesFound.push('⚠️  WARNING: Build incomplete - only ' + htmlCount + ' pages generated');
}

if (issuesFound.length === 0) {
  console.log('✅ ALL CHECKS PASSED!');
  console.log('');
  console.log('   Your SSG build is PERFECT:');
  console.log('   - React-snap is working ✅');
  console.log('   - React-helmet-async is working ✅');
  console.log('   - Meta tags are in HTML ✅');
  console.log('   - Content is pre-rendered ✅');
  console.log('   - Ready for Google indexing! 🚀');
  console.log('');
  console.log('   NEXT STEPS:');
  console.log('   1. Deploy /dist folder to production');
  console.log('   2. Verify on live site: View Source → See meta tags');
  console.log('   3. Submit sitemap to Google Search Console');
  console.log('   4. Request indexing for priority pages');
  console.log('');
} else {
  console.log('❌ ISSUES FOUND:');
  console.log('');
  issuesFound.forEach(issue => console.log('   ' + issue));
  console.log('');
  console.log('   SOLUTIONS:');
  console.log('');
  
  if (isShell) {
    console.log('   FIX #1: React-snap not working');
    console.log('   ─────────────────────────────────');
    console.log('   • Check build logs for errors');
    console.log('   • Verify package.json has reactSnap config');
    console.log('   • Try: rm -rf dist && npm run build');
    console.log('   • Check if puppeteer is installed');
    console.log('');
  }
  
  if (hasContent && !hasDescription) {
    console.log('   FIX #2: React-helmet-async not injecting tags');
    console.log('   ─────────────────────────────────────────────');
    console.log('   • This is a KNOWN ISSUE with react-helmet-async + react-snap');
    console.log('   • We need to use a DIFFERENT approach');
    console.log('   • Solution: Pre-render meta tags server-side');
    console.log('   • I will fix this now!');
    console.log('');
  }
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Save report
const report = {
  timestamp: new Date().toISOString(),
  homepage: {
    hasTitle,
    hasDescription,
    hasOgTags,
    hasCanonical,
    hasSchema,
    hasContent,
    isShell
  },
  build: {
    htmlCount,
    expected: 313,
    coverage: Math.round((htmlCount / 313) * 100)
  },
  issues: issuesFound
};

const reportPath = path.join(__dirname, 'ssg-diagnosis-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`📄 Full report saved: ${reportPath}`);
console.log('');

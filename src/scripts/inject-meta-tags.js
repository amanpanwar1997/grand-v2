#!/usr/bin/env node

/**
 * META TAGS INJECTION SCRIPT
 * 
 * PROBLEM: React-helmet-async doesn't work reliably with react-snap
 * SOLUTION: Inject meta tags directly into HTML after react-snap runs
 * 
 * This script:
 * 1. Reads all HTML files in /dist
 * 2. Extracts route from file path
 * 3. Gets SEO data from seo-system.tsx
 * 4. Injects meta tags directly into <head>
 * 5. Saves updated HTML
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('');
console.log('🔧 META TAGS INJECTION - POST-BUILD PROCESSING');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Import SEO config
const seoSystemPath = path.join(__dirname, '../utils/seo-system.tsx');
if (!fs.existsSync(seoSystemPath)) {
  console.log('❌ ERROR: /utils/seo-system.tsx not found!');
  process.exit(1);
}

console.log('📚 Loading SEO configuration...');
console.log('');

// We'll need to parse the TypeScript file to extract SEO_CONFIG
// For now, let's create a simpler JSON version

const generateMetaTags = (route, title, description, keywords, ogImage = '/og-image.jpg') => {
  const canonicalUrl = `https://www.inchtomilez.com${route}`;
  
  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="https://www.inchtomilez.com${ogImage}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Inchtomilez">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="https://www.inchtomilez.com${ogImage}">
    
    <!-- Canonical -->
    <link rel="canonical" href="${canonicalUrl}">
  `;
};

// Define SEO for key pages (we'll expand this)
const SEO_DATA = {
  '/': {
    title: 'Inchtomilez - Digital Marketing Agency in Indore | SEO, PPC, Social Media',
    description: 'Leading digital marketing agency in Indore offering SEO, PPC, social media marketing, content marketing, branding, and web design services. Drive growth with data-driven strategies.',
    keywords: 'digital marketing agency Indore, SEO services Indore, PPC agency, social media marketing, content marketing, web design Indore'
  },
  '/about': {
    title: 'About Us - Inchtomilez Digital Marketing Agency',
    description: 'Learn about Inchtomilez, a leading digital marketing agency in Indore. Our team of experts delivers innovative marketing solutions and measurable results.',
    keywords: 'about Inchtomilez, digital marketing team, marketing agency Indore, marketing experts'
  },
  '/services': {
    title: 'Digital Marketing Services | SEO, PPC, Social Media & More',
    description: 'Comprehensive digital marketing services including SEO, PPC, social media marketing, content creation, branding, web design, and analytics. Customized solutions for your business.',
    keywords: 'digital marketing services, SEO services, PPC management, social media marketing, content marketing services'
  },
  '/contact': {
    title: 'Contact Us - Get in Touch with Inchtomilez',
    description: 'Contact Inchtomilez for digital marketing services. Call +91-9669988666 or visit our office in Indore. Free consultation available.',
    keywords: 'contact Inchtomilez, digital marketing inquiry, marketing consultation, Indore marketing agency'
  },
  '/blogs': {
    title: 'Digital Marketing Blog | SEO, PPC, Social Media Tips & Trends',
    description: 'Expert insights on digital marketing, SEO strategies, PPC campaigns, social media trends, content marketing, and industry best practices. Updated regularly.',
    keywords: 'digital marketing blog, SEO tips, PPC strategies, social media trends, marketing insights'
  },
  '/faqs': {
    title: 'FAQs - Digital Marketing Questions Answered | Inchtomilez',
    description: 'Frequently asked questions about digital marketing, SEO, PPC, social media, pricing, and our services. Get answers from marketing experts.',
    keywords: 'digital marketing FAQs, SEO questions, PPC FAQ, marketing services questions'
  },
  '/industries': {
    title: 'Industries We Serve - Specialized Digital Marketing Solutions',
    description: 'Industry-specific digital marketing solutions for healthcare, education, real estate, ecommerce, hospitality, and more. Expertise across 18+ industries.',
    keywords: 'industry marketing solutions, healthcare marketing, education marketing, real estate marketing, ecommerce marketing'
  }
};

// Process HTML files
const distPath = path.join(__dirname, '../dist');
let processedCount = 0;
let errorCount = 0;

function getRouteFromPath(filePath) {
  const relative = path.relative(distPath, filePath);
  const dir = path.dirname(relative);
  
  if (dir === '.') return '/';
  return '/' + dir.replace(/\\/g, '/');
}

function injectMetaTags(filePath) {
  try {
    let html = fs.readFileSync(filePath, 'utf-8');
    const route = getRouteFromPath(filePath);
    
    // Get SEO data (use default if not found)
    const seoData = SEO_DATA[route] || {
      title: 'Inchtomilez - Digital Marketing Agency',
      description: 'Professional digital marketing services in Indore',
      keywords: 'digital marketing, Indore, SEO, PPC'
    };
    
    // Generate meta tags
    const metaTags = generateMetaTags(
      route,
      seoData.title,
      seoData.description,
      seoData.keywords
    );
    
    // Check if meta tags already exist
    if (html.includes('<meta name="description"')) {
      // Already has meta tags, skip
      return false;
    }
    
    // Inject after <head> tag
    if (html.includes('<head>')) {
      html = html.replace('<head>', '<head>' + metaTags);
      fs.writeFileSync(filePath, html, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    errorCount++;
    return false;
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file === 'index.html') {
      if (injectMetaTags(filePath)) {
        processedCount++;
        const route = getRouteFromPath(filePath);
        console.log(`✅ Injected: ${route}`);
      }
    }
  }
}

console.log('🔧 Processing HTML files...');
console.log('');

if (!fs.existsSync(distPath)) {
  console.log('❌ ERROR: /dist folder not found! Run npm run build first.');
  process.exit(1);
}

processDirectory(distPath);

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');
console.log('📊 INJECTION SUMMARY:');
console.log('');
console.log(`   Files processed: ${processedCount}`);
console.log(`   Errors: ${errorCount}`);
console.log('');

if (processedCount > 0) {
  console.log('✅ Meta tags injected successfully!');
  console.log('');
  console.log('   NEXT STEPS:');
  console.log('   1. Test locally: npm run serve');
  console.log('   2. View source: curl http://localhost:3000/ | grep "<meta"');
  console.log('   3. Deploy /dist folder');
  console.log('');
} else {
  console.log('⚠️  No files processed. Meta tags may already exist or build is incomplete.');
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('');

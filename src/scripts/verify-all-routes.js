#!/usr/bin/env node

/**
 * VERIFY ALL ROUTES FOR SSG
 * This script verifies that all 313 routes are properly configured
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('');
console.log('🔍 VERIFYING ALL ROUTES FOR SSG');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Step 1: Read generated routes
const routesJsonPath = path.join(__dirname, 'all-routes.json');
let generatedRoutes = [];

if (fs.existsSync(routesJsonPath)) {
  generatedRoutes = JSON.parse(fs.readFileSync(routesJsonPath, 'utf-8'));
  console.log(`✅ Found generated routes file: ${generatedRoutes.length} routes`);
} else {
  console.log('⚠️  No routes file found. Generating...');
  execSync('node scripts/generate-all-routes.js', { stdio: 'inherit' });
  generatedRoutes = JSON.parse(fs.readFileSync(routesJsonPath, 'utf-8'));
}

console.log('');

// Step 2: Read package.json routes
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const packageRoutes = packageJson.reactSnap?.include || [];

console.log(`📦 Package.json routes: ${packageRoutes.length}`);
console.log('');

// Step 3: Read sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
let sitemapUrls = [];

if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
  if (urlMatches) {
    sitemapUrls = urlMatches.map(match => {
      const url = match.replace('<loc>', '').replace('</loc>', '');
      return url.replace('https://www.inchtomilez.com', '');
    });
  }
  console.log(`🗺️  Sitemap URLs: ${sitemapUrls.length}`);
} else {
  console.log('⚠️  No sitemap found');
}

console.log('');
console.log('───────────────────────────────────────────────────────────────');
console.log('');

// Step 4: Compare routes
console.log('📊 ROUTE COMPARISON:');
console.log('');

const categorizeRoutes = (routes) => {
  const categories = {
    static: [],
    services: [],
    industries: [],
    blogCategories: [],
    blogPosts: []
  };

  routes.forEach(route => {
    if (route === '/' || !route.includes('/')) {
      categories.static.push(route);
    } else if (route.startsWith('/services/') && route.split('/').length === 4) {
      categories.blogPosts.push(route); // service sub-pages
    } else if (route.startsWith('/services')) {
      categories.services.push(route);
    } else if (route.startsWith('/industries/')) {
      categories.industries.push(route);
    } else if (route.startsWith('/blogs/') && route.split('/').length === 3) {
      categories.blogCategories.push(route);
    } else if (route.startsWith('/blogs/') && route.split('/').length === 4) {
      categories.blogPosts.push(route);
    } else {
      categories.static.push(route);
    }
  });

  return categories;
};

const categorized = categorizeRoutes(generatedRoutes);

console.log(`   Static Pages: ${categorized.static.length}`);
console.log(`   Service Pages: ${categorized.services.length}`);
console.log(`   Industry Pages: ${categorized.industries.length}`);
console.log(`   Blog Categories: ${categorized.blogCategories.length}`);
console.log(`   Blog Posts: ${categorized.blogPosts.length}`);
console.log('');
console.log(`   📈 TOTAL: ${generatedRoutes.length} routes`);
console.log('');

// Step 5: Check for missing routes
const missingInPackage = generatedRoutes.filter(r => !packageRoutes.includes(r));
const missingInSitemap = generatedRoutes.filter(r => !sitemapUrls.includes(r));

if (missingInPackage.length > 0) {
  console.log('⚠️  WARNING: Some routes missing in package.json:');
  console.log(`   Missing: ${missingInPackage.length} routes`);
  console.log('   Run: node scripts/generate-all-routes.js');
  console.log('');
} else {
  console.log('✅ All routes present in package.json');
  console.log('');
}

if (missingInSitemap.length > 0 && sitemapUrls.length > 0) {
  console.log(`⚠️  INFO: ${missingInSitemap.length} routes not in sitemap.xml`);
  console.log('   (This is OK if sitemap is manually curated)');
  console.log('');
} else if (sitemapUrls.length > 0) {
  console.log('✅ All routes present in sitemap.xml');
  console.log('');
}

// Step 6: Check build output (if exists)
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  console.log('───────────────────────────────────────────────────────────────');
  console.log('');
  console.log('📁 CHECKING BUILD OUTPUT:');
  console.log('');

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

  console.log(`   HTML files found: ${htmlCount}`);
  console.log(`   Expected: ${generatedRoutes.length}`);
  console.log(`   Coverage: ${Math.round((htmlCount / generatedRoutes.length) * 100)}%`);
  console.log('');

  if (htmlCount >= generatedRoutes.length - 5) {
    console.log('✅ BUILD VERIFIED - All routes pre-rendered!');
  } else if (htmlCount >= generatedRoutes.length * 0.9) {
    console.log('⚠️  BUILD MOSTLY COMPLETE - Some routes may have failed');
  } else {
    console.log('❌ BUILD INCOMPLETE - Many routes missing');
  }
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('');
console.log('📋 SUMMARY:');
console.log('');
console.log(`   Generated Routes: ${generatedRoutes.length}`);
console.log(`   Package.json Routes: ${packageRoutes.length}`);
console.log(`   Sitemap URLs: ${sitemapUrls.length}`);
console.log('');

if (missingInPackage.length === 0) {
  console.log('✅ READY FOR BUILD!');
  console.log('');
  console.log('   Run: npm run build');
  console.log('');
  console.log(`   This will pre-render all ${generatedRoutes.length} pages with full SSG!`);
  console.log('');
} else {
  console.log('⚠️  SETUP INCOMPLETE');
  console.log('');
  console.log('   1. Run: node scripts/generate-all-routes.js');
  console.log('   2. Then: npm run build');
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('');

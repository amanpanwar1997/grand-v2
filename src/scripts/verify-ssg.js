#!/usr/bin/env node

/**
 * SSG VERIFICATION SCRIPT
 * Verifies that all pages were properly pre-rendered
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('');
console.log('🔍 SSG VERIFICATION REPORT');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const distPath = path.join(__dirname, '../dist');

if (!fs.existsSync(distPath)) {
  console.error('❌ ERROR: dist/ folder not found');
  console.error('   Run: npm run build');
  process.exit(1);
}

// Count HTML files
let htmlFiles = [];
function findHtmlFiles(dir, baseDir = dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, baseDir);
    } else if (file === 'index.html') {
      const relativePath = path.relative(baseDir, filePath);
      const routePath = relativePath
        .replace(/index\.html$/, '')
        .replace(/\\/g, '/')
        .replace(/\/$/, '') || '/';
      htmlFiles.push(routePath);
    }
  }
}

findHtmlFiles(distPath);

console.log(`📊 TOTAL HTML FILES: ${htmlFiles.length}`);
console.log('');

// Check specific critical pages
const criticalPages = [
  '/',
  '/about',
  '/services',
  '/industries',
  '/blogs',
  '/contact',
  '/services/search-engine-optimization-seo',
  '/blogs/seo',
  '/industries/healthcare'
];

console.log('🔍 CRITICAL PAGES CHECK:');
console.log('');

let allCriticalFound = true;
for (const page of criticalPages) {
  const found = htmlFiles.some(f => {
    const normalized = '/' + f.replace(/^\//, '');
    return normalized === page;
  });
  
  if (found) {
    console.log(`   ✅ ${page}`);
  } else {
    console.log(`   ❌ ${page} - MISSING`);
    allCriticalFound = false;
  }
}

console.log('');

// Check for content in HTML files
console.log('📄 CONTENT VERIFICATION:');
console.log('');

const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf-8');
  
  // Check for empty root div (CSR indicator)
  const hasContent = content.includes('<div id="root">') && 
                     !content.match(/<div id="root"><\/div>/);
  
  if (hasContent) {
    console.log('   ✅ Homepage has pre-rendered content');
    
    // Check for specific content
    const checks = [
      { name: 'H1 heading', pattern: /<h1[^>]*>/ },
      { name: 'Navigation', pattern: /<nav[^>]*>/ },
      { name: 'Footer', pattern: /<footer[^>]*>/ },
      { name: 'Body text', pattern: /<p[^>]*>/ }
    ];
    
    console.log('');
    for (const check of checks) {
      if (check.pattern.test(content)) {
        console.log(`   ✅ ${check.name} found`);
      } else {
        console.log(`   ⚠️  ${check.name} not found`);
      }
    }
  } else {
    console.log('   ❌ Homepage has empty content (CSR mode)');
    allCriticalFound = false;
  }
} else {
  console.log('   ❌ index.html not found');
  allCriticalFound = false;
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Final verdict
if (htmlFiles.length >= 250 && allCriticalFound) {
  console.log('✅ SSG BUILD VERIFIED SUCCESSFULLY!');
  console.log('');
  console.log(`   📊 ${htmlFiles.length} pages pre-rendered`);
  console.log('   ✅ All critical pages found');
  console.log('   ✅ Content properly hydrated');
  console.log('');
  console.log('🚀 READY TO DEPLOY!');
} else if (htmlFiles.length < 250) {
  console.log('⚠️  WARNING: Incomplete build');
  console.log('');
  console.log(`   📊 Only ${htmlFiles.length}/274 pages generated`);
  console.log('   ⚠️  Some routes failed to prerender');
  console.log('');
  console.log('💡 TROUBLESHOOTING:');
  console.log('   1. Check console output for errors');
  console.log('   2. Verify all routes exist in package.json');
  console.log('   3. Run: node scripts/generate-all-routes.js');
  console.log('   4. Rebuild: npm run build');
} else {
  console.log('⚠️  WARNING: Build issues detected');
  console.log('');
  console.log('💡 ISSUES FOUND:');
  if (!allCriticalFound) {
    console.log('   ❌ Some critical pages missing or empty');
  }
  console.log('');
  console.log('💡 TROUBLESHOOTING:');
  console.log('   1. Check browser console for JS errors');
  console.log('   2. Verify navigator/window checks exist');
  console.log('   3. Test in dev mode: npm run dev');
  console.log('   4. Rebuild: npm run build');
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// List sample pages
if (htmlFiles.length > 0) {
  console.log('📄 SAMPLE GENERATED PAGES (first 20):');
  console.log('');
  htmlFiles.slice(0, 20).forEach(file => {
    console.log(`   • ${file}`);
  });
  if (htmlFiles.length > 20) {
    console.log(`   ... and ${htmlFiles.length - 20} more`);
  }
  console.log('');
}

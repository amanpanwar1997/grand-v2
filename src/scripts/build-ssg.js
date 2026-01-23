#!/usr/bin/env node

/**
 * COMPREHENSIVE SSG BUILD SCRIPT
 * Automates the entire build process for React-Snap
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('');
console.log('🚀 STARTING COMPREHENSIVE SSG BUILD');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// STEP 1: Generate all routes
console.log('📋 STEP 1/4: Generating all 274 routes...');
console.log('');

try {
  execSync('node scripts/generate-all-routes.js', { stdio: 'inherit' });
  console.log('');
  console.log('✅ Routes generated successfully');
} catch (error) {
  console.error('❌ Failed to generate routes:', error.message);
  process.exit(1);
}

console.log('');
console.log('───────────────────────────────────────────────────────────────');
console.log('');

// STEP 2: Clean dist folder
console.log('🧹 STEP 2/4: Cleaning dist folder...');
console.log('');

const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('✅ Dist folder cleaned');
} else {
  console.log('✅ Dist folder doesn\'t exist (first build)');
}

console.log('');
console.log('───────────────────────────────────────────────────────────────');
console.log('');

// STEP 3: Build with Vite
console.log('⚡ STEP 3/4: Building with Vite...');
console.log('');

try {
  execSync('npm run build:only', { stdio: 'inherit' });
  console.log('');
  console.log('✅ Vite build completed');
} catch (error) {
  console.error('❌ Vite build failed:', error.message);
  process.exit(1);
}

console.log('');
console.log('───────────────────────────────────────────────────────────────');
console.log('');

// STEP 4: Run React-Snap
console.log('📸 STEP 4/4: Running React-Snap (this will take 10-15 minutes)...');
console.log('');
console.log('⏳ Please wait... Prerendering 274 pages');
console.log('');

try {
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('');
  console.log('✅ React-Snap completed');
} catch (error) {
  console.error('❌ React-Snap failed:', error.message);
  process.exit(1);
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Verify build
console.log('🔍 VERIFYING BUILD...');
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

console.log(`📊 BUILD STATISTICS:`);
console.log(`   HTML Files Generated: ${htmlCount}`);
console.log(`   Expected: 274`);
console.log(`   Success Rate: ${Math.round((htmlCount / 274) * 100)}%`);
console.log('');

if (htmlCount < 250) {
  console.log('⚠️  WARNING: Less than 250 pages generated!');
  console.log('   Some routes may have failed to prerender.');
  console.log('   Check console output above for errors.');
} else {
  console.log('✅ BUILD SUCCESSFUL!');
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');
console.log('🎉 SSG BUILD COMPLETE!');
console.log('');
console.log('📦 Output: ./dist/');
console.log('');
console.log('🧪 TEST LOCALLY:');
console.log('   npx serve dist -p 3000');
console.log('');
console.log('🔍 VERIFY HTML:');
console.log('   curl http://localhost:3000/ | grep "<h1>"');
console.log('');
console.log('🚀 DEPLOY:');
console.log('   git add .');
console.log('   git commit -m "SSG build with React-Snap"');
console.log('   git push');
console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

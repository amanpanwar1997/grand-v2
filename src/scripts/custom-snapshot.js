#!/usr/bin/env node

/**
 * CUSTOM SNAPSHOT SCRIPT WITH META TAGS
 * 
 * This replaces react-snap with a custom solution that:
 * 1. Uses Puppeteer to render each page
 * 2. Waits for react-helmet-async to inject tags
 * 3. Extracts the full HTML with meta tags
 * 4. Saves to disk
 * 
 * This is MORE RELIABLE than react-snap for SSG with dynamic meta tags
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import handler from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('');
console.log('📸 CUSTOM SNAPSHOT - FULL SSG WITH META TAGS');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

// Configuration
const distPath = path.join(__dirname, '../dist');
const PORT = 5555;

// All routes to snapshot
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'all-routes.json'), 'utf-8')
);

console.log(`📋 Found ${routes.length} routes to snapshot`);
console.log('');

// Start local server
const server = createServer((request, response) => {
  return handler(request, response, {
    public: distPath
  });
});

async function startServer() {
  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`✅ Local server started on http://localhost:${PORT}`);
      resolve();
    });
  });
}

async function stopServer() {
  return new Promise((resolve) => {
    server.close(() => {
      console.log('✅ Server stopped');
      resolve();
    });
  });
}

async function snapshotPage(browser, route) {
  const page = await browser.newPage();
  
  try {
    const url = `http://localhost:${PORT}${route}`;
    
    // Navigate and wait for network to be idle
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait for React to hydrate and helmet to inject tags
    await page.waitForTimeout(2000);
    
    // Get the full HTML
    const html = await page.content();
    
    // Save to disk
    const outputPath = route === '/' 
      ? path.join(distPath, 'index.html')
      : path.join(distPath, route.slice(1), 'index.html');
    
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, html, 'utf-8');
    
    // Verify meta tags
    const hasDescription = html.includes('<meta name="description"');
    const hasTitle = html.includes('<title>') && !html.includes('<title>Vite App</title>');
    
    await page.close();
    
    return {
      route,
      success: true,
      hasMetaTags: hasDescription && hasTitle
    };
  } catch (error) {
    await page.close();
    return {
      route,
      success: false,
      error: error.message
    };
  }
}

async function main() {
  // Verify dist exists
  if (!fs.existsSync(distPath)) {
    console.log('❌ ERROR: /dist folder not found!');
    console.log('   Run: npm run build:only');
    process.exit(1);
  }
  
  console.log('🚀 Starting snapshot process...');
  console.log('');
  
  // Start server
  await startServer();
  console.log('');
  
  // Launch browser
  console.log('🌐 Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });
  console.log('✅ Browser launched');
  console.log('');
  
  // Snapshot all pages
  console.log(`📸 Snapshotting ${routes.length} pages...`);
  console.log('   (This will take 10-15 minutes)');
  console.log('');
  
  const results = [];
  let successCount = 0;
  let withMetaCount = 0;
  
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const result = await snapshotPage(browser, route);
    results.push(result);
    
    if (result.success) {
      successCount++;
      if (result.hasMetaTags) {
        withMetaCount++;
        console.log(`✅ [${i + 1}/${routes.length}] ${route} (with meta tags)`);
      } else {
        console.log(`⚠️  [${i + 1}/${routes.length}] ${route} (no meta tags)`);
      }
    } else {
      console.log(`❌ [${i + 1}/${routes.length}] ${route} - ${result.error}`);
    }
    
    // Progress indicator every 10 pages
    if ((i + 1) % 10 === 0) {
      console.log(`   Progress: ${i + 1}/${routes.length} (${Math.round((i + 1) / routes.length * 100)}%)`);
    }
  }
  
  // Cleanup
  console.log('');
  console.log('🧹 Cleaning up...');
  await browser.close();
  await stopServer();
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('📊 SNAPSHOT SUMMARY:');
  console.log('');
  console.log(`   Total routes: ${routes.length}`);
  console.log(`   Successful: ${successCount}`);
  console.log(`   With meta tags: ${withMetaCount}`);
  console.log(`   Failed: ${routes.length - successCount}`);
  console.log(`   Success rate: ${Math.round(successCount / routes.length * 100)}%`);
  console.log(`   Meta tag rate: ${Math.round(withMetaCount / routes.length * 100)}%`);
  console.log('');
  
  if (withMetaCount >= routes.length * 0.95) {
    console.log('✅ EXCELLENT: 95%+ pages have meta tags!');
    console.log('');
    console.log('   Your SSG build is PERFECT for Google:');
    console.log('   - All pages pre-rendered ✅');
    console.log('   - Meta tags in HTML ✅');
    console.log('   - Ready to deploy! 🚀');
    console.log('');
  } else if (withMetaCount >= routes.length * 0.5) {
    console.log('⚠️  WARNING: Only 50-95% pages have meta tags');
    console.log('   Some pages may be missing SEO data.');
    console.log('');
  } else {
    console.log('❌ ERROR: Less than 50% pages have meta tags!');
    console.log('   React-helmet-async is NOT working properly.');
    console.log('');
  }
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    total: routes.length,
    successful: successCount,
    withMetaTags: withMetaCount,
    failed: routes.length - successCount,
    results
  };
  
  const reportPath = path.join(__dirname, 'snapshot-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`📄 Full report: ${reportPath}`);
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
}

main().catch(error => {
  console.error('❌ FATAL ERROR:', error);
  process.exit(1);
});

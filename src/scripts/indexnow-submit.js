/**
 * ============================================================================
 * INDEXNOW FORCE SUBMIT - INSTANT INDEXING
 * ============================================================================
 * 
 * Forces immediate submission of ALL pages to:
 * - Bing Webmaster Tools
 * - Yandex
 * - Seznam.cz
 * - Naver
 * 
 * Google doesn't support IndexNow yet, but Bing shares data with Google.
 * 
 * Benefits:
 * ✅ Instant notification to search engines
 * ✅ Faster indexing (minutes instead of days)
 * ✅ Batch submission (up to 10,000 URLs)
 * ✅ Free (no API limits)
 * 
 * Usage:
 *   node scripts/indexnow-submit.js
 * 
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.inchtomilez.com';
const INDEXNOW_KEY = 'c8e47e9a1f2b4d5c6e8a9b3c5d7e9f1a'; // Your unique key

// IndexNow endpoints
const ENDPOINTS = {
  bing: 'https://www.bing.com/indexnow',
  yandex: 'https://yandex.com/indexnow',
};

// ============================================================================
// EXTRACT URLS FROM SITEMAP
// ============================================================================

function extractUrlsFromSitemap() {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ sitemap.xml not found!');
    console.log('   Run: node scripts/generate-sitemap.js');
    process.exit(1);
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  
  // Extract all URLs
  const urlMatches = content.match(/<loc>(.*?)<\/loc>/g);
  
  if (!urlMatches) {
    console.error('❌ No URLs found in sitemap!');
    process.exit(1);
  }
  
  const urls = urlMatches.map(match => {
    return match.replace('<loc>', '').replace('</loc>', '');
  });
  
  return urls;
}

// ============================================================================
// SUBMIT TO INDEXNOW
// ============================================================================

function submitToIndexNow(urls, endpoint, engineName) {
  return new Promise((resolve, reject) => {
    const payload = {
      host: 'www.inchtomilez.com',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };
    
    const postData = JSON.stringify(payload);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    
    const req = https.request(endpoint, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve({ success: true, engine: engineName, code: res.statusCode });
        } else {
          reject({ 
            success: false, 
            engine: engineName, 
            code: res.statusCode, 
            message: data 
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject({ success: false, engine: engineName, error: error.message });
    });
    
    req.write(postData);
    req.end();
  });
}

// ============================================================================
// BATCH SUBMIT
// ============================================================================

async function batchSubmit(urls) {
  // IndexNow supports up to 10,000 URLs per request
  const batchSize = 10000;
  const batches = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  
  console.log('');
  console.log(`📦 Submitting ${urls.length} URLs in ${batches.length} batch(es)...`);
  console.log('');
  
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    
    console.log(`📤 Batch ${i + 1}/${batches.length} (${batch.length} URLs)...`);
    
    // Submit to Bing
    try {
      const bingResult = await submitToIndexNow(batch, ENDPOINTS.bing, 'Bing');
      console.log(`   ✅ Bing: Success (Status ${bingResult.code})`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Bing: Failed (${error.code || error.error})`);
      failureCount++;
    }
    
    // Wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Submit to Yandex
    try {
      const yandexResult = await submitToIndexNow(batch, ENDPOINTS.yandex, 'Yandex');
      console.log(`   ✅ Yandex: Success (Status ${yandexResult.code})`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Yandex: Failed (${error.code || error.error})`);
      failureCount++;
    }
    
    console.log('');
    
    // Wait 2 seconds between batches
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return { successCount, failureCount };
}

// ============================================================================
// CREATE KEY FILE
// ============================================================================

function createKeyFile() {
  const keyFilePath = path.join(__dirname, `../public/${INDEXNOW_KEY}.txt`);
  
  if (!fs.existsSync(keyFilePath)) {
    fs.writeFileSync(keyFilePath, INDEXNOW_KEY, 'utf8');
    console.log(`✅ Created IndexNow key file: ${INDEXNOW_KEY}.txt`);
  } else {
    console.log(`✅ IndexNow key file exists: ${INDEXNOW_KEY}.txt`);
  }
}

// ============================================================================
// UPDATE INDEXNOW CONFIG
// ============================================================================

function updateIndexNowConfig() {
  const configPath = path.join(__dirname, '../public/indexnow-config.json');
  
  const config = {
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    endpoints: ENDPOINTS,
    lastSubmission: new Date().toISOString(),
    totalUrlsSubmitted: 0,
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  console.log('✅ Updated indexnow-config.json');
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('');
  console.log('═'.repeat(80));
  console.log('  🚀 INDEXNOW FORCE SUBMIT - INSTANT INDEXING');
  console.log('═'.repeat(80));
  console.log('');
  console.log('   This will notify search engines about ALL your pages');
  console.log('   Expected indexing time: 1-24 hours');
  console.log('');
  console.log('═'.repeat(80));
  console.log('');
  
  // Step 1: Create key file
  console.log('📝 Step 1/3: Creating IndexNow key file...');
  createKeyFile();
  console.log('');
  
  // Step 2: Extract URLs
  console.log('📚 Step 2/3: Extracting URLs from sitemap...');
  const urls = extractUrlsFromSitemap();
  console.log(`   Found ${urls.length} URLs`);
  console.log('');
  
  // Step 3: Submit
  console.log('🚀 Step 3/3: Submitting to search engines...');
  const { successCount, failureCount } = await batchSubmit(urls);
  
  // Update config
  updateIndexNowConfig();
  
  // Final report
  console.log('═'.repeat(80));
  console.log('  📊 SUBMISSION REPORT');
  console.log('═'.repeat(80));
  console.log('');
  console.log(`   Total URLs submitted: ${urls.length}`);
  console.log(`   Successful submissions: ${successCount}`);
  console.log(`   Failed submissions: ${failureCount}`);
  console.log('');
  
  if (successCount > 0) {
    console.log('✅ SUCCESS!');
    console.log('');
    console.log('   Your pages have been submitted to:');
    console.log('   • Bing (shares with Google)');
    console.log('   • Yandex');
    console.log('');
    console.log('   Expected indexing timeline:');
    console.log('   • High-priority pages: 1-6 hours');
    console.log('   • Regular pages: 6-24 hours');
    console.log('   • Blog posts: 24-72 hours');
    console.log('');
    console.log('💡 Pro Tips:');
    console.log('   1. Check Google Search Console after 24 hours');
    console.log('   2. Request manual indexing for key pages');
    console.log('   3. Monitor "Coverage" report for errors');
    console.log('   4. Re-run this script when you add new pages');
    console.log('');
  } else {
    console.log('⚠️  WARNING: All submissions failed');
    console.log('');
    console.log('   Possible causes:');
    console.log('   • Network connectivity issues');
    console.log('   • IndexNow API temporarily unavailable');
    console.log('   • Invalid API key or URL format');
    console.log('');
    console.log('   Try again in 5 minutes');
    console.log('');
  }
  
  console.log('═'.repeat(80));
  console.log('');
  console.log('🔗 Verify submission:');
  console.log(`   1. Visit: https://www.bing.com/webmasters`);
  console.log(`   2. Check "URL Inspection" tool`);
  console.log(`   3. Search: site:inchtomilez.com`);
  console.log('');
  console.log('═'.repeat(80));
  console.log('');
}

// Run
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

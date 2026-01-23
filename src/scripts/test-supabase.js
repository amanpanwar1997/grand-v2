#!/usr/bin/env node

/**
 * SUPABASE CONNECTION TEST SCRIPT
 * 
 * Tests all Supabase connections and verifies everything works
 * 
 * Usage:
 *   node scripts/test-supabase.js
 */

const API_BASE = 'http://localhost:8000/make-server-9c8e64e4';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('');
  log('━'.repeat(60), 'cyan');
  log(`  ${title}`, 'cyan');
  log('━'.repeat(60), 'cyan');
  console.log('');
}

function logTest(name, status, details = '') {
  const icon = status ? '✅' : '❌';
  const color = status ? 'green' : 'red';
  log(`${icon} ${name}`, color);
  if (details) {
    log(`   ${details}`, 'gray');
  }
}

async function testEndpoint(name, url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      logTest(name, true, `Status: ${response.status}`);
      return { success: true, data };
    } else {
      logTest(name, false, `Status: ${response.status} - ${data.error || 'Unknown error'}`);
      return { success: false, error: data.error };
    }
  } catch (error) {
    logTest(name, false, `Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('🧪 SUPABASE CONNECTION TEST SUITE', 'blue');
  log(`Testing backend at: ${API_BASE}`, 'gray');
  console.log('');

  let totalTests = 0;
  let passedTests = 0;

  // ============================================================================
  // 1. HEALTH CHECK
  // ============================================================================
  logSection('1️⃣  HEALTH CHECK');
  
  const health = await testEndpoint(
    'Backend Health',
    `${API_BASE}/health`
  );
  totalTests++;
  if (health.success) passedTests++;

  // ============================================================================
  // 2. INITIALIZATION STATUS
  // ============================================================================
  logSection('2️⃣  INITIALIZATION STATUS');
  
  const initStatus = await testEndpoint(
    'System Initialization Status',
    `${API_BASE}/init/status`
  );
  totalTests++;
  if (initStatus.success) passedTests++;

  // ============================================================================
  // 3. SETTINGS API
  // ============================================================================
  logSection('3️⃣  SETTINGS API (KV Store)');
  
  const getSettings = await testEndpoint(
    'Get Settings',
    `${API_BASE}/settings/get`
  );
  totalTests++;
  if (getSettings.success) {
    passedTests++;
    log(`   Found ${Object.keys(getSettings.data?.settings || {}).length} settings`, 'gray');
  }

  const updateSettings = await testEndpoint(
    'Update Settings',
    `${API_BASE}/settings/update`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testSetting: 'Test Value from Script',
        timestamp: new Date().toISOString()
      })
    }
  );
  totalTests++;
  if (updateSettings.success) passedTests++;

  // ============================================================================
  // 4. USERS API
  // ============================================================================
  logSection('4️⃣  USERS API (KV Store)');
  
  const getAllUsers = await testEndpoint(
    'Get All Users',
    `${API_BASE}/users/all`
  );
  totalTests++;
  if (getAllUsers.success) {
    passedTests++;
    log(`   Found ${getAllUsers.data?.users?.length || 0} users`, 'gray');
  }

  const createUser = await testEndpoint(
    'Create Test User',
    `${API_BASE}/users/create`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test-${Date.now()}@inchtomilez.com`,
        name: 'Test User',
        role: 'viewer',
        password: 'testpass123'
      })
    }
  );
  totalTests++;
  if (createUser.success) {
    passedTests++;
    log(`   Created user: ${createUser.data?.user?.email}`, 'gray');
  }

  // ============================================================================
  // 5. SEO SYSTEM API
  // ============================================================================
  logSection('5️⃣  SEO SYSTEM API (KV Store)');
  
  const getGlobalSEO = await testEndpoint(
    'Get Global SEO',
    `${API_BASE}/seo-system/global`
  );
  totalTests++;
  if (getGlobalSEO.success) passedTests++;

  const updateGlobalSEO = await testEndpoint(
    'Update Global SEO',
    `${API_BASE}/seo-system/global`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteName: 'Inchtomilez Test',
        defaultTitle: 'Test Title',
        lastUpdated: new Date().toISOString()
      })
    }
  );
  totalTests++;
  if (updateGlobalSEO.success) passedTests++;

  const getAllPages = await testEndpoint(
    'Get All Pages SEO',
    `${API_BASE}/seo-system/pages/all`
  );
  totalTests++;
  if (getAllPages.success) {
    passedTests++;
    log(`   Found ${getAllPages.data?.pages?.length || 0} pages`, 'gray');
  }

  // ============================================================================
  // 6. MEDIA API (Storage)
  // ============================================================================
  logSection('6️⃣  MEDIA API (Supabase Storage)');
  
  const getAllMedia = await testEndpoint(
    'Get All Media',
    `${API_BASE}/media/all`
  );
  totalTests++;
  if (getAllMedia.success) {
    passedTests++;
    log(`   Found ${getAllMedia.data?.files?.length || 0} files`, 'gray');
  }

  const getStorageStats = await testEndpoint(
    'Get Storage Stats',
    `${API_BASE}/media/stats`
  );
  totalTests++;
  if (getStorageStats.success) {
    passedTests++;
    const stats = getStorageStats.data?.stats;
    if (stats) {
      log(`   Total Files: ${stats.totalFiles}, Size: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`, 'gray');
    }
  }

  // ============================================================================
  // 7. ACTIVITY LOG
  // ============================================================================
  logSection('7️⃣  ACTIVITY LOG (KV Store)');
  
  const createActivity = await testEndpoint(
    'Create Activity Log',
    `${API_BASE}/activity-log/create`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'test-user',
        userName: 'Test User',
        action: 'Test Action',
        module: 'testing',
        details: { test: true },
        timestamp: new Date().toISOString(),
        userAgent: 'Test Script'
      })
    }
  );
  totalTests++;
  if (createActivity.success) passedTests++;

  const getActivities = await testEndpoint(
    'Get Activity Logs',
    `${API_BASE}/activity-log/get?module=all&limit=10`
  );
  totalTests++;
  if (getActivities.success) {
    passedTests++;
    log(`   Found ${getActivities.data?.activities?.length || 0} activities`, 'gray');
  }

  // ============================================================================
  // 8. REDIRECTS
  // ============================================================================
  logSection('8️⃣  REDIRECTS (KV Store)');
  
  const getAllRedirects = await testEndpoint(
    'Get All Redirects',
    `${API_BASE}/seo-system/redirects`
  );
  totalTests++;
  if (getAllRedirects.success) {
    passedTests++;
    log(`   Found ${getAllRedirects.data?.redirects?.length || 0} redirects`, 'gray');
  }

  const createRedirect = await testEndpoint(
    'Create Test Redirect',
    `${API_BASE}/seo-system/redirects/create`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromPath: `/test-${Date.now()}`,
        toPath: '/about',
        statusCode: 301,
        permanent: true
      })
    }
  );
  totalTests++;
  if (createRedirect.success) {
    passedTests++;
    log(`   Created redirect: ${createRedirect.data?.redirect?.fromPath}`, 'gray');
  }

  // ============================================================================
  // 9. ROBOTS.TXT
  // ============================================================================
  logSection('9️⃣  ROBOTS.TXT (KV Store)');
  
  const getRobots = await testEndpoint(
    'Get Robots.txt',
    `${API_BASE}/seo-system/robots`
  );
  totalTests++;
  if (getRobots.success) {
    passedTests++;
    if (getRobots.data?.content) {
      const lines = getRobots.data.content.split('\n').length;
      log(`   Robots.txt has ${lines} lines`, 'gray');
    }
  }

  // ============================================================================
  // 10. SITEMAP
  // ============================================================================
  logSection('🔟 SITEMAP (KV Store)');
  
  const getSitemap = await testEndpoint(
    'Get Sitemap',
    `${API_BASE}/seo-system/sitemap/get`
  );
  totalTests++;
  if (getSitemap.success) {
    passedTests++;
    if (getSitemap.data?.content) {
      const urlCount = (getSitemap.data.content.match(/<url>/g) || []).length;
      log(`   Sitemap has ${urlCount} URLs`, 'gray');
    }
  }

  // ============================================================================
  // FINAL RESULTS
  // ============================================================================
  console.log('');
  log('━'.repeat(60), 'cyan');
  log('  TEST RESULTS', 'cyan');
  log('━'.repeat(60), 'cyan');
  console.log('');

  const percentage = ((passedTests / totalTests) * 100).toFixed(1);
  const statusColor = percentage >= 90 ? 'green' : percentage >= 70 ? 'yellow' : 'red';

  log(`Total Tests: ${totalTests}`, 'gray');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${totalTests - passedTests}`, 'red');
  log(`Success Rate: ${percentage}%`, statusColor);
  console.log('');

  if (passedTests === totalTests) {
    log('🎉 ALL TESTS PASSED! Supabase is fully functional!', 'green');
  } else if (percentage >= 70) {
    log('⚠️  MOSTLY WORKING - Some tests failed', 'yellow');
  } else {
    log('❌ CRITICAL ISSUES - Many tests failed', 'red');
  }

  console.log('');
  log('━'.repeat(60), 'cyan');
  console.log('');

  // Exit with appropriate code
  process.exit(passedTests === totalTests ? 0 : 1);
}

// Run tests
log('Starting Supabase connection tests...', 'blue');
log('Make sure backend is running: npm run backend', 'yellow');
console.log('');

setTimeout(() => {
  runTests().catch(error => {
    console.error('');
    log('❌ FATAL ERROR:', 'red');
    console.error(error);
    console.log('');
    log('Make sure the backend server is running!', 'yellow');
    log('Run: npm run backend', 'yellow');
    console.log('');
    process.exit(1);
  });
}, 1000);

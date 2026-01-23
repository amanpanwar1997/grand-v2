/**
 * BACKEND DIAGNOSTIC TEST
 * Tests if backend is accessible and working
 */

import { projectId, publicAnonKey } from '../supabase/info';

export async function testBackendConnection() {
  console.log('🔍 Testing backend connection...');
  console.log('Project ID:', projectId);
  console.log('API Key:', publicAnonKey ? 'Present' : 'Missing');

  // Test 1: Health check
  try {
    console.log('\n📡 Test 1: Health Check');
    const healthUrl = `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/health`;
    console.log('URL:', healthUrl);
    
    const response = await fetch(healthUrl, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.status === 'ok') {
      console.log('✅ Backend is ONLINE');
    } else {
      console.log('❌ Backend returned unexpected response');
    }
  } catch (error: any) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }

  // Test 2: SEO endpoint
  try {
    console.log('\n📡 Test 2: SEO Update Endpoint');
    const seoUrl = `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/update`;
    console.log('URL:', seoUrl);
    
    const testData = {
      pageId: 'test_page_diagnostic',
      slug: '/test-diagnostic',
      title: 'Test Page',
      description: 'Test description',
      keywords: 'test',
      canonical: 'https://www.inchtomilez.com/test',
      index: true,
      follow: true,
      archive: true,
      ogTitle: 'Test',
      ogDescription: 'Test',
      ogImage: '/og-image.jpg',
      ogType: 'website',
      twitterTitle: 'Test',
      twitterDescription: 'Test',
      twitterImage: '/og-image.jpg',
      twitterCard: 'summary_large_image',
      schemaType: 'WebPage',
      schemaData: null,
      includeSitemap: true,
      sitemapPriority: 0.5,
      sitemapChangeFreq: 'monthly',
      score: 0,
      issues: []
    };
    
    console.log('Sending test data...');
    
    const response = await fetch(seoUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ SEO endpoint is WORKING');
      return true;
    } else {
      console.log('❌ SEO endpoint returned error:', data.error);
      return false;
    }
  } catch (error: any) {
    console.error('❌ SEO endpoint test failed:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

// Run test immediately when imported
testBackendConnection();

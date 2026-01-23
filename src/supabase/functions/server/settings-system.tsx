/**
 * ============================================================================
 * SETTINGS SYSTEM API
 * ============================================================================
 * 
 * Backend endpoints for site settings management
 */

import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Default settings
const DEFAULT_SETTINGS = {
  // General
  siteName: 'Inchtomilez',
  siteUrl: 'https://www.inchtomilez.com',
  tagline: 'Digital Marketing Excellence',
  description: 'Leading digital marketing and advertising agency in Indore',
  email: 'info@inchtomilez.com',
  phone: '+91 9669988666',
  address: 'Vijay Nagar, Indore, Madhya Pradesh, India',
  
  // SEO Defaults
  defaultTitle: '%page% | Inchtomilez',
  defaultDescription: 'Expert digital marketing services in Indore',
  defaultKeywords: 'digital marketing, SEO, PPC, Indore',
  defaultOgImage: '/og-image.jpg',
  
  // Social
  facebookUrl: 'https://facebook.com/inchtomilez',
  instagramUrl: 'https://instagram.com/inchtomilez',
  linkedinUrl: 'https://linkedin.com/company/inchtomilez',
  twitterUrl: 'https://twitter.com/inchtomilez',
  youtubeUrl: '',
  
  // Email
  smtpHost: '',
  smtpPort: '587',
  smtpUser: '',
  smtpPassword: '',
  fromEmail: 'noreply@inchtomilez.com',
  fromName: 'Inchtomilez',
  
  // API Keys
  googleMapsKey: '',
  googleAnalyticsId: '',
  facebookPixelId: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  
  // Advanced
  maintenanceMode: false,
  allowRegistration: false,
  commentsEnabled: false,
  cacheEnabled: true,
};

/**
 * GET /settings/get - Get all settings
 */
app.get('/settings/get', async (c) => {
  try {
    // Get settings from KV store
    const settings = await kv.get('settings:site');
    
    // Return settings or defaults
    return c.json({
      success: true,
      settings: settings || DEFAULT_SETTINGS
    });
  } catch (error) {
    console.error('Error getting settings:', error);
    return c.json({
      success: false,
      error: 'Failed to get settings',
      settings: DEFAULT_SETTINGS // Fallback to defaults
    });
  }
});

/**
 * POST /settings/update - Update settings
 */
app.post('/settings/update', async (c) => {
  try {
    const newSettings = await c.req.json();
    
    // Validate required fields
    if (!newSettings.siteName || !newSettings.siteUrl) {
      return c.json({
        success: false,
        error: 'Site name and URL are required'
      }, 400);
    }
    
    // Save to KV store
    await kv.set('settings:site', newSettings);
    
    // Also save history
    const timestamp = new Date().toISOString();
    await kv.set(`settings:history:${timestamp}`, newSettings);
    
    return c.json({
      success: true,
      message: 'Settings updated successfully',
      settings: newSettings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return c.json({
      success: false,
      error: 'Failed to update settings'
    }, 500);
  }
});

/**
 * POST /settings/reset - Reset to defaults
 */
app.post('/settings/reset', async (c) => {
  try {
    // Save current settings to history before reset
    const currentSettings = await kv.get('settings:site');
    if (currentSettings) {
      const timestamp = new Date().toISOString();
      await kv.set(`settings:history:before-reset:${timestamp}`, currentSettings);
    }
    
    // Reset to defaults
    await kv.set('settings:site', DEFAULT_SETTINGS);
    
    return c.json({
      success: true,
      message: 'Settings reset to defaults',
      settings: DEFAULT_SETTINGS
    });
  } catch (error) {
    console.error('Error resetting settings:', error);
    return c.json({
      success: false,
      error: 'Failed to reset settings'
    }, 500);
  }
});

/**
 * GET /settings/history - Get settings history
 */
app.get('/settings/history', async (c) => {
  try {
    // Get all history entries
    const historyEntries = await kv.getByPrefix('settings:history:');
    
    // Sort by timestamp (newest first)
    const sortedHistory = historyEntries
      .map((entry: any) => ({
        timestamp: entry.key.replace('settings:history:', ''),
        settings: entry.value
      }))
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, 20); // Last 20 changes
    
    return c.json({
      success: true,
      history: sortedHistory
    });
  } catch (error) {
    console.error('Error getting settings history:', error);
    return c.json({
      success: false,
      error: 'Failed to get settings history',
      history: []
    });
  }
});

/**
 * GET /settings/export - Export settings as JSON
 */
app.get('/settings/export', async (c) => {
  try {
    const settings = await kv.get('settings:site');
    
    return c.json({
      success: true,
      settings: settings || DEFAULT_SETTINGS,
      exportedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error exporting settings:', error);
    return c.json({
      success: false,
      error: 'Failed to export settings'
    }, 500);
  }
});

/**
 * POST /settings/import - Import settings from JSON
 */
app.post('/settings/import', async (c) => {
  try {
    const { settings } = await c.req.json();
    
    if (!settings || typeof settings !== 'object') {
      return c.json({
        success: false,
        error: 'Invalid settings data'
      }, 400);
    }
    
    // Validate required fields
    if (!settings.siteName || !settings.siteUrl) {
      return c.json({
        success: false,
        error: 'Imported settings must include siteName and siteUrl'
      }, 400);
    }
    
    // Save backup before import
    const currentSettings = await kv.get('settings:site');
    if (currentSettings) {
      const timestamp = new Date().toISOString();
      await kv.set(`settings:history:before-import:${timestamp}`, currentSettings);
    }
    
    // Import new settings
    await kv.set('settings:site', settings);
    
    return c.json({
      success: true,
      message: 'Settings imported successfully',
      settings
    });
  } catch (error) {
    console.error('Error importing settings:', error);
    return c.json({
      success: false,
      error: 'Failed to import settings'
    }, 500);
  }
});

export default app;

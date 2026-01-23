/**
 * SETTINGS API
 * Global site settings management
 */

import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

interface SiteSettings {
  // Site Info
  siteName: string;
  tagline: string;
  description: string;
  
  // Contact
  contactEmail: string;
  supportEmail: string;
  contactPhone: string;
  whatsapp: string;
  address: string;
  
  // Social Media
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  pinterest: string;
  
  // Brand
  logo: string;
  favicon: string;
  brandColor: string;
  
  // Business
  businessType: string;
  foundedYear: string;
  employeeCount: string;
  
  // Timestamps
  updatedAt: string;
  updatedBy: string;
}

/**
 * Get settings
 */
export async function getSettings(c: Context) {
  try {
    let settings = await kv.get('settings:global');
    
    if (!settings) {
      settings = getDefaultSettings();
    }
    
    return c.json({
      success: true,
      settings
    });
  } catch (error: any) {
    console.error('Error getting settings:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update settings
 */
export async function updateSettings(c: Context) {
  try {
    const updates = await c.req.json();
    
    // Validate required fields
    if (!updates.siteName || !updates.contactEmail) {
      return c.json({
        success: false,
        error: 'Site name and contact email are required'
      }, 400);
    }
    
    // Get existing settings
    const existing = await kv.get('settings:global') || getDefaultSettings();
    
    // Merge updates
    const settings = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: updates.updatedBy || 'admin'
    };
    
    // Save settings
    await kv.set('settings:global', settings);
    
    // Create backup
    await kv.set(`settings:backup:${Date.now()}`, settings);
    
    console.log('Settings updated successfully');
    
    return c.json({
      success: true,
      message: 'Settings updated successfully',
      settings
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Reset settings to default
 */
export async function resetSettings(c: Context) {
  try {
    const defaults = getDefaultSettings();
    
    await kv.set('settings:global', defaults);
    
    console.log('Settings reset to default');
    
    return c.json({
      success: true,
      message: 'Settings reset to default',
      settings: defaults
    });
  } catch (error: any) {
    console.error('Error resetting settings:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get settings history
 */
export async function getSettingsHistory(c: Context) {
  try {
    const backups = await kv.getByPrefix('settings:backup:');
    
    const history = backups.map((item: any) => ({
      timestamp: item.key.split(':')[2],
      settings: item.value
    })).sort((a: any, b: any) => 
      parseInt(b.timestamp) - parseInt(a.timestamp)
    );
    
    return c.json({
      success: true,
      count: history.length,
      history: history.slice(0, 20) // Last 20 backups
    });
  } catch (error: any) {
    console.error('Error getting settings history:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Restore settings from backup
 */
export async function restoreSettings(c: Context) {
  try {
    const { timestamp } = await c.req.json();
    
    if (!timestamp) {
      return c.json({
        success: false,
        error: 'Timestamp is required'
      }, 400);
    }
    
    const backup = await kv.get(`settings:backup:${timestamp}`);
    
    if (!backup) {
      return c.json({
        success: false,
        error: 'Backup not found'
      }, 404);
    }
    
    await kv.set('settings:global', backup);
    
    console.log(`Settings restored from backup: ${timestamp}`);
    
    return c.json({
      success: true,
      message: 'Settings restored successfully',
      settings: backup
    });
  } catch (error: any) {
    console.error('Error restoring settings:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get default settings
 */
function getDefaultSettings(): SiteSettings {
  return {
    // Site Info
    siteName: 'Inchtomilez',
    tagline: 'Leading Digital Marketing Agency',
    description: 'Expert digital marketing services in Indore, India',
    
    // Contact
    contactEmail: 'contact@inchtomilez.com',
    supportEmail: 'support@inchtomilez.com',
    contactPhone: '+91-9669988666',
    whatsapp: '+919669988666',
    address: 'Indore, Madhya Pradesh, India',
    
    // Social Media
    facebook: 'https://facebook.com/inchtomilez',
    instagram: 'https://instagram.com/inchtomilez',
    linkedin: 'https://linkedin.com/company/inchtomilez',
    twitter: 'https://twitter.com/inchtomilez',
    youtube: '',
    pinterest: '',
    
    // Brand
    logo: '/logo.svg',
    favicon: '/favicon.svg',
    brandColor: '#eab308',
    
    // Business
    businessType: 'Digital Marketing Agency',
    foundedYear: '2015',
    employeeCount: '50-100',
    
    // Timestamps
    updatedAt: new Date().toISOString(),
    updatedBy: 'system'
  };
}

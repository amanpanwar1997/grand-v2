/**
 * UNIFIED CONFIGURATION SYSTEM
 * Single source of truth for ALL website configuration
 * Replaces scattered config files with centralized database
 */

import * as kv from './kv_store.tsx';
import { Context } from 'npm:hono';

// ============================================================
// CONFIGURATION SCHEMA
// ============================================================

export interface UnifiedConfig {
  // Global Site
  site: {
    name: string;
    domain: string;
    protocol: string;
    baseUrl: string;
    language: string;
    locale: string;
    timezone: string;
  };
  
  // Business Info
  business: {
    legalName: string;
    brandName: string;
    tagline: string;
    description: string;
    founded: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
  };
  
  // Social Media
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    pinterest: string;
    tiktok: string;
    whatsapp: string;
  };
  
  // SEO Global
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultKeywords: string[];
    defaultOgImage: string;
    favicon: string;
    logo: string;
    twitterHandle: string;
    facebookAppId: string;
    googleSiteVerification: string;
    bingVerification: string;
    yandexVerification: string;
    pinterestVerification: string;
  };
  
  // Features
  features: {
    blog: boolean;
    ecommerce: boolean;
    newsletter: boolean;
    chatbot: boolean;
    analytics: boolean;
    seo: boolean;
    pwa: boolean;
    darkMode: boolean;
    multiLanguage: boolean;
    search: boolean;
  };
  
  // Integrations
  integrations: {
    googleAnalytics: string;
    googleTagManager: string;
    facebookPixel: string;
    hotjar: string;
    intercom: string;
    mailchimp: string;
    sendgrid: string;
    stripe: string;
    paypal: string;
  };
  
  // Performance
  performance: {
    cacheEnabled: boolean;
    cacheDuration: number;
    lazyLoadImages: boolean;
    minifyAssets: boolean;
    enableServiceWorker: boolean;
    compressionLevel: number;
  };
  
  // Security
  security: {
    cors: {
      enabled: boolean;
      origins: string[];
    };
    rateLimit: {
      enabled: boolean;
      maxRequests: number;
      windowMs: number;
    };
    ssl: {
      enforceHttps: boolean;
      hsts: boolean;
    };
  };
  
  // Navigation
  navigation: {
    header: {
      logo: string;
      items: NavigationItem[];
      cta: {
        text: string;
        link: string;
      };
    };
    footer: {
      columns: FooterColumn[];
      copyright: string;
      legal: string[];
    };
  };
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  link: string;
  type: 'link' | 'dropdown' | 'mega';
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
  order: number;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: {
    label: string;
    link: string;
  }[];
  order: number;
}

// ============================================================
// DEFAULT CONFIGURATION
// ============================================================

export function getDefaultConfig(): UnifiedConfig {
  return {
    site: {
      name: 'Inchtomilez',
      domain: 'inchtomilez.com',
      protocol: 'https',
      baseUrl: 'https://www.inchtomilez.com',
      language: 'en',
      locale: 'en-US',
      timezone: 'Asia/Kolkata'
    },
    
    business: {
      legalName: 'Inchtomilez Digital Marketing And Advertising Agency',
      brandName: 'Inchtomilez',
      tagline: 'Transform Your Digital Presence',
      description: 'Leading digital marketing agency in Indore, India. We provide SEO, PPC, social media marketing, and web development services.',
      founded: '2015',
      email: 'contact@inchtomilez.com',
      phone: '+91-9669988666',
      address: {
        street: '123 Business District',
        city: 'Indore',
        state: 'Madhya Pradesh',
        country: 'India',
        postalCode: '452001'
      }
    },
    
    social: {
      facebook: 'https://facebook.com/inchtomilez',
      twitter: 'https://twitter.com/inchtomilez',
      instagram: 'https://instagram.com/inchtomilez',
      linkedin: 'https://linkedin.com/company/inchtomilez',
      youtube: 'https://youtube.com/@inchtomilez',
      pinterest: '',
      tiktok: '',
      whatsapp: 'https://wa.me/919669988666'
    },
    
    seo: {
      defaultTitle: 'Inchtomilez | Digital Marketing Agency Indore',
      titleTemplate: '%s | Inchtomilez',
      defaultDescription: 'Transform your business with expert digital marketing services. SEO, PPC, social media, and web development by Inchtomilez.',
      defaultKeywords: ['digital marketing', 'SEO', 'PPC', 'social media', 'Indore', 'agency'],
      defaultOgImage: '/og-image.jpg',
      favicon: '/favicon.svg',
      logo: '/logo.svg',
      twitterHandle: '@inchtomilez',
      facebookAppId: '',
      googleSiteVerification: '',
      bingVerification: '',
      yandexVerification: '',
      pinterestVerification: ''
    },
    
    features: {
      blog: true,
      ecommerce: false,
      newsletter: true,
      chatbot: true,
      analytics: true,
      seo: true,
      pwa: true,
      darkMode: true,
      multiLanguage: false,
      search: true
    },
    
    integrations: {
      googleAnalytics: '',
      googleTagManager: '',
      facebookPixel: '',
      hotjar: '',
      intercom: '',
      mailchimp: '',
      sendgrid: '',
      stripe: '',
      paypal: ''
    },
    
    performance: {
      cacheEnabled: true,
      cacheDuration: 3600,
      lazyLoadImages: true,
      minifyAssets: true,
      enableServiceWorker: true,
      compressionLevel: 9
    },
    
    security: {
      cors: {
        enabled: true,
        origins: ['*']
      },
      rateLimit: {
        enabled: true,
        maxRequests: 100,
        windowMs: 60000
      },
      ssl: {
        enforceHttps: true,
        hsts: true
      }
    },
    
    navigation: {
      header: {
        logo: '/logo.svg',
        items: [],
        cta: {
          text: 'Get Started',
          link: '/contact'
        }
      },
      footer: {
        columns: [],
        copyright: '© 2025 Inchtomilez. All rights reserved.',
        legal: ['Privacy Policy', 'Terms of Service']
      }
    },
    
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    updatedBy: 'system'
  };
}

// ============================================================
// API ENDPOINTS
// ============================================================

/**
 * Get unified configuration
 */
export async function getUnifiedConfig(c: Context) {
  try {
    let config = await kv.get('config:unified');
    
    // If no config exists, create default
    if (!config) {
      config = getDefaultConfig();
      await kv.set('config:unified', config);
    }
    
    return c.json({
      success: true,
      config
    });
  } catch (error: any) {
    console.error('Error getting unified config:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update unified configuration
 */
export async function updateUnifiedConfig(c: Context) {
  try {
    const updates = await c.req.json();
    
    // Get existing config
    let config = await kv.get('config:unified') || getDefaultConfig();
    
    // Deep merge updates
    config = {
      ...config,
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: updates.updatedBy || 'admin'
    };
    
    // Save updated config
    await kv.set('config:unified', config);
    
    // Create version history
    await kv.set(`config:history:${Date.now()}`, config);
    
    console.log('✅ Unified config updated');
    
    return c.json({
      success: true,
      message: 'Configuration updated successfully',
      config
    });
  } catch (error: any) {
    console.error('Error updating unified config:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get configuration section
 */
export async function getConfigSection(c: Context) {
  try {
    const { section } = await c.req.json();
    
    if (!section) {
      return c.json({
        success: false,
        error: 'Section name is required'
      }, 400);
    }
    
    const config = await kv.get('config:unified') || getDefaultConfig();
    const sectionData = (config as any)[section];
    
    if (!sectionData) {
      return c.json({
        success: false,
        error: 'Section not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      section,
      data: sectionData
    });
  } catch (error: any) {
    console.error('Error getting config section:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update configuration section
 */
export async function updateConfigSection(c: Context) {
  try {
    const { section, data } = await c.req.json();
    
    if (!section || !data) {
      return c.json({
        success: false,
        error: 'Section name and data are required'
      }, 400);
    }
    
    // Get existing config
    const config = await kv.get('config:unified') || getDefaultConfig();
    
    // Update section
    (config as any)[section] = {
      ...(config as any)[section],
      ...data
    };
    
    config.updatedAt = new Date().toISOString();
    
    // Save
    await kv.set('config:unified', config);
    await kv.set(`config:history:${Date.now()}`, config);
    
    console.log(`✅ Config section '${section}' updated`);
    
    return c.json({
      success: true,
      message: `Section '${section}' updated successfully`,
      data: (config as any)[section]
    });
  } catch (error: any) {
    console.error('Error updating config section:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Reset configuration to defaults
 */
export async function resetConfigToDefaults(c: Context) {
  try {
    const defaultConfig = getDefaultConfig();
    
    // Backup current config
    const currentConfig = await kv.get('config:unified');
    if (currentConfig) {
      await kv.set(`config:backup:${Date.now()}`, currentConfig);
    }
    
    // Set default config
    await kv.set('config:unified', defaultConfig);
    
    console.log('✅ Config reset to defaults');
    
    return c.json({
      success: true,
      message: 'Configuration reset to defaults',
      config: defaultConfig
    });
  } catch (error: any) {
    console.error('Error resetting config:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get configuration history
 */
export async function getConfigHistory(c: Context) {
  try {
    const history = await kv.getByPrefix('config:history:');
    
    return c.json({
      success: true,
      history: history.map(h => ({
        timestamp: h.value.updatedAt,
        updatedBy: h.value.updatedBy
      })).sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    });
  } catch (error: any) {
    console.error('Error getting config history:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Export configuration as JSON
 */
export async function exportConfig(c: Context) {
  try {
    const config = await kv.get('config:unified') || getDefaultConfig();
    
    return c.json({
      success: true,
      config,
      exported: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error exporting config:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Import configuration from JSON
 */
export async function importConfig(c: Context) {
  try {
    const { config } = await c.req.json();
    
    if (!config) {
      return c.json({
        success: false,
        error: 'Configuration data is required'
      }, 400);
    }
    
    // Backup current config
    const currentConfig = await kv.get('config:unified');
    if (currentConfig) {
      await kv.set(`config:backup:${Date.now()}`, currentConfig);
    }
    
    // Import new config
    config.updatedAt = new Date().toISOString();
    config.updatedBy = 'import';
    
    await kv.set('config:unified', config);
    await kv.set(`config:history:${Date.now()}`, config);
    
    console.log('✅ Config imported successfully');
    
    return c.json({
      success: true,
      message: 'Configuration imported successfully',
      config
    });
  } catch (error: any) {
    console.error('Error importing config:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

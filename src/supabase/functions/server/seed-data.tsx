/**
 * SEED DATA INITIALIZATION
 * Populates initial data for fresh admin panel deployment
 */

import * as kv from './kv_store.tsx';

/**
 * Seed default admin user
 */
export async function seedDefaultUser() {
  try {
    // Check if admin already exists
    const existingUsers = await kv.getByPrefix('user:');
    const adminExists = existingUsers.some((u: any) => u.value?.email === 'admin@inchtomilez.com');
    
    if (adminExists) {
      console.log('✅ Admin user already exists');
      return { success: true, message: 'Admin already exists' };
    }
    
    // Create default admin user
    const adminUser = {
      id: 'user_admin_default',
      email: 'admin@inchtomilez.com',
      password: btoa('Admin@123'), // Base64 encoded (change this!)
      name: 'Admin User',
      role: 'admin',
      avatar: '/avatars/admin.png',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null
    };
    
    await kv.set('user:user_admin_default', adminUser);
    
    console.log('✅ Default admin user created');
    console.log('   Email: admin@inchtomilez.com');
    console.log('   Password: Admin@123');
    console.log('   ⚠️  CHANGE PASSWORD IMMEDIATELY AFTER FIRST LOGIN!');
    
    return {
      success: true,
      message: 'Admin user created',
      credentials: {
        email: 'admin@inchtomilez.com',
        password: 'Admin@123'
      }
    };
  } catch (error: any) {
    console.error('Error seeding admin user:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Seed default settings
 */
export async function seedDefaultSettings() {
  try {
    // Check if settings already exist
    const existingSettings = await kv.get('settings:global');
    
    if (existingSettings) {
      console.log('✅ Global settings already exist');
      return { success: true, message: 'Settings already exist' };
    }
    
    // Create default settings
    const defaultSettings = {
      // Site Settings
      siteName: 'Inchtomilez',
      siteUrl: 'https://www.inchtomilez.com',
      siteDescription: 'Leading Digital Marketing And Advertising Agency',
      contactEmail: 'info@inchtomilez.com',
      contactPhone: '+91-9669988666',
      
      // SEO Settings
      defaultMetaTitle: 'Inchtomilez | Digital Marketing Agency',
      defaultMetaDescription: 'Expert digital marketing services including SEO, PPC, social media marketing, and web development.',
      defaultOgImage: '/og-image.jpg',
      
      // Social Media
      socialMedia: {
        facebook: 'https://facebook.com/inchtomilez',
        instagram: 'https://instagram.com/inchtomilez',
        twitter: 'https://twitter.com/inchtomilez',
        linkedin: 'https://linkedin.com/company/inchtomilez',
        youtube: 'https://youtube.com/@inchtomilez'
      },
      
      // Analytics
      googleAnalyticsId: '',
      googleTagManagerId: '',
      facebookPixelId: '',
      
      // Email Settings
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      
      // Maintenance Mode
      maintenanceMode: false,
      maintenanceMessage: 'Site is under maintenance. Please check back soon.',
      
      // Timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set('settings:global', defaultSettings);
    
    console.log('✅ Default global settings created');
    
    return {
      success: true,
      message: 'Settings created',
      settings: defaultSettings
    };
  } catch (error: any) {
    console.error('Error seeding settings:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Seed sample pages (from SEO_CONFIG)
 */
export async function seedSamplePages() {
  try {
    // Check if pages already exist
    const existingPages = await kv.getByPrefix('seo:page:');
    
    if (existingPages.length > 0) {
      console.log(`✅ Pages already exist (${existingPages.length} pages)`);
      return { success: true, message: `${existingPages.length} pages already exist` };
    }
    
    // Sample pages to seed
    const samplePages = [
      {
        slug: '/',
        title: 'Inchtomilez | Best Digital Marketing Agency in Indore',
        description: 'Transform your business with expert digital marketing services from Indore\'s leading agency.',
        keywords: ['digital marketing agency indore', 'seo services', 'ppc agency'],
        h1: 'Inchtomilez - Digital Marketing Experts',
        canonical: 'https://www.inchtomilez.com',
        ogType: 'website',
        ogImage: '/og-image.jpg',
        schema: 'organization',
        noindex: false,
        status: 'published'
      },
      {
        slug: '/about',
        title: 'About Us | Leading Digital Marketing Agency',
        description: 'Learn about Inchtomilez - a team of passionate digital marketing experts delivering results since 2015.',
        keywords: ['about inchtomilez', 'digital marketing team', 'agency profile'],
        h1: 'About Inchtomilez',
        canonical: 'https://www.inchtomilez.com/about',
        ogType: 'website',
        ogImage: '/og-image.jpg',
        schema: 'organization',
        noindex: false,
        status: 'published'
      },
      {
        slug: '/contact',
        title: 'Contact Us | Get In Touch',
        description: 'Contact Inchtomilez for expert digital marketing services. Call +91-9669988666 or visit our Indore office.',
        keywords: ['contact inchtomilez', 'digital marketing consultation', 'indore agency'],
        h1: 'Contact Us',
        canonical: 'https://www.inchtomilez.com/contact',
        ogType: 'website',
        ogImage: '/og-image.jpg',
        schema: 'contactPage',
        noindex: false,
        status: 'published'
      }
    ];
    
    let seededCount = 0;
    
    for (const page of samplePages) {
      const pageKey = `seo:page:${page.slug}`;
      const pageData = {
        ...page,
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'system',
        updatedBy: 'system'
      };
      
      await kv.set(pageKey, pageData);
      seededCount++;
    }
    
    console.log(`✅ Seeded ${seededCount} sample pages`);
    
    return {
      success: true,
      message: `Seeded ${seededCount} pages`,
      pages: samplePages.map(p => p.slug)
    };
  } catch (error: any) {
    console.error('Error seeding pages:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Seed default roles
 */
export async function seedDefaultRoles() {
  try {
    // Check if roles already exist
    const existingRoles = await kv.getByPrefix('role:');
    
    if (existingRoles.length > 0) {
      console.log(`✅ Roles already exist (${existingRoles.length} roles)`);
      return { success: true, message: `${existingRoles.length} roles already exist` };
    }
    
    // Default roles
    const defaultRoles = [
      {
        id: 'role_admin',
        name: 'Administrator',
        slug: 'admin',
        permissions: ['*'], // All permissions
        description: 'Full system access',
        is_system: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'role_seo_manager',
        name: 'SEO Manager',
        slug: 'seo_manager',
        permissions: [
          'pages.*',
          'seo.*',
          'media.read',
          'analytics.*'
        ],
        description: 'Manage SEO and content',
        is_system: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'role_editor',
        name: 'Editor',
        slug: 'editor',
        permissions: [
          'pages.read',
          'pages.write',
          'media.read',
          'media.write'
        ],
        description: 'Edit content and media',
        is_system: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'role_viewer',
        name: 'Viewer',
        slug: 'viewer',
        permissions: [
          '*.read'
        ],
        description: 'Read-only access',
        is_system: true,
        created_at: new Date().toISOString()
      }
    ];
    
    for (const role of defaultRoles) {
      await kv.set(`role:${role.id}`, role);
    }
    
    console.log(`✅ Seeded ${defaultRoles.length} default roles`);
    
    return {
      success: true,
      message: `Seeded ${defaultRoles.length} roles`,
      roles: defaultRoles.map(r => r.name)
    };
  } catch (error: any) {
    console.error('Error seeding roles:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Run all seed operations
 */
export async function seedAll() {
  console.log('🌱 Starting data seeding...');
  console.log('');
  
  const results = {
    user: await seedDefaultUser(),
    settings: await seedDefaultSettings(),
    pages: await seedSamplePages(),
    roles: await seedDefaultRoles()
  };
  
  console.log('');
  console.log('🎉 Seeding complete!');
  console.log('');
  
  // Print summary
  console.log('📊 SEED SUMMARY:');
  console.log(`   User: ${results.user.success ? '✅' : '❌'} ${results.user.message}`);
  console.log(`   Settings: ${results.settings.success ? '✅' : '❌'} ${results.settings.message}`);
  console.log(`   Pages: ${results.pages.success ? '✅' : '❌'} ${results.pages.message}`);
  console.log(`   Roles: ${results.roles.success ? '✅' : '❌'} ${results.roles.message}`);
  console.log('');
  
  if (results.user.success && results.user.credentials) {
    console.log('🔑 DEFAULT ADMIN CREDENTIALS:');
    console.log(`   Email: ${results.user.credentials.email}`);
    console.log(`   Password: ${results.user.credentials.password}`);
    console.log('   ⚠️  CHANGE PASSWORD AFTER FIRST LOGIN!');
    console.log('');
  }
  
  return results;
}

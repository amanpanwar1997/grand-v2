/**
 * AUTO-INITIALIZATION SYSTEM
 * Automatically creates admin user, settings, and sample data on first run
 * This ensures the admin panel works immediately after deployment
 */

import * as kv from './kv_store.tsx';

/**
 * Check if system is initialized
 */
export async function isSystemInitialized(): Promise<boolean> {
  try {
    const initFlag = await kv.get('system:initialized');
    return !!initFlag;
  } catch {
    return false;
  }
}

/**
 * Auto-initialize system on first run
 */
export async function autoInitialize(): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    console.log('🔍 Checking if system needs initialization...');
    
    const isInit = await isSystemInitialized();
    if (isInit) {
      console.log('✅ System already initialized');
      return { success: true, message: 'System already initialized' };
    }

    console.log('🌱 System not initialized. Starting auto-initialization...');
    
    // 1. Create default admin user
    console.log('📝 Creating default admin user...');
    const adminUser = {
      id: 'user_admin_001',
      email: 'admin@inchtomilez.com',
      password: btoa('Admin@123'), // Base64 encoded
      name: 'Admin',
      role: 'admin',
      avatar: null,
      isActive: true,
      permissions: ['*'], // All permissions
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null
    };
    await kv.set('user:admin@inchtomilez.com', adminUser);
    await kv.set('user:id:user_admin_001', adminUser);
    console.log('✅ Admin user created');

    // 2. Create default settings
    console.log('📝 Creating default settings...');
    const defaultSettings = {
      // Site Info
      siteName: 'Inchtomilez',
      siteUrl: 'https://www.inchtomilez.com',
      siteDescription: 'Leading Digital Marketing And Advertising Agency',
      contactEmail: 'info@inchtomilez.com',
      contactPhone: '+91-9669988666',
      
      // SEO Defaults
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
      
      // Timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await kv.set('settings:global', defaultSettings);
    console.log('✅ Settings created');

    // 3. Create default roles
    console.log('📝 Creating default roles...');
    const roles = [
      {
        id: 'role_admin',
        name: 'Administrator',
        slug: 'admin',
        permissions: ['*'],
        description: 'Full system access',
        created_at: new Date().toISOString()
      },
      {
        id: 'role_seo_manager',
        name: 'SEO Manager',
        slug: 'seo_manager',
        permissions: ['pages.*', 'seo.*', 'media.read', 'analytics.*'],
        description: 'Manage SEO and content',
        created_at: new Date().toISOString()
      },
      {
        id: 'role_editor',
        name: 'Editor',
        slug: 'editor',
        permissions: ['pages.read', 'pages.write', 'media.read', 'media.write'],
        description: 'Edit content and media',
        created_at: new Date().toISOString()
      },
      {
        id: 'role_viewer',
        name: 'Viewer',
        slug: 'viewer',
        permissions: ['*.read'],
        description: 'Read-only access',
        created_at: new Date().toISOString()
      }
    ];
    
    for (const role of roles) {
      await kv.set(`role:${role.id}`, role);
    }
    console.log('✅ Roles created');

    // ❌ REMOVED: Sample pages - User will create their own real content
    // No dummy/fake/sample data in production

    // 5. Mark system as initialized
    await kv.set('system:initialized', {
      initialized: true,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
    console.log('✅ System marked as initialized');

    console.log('🎉 Auto-initialization complete!');
    console.log('');
    console.log('🔑 DEFAULT CREDENTIALS:');
    console.log('   Email: admin@inchtomilez.com');
    console.log('   Password: Admin@123');
    console.log('   ⚠️  CHANGE PASSWORD AFTER FIRST LOGIN');
    console.log('');
    console.log('📊 INITIAL STATE:');
    console.log('   Users: 1 (admin)');
    console.log('   Pages: 0 (create your own)');
    console.log('   Media: 0 (upload your own)');
    console.log('   Roles: 4 (permissions system)');
    console.log('');

    return {
      success: true,
      message: 'System initialized successfully',
      data: {
        admin: {
          email: 'admin@inchtomilez.com',
          password: 'Admin@123'
        },
        stats: {
          users: 1,
          roles: 4,
          pages: 0,
          settings: 1
        }
      }
    };
  } catch (error: any) {
    console.error('❌ Auto-initialization failed:', error);
    return {
      success: false,
      message: `Initialization failed: ${error.message}`
    };
  }
}

/**
 * Reset system (for testing/debugging)
 */
export async function resetSystem(): Promise<{ success: boolean; message: string }> {
  try {
    console.log('🗑️  Resetting system...');
    
    // Delete initialization flag
    await kv.del('system:initialized');
    
    // Delete admin user
    await kv.del('user:admin@inchtomilez.com');
    await kv.del('user:id:user_admin_001');
    
    // Delete settings
    await kv.del('settings:global');
    
    // Delete roles
    const roleIds = ['role_admin', 'role_seo_manager', 'role_editor', 'role_viewer'];
    for (const roleId of roleIds) {
      await kv.del(`role:${roleId}`);
    }
    
    // Delete sample pages
    const pageSlugs = ['/', '/about', '/contact'];
    for (const slug of pageSlugs) {
      await kv.del(`seo:page:${slug}`);
    }
    
    console.log('✅ System reset complete');
    
    return {
      success: true,
      message: 'System reset successfully. Run /init to initialize again.'
    };
  } catch (error: any) {
    console.error('❌ System reset failed:', error);
    return {
      success: false,
      message: `Reset failed: ${error.message}`
    };
  }
}

/**
 * Get initialization status
 */
export async function getInitStatus(): Promise<any> {
  try {
    const isInit = await isSystemInitialized();
    
    if (!isInit) {
      return {
        initialized: false,
        message: 'System not initialized. Run /init to initialize.'
      };
    }

    // Count resources
    const users = await kv.getByPrefix('user:');
    const roles = await kv.getByPrefix('role:');
    const pages = await kv.getByPrefix('seo:page:');
    const settings = await kv.get('settings:global');

    return {
      initialized: true,
      message: 'System is initialized',
      stats: {
        users: users.length,
        roles: roles.length,
        pages: pages.length,
        hasSettings: !!settings
      },
      initData: await kv.get('system:initialized')
    };
  } catch (error: any) {
    return {
      initialized: false,
      error: error.message
    };
  }
}
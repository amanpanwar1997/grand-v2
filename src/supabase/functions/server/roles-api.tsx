/**
 * ROLES & PERMISSIONS API
 * Complete role-based access control system
 * 
 * Features:
 * - Role CRUD operations
 * - User-role assignments
 * - Permission management
 * - Predefined roles (admin, seo_manager, editor, viewer)
 */

import { Hono } from 'npm:hono';
import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

const rolesApi = new Hono();

// ============================================================
// DATA MODELS
// ============================================================

interface Role {
  id: string;
  name: string;
  slug: string;
  description: string;
  permissions: string[];
  is_system: boolean;  // System roles can't be deleted
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface UserRole {
  user_id: string;
  role_id: string;
  role_name: string;
  assigned_at: string;
  assigned_by: string;
}

// ============================================================
// PREDEFINED ROLES
// ============================================================

const SYSTEM_ROLES: Record<string, Partial<Role>> = {
  admin: {
    id: 'role_admin',
    name: 'Administrator',
    slug: 'admin',
    description: 'Full system access with all permissions',
    permissions: ['*'],  // All permissions
    is_system: true
  },
  seo_manager: {
    id: 'role_seo_manager',
    name: 'SEO Manager',
    slug: 'seo_manager',
    description: 'Manage SEO settings, pages, and content optimization',
    permissions: [
      'seo.*',
      'pages.read',
      'pages.edit',
      'pages.publish',
      'sitemap.*',
      'redirects.*',
      '404.*',
      'analytics.read'
    ],
    is_system: true
  },
  editor: {
    id: 'role_editor',
    name: 'Editor',
    slug: 'editor',
    description: 'Create and edit content, manage media',
    permissions: [
      'pages.*',
      'media.*',
      'menus.read',
      'menus.edit',
      'leads.read'
    ],
    is_system: true
  },
  viewer: {
    id: 'role_viewer',
    name: 'Viewer',
    slug: 'viewer',
    description: 'Read-only access to content',
    permissions: [
      '*.read'
    ],
    is_system: true
  }
};

// ============================================================
// INITIALIZE SYSTEM ROLES
// ============================================================

async function initializeSystemRoles() {
  for (const [slug, roleData] of Object.entries(SYSTEM_ROLES)) {
    const existing = await kv.get(`role:${roleData.id}`);
    
    if (!existing) {
      const role: Role = {
        ...roleData as Role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 'system'
      };
      
      await kv.set(`role:${role.id}`, role);
      console.log(`✅ System role initialized: ${role.name}`);
    }
  }
}

// Initialize on server start
initializeSystemRoles();

// ============================================================
// ROLES CRUD
// ============================================================

/**
 * Get all roles
 * GET /roles/all
 */
rolesApi.get('/all', async (c: Context) => {
  try {
    const roles = await kv.getByPrefix('role:');
    
    const rolesList = roles
      .map((r: any) => r.value)
      .sort((a: any, b: any) => {
        // System roles first
        if (a.is_system && !b.is_system) return -1;
        if (!a.is_system && b.is_system) return 1;
        return a.name.localeCompare(b.name);
      });
    
    return c.json({
      success: true,
      roles: rolesList,
      total: rolesList.length
    });
  } catch (error: any) {
    console.error('Error fetching roles:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Get single role by ID
 * GET /roles/:id
 */
rolesApi.get('/:id', async (c: Context) => {
  try {
    const id = c.req.param('id');
    const role = await kv.get(`role:${id}`);
    
    if (!role) {
      return c.json({
        success: false,
        error: 'Role not found'
      }, 404);
    }
    
    // Get users with this role
    const userRoles = await kv.getByPrefix('user_role:');
    const usersWithRole = userRoles
      .filter((ur: any) => ur.value?.role_id === id)
      .map((ur: any) => ur.value);
    
    return c.json({
      success: true,
      role: role,
      users_count: usersWithRole.length
    });
  } catch (error: any) {
    console.error('Error fetching role:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Create new role
 * POST /roles/create
 */
rolesApi.post('/create', async (c: Context) => {
  try {
    const body = await c.req.json();
    const { name, slug, description, permissions } = body;
    
    // Validation
    if (!name || !slug) {
      return c.json({
        success: false,
        error: 'name and slug are required'
      }, 400);
    }
    
    // Check if slug already exists
    const existing = await kv.getByPrefix('role:');
    const duplicate = existing.find((r: any) => r.value?.slug === slug);
    
    if (duplicate) {
      return c.json({
        success: false,
        error: 'A role with this slug already exists'
      }, 400);
    }
    
    const roleId = `role_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const role: Role = {
      id: roleId,
      name,
      slug,
      description: description || '',
      permissions: permissions || [],
      is_system: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'admin'  // TODO: Get from auth
    };
    
    await kv.set(`role:${roleId}`, role);
    
    console.log(`✅ Role created: ${name}`);
    
    return c.json({
      success: true,
      message: 'Role created successfully',
      role: role
    });
  } catch (error: any) {
    console.error('Error creating role:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Update role
 * POST /roles/update
 */
rolesApi.post('/update', async (c: Context) => {
  try {
    const body = await c.req.json();
    const { id, name, description, permissions } = body;
    
    if (!id) {
      return c.json({
        success: false,
        error: 'id is required'
      }, 400);
    }
    
    const role = await kv.get(`role:${id}`);
    
    if (!role) {
      return c.json({
        success: false,
        error: 'Role not found'
      }, 404);
    }
    
    // Prevent modifying system roles' core properties
    if (role.is_system && permissions) {
      return c.json({
        success: false,
        error: 'Cannot modify permissions of system roles'
      }, 403);
    }
    
    // Update role
    const updated: Role = {
      ...role,
      name: name || role.name,
      description: description !== undefined ? description : role.description,
      permissions: permissions || role.permissions,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`role:${id}`, updated);
    
    console.log(`✅ Role updated: ${updated.name}`);
    
    return c.json({
      success: true,
      message: 'Role updated successfully',
      role: updated
    });
  } catch (error: any) {
    console.error('Error updating role:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Delete role
 * POST /roles/delete
 */
rolesApi.post('/delete', async (c: Context) => {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'id is required'
      }, 400);
    }
    
    const role = await kv.get(`role:${id}`);
    
    if (!role) {
      return c.json({
        success: false,
        error: 'Role not found'
      }, 404);
    }
    
    // Prevent deleting system roles
    if (role.is_system) {
      return c.json({
        success: false,
        error: 'Cannot delete system roles'
      }, 403);
    }
    
    // Check if any users have this role
    const userRoles = await kv.getByPrefix('user_role:');
    const usersWithRole = userRoles.filter((ur: any) => ur.value?.role_id === id);
    
    if (usersWithRole.length > 0) {
      return c.json({
        success: false,
        error: `Cannot delete role. ${usersWithRole.length} user(s) still have this role.`
      }, 400);
    }
    
    await kv.del(`role:${id}`);
    
    console.log(`✅ Role deleted: ${role.name}`);
    
    return c.json({
      success: true,
      message: 'Role deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting role:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ============================================================
// USER-ROLE ASSIGNMENTS
// ============================================================

/**
 * Get roles for a specific user
 * GET /user-roles/user/:userId
 */
rolesApi.get('/user/:userId', async (c: Context) => {
  try {
    const userId = c.req.param('userId');
    
    const userRoles = await kv.getByPrefix(`user_role:${userId}:`);
    
    // Get full role details
    const rolesWithDetails = await Promise.all(
      userRoles.map(async (ur: any) => {
        const role = await kv.get(`role:${ur.value.role_id}`);
        return {
          ...ur.value,
          role: role
        };
      })
    );
    
    return c.json({
      success: true,
      user_id: userId,
      roles: rolesWithDetails,
      total: rolesWithDetails.length
    });
  } catch (error: any) {
    console.error('Error fetching user roles:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Assign role to user
 * POST /user-roles/assign
 */
rolesApi.post('/assign', async (c: Context) => {
  try {
    const { user_id, role_id } = await c.req.json();
    
    if (!user_id || !role_id) {
      return c.json({
        success: false,
        error: 'user_id and role_id are required'
      }, 400);
    }
    
    // Verify role exists
    const role = await kv.get(`role:${role_id}`);
    
    if (!role) {
      return c.json({
        success: false,
        error: 'Role not found'
      }, 404);
    }
    
    // Check if assignment already exists
    const existing = await kv.get(`user_role:${user_id}:${role_id}`);
    
    if (existing) {
      return c.json({
        success: false,
        error: 'User already has this role'
      }, 400);
    }
    
    const userRole: UserRole = {
      user_id,
      role_id,
      role_name: role.name,
      assigned_at: new Date().toISOString(),
      assigned_by: 'admin'  // TODO: Get from auth
    };
    
    await kv.set(`user_role:${user_id}:${role_id}`, userRole);
    
    console.log(`✅ Role assigned: ${role.name} → User ${user_id}`);
    
    return c.json({
      success: true,
      message: 'Role assigned successfully',
      user_role: userRole
    });
  } catch (error: any) {
    console.error('Error assigning role:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Revoke role from user
 * POST /user-roles/revoke
 */
rolesApi.post('/revoke', async (c: Context) => {
  try {
    const { user_id, role_id } = await c.req.json();
    
    if (!user_id || !role_id) {
      return c.json({
        success: false,
        error: 'user_id and role_id are required'
      }, 400);
    }
    
    const existing = await kv.get(`user_role:${user_id}:${role_id}`);
    
    if (!existing) {
      return c.json({
        success: false,
        error: 'User does not have this role'
      }, 404);
    }
    
    await kv.del(`user_role:${user_id}:${role_id}`);
    
    console.log(`✅ Role revoked: ${existing.role_name} from User ${user_id}`);
    
    return c.json({
      success: true,
      message: 'Role revoked successfully'
    });
  } catch (error: any) {
    console.error('Error revoking role:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ============================================================
// PERMISSION HELPERS
// ============================================================

/**
 * Check if user has permission
 * POST /user-roles/check-permission
 */
rolesApi.post('/check-permission', async (c: Context) => {
  try {
    const { user_id, permission } = await c.req.json();
    
    if (!user_id || !permission) {
      return c.json({
        success: false,
        error: 'user_id and permission are required'
      }, 400);
    }
    
    // Get user's roles
    const userRoles = await kv.getByPrefix(`user_role:${user_id}:`);
    
    // Check each role's permissions
    for (const ur of userRoles) {
      const role = await kv.get(`role:${ur.value.role_id}`);
      
      if (role) {
        // Admin has all permissions
        if (role.permissions.includes('*')) {
          return c.json({
            success: true,
            has_permission: true,
            role: role.name
          });
        }
        
        // Check specific permission
        if (role.permissions.includes(permission)) {
          return c.json({
            success: true,
            has_permission: true,
            role: role.name
          });
        }
        
        // Check wildcard permissions (e.g., 'pages.*' matches 'pages.read')
        for (const perm of role.permissions) {
          if (perm.endsWith('.*')) {
            const prefix = perm.slice(0, -2);
            if (permission.startsWith(prefix)) {
              return c.json({
                success: true,
                has_permission: true,
                role: role.name
              });
            }
          }
          
          // Check read-all permission ('*.read')
          if (perm === '*.read' && permission.endsWith('.read')) {
            return c.json({
              success: true,
              has_permission: true,
              role: role.name
            });
          }
        }
      }
    }
    
    return c.json({
      success: true,
      has_permission: false
    });
  } catch (error: any) {
    console.error('Error checking permission:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export default rolesApi;

/**
 * USERS MANAGEMENT API
 * Complete user CRUD with roles and permissions
 */

import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  avatar?: string;
  phone?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/**
 * Get all users
 */
export async function getAllUsers(c: Context) {
  try {
    const usersData = await kv.getByPrefix('user:');
    const users = usersData.map((item: any) => item.value);
    
    return c.json({
      success: true,
      count: users.length,
      users: users.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  } catch (error: any) {
    console.error('Error getting users:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get single user
 */
export async function getUser(c: Context) {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'User ID is required'
      }, 400);
    }
    
    const user = await kv.get(`user:${id}`);
    
    if (!user) {
      return c.json({
        success: false,
        error: 'User not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      user
    });
  } catch (error: any) {
    console.error('Error getting user:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Create user
 */
export async function createUser(c: Context) {
  try {
    const userData = await c.req.json();
    
    // Validate
    if (!userData.name || !userData.email || !userData.role) {
      return c.json({
        success: false,
        error: 'Name, email, and role are required'
      }, 400);
    }
    
    // Check if email already exists
    const existingUsers = await kv.getByPrefix('user:');
    const emailExists = existingUsers.some((u: any) => 
      u.value.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (emailExists) {
      return c.json({
        success: false,
        error: 'Email already exists'
      }, 400);
    }
    
    // Create user
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: userData.name,
      email: userData.email.toLowerCase(),
      role: userData.role,
      status: userData.status || 'active',
      avatar: userData.avatar || '',
      phone: userData.phone || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: userData.createdBy || 'admin'
    };
    
    await kv.set(`user:${user.id}`, user);
    await kv.set(`user:email:${user.email}`, user.id);
    
    console.log(`User created: ${user.email}`);
    
    return c.json({
      success: true,
      message: 'User created successfully',
      user
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update user
 */
export async function updateUser(c: Context) {
  try {
    const { id, ...updates } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'User ID is required'
      }, 400);
    }
    
    const existing = await kv.get(`user:${id}`);
    
    if (!existing) {
      return c.json({
        success: false,
        error: 'User not found'
      }, 404);
    }
    
    // Check email uniqueness if changing
    if (updates.email && updates.email !== existing.email) {
      const existingUsers = await kv.getByPrefix('user:');
      const emailExists = existingUsers.some((u: any) => 
        u.value.id !== id && 
        u.value.email.toLowerCase() === updates.email.toLowerCase()
      );
      
      if (emailExists) {
        return c.json({
          success: false,
          error: 'Email already exists'
        }, 400);
      }
      
      // Remove old email index
      await kv.del(`user:email:${existing.email}`);
      // Create new email index
      await kv.set(`user:email:${updates.email.toLowerCase()}`, id);
    }
    
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`user:${id}`, updated);
    
    console.log(`User updated: ${id}`);
    
    return c.json({
      success: true,
      message: 'User updated successfully',
      user: updated
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Delete user
 */
export async function deleteUser(c: Context) {
  try {
    const { id } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'User ID is required'
      }, 400);
    }
    
    const user = await kv.get(`user:${id}`);
    
    if (!user) {
      return c.json({
        success: false,
        error: 'User not found'
      }, 404);
    }
    
    // Delete user
    await kv.del(`user:${id}`);
    await kv.del(`user:email:${user.email}`);
    
    console.log(`User deleted: ${id}`);
    
    return c.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Seed default admin user
 */
export async function seedDefaultUsers(c: Context) {
  try {
    const existingUsers = await kv.getByPrefix('user:');
    
    if (existingUsers.length > 0) {
      return c.json({
        success: true,
        message: 'Users already exist',
        count: existingUsers.length
      });
    }
    
    // Create default admin
    const admin: User = {
      id: 'user_admin_001',
      name: 'Admin User',
      email: 'admin@inchtomilez.com',
      role: 'admin',
      status: 'active',
      avatar: '',
      phone: '+91-9669988666',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system'
    };
    
    await kv.set(`user:${admin.id}`, admin);
    await kv.set(`user:email:${admin.email}`, admin.id);
    
    console.log('Default admin user created');
    
    return c.json({
      success: true,
      message: 'Default users seeded',
      users: [admin]
    });
  } catch (error: any) {
    console.error('Error seeding users:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Update last login
 */
export async function updateLastLogin(c: Context) {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({
        success: false,
        error: 'Email is required'
      }, 400);
    }
    
    const userId = await kv.get(`user:email:${email.toLowerCase()}`);
    
    if (!userId) {
      return c.json({
        success: false,
        error: 'User not found'
      }, 404);
    }
    
    const user = await kv.get(`user:${userId}`);
    
    if (user) {
      user.lastLogin = new Date().toISOString();
      await kv.set(`user:${userId}`, user);
    }
    
    return c.json({
      success: true,
      message: 'Last login updated'
    });
  } catch (error: any) {
    console.error('Error updating last login:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

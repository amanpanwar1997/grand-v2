/**
 * MENUS & NAVIGATION API
 * Complete menu management system for website navigation
 * 
 * Features:
 * - Menu CRUD operations
 * - Hierarchical menu structure (parent/child)
 * - Menu ordering and reordering
 * - Multi-language support
 * - Menu tree generation
 * - Icon support
 */

import { Hono } from 'npm:hono';
import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

const menusApi = new Hono();

// ============================================================
// DATA MODELS
// ============================================================

interface MenuItem {
  id: string;
  name: string;
  url: string;
  parent_id: string | null;
  order: number;
  icon?: string;
  enabled: boolean;
  target: '_self' | '_blank';
  locale: string;
  css_class?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface MenuTree {
  id: string;
  name: string;
  url: string;
  icon?: string;
  enabled: boolean;
  target: string;
  children: MenuTree[];
}

// ============================================================
// MENU CRUD
// ============================================================

/**
 * Get all menus
 * GET /menus/all
 */
menusApi.get('/all', async (c: Context) => {
  try {
    const { locale = 'en' } = c.req.query();
    
    const menus = await kv.getByPrefix(`menu:${locale}:`);
    
    const menusList = menus
      .map((m: any) => m.value)
      .sort((a: any, b: any) => a.order - b.order);
    
    return c.json({
      success: true,
      menus: menusList,
      total: menusList.length,
      locale: locale
    });
  } catch (error: any) {
    console.error('Error fetching menus:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Get single menu by ID
 * GET /menus/:id
 */
menusApi.get('/:id', async (c: Context) => {
  try {
    const id = c.req.param('id');
    const { locale = 'en' } = c.req.query();
    
    const menu = await kv.get(`menu:${locale}:${id}`);
    
    if (!menu) {
      return c.json({
        success: false,
        error: 'Menu not found'
      }, 404);
    }
    
    // Get children if this is a parent menu
    const allMenus = await kv.getByPrefix(`menu:${locale}:`);
    const children = allMenus
      .map((m: any) => m.value)
      .filter((m: any) => m.parent_id === id)
      .sort((a: any, b: any) => a.order - b.order);
    
    return c.json({
      success: true,
      menu: menu,
      children: children,
      children_count: children.length
    });
  } catch (error: any) {
    console.error('Error fetching menu:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Create new menu
 * POST /menus/create
 */
menusApi.post('/create', async (c: Context) => {
  try {
    const body = await c.req.json();
    const {
      name,
      url,
      parent_id = null,
      order,
      icon,
      enabled = true,
      target = '_self',
      locale = 'en',
      css_class,
      description
    } = body;
    
    // Validation
    if (!name || !url) {
      return c.json({
        success: false,
        error: 'name and url are required'
      }, 400);
    }
    
    // If no order provided, calculate next order
    let menuOrder = order;
    if (menuOrder === undefined || menuOrder === null) {
      const existingMenus = await kv.getByPrefix(`menu:${locale}:`);
      const sameLevelMenus = existingMenus
        .map((m: any) => m.value)
        .filter((m: any) => m.parent_id === parent_id);
      
      menuOrder = sameLevelMenus.length > 0 
        ? Math.max(...sameLevelMenus.map((m: any) => m.order)) + 1
        : 0;
    }
    
    const menuId = `menu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const menu: MenuItem = {
      id: menuId,
      name,
      url,
      parent_id,
      order: menuOrder,
      icon,
      enabled,
      target,
      locale,
      css_class,
      description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'admin'  // TODO: Get from auth
    };
    
    await kv.set(`menu:${locale}:${menuId}`, menu);
    
    console.log(`✅ Menu created: ${name} (${locale})`);
    
    return c.json({
      success: true,
      message: 'Menu created successfully',
      menu: menu
    });
  } catch (error: any) {
    console.error('Error creating menu:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Update menu
 * POST /menus/update
 */
menusApi.post('/update', async (c: Context) => {
  try {
    const body = await c.req.json();
    const {
      id,
      name,
      url,
      parent_id,
      order,
      icon,
      enabled,
      target,
      locale = 'en',
      css_class,
      description
    } = body;
    
    if (!id) {
      return c.json({
        success: false,
        error: 'id is required'
      }, 400);
    }
    
    const menu = await kv.get(`menu:${locale}:${id}`);
    
    if (!menu) {
      return c.json({
        success: false,
        error: 'Menu not found'
      }, 404);
    }
    
    // Prevent circular parent relationships
    if (parent_id && parent_id === id) {
      return c.json({
        success: false,
        error: 'Menu cannot be its own parent'
      }, 400);
    }
    
    // Update menu
    const updated: MenuItem = {
      ...menu,
      name: name !== undefined ? name : menu.name,
      url: url !== undefined ? url : menu.url,
      parent_id: parent_id !== undefined ? parent_id : menu.parent_id,
      order: order !== undefined ? order : menu.order,
      icon: icon !== undefined ? icon : menu.icon,
      enabled: enabled !== undefined ? enabled : menu.enabled,
      target: target !== undefined ? target : menu.target,
      css_class: css_class !== undefined ? css_class : menu.css_class,
      description: description !== undefined ? description : menu.description,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`menu:${locale}:${id}`, updated);
    
    console.log(`✅ Menu updated: ${updated.name}`);
    
    return c.json({
      success: true,
      message: 'Menu updated successfully',
      menu: updated
    });
  } catch (error: any) {
    console.error('Error updating menu:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Delete menu
 * POST /menus/delete
 */
menusApi.post('/delete', async (c: Context) => {
  try {
    const { id, locale = 'en' } = await c.req.json();
    
    if (!id) {
      return c.json({
        success: false,
        error: 'id is required'
      }, 400);
    }
    
    const menu = await kv.get(`menu:${locale}:${id}`);
    
    if (!menu) {
      return c.json({
        success: false,
        error: 'Menu not found'
      }, 404);
    }
    
    // Check if menu has children
    const allMenus = await kv.getByPrefix(`menu:${locale}:`);
    const children = allMenus
      .map((m: any) => m.value)
      .filter((m: any) => m.parent_id === id);
    
    if (children.length > 0) {
      return c.json({
        success: false,
        error: `Cannot delete menu. It has ${children.length} submenu(s). Delete children first.`
      }, 400);
    }
    
    await kv.del(`menu:${locale}:${id}`);
    
    console.log(`✅ Menu deleted: ${menu.name}`);
    
    return c.json({
      success: true,
      message: 'Menu deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting menu:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Reorder menus
 * POST /menus/reorder
 */
menusApi.post('/reorder', async (c: Context) => {
  try {
    const { menus, locale = 'en' } = await c.req.json();
    
    if (!menus || !Array.isArray(menus)) {
      return c.json({
        success: false,
        error: 'menus array is required'
      }, 400);
    }
    
    // Update order for each menu
    const updatePromises = menus.map(async (menuUpdate: any) => {
      const { id, order } = menuUpdate;
      
      const menu = await kv.get(`menu:${locale}:${id}`);
      
      if (menu) {
        const updated = {
          ...menu,
          order: order,
          updated_at: new Date().toISOString()
        };
        
        await kv.set(`menu:${locale}:${id}`, updated);
      }
    });
    
    await Promise.all(updatePromises);
    
    console.log(`✅ Menus reordered: ${menus.length} items`);
    
    return c.json({
      success: true,
      message: 'Menus reordered successfully',
      updated_count: menus.length
    });
  } catch (error: any) {
    console.error('Error reordering menus:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// ============================================================
// MENU TREE GENERATION
// ============================================================

/**
 * Get menu tree (hierarchical structure)
 * GET /menus/tree
 */
menusApi.get('/tree', async (c: Context) => {
  try {
    const { locale = 'en', enabled_only = 'true' } = c.req.query();
    
    const menus = await kv.getByPrefix(`menu:${locale}:`);
    
    let menusList = menus.map((m: any) => m.value);
    
    // Filter enabled only if requested
    if (enabled_only === 'true') {
      menusList = menusList.filter((m: any) => m.enabled);
    }
    
    // Build tree structure
    const tree = buildMenuTree(menusList);
    
    return c.json({
      success: true,
      tree: tree,
      total_items: menusList.length,
      locale: locale
    });
  } catch (error: any) {
    console.error('Error generating menu tree:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Helper function to build menu tree
 */
function buildMenuTree(menus: MenuItem[]): MenuTree[] {
  // Create a map for quick lookup
  const menuMap = new Map<string, MenuTree & { parent_id: string | null; order: number }>();
  
  // Initialize all menus
  menus.forEach(menu => {
    menuMap.set(menu.id, {
      id: menu.id,
      name: menu.name,
      url: menu.url,
      icon: menu.icon,
      enabled: menu.enabled,
      target: menu.target,
      parent_id: menu.parent_id,
      order: menu.order,
      children: []
    });
  });
  
  // Build tree
  const tree: MenuTree[] = [];
  
  menuMap.forEach(menu => {
    if (menu.parent_id === null) {
      // Root level menu
      tree.push(menu);
    } else {
      // Child menu - add to parent
      const parent = menuMap.get(menu.parent_id);
      if (parent) {
        parent.children.push(menu);
      } else {
        // Parent not found, add as root
        tree.push(menu);
      }
    }
  });
  
  // Sort tree by order
  const sortTree = (items: MenuTree[]) => {
    items.sort((a, b) => a.order - b.order);
    items.forEach(item => {
      if (item.children.length > 0) {
        sortTree(item.children);
      }
    });
  };
  
  sortTree(tree);
  
  // Remove parent_id and order from final tree (clean up)
  const cleanTree = (items: any[]): MenuTree[] => {
    return items.map(item => {
      const cleaned: MenuTree = {
        id: item.id,
        name: item.name,
        url: item.url,
        icon: item.icon,
        enabled: item.enabled,
        target: item.target,
        children: cleanTree(item.children)
      };
      return cleaned;
    });
  };
  
  return cleanTree(tree);
}

// ============================================================
// BULK OPERATIONS
// ============================================================

/**
 * Bulk enable/disable menus
 * POST /menus/bulk-toggle
 */
menusApi.post('/bulk-toggle', async (c: Context) => {
  try {
    const { ids, enabled, locale = 'en' } = await c.req.json();
    
    if (!ids || !Array.isArray(ids)) {
      return c.json({
        success: false,
        error: 'ids array is required'
      }, 400);
    }
    
    if (enabled === undefined) {
      return c.json({
        success: false,
        error: 'enabled boolean is required'
      }, 400);
    }
    
    let updatedCount = 0;
    
    for (const id of ids) {
      const menu = await kv.get(`menu:${locale}:${id}`);
      
      if (menu) {
        const updated = {
          ...menu,
          enabled: enabled,
          updated_at: new Date().toISOString()
        };
        
        await kv.set(`menu:${locale}:${id}`, updated);
        updatedCount++;
      }
    }
    
    console.log(`✅ Bulk toggled ${updatedCount} menus to ${enabled ? 'enabled' : 'disabled'}`);
    
    return c.json({
      success: true,
      message: `${updatedCount} menu(s) ${enabled ? 'enabled' : 'disabled'}`,
      updated_count: updatedCount
    });
  } catch (error: any) {
    console.error('Error bulk toggling menus:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * Clone menu to different locale
 * POST /menus/clone
 */
menusApi.post('/clone', async (c: Context) => {
  try {
    const { id, from_locale = 'en', to_locale } = await c.req.json();
    
    if (!id || !to_locale) {
      return c.json({
        success: false,
        error: 'id and to_locale are required'
      }, 400);
    }
    
    const sourceMenu = await kv.get(`menu:${from_locale}:${id}`);
    
    if (!sourceMenu) {
      return c.json({
        success: false,
        error: 'Source menu not found'
      }, 404);
    }
    
    // Create new menu with same properties but different locale
    const newId = `menu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const clonedMenu: MenuItem = {
      ...sourceMenu,
      id: newId,
      locale: to_locale,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`menu:${to_locale}:${newId}`, clonedMenu);
    
    console.log(`✅ Menu cloned: ${sourceMenu.name} (${from_locale} → ${to_locale})`);
    
    return c.json({
      success: true,
      message: 'Menu cloned successfully',
      menu: clonedMenu
    });
  } catch (error: any) {
    console.error('Error cloning menu:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export default menusApi;

/**
 * File System API
 * Handles reading, writing, and managing files in the codebase
 * 
 * SECURITY:
 * - Read-only mode enabled by default
 * - Whitelist for editable files
 * - Blacklist for protected files
 * - Backup before write
 * - Version control
 */

import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

// ============================================================
// SECURITY CONFIGURATION
// ============================================================

/**
 * Files that are safe to edit
 * These won't break the website if modified
 */
const EDITABLE_FILES: string[] = [
  '/utils/seoConfig.tsx',
  '/styles/globals.css',
  '/styles/theme.css',
  '/data/*.json',
  '/content/*.md',
  '/content/**/*.md',
  '/public/robots.txt',
  '/public/sitemap.xml',
];

/**
 * Files that are NEVER editable (critical system files)
 */
const BLOCKED_FILES: string[] = [
  '/supabase/**/*',
  '/node_modules/**/*',
  '/.git/**/*',
  '/package.json',
  '/package-lock.json',
  '/tsconfig.json',
  '/vite.config.ts',
  '/.env',
  '/.env.local',
  '/App.tsx',
  '/main.tsx',
  '/index.html',
];

/**
 * Directories to exclude from file listing
 */
const EXCLUDED_DIRS: string[] = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.vscode',
  '.idea',
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if a file path matches a pattern (with wildcards)
 */
function matchesPattern(path: string, pattern: string): boolean {
  // Convert glob pattern to regex
  const regexPattern = pattern
    .replace(/\./g, '\\.')
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*');
  
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * Check if a file is editable
 */
function isEditable(path: string): boolean {
  // Check if blocked
  for (const blockedPattern of BLOCKED_FILES) {
    if (matchesPattern(path, blockedPattern)) {
      return false;
    }
  }
  
  // Check if explicitly allowed
  for (const editablePattern of EDITABLE_FILES) {
    if (matchesPattern(path, editablePattern)) {
      return true;
    }
  }
  
  // Default: not editable
  return false;
}

/**
 * Get file extension
 */
function getFileExtension(path: string): string {
  const parts = path.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

/**
 * Get language for syntax highlighting
 */
function getLanguage(path: string): string {
  const ext = getFileExtension(path);
  
  const languageMap: Record<string, string> = {
    'ts': 'typescript',
    'tsx': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'json': 'json',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'md': 'markdown',
    'txt': 'plaintext',
    'xml': 'xml',
    'svg': 'xml',
    'yml': 'yaml',
    'yaml': 'yaml',
  };
  
  return languageMap[ext] || 'plaintext';
}

/**
 * Check if path should be excluded
 */
function shouldExclude(name: string, path: string): boolean {
  // Exclude hidden files/dirs (starting with .)
  if (name.startsWith('.') && name !== '.env') {
    return true;
  }
  
  // Exclude specific directories
  for (const excluded of EXCLUDED_DIRS) {
    if (path.includes(`/${excluded}/`) || path.endsWith(`/${excluded}`)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Format file size
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ============================================================
// FILE SYSTEM OPERATIONS
// ============================================================

/**
 * List files in a directory
 */
export async function listFiles(c: Context) {
  try {
    const { path = '/' } = await c.req.json();
    
    console.log(`Listing files in: ${path}`);
    
    const files: any[] = [];
    
    // In Deno Deploy, we can't directly read the filesystem
    // Instead, we'll return a pre-defined structure for now
    // In a real implementation, you'd use Deno.readDir() locally
    
    // For MVP, return hardcoded structure
    const fileStructure = getFileStructure();
    const targetPath = path === '/' ? '' : path;
    const targetDir = targetPath ? fileStructure[targetPath] : fileStructure['/'];
    
    if (!targetDir) {
      return c.json({
        success: false,
        error: 'Directory not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      path,
      files: targetDir.files || [],
      directories: targetDir.directories || []
    });
    
  } catch (error: any) {
    console.error('Error listing files:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Read file content
 */
export async function readFile(c: Context) {
  try {
    const { path } = await c.req.json();
    
    if (!path) {
      return c.json({
        success: false,
        error: 'Path is required'
      }, 400);
    }
    
    console.log(`Reading file: ${path}`);
    
    // Security: Check if path is trying to escape
    if (path.includes('..')) {
      return c.json({
        success: false,
        error: 'Invalid path'
      }, 403);
    }
    
    // In production, you'd read the actual file
    // For now, we'll return a placeholder or cached version
    
    // Try to get from cache first
    const cached = await kv.get(`file:cache:${path}`);
    
    if (cached) {
      return c.json({
        success: true,
        path,
        content: cached.content,
        metadata: {
          size: cached.content.length,
          lines: cached.content.split('\n').length,
          language: getLanguage(path),
          editable: isEditable(path),
          lastModified: cached.lastModified || new Date().toISOString()
        }
      });
    }
    
    // If not cached, return error (in production, read actual file)
    return c.json({
      success: false,
      error: 'File not found in cache. In production, this would read the actual file.',
      hint: 'Use the cache endpoint to store file contents first.'
    }, 404);
    
  } catch (error: any) {
    console.error('Error reading file:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Cache file content (for development)
 * This allows us to "upload" files to the admin panel for viewing
 */
export async function cacheFile(c: Context) {
  try {
    const { path, content } = await c.req.json();
    
    if (!path || content === undefined) {
      return c.json({
        success: false,
        error: 'Path and content are required'
      }, 400);
    }
    
    // Store in KV cache
    await kv.set(`file:cache:${path}`, {
      content,
      lastModified: new Date().toISOString(),
      cachedAt: new Date().toISOString()
    });
    
    console.log(`Cached file: ${path} (${content.length} bytes)`);
    
    return c.json({
      success: true,
      message: 'File cached successfully',
      path,
      size: content.length
    });
    
  } catch (error: any) {
    console.error('Error caching file:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Write file content (PROTECTED)
 */
export async function writeFile(c: Context) {
  try {
    const { path, content, user } = await c.req.json();
    
    if (!path || content === undefined) {
      return c.json({
        success: false,
        error: 'Path and content are required'
      }, 400);
    }
    
    // Security: Check if file is editable
    if (!isEditable(path)) {
      return c.json({
        success: false,
        error: 'This file is protected and cannot be edited',
        reason: 'File is not in the editable whitelist'
      }, 403);
    }
    
    console.log(`Write requested for: ${path} by ${user || 'unknown'}`);
    
    // Create backup before writing
    const existingContent = await kv.get(`file:cache:${path}`);
    if (existingContent) {
      const backupId = `backup:${path}:${Date.now()}`;
      await kv.set(backupId, {
        path,
        content: existingContent.content,
        createdAt: new Date().toISOString(),
        createdBy: user || 'system'
      });
      
      console.log(`Backup created: ${backupId}`);
    }
    
    // Write to cache (in production, write to actual file)
    await kv.set(`file:cache:${path}`, {
      content,
      lastModified: new Date().toISOString(),
      modifiedBy: user || 'unknown'
    });
    
    // Create version entry
    const versions = await kv.getByPrefix(`file:version:${path}:`);
    const nextVersion = versions.length + 1;
    
    await kv.set(`file:version:${path}:${nextVersion}`, {
      version: nextVersion,
      path,
      content,
      changedBy: user || 'unknown',
      changedAt: new Date().toISOString(),
      size: content.length
    });
    
    console.log(`File written: ${path} (version ${nextVersion})`);
    
    return c.json({
      success: true,
      message: 'File saved successfully',
      path,
      version: nextVersion,
      size: content.length
    });
    
  } catch (error: any) {
    console.error('Error writing file:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Search files by content
 */
export async function searchFiles(c: Context) {
  try {
    const { query, path = '/' } = await c.req.json();
    
    if (!query) {
      return c.json({
        success: false,
        error: 'Search query is required'
      }, 400);
    }
    
    console.log(`Searching for: "${query}" in ${path}`);
    
    // Get all cached files
    const allFiles = await kv.getByPrefix('file:cache:');
    
    const results: any[] = [];
    
    for (const fileData of allFiles) {
      const filePath = fileData.key?.replace('file:cache:', '') || '';
      const content = fileData.content || '';
      
      // Check if query matches
      if (content.toLowerCase().includes(query.toLowerCase())) {
        // Find line number
        const lines = content.split('\n');
        const matchingLines: any[] = [];
        
        lines.forEach((line: string, index: number) => {
          if (line.toLowerCase().includes(query.toLowerCase())) {
            matchingLines.push({
              lineNumber: index + 1,
              content: line.trim(),
              before: lines[index - 1] || '',
              after: lines[index + 1] || ''
            });
          }
        });
        
        results.push({
          path: filePath,
          matches: matchingLines.length,
          lines: matchingLines.slice(0, 5) // First 5 matches
        });
      }
    }
    
    return c.json({
      success: true,
      query,
      count: results.length,
      results
    });
    
  } catch (error: any) {
    console.error('Error searching files:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get file metadata
 */
export async function getFileMetadata(c: Context) {
  try {
    const { path } = await c.req.json();
    
    if (!path) {
      return c.json({
        success: false,
        error: 'Path is required'
      }, 400);
    }
    
    const fileData = await kv.get(`file:cache:${path}`);
    
    if (!fileData) {
      return c.json({
        success: false,
        error: 'File not found'
      }, 404);
    }
    
    const content = fileData.content || '';
    const lines = content.split('\n');
    
    return c.json({
      success: true,
      metadata: {
        path,
        size: content.length,
        sizeFormatted: formatFileSize(content.length),
        lines: lines.length,
        language: getLanguage(path),
        editable: isEditable(path),
        lastModified: fileData.lastModified,
        modifiedBy: fileData.modifiedBy || 'unknown'
      }
    });
    
  } catch (error: any) {
    console.error('Error getting file metadata:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get version history for a file
 */
export async function getFileVersions(c: Context) {
  try {
    const { path } = await c.req.json();
    
    if (!path) {
      return c.json({
        success: false,
        error: 'Path is required'
      }, 400);
    }
    
    const versions = await kv.getByPrefix(`file:version:${path}:`);
    
    // Sort by version (descending)
    versions.sort((a: any, b: any) => b.version - a.version);
    
    return c.json({
      success: true,
      path,
      count: versions.length,
      versions: versions.map((v: any) => ({
        version: v.version,
        changedBy: v.changedBy,
        changedAt: v.changedAt,
        size: v.size,
        sizeFormatted: formatFileSize(v.size)
      }))
    });
    
  } catch (error: any) {
    console.error('Error getting file versions:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Restore file to a specific version
 */
export async function restoreFileVersion(c: Context) {
  try {
    const { path, version, user } = await c.req.json();
    
    if (!path || !version) {
      return c.json({
        success: false,
        error: 'Path and version are required'
      }, 400);
    }
    
    // Get version data
    const versionData = await kv.get(`file:version:${path}:${version}`);
    
    if (!versionData) {
      return c.json({
        success: false,
        error: 'Version not found'
      }, 404);
    }
    
    // Restore content
    await kv.set(`file:cache:${path}`, {
      content: versionData.content,
      lastModified: new Date().toISOString(),
      modifiedBy: user || 'unknown',
      restoredFrom: version
    });
    
    console.log(`File restored: ${path} to version ${version}`);
    
    return c.json({
      success: true,
      message: `File restored to version ${version}`,
      path,
      version
    });
    
  } catch (error: any) {
    console.error('Error restoring file version:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

// ============================================================
// FILE STRUCTURE (Hardcoded for MVP)
// ============================================================

/**
 * Get file structure
 * In production, this would scan the actual filesystem
 */
function getFileStructure(): any {
  return {
    '/': {
      directories: [
        { name: 'components', path: '/components', itemCount: 45 },
        { name: 'pages', path: '/pages', itemCount: 30 },
        { name: 'utils', path: '/utils', itemCount: 15 },
        { name: 'styles', path: '/styles', itemCount: 5 },
        { name: 'data', path: '/data', itemCount: 8 },
        { name: 'hooks', path: '/hooks', itemCount: 6 },
        { name: 'supabase', path: '/supabase', itemCount: 10, locked: true },
      ],
      files: [
        { 
          name: 'App.tsx', 
          path: '/App.tsx', 
          size: 12500, 
          type: 'typescript',
          editable: false,
          reason: 'Critical system file'
        },
        { 
          name: 'main.tsx', 
          path: '/main.tsx', 
          size: 450, 
          type: 'typescript',
          editable: false,
          reason: 'Entry point'
        },
        { 
          name: 'index.html', 
          path: '/index.html', 
          size: 890, 
          type: 'html',
          editable: false,
          reason: 'HTML template'
        },
      ]
    },
    '/utils': {
      directories: [],
      files: [
        { 
          name: 'seoConfig.tsx', 
          path: '/utils/seoConfig.tsx', 
          size: 45000, 
          type: 'typescript',
          editable: true,
          lines: 1234
        },
        { 
          name: 'adminAuth.tsx', 
          path: '/utils/adminAuth.tsx', 
          size: 8900, 
          type: 'typescript',
          editable: false
        },
        { 
          name: 'seoValidator.tsx', 
          path: '/utils/seoValidator.tsx', 
          size: 12000, 
          type: 'typescript',
          editable: false
        },
      ]
    },
    '/styles': {
      directories: [],
      files: [
        { 
          name: 'globals.css', 
          path: '/styles/globals.css', 
          size: 25000, 
          type: 'css',
          editable: true,
          lines: 789
        },
        { 
          name: 'theme.css', 
          path: '/styles/theme.css', 
          size: 5600, 
          type: 'css',
          editable: true
        },
      ]
    }
  };
}

/**
 * Get editable files list
 */
export async function getEditableFiles(c: Context) {
  try {
    return c.json({
      success: true,
      editablePatterns: EDITABLE_FILES,
      blockedPatterns: BLOCKED_FILES,
      note: 'Files matching editable patterns can be edited. Blocked patterns are always protected.'
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

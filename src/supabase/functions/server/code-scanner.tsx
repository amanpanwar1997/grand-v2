/**
 * CODE SCANNER & INDEXING SYSTEM
 * Deep scans entire codebase and creates unified index
 * Discovers all SEO, routes, components, content, media
 */

import * as kv from './kv_store.tsx';

// ============================================================
// FILE SYSTEM SCANNER
// ============================================================

/**
 * Recursively scan directory structure
 */
export async function scanDirectory(basePath: string): Promise<any[]> {
  const files: any[] = [];
  
  try {
    // In Deno, we can use Deno.readDir to scan directories
    for await (const entry of Deno.readDir(basePath)) {
      const fullPath = `${basePath}/${entry.name}`;
      
      if (entry.isDirectory) {
        // Recursively scan subdirectories
        const subFiles = await scanDirectory(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile) {
        files.push({
          path: fullPath,
          name: entry.name,
          type: getFileType(entry.name),
          size: 0,
          lastModified: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${basePath}:`, error);
  }
  
  return files;
}

/**
 * Determine file type based on extension
 */
function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  const typeMap: Record<string, string> = {
    'tsx': 'react-component',
    'ts': 'typescript',
    'jsx': 'react-component',
    'js': 'javascript',
    'json': 'json',
    'md': 'markdown',
    'mdx': 'mdx',
    'css': 'stylesheet',
    'scss': 'stylesheet',
    'svg': 'image',
    'png': 'image',
    'jpg': 'image',
    'jpeg': 'image',
    'webp': 'image',
    'gif': 'image',
    'mp4': 'video',
    'webm': 'video',
    'xml': 'xml',
    'txt': 'text'
  };
  
  return typeMap[ext || ''] || 'unknown';
}

// ============================================================
// SEO SCANNER
// ============================================================

/**
 * Scan file for SEO metadata
 */
export async function extractSEOFromFile(filePath: string, content: string): Promise<any> {
  const seoData: any = {
    path: filePath,
    title: null,
    description: null,
    keywords: null,
    canonical: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    twitterCard: null,
    schema: null,
    metaTags: []
  };
  
  // Extract SEOHead component usage
  const seoHeadMatch = content.match(/<SEOHead([^>]*?)\/>/s);
  if (seoHeadMatch) {
    const props = seoHeadMatch[1];
    
    // Extract title
    const titleMatch = props.match(/title=["']([^"']+)["']/);
    if (titleMatch) seoData.title = titleMatch[1];
    
    // Extract description
    const descMatch = props.match(/description=["']([^"']+)["']/);
    if (descMatch) seoData.description = descMatch[1];
    
    // Extract keywords
    const keywordsMatch = props.match(/keywords=["']([^"']+)["']/);
    if (keywordsMatch) seoData.keywords = keywordsMatch[1];
    
    // Extract canonical
    const canonicalMatch = props.match(/canonicalUrl=["']([^"']+)["']/);
    if (canonicalMatch) seoData.canonical = canonicalMatch[1];
    
    // Extract OG image
    const ogImageMatch = props.match(/ogImage=["']([^"']+)["']/);
    if (ogImageMatch) seoData.ogImage = ogImageMatch[1];
  }
  
  // Extract Helmet usage
  const helmetMatch = content.match(/<Helmet>(.*?)<\/Helmet>/s);
  if (helmetMatch) {
    const helmetContent = helmetMatch[1];
    
    // Extract meta tags
    const metaMatches = helmetContent.matchAll(/<meta([^>]+)>/g);
    for (const match of metaMatches) {
      const metaTag = match[1];
      const nameMatch = metaTag.match(/name=["']([^"']+)["']/);
      const contentMatch = metaTag.match(/content=["']([^"']+)["']/);
      
      if (nameMatch && contentMatch) {
        seoData.metaTags.push({
          name: nameMatch[1],
          content: contentMatch[1]
        });
      }
    }
  }
  
  // Extract useSEO hook
  const useSEOMatch = content.match(/const\s+seo\s*=\s*useSEO\(\)/);
  if (useSEOMatch) {
    seoData.usesSEOHook = true;
  }
  
  return seoData;
}

// ============================================================
// COMPONENT SCANNER
// ============================================================

/**
 * Scan file for React components
 */
export function extractComponentsFromFile(filePath: string, content: string): any[] {
  const components: any[] = [];
  
  // Find function components
  const functionComponentMatches = content.matchAll(/export\s+function\s+([A-Z]\w+)/g);
  for (const match of functionComponentMatches) {
    components.push({
      name: match[1],
      type: 'function',
      exported: true,
      path: filePath
    });
  }
  
  // Find arrow function components
  const arrowComponentMatches = content.matchAll(/export\s+const\s+([A-Z]\w+)\s*=\s*\(/g);
  for (const match of arrowComponentMatches) {
    components.push({
      name: match[1],
      type: 'arrow',
      exported: true,
      path: filePath
    });
  }
  
  // Find default exports
  const defaultExportMatch = content.match(/export\s+default\s+(?:function\s+)?([A-Z]\w+)/);
  if (defaultExportMatch) {
    components.push({
      name: defaultExportMatch[1],
      type: 'default',
      exported: true,
      isDefault: true,
      path: filePath
    });
  }
  
  return components;
}

// ============================================================
// ROUTE SCANNER
// ============================================================

/**
 * Extract routing information from files
 */
export function extractRoutesFromFile(filePath: string, content: string): any[] {
  const routes: any[] = [];
  
  // Find Route components
  const routeMatches = content.matchAll(/<Route\s+path=["']([^"']+)["']([^>]*?)>/g);
  for (const match of routeMatches) {
    const path = match[1];
    const props = match[2];
    
    // Extract element/component
    const elementMatch = props.match(/element=\{<([^/>]+)/);
    const componentName = elementMatch ? elementMatch[1] : null;
    
    routes.push({
      path,
      component: componentName,
      definedIn: filePath
    });
  }
  
  // Find page paths from useSEO
  const pathMatch = filePath.match(/pages\/(.+?)\.tsx$/);
  if (pathMatch) {
    const pagePath = pathMatch[1];
    routes.push({
      path: `/${pagePath}`,
      component: null,
      definedIn: filePath,
      isPageFile: true
    });
  }
  
  return routes;
}

// ============================================================
// IMPORT SCANNER
// ============================================================

/**
 * Extract all imports from file
 */
export function extractImportsFromFile(content: string): any[] {
  const imports: any[] = [];
  
  // Match all import statements
  const importMatches = content.matchAll(/import\s+(?:{([^}]+)}|(\w+))\s+from\s+["']([^"']+)["']/g);
  
  for (const match of importMatches) {
    const namedImports = match[1] ? match[1].split(',').map(s => s.trim()) : [];
    const defaultImport = match[2];
    const source = match[3];
    
    imports.push({
      source,
      default: defaultImport || null,
      named: namedImports,
      isRelative: source.startsWith('.'),
      isPackage: !source.startsWith('.')
    });
  }
  
  return imports;
}

// ============================================================
// MEDIA SCANNER
// ============================================================

/**
 * Scan for media references in content
 */
export function extractMediaFromFile(content: string): any[] {
  const media: any[] = [];
  
  // Find image sources
  const imgMatches = content.matchAll(/src=["']([^"']+\.(png|jpg|jpeg|webp|gif|svg))["']/gi);
  for (const match of imgMatches) {
    media.push({
      type: 'image',
      src: match[1],
      format: match[2]
    });
  }
  
  // Find video sources
  const videoMatches = content.matchAll(/src=["']([^"']+\.(mp4|webm|ogg))["']/gi);
  for (const match of videoMatches) {
    media.push({
      type: 'video',
      src: match[1],
      format: match[2]
    });
  }
  
  // Find background images
  const bgMatches = content.matchAll(/backgroundImage:\s*["']url\(([^)]+)\)["']/gi);
  for (const match of bgMatches) {
    media.push({
      type: 'background',
      src: match[1].replace(/["']/g, '')
    });
  }
  
  return media;
}

// ============================================================
// FULL PROJECT SCAN
// ============================================================

/**
 * Perform complete project scan
 */
export async function performFullScan(c: any) {
  try {
    console.log('🔍 Starting full project scan...');
    
    const scanResult = {
      timestamp: new Date().toISOString(),
      files: [] as any[],
      components: [] as any[],
      routes: [] as any[],
      seo: [] as any[],
      media: [] as any[],
      imports: [] as any[],
      stats: {
        totalFiles: 0,
        totalComponents: 0,
        totalRoutes: 0,
        totalSEOPages: 0,
        totalMedia: 0
      }
    };
    
    // Directories to scan
    const dirsToScan = [
      '/components',
      '/pages',
      '/utils',
      '/styles',
      '/public'
    ];
    
    // Scan each directory
    for (const dir of dirsToScan) {
      try {
        const files = await scanDirectory(dir);
        scanResult.files.push(...files);
      } catch (error) {
        console.log(`Directory ${dir} not accessible, skipping...`);
      }
    }
    
    // Process each file
    for (const file of scanResult.files) {
      try {
        // Only process text files
        if (!['react-component', 'typescript', 'javascript', 'json', 'markdown', 'mdx'].includes(file.type)) {
          continue;
        }
        
        // Read file content
        const content = await Deno.readTextFile(file.path);
        
        // Extract components
        if (file.type === 'react-component') {
          const components = extractComponentsFromFile(file.path, content);
          scanResult.components.push(...components);
        }
        
        // Extract routes
        const routes = extractRoutesFromFile(file.path, content);
        scanResult.routes.push(...routes);
        
        // Extract SEO
        const seo = await extractSEOFromFile(file.path, content);
        if (seo.title || seo.description || seo.metaTags.length > 0) {
          scanResult.seo.push(seo);
        }
        
        // Extract media
        const media = extractMediaFromFile(content);
        scanResult.media.push(...media);
        
        // Extract imports
        const imports = extractImportsFromFile(content);
        scanResult.imports.push(...imports);
        
      } catch (error) {
        console.error(`Error processing file ${file.path}:`, error);
      }
    }
    
    // Calculate stats
    scanResult.stats.totalFiles = scanResult.files.length;
    scanResult.stats.totalComponents = scanResult.components.length;
    scanResult.stats.totalRoutes = scanResult.routes.length;
    scanResult.stats.totalSEOPages = scanResult.seo.length;
    scanResult.stats.totalMedia = scanResult.media.length;
    
    // Save scan result to database
    await kv.set('project:scan:latest', scanResult);
    await kv.set(`project:scan:history:${Date.now()}`, scanResult);
    
    console.log('✅ Project scan complete!');
    console.log(`📊 Stats:`, scanResult.stats);
    
    return c.json({
      success: true,
      message: 'Project scan completed',
      scan: scanResult
    });
    
  } catch (error: any) {
    console.error('Error performing project scan:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get latest scan results
 */
export async function getLatestScan(c: any) {
  try {
    const scan = await kv.get('project:scan:latest');
    
    if (!scan) {
      return c.json({
        success: false,
        error: 'No scan results found. Run a scan first.'
      }, 404);
    }
    
    return c.json({
      success: true,
      scan
    });
  } catch (error: any) {
    console.error('Error getting scan:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

/**
 * Get scan history
 */
export async function getScanHistory(c: any) {
  try {
    const history = await kv.getByPrefix('project:scan:history:');
    
    return c.json({
      success: true,
      history: history.map(h => ({
        timestamp: h.value.timestamp,
        stats: h.value.stats
      }))
    });
  } catch (error: any) {
    console.error('Error getting scan history:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}

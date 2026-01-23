import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/**
 * INCHTOMILEZ - VITE CONFIGURATION
 * Version: 5.0 - Production Optimized Build ⚡
 * 
 * Features:
 * ✅ SWC for faster builds
 * ✅ Advanced code splitting
 * ✅ Tree shaking
 * ✅ Console removal in production
 * ✅ Optimized for Vercel deployment
 */

export default defineConfig({
  plugins: [
    react({
      // SWC for faster builds
      jsxImportSource: 'react',
    }),
  ],

  // 🎯 BUILD OPTIMIZATIONS
  build: {
    // Output directory
    outDir: 'dist',
    
    // Clean dist before build
    emptyOutDir: true,
    
    // No sourcemaps for production
    sourcemap: false,
    
    // Use esbuild for fast minification
    minify: 'esbuild',
    
    // Target modern browsers
    target: 'esnext',
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal caching
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // Motion animations
          if (id.includes('node_modules/motion')) {
            return 'animations';
          }
          // Lenis smooth scroll
          if (id.includes('node_modules/lenis')) {
            return 'lenis';
          }
          // Radix UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          // Blog data (large file)
          if (id.includes('/components/data/blogData')) {
            return 'blog-data';
          }
        },
        
        // Naming pattern for chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          // Organize assets by type
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },

  // 🔧 DEPENDENCY OPTIMIZATION
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'motion',
      'lenis',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },

  // 🌐 SERVER CONFIGURATION (Development)
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    open: false,
    cors: true,
    hmr: {
      overlay: true,
    },
  },

  // 🎨 CSS CONFIGURATION
  css: {
    devSourcemap: false,
  },

  // ⚡ PERFORMANCE OPTIMIZATIONS with esbuild
  esbuild: {
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Minify whitespace
    minifyWhitespace: true,
    // Minify identifiers
    minifyIdentifiers: true,
    // Minify syntax
    minifySyntax: true,
    // Target modern browsers
    target: 'esnext',
    // Remove pure function calls
    pure: ['console.log', 'console.info', 'console.debug'],
    // Legal comments - remove to save bytes
    legalComments: 'none',
  },

  // 📁 PATH RESOLUTION
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/components',
      '@utils': '/utils',
      '@styles': '/styles',
    },
  },

  // 🔍 DEFINE ENVIRONMENT VARIABLES
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/**
 * INCHTOMILEZ - VITE CONFIGURATION
 * Version: 4.0 - Phase 1 Performance Upgrade ⚡
 * 
 * Features:
 * ✅ SWC for faster builds
 * ✅ Advanced code splitting
 * ✅ Tree shaking
 * ✅ Optimized output to dist/
 * ⚡ Console log removal (production)
 * ⚡ Aggressive minification
 * ⚡ Bundle size optimization
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
    
    // Generate sourcemaps for debugging (disabled for production)
    sourcemap: false,
    
    // Minification
    minify: 'esbuild',
    
    // Target modern browsers
    target: 'esnext',
    
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Lucide icons (separate chunk)
          'icons': ['lucide-react'],
          
          // Motion animations
          'animations': ['motion'],
          
          // Lenis smooth scroll
          'lenis': ['lenis'],
        },
        
        // Naming pattern for chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          // Organize assets by type
          if (/\\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    
    // Chunk size warning limit (300kb - aggressive optimization)
    chunkSizeWarningLimit: 300,
    
    // ⚡ PHASE 1: Aggressive compression enabled
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,        // Remove console.log
        drop_debugger: true,        // Remove debugger
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific calls
        passes: 2,                  // Multiple compression passes
        dead_code: true,            // Remove dead code
        unused: true,               // Remove unused functions
        conditionals: true,         // Optimize if-else
        evaluate: true,             // Evaluate constant expressions
        booleans: true,             // Optimize boolean operations
        loops: true,                // Optimize loops
        join_vars: true,            // Join var declarations
        reduce_vars: true,          // Collapse single-use variables
      },
      mangle: {
        toplevel: true,             // Mangle top-level names
        safari10: true,             // Safari 10 compatibility
      },
      format: {
        comments: false,            // Remove all comments
        ecma: 2020,                 // Modern JS syntax
      },
    },
    
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
    
    // Hot Module Replacement
    hmr: {
      overlay: true,
    },
  },

  // 🎨 CSS CONFIGURATION
  css: {
    devSourcemap: false,
  },

  // ⚡ PERFORMANCE OPTIMIZATIONS
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

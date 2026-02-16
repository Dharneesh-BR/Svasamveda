import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: '/',
    plugins: [
      react({
        // Use modern JSX transform
        jsxImportSource: 'react',
        // Enable fast refresh in development
        fastRefresh: !isProduction,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      target: 'esnext', // Target modern browsers
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@sanity/client'],
            ui: ['@heroicons/react', 'react-icons'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          },
        },
        // Remove unused exports
        treeshake: 'smallest',
        // Externalize Firebase modules if needed
        external: (id) => {
          return false; // Keep Firebase bundled for now
        },
      },
      // Optimize assets
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      // Modern build optimization
      cssMinify: true,
      // Fix MIME type issues
      cssTarget: 'chrome80',
      // Remove console logs in production
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
    },
    server: {
      port: 3000,
      host: true, // Ensure proper host resolution
      // Fix MIME type issues for assets
      headers: {
        'Content-Type': 'text/javascript',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      // Proper MIME types for different file extensions
      mimeTypes: {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.json': 'application/json'
      },
      cors: true, // Enable CORS for development
      open: true,
    },
  };
});

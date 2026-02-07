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
            firebase: ['firebase', '@react-firebase/auth'],
          },
        },
        // Remove unused exports
        treeshake: 'smallest',
      },
      // Optimize assets
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      // Modern build optimization
      cssMinify: true,
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
      // No proxy needed when using CDN directly
      cors: true, // Enable CORS for development
      open: true,
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: false, // Disable minification temporarily
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@sanity/client'],
          },
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

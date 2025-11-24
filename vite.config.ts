import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base: "./"' is CRITICAL for quick deployments (e.g., dragging dist folder to Netlify)
  // It ensures assets are linked relatively, avoiding 404 errors on subpaths.
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    // Proxy API requests to the backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
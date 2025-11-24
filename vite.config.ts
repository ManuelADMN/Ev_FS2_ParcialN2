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
    port: 3000,
  }
});
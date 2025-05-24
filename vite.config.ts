import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  server: {
    port: 3000,
    open: true,
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
})

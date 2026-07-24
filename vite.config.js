import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    allowedHosts: ['yanagi-arm-jp', 'localhost', '127.0.0.1']
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['yanagi-arm-jp', 'localhost', '127.0.0.1']
  }
});

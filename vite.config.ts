import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import express from 'express';
import fs from 'fs';

// Helper to copy directory recursively
function copyFolderSync(from: string, to: string) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const srcPath = path.join(from, element);
    const destPath = path.join(to, element);
    const stat = fs.lstatSync(srcPath);
    if (stat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    } else if (stat.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    }
  });
}

export default defineConfig(() => {
  return {
    // GitHub Pages project site: https://zankhuy.github.io/Landing-Thien-Phuc/
    base: '/Landing-Thien-Phuc/',
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'serve-and-copy-images',
        configureServer(server) {
          server.middlewares.use('/Images', express.static(path.resolve(__dirname, 'Images')));
        },
        closeBundle() {
          const src = path.resolve(__dirname, 'Images');
          const dest = path.resolve(__dirname, 'dist/Images');
          try {
            if (fs.existsSync(src)) {
              copyFolderSync(src, dest);
              console.log('Successfully copied Images directory to dist/Images');
            }
          } catch (e) {
            console.error('Failed to copy Images directory:', e);
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

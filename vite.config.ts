import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';
import type { Connect } from 'vite';

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

export default defineConfig({
  // GitHub Pages project site: https://zankhuy.github.io/Landing-Thien-Phuc/
  base: '/Landing-Thien-Phuc/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-and-copy-images',
      configureServer(server) {
        // Serve Images directory during development
        const imagesDir = path.resolve(__dirname, 'Images');
        server.middlewares.use('/Landing-Thien-Phuc/Images', (req: Connect.IncomingMessage, res: any, next: Connect.NextFunction) => {
          const filePath = path.join(imagesDir, req.url || '');
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', getContentType(filePath));
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
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
    port: 3000,
    host: '0.0.0.0',
  },
});

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const types: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return types[ext] || 'application/octet-stream';
}

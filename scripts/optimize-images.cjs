const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const photosDir = './Images/Photos';
const thumbnailDir = './Images/Thumbnails';

// Create thumbnail directory
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

// Image configs - optimize large images
const imagesToOptimize = [
  { name: 'Mo_Don.JPG', maxWidth: 600, quality: 80 },
  { name: 'Mo_Doi.JPG', maxWidth: 600, quality: 80 },
  { name: 'tong_quan_2.jpg', maxWidth: 1200, quality: 85 },
  { name: 'tong_quan.jpg', maxWidth: 1200, quality: 85 },
  { name: 'anh_tong_quan.jpg', maxWidth: 1200, quality: 85 },
];

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  for (const img of imagesToOptimize) {
    const inputPath = path.join(photosDir, img.name);
    const outputPath = path.join(thumbnailDir, img.name.replace('.JPG', '_thumb.jpg').replace('.jpg', '_thumb.jpg'));

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipped: ${img.name} (not found)`);
      continue;
    }

    try {
      const metadata = await sharp(inputPath).metadata();
      console.log(`Processing: ${img.name} (${metadata.width}x${metadata.height})`);

      await sharp(inputPath)
        .resize(img.maxWidth, null, { withoutEnlargement: true })
        .jpeg({ quality: img.quality, progressive: true })
        .toFile(outputPath);

      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

      console.log(`  ✓ Optimized: ${(outputSize / 1024).toFixed(0)}KB (saved ${savings}%)\n`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}\n`);
    }
  }

  console.log('Done!');
}

optimizeImages();

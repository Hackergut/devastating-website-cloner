#!/usr/bin/env node
/**
 * Asset Downloader
 * Downloads all images, videos, fonts from extracted assets.json
 * 
 * Usage: node scripts/download-assets.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXTRACTION_DIR = path.join(__dirname, '..', 'docs', 'extraction');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Concurrency limit
const MAX_CONCURRENT = 10;

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // exists
  }
}

async function downloadFile(url, destPath) {
  try {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
      timeout: 30000
    });
    
    await fs.writeFile(destPath, response.data);
    console.log(`  ✓ Downloaded: ${path.basename(destPath)}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed: ${url} - ${error.message}`);
    return false;
  }
}

async function downloadWithQueue(urls, destDir, getName = (url, i) => `image-${i}.png`) {
  const results = [];
  
  for (let i = 0; i < urls.length; i += MAX_CONCURRENT) {
    const batch = urls.slice(i, i + MAX_CONCURRENT);
    const promises = batch.map(async (url, idx) => {
      const filename = getName(url, i + idx);
      const destPath = path.join(destDir, filename);
      const success = await downloadFile(url, destPath);
      return { url, success, path: destPath };
    });
    
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
  }
  
  return results;
}

async function convertToWebP(imagePath) {
  try {
    const webpPath = imagePath.replace(/\.(png|jpg|jpeg|webp)$/i, '.webp');
    await sharp(imagePath)
      .webp({ quality: 90 })
      .toFile(webpPath);
    console.log(`  → Converted to WebP: ${path.basename(webpPath)}`);
    return webpPath;
  } catch (error) {
    // Not a valid image, skip
    return null;
  }
}

async function main() {
  console.log('🚀 Starting asset download...\n');
  
  // Load extracted assets
  const assetsPath = path.join(EXTRACTION_DIR, 'assets.json');
  let assets;
  try {
    const data = await fs.readFile(assetsPath, 'utf-8');
    assets = JSON.parse(data);
  } catch (error) {
    console.error('❌ No assets.json found. Run extract-website.mjs first.');
    process.exit(1);
  }
  
  // Create directories
  const dirs = {
    images: path.join(PUBLIC_DIR, 'images'),
    videos: path.join(PUBLIC_DIR, 'videos'),
    fonts: path.join(PUBLIC_DIR, 'fonts'),
    seo: path.join(PUBLIC_DIR, 'seo'),
    icons: path.join(PUBLIC_DIR, 'icons')
  };
  
  for (const dir of Object.values(dirs)) {
    await ensureDir(dir);
  }
  
  // Download images
  if (assets.images && assets.images.length > 0) {
    console.log(`📸 Downloading ${assets.images.length} images...`);
    const imageUrls = assets.images
      .filter(img => img.src && !img.src.startsWith('data:'))
      .map(img => img.src);
    
    await downloadWithQueue(imageUrls, dirs.images, (url, i) => {
      const urlPath = new URL(url).pathname;
      const ext = path.extname(urlPath) || '.png';
      const name = path.basename(urlPath, ext) || `image-${i}`;
      return `${name}${ext}`;
    });
    
    // Convert to WebP
    console.log('\n🔄 Converting to WebP...');
    const imageFiles = await fs.readdir(dirs.images);
    for (const file of imageFiles) {
      if (file.endsWith(('.png', '.jpg', '.jpeg'))) {
        await convertToWebP(path.join(dirs.images, file));
      }
    }
  }
  
  // Download videos
  if (assets.videos && assets.videos.length > 0) {
    console.log(`\n🎬 Downloading ${assets.videos.length} videos...`);
    const videoUrls = assets.videos
      .filter(v => v.src)
      .map(v => v.src);
    
    await downloadWithQueue(videoUrls, dirs.videos, (url, i) => {
      const urlPath = new URL(url).pathname;
      return path.basename(urlPath) || `video-${i}.mp4`;
    });
  }
  
  // Download favicons
  if (assets.favicons && assets.favicons.length > 0) {
    console.log(`\n🎨 Downloading ${assets.favicons.length} favicons...`);
    await downloadWithQueue(
      assets.favicons.map(f => f.href),
      dirs.seo,
      (url, i) => path.basename(new URL(url).pathname) || `favicon-${i}.png`
    );
  }
  
  // Extract SVGs to React components
  if (assets.svgs && assets.svgs.length > 0) {
    console.log(`\n✨ Converting ${assets.svgs.length} SVGs to React components...`);
    await ensureDir(dirs.icons);
    
    // Group by viewBox (dedupe)
    const uniqueSvgs = new Map();
    assets.svgs.forEach((svg, i) => {
      const key = svg.viewBox || `svg-${i}`;
      if (!uniqueSvgs.has(key)) {
        uniqueSvgs.set(key, svg);
      }
    });
    
    let indexContent = `// Auto-generated SVG icons\n\n`;
    
    let i = 1;
    for (const [vb, svg] of uniqueSvgs) {
      const name = `Icon${i}`;
      
      // Parse SVG to create React component
      const svgContent = svg.html
        .replace(/class="([^"]+)"/g, 'className="$1"')
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin');
      
      const component = `import React from 'react';\n\nexport function ${name}({ className }: { className?: string }) {\n  return (\n    ${svgContent.replace('<svg', '<svg className={className}')}\n  );\n}\n`;
      
      await fs.writeFile(path.join(dirs.icons, `${name}.tsx`), component);
      indexContent += `export { ${name} } from './${name}';\n`;
      i++;
    }
    
    await fs.writeFile(path.join(dirs.icons, 'index.ts'), indexContent);
    console.log(`  ✓ Created ${uniqueSvgs.size} icon components`);
  }
  
  // Download fonts (extract from CSS)
  if (assets.fonts && assets.fonts.length > 0) {
    console.log(`\n🔤 Found ${assets.fonts.length} unique fonts (download manually or use Google Fonts):`);
    assets.fonts.forEach(font => {
      console.log(`  - ${font}`);
    });
  }
  
  console.log('\n✅ Asset download complete!');
  console.log(`📁 Assets saved to:`);
  console.log(`  - Images: ${dirs.images}`);
  console.log(`  - Videos: ${dirs.videos}`);
  console.log(`  - Icons: ${dirs.icons}`);
  console.log(`  - SEO: ${dirs.seo}`);
}

main().catch(console.error);
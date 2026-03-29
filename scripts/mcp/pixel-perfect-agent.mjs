/**
 * MCP Agent: Pixel-Perfect Verifier
 * Confronta screenshot originale vs clone e genera diff
 * Usa Puppeteer e Pixelmatch
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = process.argv[2] || 'https://www.ledger.com';
const CLONE_URL = process.argv[3] || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'extraction', 'diffs');

async function verifyPixelPerfect() {
  console.log('🔍 MCP Agent: Verifying pixel-perfect clone...\n');
  
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Screenshot originale
    console.log('📸 Taking screenshot of original site...');
    const originalPage = await browser.newPage();
    await originalPage.setViewport({ width: 1440, height: 900 });
    await originalPage.goto(TARGET_URL, { waitUntil: 'networkidle2' });
    await originalPage.screenshot({
      path: path.join(OUTPUT_DIR, 'original.png'),
      fullPage: true
    });
    
    // Screenshot clone
    console.log('📸 Taking screenshot of clone...');
    const clonePage = await browser.newPage();
    await clonePage.setViewport({ width: 1440, height: 900 });
    await clonePage.goto(CLONE_URL, { waitUntil: 'networkidle2' });
    await clonePage.screenshot({
      path: path.join(OUTPUT_DIR, 'clone.png'),
      fullPage: true
    });
    
    await browser.close();
    
    // Confronta con Pixelmatch
    console.log('\n📊 Comparing screenshots...');
    const diffResult = await compareScreenshots(
      path.join(OUTPUT_DIR, 'original.png'),
      path.join(OUTPUT_DIR, 'clone.png'),
      path.join(OUTPUT_DIR, 'diff.png')
    );
    
    console.log(`\n✅ Verification complete!`);
    console.log(`  Match: ${diffResult.matchPercentage}\n`);
    
    return diffResult;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function compareScreenshots(img1Path, img2Path, diffPath) {
  // Lazy load pixelmatch per evitare errori se non installato
  const pixelmatch = (await import('pixelmatch')).default;
  const pngjs = await import('pngjs');
  
  const img1 = pngjs.PNG.sync.read(await fs.readFile(img1Path), { input: true });
  const img2 = pngjs.PNG.sync.read(await fs.readFile(img2Path), { input: true });
  
  const { width, height } = img1;
  const diff = new pngjs.PNG({ width, height });
  
  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );
  
  const totalPixels = width * height;
  const matchPercentage = ((totalPixels - numDiffPixels) / totalPixels * 100).toFixed(2);
  
  await fs.writeFile(diffPath, pngjs.PNG.sync.write(diff));
  
  return {
    totalPixels,
    diffPixels: numDiffPixels,
    matchPercentage,
    diffPath
  };
}

verifyPixelPerfect().catch(console.error);
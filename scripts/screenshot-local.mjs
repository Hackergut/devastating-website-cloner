#!/usr/bin/env node
/**
 * Screenshot Local Development Server
 * Takes screenshots of the running Next.js app
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function takeScreenshot() {
  console.log('📸 Taking screenshots of local clone...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport for full page screenshots
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('📱 Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait for page to fully load
  await new Promise(r => setTimeout(r, 2000));
  
  // Take full page screenshot
  const outputPath = path.join(__dirname, '..', 'assets', 'screenshots', 'homepage-full.png');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  
  await page.screenshot({
    path: outputPath,
    fullPage: true
  });
  
  console.log('✅ Full page screenshot saved to:', outputPath);
  
  // Take hero section screenshot
  const heroPath = path.join(__dirname, '..', 'assets', 'screenshots', 'homepage-hero.png');
  await page.screenshot({
    path: heroPath,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  
  console.log('✅ Hero section screenshot saved to:', heroPath);
  
  await browser.close();
  
  console.log('\n✨ Screenshots complete!');
}

takeScreenshot().catch(console.error);

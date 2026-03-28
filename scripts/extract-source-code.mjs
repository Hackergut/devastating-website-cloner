#!/usr/bin/env node
/**
 * Deep Source Code Extraction Script
 * Extracts raw HTML, CSS, JS, inline scripts, embedded data
 * Inspects framework internals (React, Vue, Next, Nuxt)
 * 
 * Usage: node scripts/extract-source-code.mjs <url>
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = process.argv[2] || 'https://example.com';
const TIMEOUT = parseInt(process.argv[3]) || 120000;
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'extraction', 'source');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

async function extractSourceCode(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  const page = await browser.newPage();
  page.setDefaultTimeout(TIMEOUT);
  
  console.log('🔍 Deep Source Code Extraction...');
  console.log(`📡 Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });
  
  await ensureDir(OUTPUT_DIR);
  
  // 1. Extract raw HTML
  console.log('📄 Extracting raw HTML...');
  const rawHTML = await page.content();
  await fs.writeFile(path.join(OUTPUT_DIR, 'raw.html'), rawHTML);
  
  // 2. Extract all inline and external CSS
  console.log('🎨 Extracting all CSS...');
  const allCSS = await page.evaluate(() => {
    const styles = [];
    
    // Inline stylesheets
    document.querySelectorAll('style').forEach((style, i) => {
      styles.push({
        type: 'inline',
        index: i,
        css: style.textContent,
        id: style.id,
        className: style.className
      });
    });
    
    // External stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link, i) => {
      styles.push({
        type: 'external',
        index: i,
        href: link.href,
        id: link.id,
        media: link.media
      });
    });
    
    return styles;
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'stylesheets.json'), JSON.stringify(allCSS, null, 2));
  
  // 3. Extract all inline and external JavaScript
  console.log('📜 Extracting all JavaScript...');
  const allJS = await page.evaluate(() => {
    const scripts = [];
    
    // Inline scripts
    document.querySelectorAll('script:not([src])').forEach((script, i) => {
      scripts.push({
        type: 'inline',
        index: i,
        code: script.textContent?.slice(0, 50000), // Limit size
        typeAttr: script.type,
        id: script.id,
        className: script.className
      });
    });
    
    // External scripts
    document.querySelectorAll('script[src]').forEach((script, i) => {
      scripts.push({
        type: 'external',
        index: i,
        src: script.src,
        typeAttr: script.type,
        async: script.async,
        defer: script.defer,
        module: script.type === 'module'
      });
    });
    
    return scripts;
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'scripts.json'), JSON.stringify(allJS, null, 2));
  
  // 4. Detect Framework and Extract Data
  console.log('⚛️ Detecting framework and extracting embedded data...');
  const frameworkData = await page.evaluate(() => {
    const data = {
      framework: null,
      version: null,
      data: {}
    };
    
    // Next.js detection
    if (window.__NEXT_DATA__) {
      data.framework = 'Next.js';
      data.data.nextData = window.__NEXT_DATA__;
      data.version = window.__NEXT_DATA__?.buildId;
    }
    
    // Nuxt.js detection
    if (window.__NUXT__) {
      data.framework = 'Nuxt.js';
      data.data.nuxtData = window.__NUXT__;
    }
    
    // React detection (Fiber)
    if (document.querySelector('[data-reactroot]') || document.querySelector('[data-reactid]')) {
      data.framework = 'React';
    }
    
    // Vue detection
    if (document.querySelector('[data-v-]') || document.querySelector('[data-v-app]')) {
      data.framework = 'Vue';
      data.data.vueData = {};
      
      // Try to extract Vue component data
      document.querySelectorAll('[data-v-]').forEach(el => {
        const vueKey = Object.keys(el).find(k => k.startsWith('__vue__'));
        if (vueKey) {
          data.data.vueData[el.tagName] = el[vueKey]?.$data || el[vueKey]?.$props;
        }
      });
    }
    
    // Angular detection
    if (document.querySelector('[ng-version]') || document.querySelector('[ng-app]')) {
      data.framework = 'Angular';
      const ngVersion = document.querySelector('[ng-version]')?.getAttribute('ng-version');
      data.version = ngVersion;
    }
    
    // Svelte detection
    if (document.querySelector('[svelte]') || document.querySelector('[data-svelte]')) {
      data.framework = 'Svelte';
    }
    
    // Gatsby detection
    if (window.__GATSBY || document.getElementById('___gatsby')) {
      data.framework = 'Gatsby';
    }
    
    // Remix detection
    if (window.__remixContext) {
      data.framework = 'Remix';
      data.data.remixContext = window.__remixContext;
    }
    
    // Extract window globals
    const windowKeys = Object.keys(window).filter(k => 
      k.startsWith('__') || 
      k.includes('DATA') || 
      k.includes('STATE') ||
      k.includes('STORE') ||
      k.includes('CONFIG')
    );
    
    data.data.globals = {};
    windowKeys.forEach(key => {
      try {
        const value = window[key];
        if (value && typeof value !== 'function') {
          data.data.globals[key] = 
            typeof value === 'object' ? 
            JSON.parse(JSON.stringify(value).slice(0, 10000)) : 
            String(value).slice(0, 1000);
        }
      } catch (e) {}
    });
    
    return data;
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'framework-data.json'), JSON.stringify(frameworkData, null, 2));
  
  // 5. Extract all event handlers
  console.log('🎮 Extracting event handlers...');
  const eventHandlers = await page.evaluate(() => {
    const handlers = [];
    const eventTypes = ['click', 'hover', 'focus', 'blur', 'submit', 'change', 'input', 'keydown', 'keyup', 'scroll', 'resize'];
    
    document.querySelectorAll('*').forEach(el => {
      eventTypes.forEach(event => {
        const handler = el.getAttribute(`on${event}`);
        if (handler) {
          handlers.push({
            selector: el.tagName.toLowerCase() + 
              (el.id ? `#${el.id}` : '') + 
              (el.className ? `.${el.className.split(' ').slice(0, 2).join('.')}` : ''),
            event,
            handler: handler.slice(0, 500)
          });
        }
      });
    });
    
    return handlers;
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'event-handlers.json'), JSON.stringify(eventHandlers, null, 2));
  
  // 6. Extract data attributes
  console.log('📊 Extracting data attributes...');
  const dataAttributes = await page.evaluate(() => {
    const data = {};
    document.querySelectorAll('[data-]').forEach(el => {
      const attrs = {};
      Object.keys(el.dataset).forEach(key => {
        attrs[key] = el.dataset[key];
      });
      if (Object.keys(attrs).length > 0) {
        const selector = el.tagName.toLowerCase() + 
          (el.id ? `#${el.id}` : '') + 
          (el.className ? `.${el.className.split(' ')[0]}` : '');
        data[selector] = attrs;
      }
    });
    return data;
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'data-attributes.json'), JSON.stringify(dataAttributes, null, 2));
  
  // 7. Extract meta tags and SEO
  console.log('🔍 Extracting meta tags and SEO...');
  const seoData = await page.evaluate(() => {
    const meta = {
      title: document.title,
      meta: {},
      links: [],
      scripts: []
    };
    
    document.querySelectorAll('meta').forEach(m => {
      const name = m.getAttribute('name') || m.getAttribute('property') || m.getAttribute('itemprop');
      const content = m.getAttribute('content');
      if (name && content) {
        meta.meta[name] = content;
      }
    });
    
    document.querySelectorAll('link').forEach(l => {
      meta.links.push({
        rel: l.rel,
        href: l.href,
        type: l.type,
        as: l.as
      });
    });
    
    // JSON-LD structured data
    document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
      try {
        meta.scripts.push(JSON.parse(s.textContent));
      } catch (e) {}
    });
    
    return meta;
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'seo-meta.json'), JSON.stringify(seoData, null, 2));
  
  // 8. Extract Web Storage
  console.log('💾 Extracting localStorage and sessionStorage...');
  const storageData = await page.evaluate(() => {
    return {
      localStorage: { ...localStorage },
      sessionStorage: { ...sessionStorage }
    };
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'web-storage.json'), JSON.stringify(storageData, null, 2));
  
  // 9. Extract CSS Variables
  console.log('🎨 Extracting CSS custom properties...');
  const cssVariables = await page.evaluate(() => {
    const vars = {};
    document.querySelectorAll('style').forEach(style => {
      const matches = style.textContent.matchAll(/--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g);
      for (const match of matches) {
        vars[`--${match[1]}`] = match[2].trim();
      }
    });
    
    // Also get computed CSS variables
    const computed = getComputedStyle(document.documentElement);
    for (let i = 0; i < computed.length; i++) {
      const prop = computed[i];
      if (prop.startsWith('--')) {
        vars[prop] = computed.getPropertyValue(prop);
      }
    }
    
    return vars;
  });
  await fs.writeFile(path.join(OUTPUT_DIR, 'css-variables.json'), JSON.stringify(cssVariables, null, 2));
  
  await browser.close();
  
  console.log('\n✅ Source Code Extraction Complete!\n');
  console.log('📁 Output:');
  console.log(`  - ${OUTPUT_DIR}/raw.html`);
  console.log(`  - ${OUTPUT_DIR}/stylesheets.json`);
  console.log(`  - ${OUTPUT_DIR}/scripts.json`);
  console.log(`  - ${OUTPUT_DIR}/framework-data.json`);
  console.log(`  - ${OUTPUT_DIR}/event-handlers.json`);
  console.log(`  - ${OUTPUT_DIR}/data-attributes.json`);
  console.log(`  - ${OUTPUT_DIR}/seo-meta.json`);
  console.log(`  - ${OUTPUT_DIR}/web-storage.json`);
  console.log(`  - ${OUTPUT_DIR}/css-variables.json`);
  console.log(`\n⚛️ Framework Detected: ${frameworkData.framework || 'Unknown'}`);
  if (frameworkData.version) {
    console.log(`📦 Version: ${frameworkData.version}`);
  }
}

extractSourceCode(TARGET_URL).catch(console.error);
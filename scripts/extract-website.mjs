#!/usr/bin/env node
/**
 * Website Extraction Script
 * Uses Puppeteer to extract everything from a target website
 * 
 * Usage: node scripts/extract-website.mjs <url>
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TARGET_URL = process.argv[2] || 'https://example.com';
const TIMEOUT = parseInt(process.argv[3]) || 60000; // Default 60 seconds, configurable
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'extraction');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // dir exists
  }
}

async function extractWebsite(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  const page = await browser.newPage();
  page.setDefaultTimeout(TIMEOUT);
  
  console.log(`📡 Navigating to ${url}...`);
  console.log(`⏱️  Timeout: ${TIMEOUT}ms`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });
  
  // Set viewport sizes for responsive extraction
  const viewports = {
    desktop: { width: 1440, height: 900 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 390, height: 844 }
  };
  
  // 1. Extract page structure and all elements
  console.log('🔍 Extracting page structure...');
  await ensureDir(OUTPUT_DIR);
  
  // Extract computed styles for ALL elements
  const computedStyles = await page.evaluate(() => {
    const props = [
      'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing',
      'color', 'backgroundColor', 'background', 'backgroundImage',
      'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
      'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
      'width', 'height', 'maxWidth', 'minWidth', 'maxHeight', 'minHeight',
      'display', 'flexDirection', 'justifyContent', 'alignItems', 'gap',
      'gridTemplateColumns', 'gridTemplateRows',
      'borderRadius', 'border', 'boxShadow',
      'position', 'top', 'right', 'bottom', 'left', 'zIndex',
      'opacity', 'transform', 'transition', 'cursor',
      'overflow', 'visibility', 'display'
    ];
    
    const extractStyles = (element) => {
      const cs = window.getComputedStyle(element);
      const styles = {};
      props.forEach(p => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px') {
          styles[p] = v;
        }
      });
      return styles;
    };
    
    const walk = (element, depth = 0) => {
      if (depth > 6) return null;
      
      const children = Array.from(element.children);
      const rect = element.getBoundingClientRect();
      
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id || undefined,
        classes: element.className?.toString().split(' ').slice(0, 10).filter(Boolean),
        text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 
          ? element.textContent.trim().slice(0, 200) 
          : undefined,
        styles: extractStyles(element),
        computed: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          visible: rect.width > 0 && rect.height > 0
        },
        attributes: {
          href: element.href,
          src: element.src,
          alt: element.alt,
          type: element.type,
          placeholder: element.placeholder,
          'aria-label': element.getAttribute('aria-label'),
          'data-*': Object.keys(element.dataset).length > 0 ? element.dataset : undefined
        },
        images: element.tagName === 'IMG' ? {
          src: element.src,
          alt: element.alt,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight
        } : undefined,
        children: children.slice(0, 50).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    };
    
    return walk(document.body);
  });
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'computed-styles.json'),
    JSON.stringify(computedStyles, null, 2)
  );
  
  // 2. Extract all text content
  const textContent = await page.evaluate(() => {
    const extractText = (element) => {
      const items = [];
      const walk = (el, depth = 0) => {
        if (el.nodeType === 3) { // Text node
          const text = el.textContent.trim();
          if (text && text.length > 0) {
            items.push({
              text,
              parent: el.parentElement?.tagName.toLowerCase(),
              classes: el.parentElement?.className?.toString().split(' ').slice(0, 5),
              depth
            });
          }
        } else if (el.nodeType === 1) { // Element node
          Array.from(el.childNodes).forEach(child => walk(child, depth + 1));
        }
      };
      walk(element);
      return items;
    };
    return extractText(document.body);
  });
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'text-content.json'),
    JSON.stringify(textContent, null, 2)
  );
  
  // 3. Extract all assets (images, videos, fonts)
  const assets = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      loading: img.loading,
      position: window.getComputedStyle(img).position
    }));
    
    const videos = Array.from(document.querySelectorAll('video')).map(video => ({
      src: video.src || video.querySelector('source')?.src,
      poster: video.poster,
      autoplay: video.autoplay,
      loop: video.loop,
      muted: video.muted
    }));
    
    const backgroundImages = Array.from(document.querySelectorAll('*'))
      .filter(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none';
      })
      .map(el => ({
        url: window.getComputedStyle(el).backgroundImage,
        element: el.tagName + '.' + el.className?.split(' ')[0],
        position: window.getComputedStyle(el).position
      }));
    
    const svgs = Array.from(document.querySelectorAll('svg')).map(svg => ({
      html: svg.outerHTML,
      viewBox: svg.getAttribute('viewBox'),
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height')
    }));
    
    const fonts = Array.from(new Set(
      Array.from(document.querySelectorAll('*'))
        .slice(0, 500)
        .map(el => window.getComputedStyle(el).fontFamily)
    ));
    
    const favicons = Array.from(document.querySelectorAll('link[rel*="icon"]')).map(link => ({
      href: link.href,
      sizes: link.sizes?.toString(),
      type: link.type
    }));
    
    return { images, videos, backgroundImages, svgs, fonts, favicons };
  });
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'assets.json'),
    JSON.stringify(assets, null, 2)
  );
  
  // 4. Extract all CSS variables and custom properties
  const cssVariables = await page.evaluate(() => {
    const vars = {};
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules).forEach(rule => {
          if (rule.selectorText === ':root' || rule.selectorText?.includes(':root')) {
            const matches = rule.cssText.match(/--[a-zA-Z0-9-]+:\s*[^;]+/g);
            if (matches) {
              matches.forEach(match => {
                const [name, value] = match.split(':').map(s => s.trim());
                vars[name] = value;
              });
            }
          }
        });
      } catch (e) {
        // CORS protected stylesheet
      }
    });
    return vars;
  });
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'css-variables.json'),
    JSON.stringify(cssVariables, null, 2)
  );
  
  // 5. Screenshot at different viewports
  console.log('📸 Taking screenshots...');
  for (const [name, viewport] of Object.entries(viewports)) {
    await page.setViewport(viewport);
    await fs.mkdir(path.join(OUTPUT_DIR, 'screenshots'), { recursive: true });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'screenshots', `${name}.png`),
      fullPage: true
    });
    console.log(`  ✓ ${name} (${viewport.width}x${viewport.height})`);
  }
  
  // 6. Test interactions (click buttons, hover elements)
  console.log('🎮 Testing interactions...');
  const interactions = await page.evaluate(async () => {
    const results = [];
    
    // Test hover states (optimized - only test visible elements)
    const hoverElements = Array.from(document.querySelectorAll('button, a, [role="button"]'))
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0; // Only visible elements
      })
      .slice(0, 10); // Limit to 10 for speed
    
    for (const el of hoverElements) {
      try {
        const before = window.getComputedStyle(el);
        el.hover(); // Note: can't use await in evaluate, use sync
        const after = window.getComputedStyle(el);
        
        // Find what changed
        const changes = {};
        ['backgroundColor', 'color', 'transform', 'boxShadow', 'opacity'].forEach(prop => {
          if (before[prop] !== after[prop]) {
            changes[prop] = { before: before[prop], after: after[prop] };
          }
        });
        
        if (Object.keys(changes).length > 0) {
          results.push({
            type: 'hover',
            element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
            changes
          });
        }
      } catch (e) {
        // Skip if element becomes detached
      }
    }
    
    // Test scroll-triggered elements
    const scrollPosition = window.scrollY;
    const header = document.querySelector('header, nav, [role="navigation"]');
    if (header) {
      try {
        const beforeStyles = window.getComputedStyle(header);
        window.scrollTo(0, 500);
        const afterStyles = window.getComputedStyle(header);
        
        const changes = {};
        ['position', 'backgroundColor', 'boxShadow', 'padding', 'height'].forEach(prop => {
          if (beforeStyles[prop] !== afterStyles[prop]) {
            changes[prop] = { before: beforeStyles[prop], after: afterStyles[prop] };
          }
        });
        
        if (Object.keys(changes).length > 0) {
          results.push({
            type: 'scroll',
            element: 'header',
            trigger: 'scroll position > 500px',
            changes
          });
        }
        
        window.scrollTo(0, scrollPosition);
      } catch (e) {
        // Skip on error
      }
    }
    
    return results;
  });
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'interactions.json'),
    JSON.stringify(interactions, null, 2)
  );
  
  // 7. Extract metadata
  const metadata = await page.evaluate(() => {
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      ogTitle: document.querySelector('meta[property="og:title"]')?.content,
      ogDescription: document.querySelector('meta[property="og:description"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      favicon: document.querySelector('link[rel="icon"]')?.href,
      themeColor: document.querySelector('meta[name="theme-color"]')?.content,
      viewport: document.querySelector('meta[name="viewport"]')?.content
    };
  });
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  
  // 8. Identify page sections
  const sections = await page.evaluate(() => {
    // Heuristic section detection
    const potentialSections = document.querySelectorAll('section, header, footer, main, [role="main"], .hero, .features, .testimonials, .pricing, .faq, .cta');
    
    return Array.from(potentialSections).map(section => {
      const rect = section.getBoundingClientRect();
      return {
        tag: section.tagName.toLowerCase(),
        classes: section.className?.toString().split(' ').slice(0, 5),
        id: section.id,
        position: { y: rect.y, height: rect.height },
        heading: section.querySelector('h1, h2, h3')?.textContent.trim().slice(0, 100),
        childCount: section.children.length
      };
    });
  });
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'sections.json'),
    JSON.stringify(sections, null, 2)
  );
  
  console.log('✅ Extraction complete!');
  console.log(`📁 Output saved to: ${OUTPUT_DIR}`);
  console.log('\nExtracted:');
  console.log(`  - Computed styles for all elements`);
  console.log(`  - All text content`);
  console.log(`  - ${assets.images.length} images`);
  console.log(`  - ${assets.videos.length} videos`);
  console.log(`  - ${assets.svgs.length} SVGs`);
  console.log(`  - ${assets.fonts.length} unique fonts`);
  console.log(`  - ${Object.keys(cssVariables).length} CSS variables`);
  console.log(`  - ${interactions.length} interactions found`);
  console.log(`  - Screenshots at 3 viewport sizes`);
  console.log(`  - ${sections.length} sections identified`);
  
  await browser.close();
}

// Run extraction with timeout
extractWebsite(TARGET_URL).catch(async (error) => {
  console.error('❌ Extraction failed:', error.message);
  console.error('\n⚠️  Try increasing timeout:');
  console.error('   node scripts/extract-website.mjs <url> 120000');
  process.exit(1);
});
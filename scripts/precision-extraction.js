const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function extractLedgerPrecision() {
  console.log('🚀 PRECISION EXTRACTION for Ledger.com');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1440, height: 900 }
  });
  
  const page = await browser.newPage();
  await page.goto('https://www.ledger.com/', { waitUntil: 'networkidle2' });
  
  // === 1. MULTI-VIEWPORT SCREENSHOTS ===
  const viewports = [
    { w: 1920, h: 1080, name: 'desktop-xl' },
    { w: 1440, h: 900, name: 'desktop' },
    { w: 768, h: 1024, name: 'tablet' },
    { w: 390, h: 844, name: 'mobile' }
  ];
  
  for (const vp of viewports) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.screenshot({ 
      path: `docs/design-references/ledger-${vp.name}.png`,
      fullPage: true 
    });
    console.log(`✅ Screenshot: ${vp.name}`);
  }
  
  // === 2. PRECISION FONT EXTRACTION ===
  const fontData = await page.evaluate(() => {
    const fontElements = document.querySelectorAll('*');
    const fonts = new Set();
    
    fontElements.forEach(el => {
      const style = getComputedStyle(el);
      if (style.fontFamily && style.fontFamily !== 'system-ui') {
        fonts.add(JSON.stringify({
          family: style.fontFamily,
          weight: style.fontWeight,
          size: style.fontSize,
          lineHeight: style.lineHeight,
          element: el.tagName + '.' + el.className?.split(' ')[0]
        }));
      }
    });
    
    return Array.from(fonts).map(f => JSON.parse(f));
  });
  
  fs.writeFileSync('docs/research/FONTS_EXTRACTION.json', JSON.stringify(fontData, null, 2));
  
  // === 3. PRECISION COLOR EXTRACTION ===
  const colorData = await page.evaluate(() => {
    const importantElements = document.querySelectorAll('body, header, nav, main, footer, section, .btn, .button, a');
    const colors = new Set();
    
    importantElements.forEach(el => {
      const style = getComputedStyle(el);
      const data = {
        element: el.tagName + '.' + el.className?.split(' ')[0],
        color: style.color,
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        computedColors: {}
      };
      
      // Estrai anche le CSS variables
      for (let i = 0; i < el.style.length; i++) {
        const prop = el.style[i];
        if (prop.includes('color') || prop.includes('background')) {
          data.computedColors[prop] = style[prop];
        }
      }
      
      colors.add(JSON.stringify(data));
    });
    
    return Array.from(colors).map(c => JSON.parse(c));
  });
  
  fs.writeFileSync('docs/research/COLORS_EXTRACTION.json', JSON.stringify(colorData, null, 2));
  
  // === 4. ASSET DISCOVERY ===
  const assetData = await page.evaluate(() => {
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      className: img.className,
      parent: img.parentElement?.className
    }));
    
    const svgs = [...document.querySelectorAll('svg')].map((svg, i) => ({
      index: i,
      outerHTML: svg.outerHTML,
      className: svg.className,
      parent: svg.parentElement?.className
    }));
    
    return { images, svgs, totalImages: images.length, totalSvgs: svgs.length };
  });
  
  fs.writeFileSync('docs/research/ASSETS_EXTRACTION.json', JSON.stringify(assetData, null, 2));
  
  // === 5. COMPONENT STRUCTURE EXTRACTION ===
  const components = await page.evaluate(() => {
    const sections = document.querySelectorAll('section, header, main, footer');
    return [...sections].map((section, i) => {
      const rect = section.getBoundingClientRect();
      return {
        index: i,
        tagName: section.tagName,
        className: section.className,
        id: section.id,
        childrenCount: section.children.length,
        textContent: section.textContent?.trim().slice(0, 100),
        position: { top: rect.top, height: rect.height }
      };
    });
  });
  
  fs.writeFileSync('docs/research/COMPONENTS_EXTRACTION.json', JSON.stringify(components, null, 2));
  
  console.log('✅ Precision extraction complete!');
  return { browser, page };
}

extractLedgerPrecision().catch(console.error);

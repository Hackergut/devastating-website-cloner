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
  
  // === 1. PRECISION FONT EXTRACTION ===
  console.log('📝 Extracting fonts...');
  const fontData = await page.evaluate(() => {
    const fontElements = document.querySelectorAll('*');
    const fonts = new Set();
    
    fontElements.forEach(el => {
      try {
        const style = getComputedStyle(el);
        if (style.fontFamily && style.fontFamily !== 'system-ui') {
          const className = el.className ? (typeof el.className === 'string' ? el.className : el.className.baseVal || '') : '';
          fonts.add(JSON.stringify({
            family: style.fontFamily,
            weight: style.fontWeight,
            size: style.fontSize,
            lineHeight: style.lineHeight,
            element: el.tagName + '.' + className.split(' ')[0]
          }));
        }
      } catch (e) {
        // Skip problematic elements
      }
    });
    
    return Array.from(fonts).map(f => JSON.parse(f));
  });
  
  fs.writeFileSync('docs/research/FONTS_EXTRACTION.json', JSON.stringify(fontData, null, 2));
  console.log(`✅ Fonts extracted: ${fontData.length}`);
  
  // === 2. PRECISION COLOR EXTRACTION ===
  console.log('🎨 Extracting colors...');
  const colorData = await page.evaluate(() => {
    const importantElements = document.querySelectorAll('body, header, nav, main, footer, section, .btn, .button, a');
    const colors = new Set();
    
    importantElements.forEach(el => {
      try {
        const style = getComputedStyle(el);
        const className = el.className ? (typeof el.className === 'string' ? el.className : el.className.baseVal || '') : '';
        const data = {
          element: el.tagName + '.' + className.split(' ')[0],
          color: style.color,
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor
        };
        colors.add(JSON.stringify(data));
      } catch (e) {
        // Skip problematic elements
      }
    });
    
    return Array.from(colors).map(c => JSON.parse(c));
  });
  
  fs.writeFileSync('docs/research/COLORS_EXTRACTION.json', JSON.stringify(colorData, null, 2));
  console.log(`✅ Colors extracted: ${colorData.length}`);
  
  // === 3. ASSET DISCOVERY ===
  console.log('🖼️ Extracting assets...');
  const assetData = await page.evaluate(() => {
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt || '',
      width: img.naturalWidth,
      height: img.naturalHeight,
      className: img.className ? (typeof img.className === 'string' ? img.className : '') : ''
    }));
    
    const svgs = [...document.querySelectorAll('svg')].map((svg, i) => ({
      index: i,
      outerHTML: svg.outerHTML,
      className: svg.className ? (typeof svg.className === 'string' ? svg.className : svg.className.baseVal || '') : ''
    }));
    
    return { images, svgs, totalImages: images.length, totalSvgs: svgs.length };
  });
  
  fs.writeFileSync('docs/research/ASSETS_EXTRACTION.json', JSON.stringify(assetData, null, 2));
  console.log(`✅ Assets extracted: ${assetData.totalImages} images, ${assetData.totalSvgs} SVGs`);
  
  // === 4. COMPONENT STRUCTURE EXTRACTION ===
  console.log('🏗️ Extracting component structure...');
  const components = await page.evaluate(() => {
    const sections = document.querySelectorAll('section, header, main, footer');
    return [...sections].map((section, i) => {
      try {
        const rect = section.getBoundingClientRect();
        const className = section.className ? (typeof section.className === 'string' ? section.className : section.className.baseVal || '') : '';
        return {
          index: i,
          tagName: section.tagName,
          className: className,
          id: section.id || '',
          childrenCount: section.children.length,
          textContent: section.textContent?.trim().slice(0, 200),
          position: { top: rect.top, height: rect.height }
        };
      } catch (e) {
        return { error: 'Failed to extract section', index: i };
      }
    });
  });
  
  fs.writeFileSync('docs/research/COMPONENTS_EXTRACTION.json', JSON.stringify(components, null, 2));
  console.log(`✅ Components extracted: ${components.length}`);
  
  console.log('🎉 Precision extraction complete!');
  await browser.close();
}

extractLedgerPrecision().catch(console.error);

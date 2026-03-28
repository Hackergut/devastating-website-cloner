#!/usr/bin/env node
/**
 * CSS Processor
 * Processa i CSS estratti e genera stili per ogni componente
 * 
 * Input: docs/extraction/source/stylesheets.json
 *        docs/extraction/structure.json
 * Output: docs/extraction/component-styles.json
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STYLESHEETS_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'source', 'stylesheets.json');
const STRUCTURE_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'structure.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'component-styles.json');

async function processCSS() {
  console.log('🎨 Processing CSS...\n');
  
  // Read input files
  const stylesheetsRaw = await fs.readFile(STYLESHEETS_FILE, 'utf-8');
  const structureRaw = await fs.readFile(STRUCTURE_FILE, 'utf-8');
  
  const stylesheets = JSON.parse(stylesheetsRaw);
  const structure = JSON.parse(structureRaw);
  
  // Combine all CSS
  let allCSS = '';
  stylesheets.forEach(sheet => {
    if (sheet.type === 'inline' && sheet.css) {
      allCSS += sheet.css + '\n';
    }
  });
  
  // Extract CSS rules for each component
  const componentStyles = {
    global: {
      variables: extractCSSVariables(allCSS),
      fonts: extractFontDefinitions(allCSS)
    },
    components: {}
  };
  
  // Process each component
  for (const component of structure.components) {
    const componentName = component.name || component.type?.toLowerCase() || 'unknown';
    
    console.log(`  Processing ${componentName}...`);
    
    const styles = extractStylesForSelector(allCSS, component.classes || [], component.selector);
    
    componentStyles.components[componentName] = {
      type: component.type,
      selector: component.selector,
      classes: component.classes,
      css: styles.css,
      inlineStyles: component.styles || {},
      responsive: extractResponsiveRules(allCSS, component.classes || []),
      animations: extractAnimations(allCSS, component.classes || [])
    };
  }
  
  // Extract utility classes
  componentStyles.utilities = {
    spacing: extractUtilityClasses(allCSS, ['p-', 'm-', 'gap-', 'space-']),
    flexbox: extractUtilityClasses(allCSS, ['flex', 'grid', 'items-', 'justify-']),
    typography: extractUtilityClasses(allCSS, ['text-', 'font-', 'leading-']),
    colors: extractUtilityClasses(allCSS, ['bg-', 'text-', 'border-']),
    effects: extractUtilityClasses(allCSS, ['shadow', 'rounded', 'opacity-'])
  };
  
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(componentStyles, null, 2));
  
  console.log('\n✅ CSS Processed!\n');
  console.log('📊 Statistics:');
  console.log(`  Components: ${Object.keys(componentStyles.components).length}`);
  console.log(`  CSS Variables: ${Object.keys(componentStyles.global.variables).length}`);
  console.log(`  Font Definitions: ${componentStyles.global.fonts.length}`);
  console.log(`  Utility Classes: ${Object.keys(componentStyles.utilities).length}`);
  console.log(`\n📁 Output: ${OUTPUT_FILE}`);
  
  return componentStyles;
}

function extractCSSVariables(css) {
  const variables = {};
  const regex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let match;
  
  while ((match = regex.exec(css)) !== null) {
    variables[`--${match[1]}`] = match[2].trim();
  }
  
  return variables;
}

function extractFontDefinitions(css) {
  const fonts = [];
  const regex = /@font-face\s*\{([^}]+)\}/g;
  let match;
  
  while ((match = regex.exec(css)) !== null) {
    const fontDef = match[1];
    const nameMatch = fontDef.match(/font-family:\s*['"]?([^'";]+)['"]?/);
    const srcMatch = fontDef.match(/src:\s*url\(['"]?([^'")]+)['"]?\)/);
    
    if (nameMatch) {
      fonts.push({
        family: nameMatch[1].trim(),
        src: srcMatch ? srcMatch[1].trim() : null
      });
    }
  }
  
  return fonts;
}

function extractStylesForSelector(css, classes, selector) {
  const result = {
    css: '',
    rules: [],
    important: []
  };
  
  if (!classes || classes.length === 0) return result;
  
  // Build selector patterns
  const patterns = classes.map(c => {
    if (c.startsWith('.')) return '\\' + c;
    return '\\.' + c;
  });
  
  // Find rules for each class
  patterns.forEach(pattern => {
    const regex = new RegExp(`([^{]*${pattern}[^{]*)\\{([^}]+)\\}`, 'gi');
    let match;
    
    while ((match = regex.exec(css)) !== null) {
      const selectors = match[1].trim();
      const properties = match[2].trim();
      
      result.rules.push({
        selector: selectors,
        properties: properties
      });
      
      result.css += `${selectors} { ${properties} }\n`;
      
      // Check for !important
      if (properties.includes('!important')) {
        result.important.push({
          selector: selectors,
          properties: properties
        });
      }
    }
  });
  
  // Also find by exact selector
  if (selector) {
    const cleanSelector = selector.replace(/[^\w\-\.\[\]]/g, '');
    const regex = new RegExp(`(${cleanSelector}[^{]*)\\{([^}]+)\\}`, 'gi');
    let match;
    
    while ((match = regex.exec(css)) !== null) {
      result.css += `${match[1].trim()} { ${match[2].trim()} }\n`;
    }
  }
  
  return result;
}

function extractResponsiveRules(css, classes) {
  const responsive = {
    mobile: [],
    tablet: [],
    desktop: []
  };
  
  // Mobile: @media (max-width: 767px)
  const mobileMatch = css.match(/@media\s*\(max-width:\s*767px\)\s*\{([^}]+)\}/gi);
  if (mobileMatch) {
    mobileMatch.forEach(m => {
      responsive.mobile.push(m);
    });
  }
  
  // Tablet: @media (min-width: 768px) and (max-width: 1023px)
  const tabletMatch = css.match(/@media\s*\(min-width:\s*768px\)[^{]*\{([^}]+)\}/gi);
  if (tabletMatch) {
    tabletMatch.forEach(m => {
      responsive.tablet.push(m);
    });
  }
  
  // Desktop: @media (min-width: 1024px)
  const desktopMatch = css.match(/@media\s*\(min-width:\s*1024px\)[^{]*\{([^}]+)\}/gi);
  if (desktopMatch) {
    desktopMatch.forEach(m => {
      responsive.desktop.push(m);
    });
  }
  
  return responsive;
}

function extractAnimations(css, classes) {
  const animations = [];
  
  // Extract keyframes
  const keyframeRegex = /@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/gi;
  let match;
  
  while ((match = keyframeRegex.exec(css)) !== null) {
    animations.push({
      name: match[1],
      keyframes: match[2].trim()
    });
  }
  
  // Extract animation properties
  const animPropRegex = /animation\s*:\s*([^;]+);/gi;
  while ((match = animPropRegex.exec(css)) !== null) {
    animations.push({
      property: match[1].trim()
    });
  }
  
  return animations;
}

function extractUtilityClasses(css, prefixes) {
  const utilities = {};
  
  prefixes.forEach(prefix => {
    const regex = new RegExp(`\\.${prefix}[a-zA-Z0-9_-]+\\s*\\{([^}]+)\\}`, 'gi');
    const matches = [];
    let match;
    
    while ((match = regex.exec(css)) !== null) {
      const className = match[0].match(new RegExp(`\\.(${prefix}[a-zA-Z0-9_-]+)`))?.[1];
      if (className) {
        matches.push({
          class: className,
          css: match[1].trim()
        });
      }
    }
    
    utilities[prefix] = matches;
  });
  
  return utilities;
}

processCSS().catch(console.error);
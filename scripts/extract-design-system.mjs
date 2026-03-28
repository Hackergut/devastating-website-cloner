#!/usr/bin/env node
/**
 * Design System Extractor
 * Extracts complete design system: colors, typography, spacing, shadows
 * 
 * Usage: node scripts/extract-design-system.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXTRACTION_DIR = path.join(__dirname, '..', 'docs', 'extraction');
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'design-system');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

async function analyzeColorUsage(computedStyles) {
  console.log('🎨 Analyzing color palette...');
  
  const colorMap = new Map();
  
  function extractColors(node, path = 'root') {
    if (!node || typeof node !== 'object') return;
    
    // Check color properties
    if (node.styles) {
      ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 
       'borderBottomColor', 'borderLeftColor', 'textDecorationColor'].forEach(prop => {
        const value = node.styles[prop];
        if (value && value !== 'transparent' && value !== 'none') {
          const count = colorMap.get(value) || 0;
          colorMap.set(value, count + 1);
        }
      });
    }
    
    // Recursively check children
    if (node.children) {
      node.children.forEach((child, i) => extractColors(child, `${path}.children[${i}]`));
    }
  }
  
  extractColors(computedStyles);
  
  // Group colors by usage frequency
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color, count]) => ({ color, count }));
  
  // Extract primary, secondary, accent colors
  const primary = sortedColors.slice(0, 10);
  const secondary = sortedColors.slice(10, 30);
  const rare = sortedColors.slice(30);
  
  return { primary, secondary, rare, all: sortedColors };
}

async function analyzeTypography(computedStyles) {
  console.log('📝 Analyzing typography...');
  
  const fontMap = new Map();
  const sizeMap = new Map();
  const weightMap = new Map();
  
  function extractTypography(node) {
    if (!node || typeof node !== 'object') return;
    
    if (node.styles) {
      // Font family
      const fontFamily = node.styles.fontFamily;
      if (fontFamily) {
        const count = fontMap.get(fontFamily) || 0;
        fontMap.set(fontFamily, count + 1);
      }
      
      // Font size
      const fontSize = node.styles.fontSize;
      if (fontSize) {
        const count = sizeMap.get(fontSize) || 0;
        sizeMap.set(fontSize, count + 1);
      }
      
      // Font weight
      const fontWeight = node.styles.fontWeight;
      if (fontWeight) {
        const count = weightMap.get(fontWeight) || 0;
        weightMap.set(fontWeight, count + 1);
      }
    }
    
    if (node.children) {
      node.children.forEach(child => extractTypography(child));
    }
  }
  
  extractTypography(computedStyles);
  
  return {
    fonts: Array.from(fontMap.entries()).sort((a, b) => b[1] - a[1]),
    sizes: Array.from(sizeMap.entries()).sort((a, b) => b[1] - a[1]),
    weights: Array.from(weightMap.entries()).sort((a, b) => b[1] - a[1])
  };
}

async function analyzeSpacing(computedStyles) {
  console.log('📐 Analyzing spacing system...');
  
  const spacingSet = new Set();
  const radiusSet = new Set();
  
  function extractSpacing(node) {
    if (!node || typeof node !== 'object') return;
    
    if (node.styles) {
      // Padding values
      ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach(prop => {
        const value = node.styles[prop];
        if (value && value !== 'auto') {
          spacingSet.add(value);
        }
      });
      
      // Margin values
      ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(prop => {
        const value = node.styles[prop];
        if (value && value !== 'auto') {
          spacingSet.add(value);
        }
      });
      
      // Border radius
      ['borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 
       'borderBottomLeftRadius', 'borderBottomRightRadius'].forEach(prop => {
        const value = node.styles[prop];
        if (value && value !== '0px') {
          radiusSet.add(value);
        }
      });
    }
    
    if (node.children) {
      node.children.forEach(child => extractSpacing(child));
    }
  }
  
  extractSpacing(computedStyles);
  
  // Sort numerically
  const parsePx = val => parseFloat(val);
  return {
    spacing: Array.from(spacingSet).sort((a, b) => parsePx(a) - parsePx(b)),
    radius: Array.from(radiusSet).sort((a, b) => parsePx(a) - parsePx(b))
  };
}

async function generateTailwindConfig(designSystem) {
  return `/** @type {import('tailwindcss').Config */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
${designSystem.colors.primary.slice(0, 5).map((c, i) => `          ${i + 1}00: '${c.color}',`).join('\n')}
        },
        // Secondary colors
        secondary: {
${designSystem.colors.secondary.slice(0, 5).map((c, i) => `          ${i + 1}00: '${c.color}',`).join('\n')}
        },
      },
      fontFamily: {
${designSystem.typography.fonts.slice(0, 3).map(([font]) => `        sans: ['${font.split(',')[0].replace(/["']/g, '')}', 'sans-serif'],`).join('\n')}
      },
      fontSize: {
${designSystem.typography.sizes.slice(0, 10).map(([size]) => `        '${size}': '${size}',`).join('\n')}
      },
      spacing: {
${designSystem.spacing.spacing.slice(0, 20).map(s => `        '${s.replace('px', '')}': '${s}',`).join('\n')}
      },
      borderRadius: {
${designSystem.spacing.radius.slice(0, 10).map(r => `        '${r.replace('px', '')}': '${r}',`).join('\n')}
      },
    },
  },
  plugins: [],
}`;
}

async function generateCSSVariables(designSystem) {
  return `:root {
  /* Colors - Primary */
${designSystem.colors.primary.slice(0, 10).map((c, i) => `  --color-primary-${i + 1}00: ${c.color};`).join('\n')}
  
  /* Colors - Secondary */
${designSystem.colors.secondary.slice(0, 10).map((c, i) => `  --color-secondary-${i + 1}00: ${c.color};`).join('\n')}
  
  /* Typography */
${designSystem.typography.fonts.slice(0, 3).map(([font], i) => `  --font-family-${i + 1}: ${font};`).join('\n')}
${designSystem.typography.sizes.slice(0, 15).map(([size]) => `  --font-size-${size.replace('px', '')}: ${size};`).join('\n')}
  
  /* Spacing */
${designSystem.spacing.spacing.slice(0, 30).map((s, i) => `  --spacing-${s.replace('px', '')}: ${s};`).join('\n')}
  
  /* Border Radius */
${designSystem.spacing.radius.slice(0, 15).map((r, i) => `  --radius-${r.replace('px', '')}: ${r};`).join('\n')}
}

.dark {
  /* Dark mode colors - to be customized */
${designSystem.colors.primary.slice(0, 10).map((c, i) => `  --color-primary-${i + 1}00: ${c.color}; /* Adjust for dark mode */`).join('\n')}
}`;
}

async function generateFigmaTokens(designSystem) {
  return JSON.stringify({
    color: {
      primary: designSystem.colors.primary.slice(0, 10).reduce((acc, c, i) => {
        acc[i + 1] = { value: c.color, type: 'color' };
        return acc;
      }, {}),
    },
    typography: {
      fontFamily: {
        sans: { value: designSystem.typography.fonts[0]?.[0]?.split(',')[0] || 'sans-serif' }
      },
      fontSizes: designSystem.typography.sizes.slice(0, 10).reduce((acc, [size], i) => {
        acc[i] = { value: size, type: 'dimension' };
        return acc;
      }, {})
    },
    spacing: designSystem.spacing.spacing.slice(0, 20).reduce((acc, s, i) => {
      acc[i] = { value: s, type: 'dimension' };
      return acc;
    }, {})
  }, null, 2);
}

async function main() {
  console.log('🎨 Extracting Design System...\n');
  
  await ensureDir(OUTPUT_DIR);
  
  // Load computed styles
  try {
    const computedStylesData = await fs.readFile(
      path.join(EXTRACTION_DIR, 'computed-styles.json'),
      'utf-8'
    );
    const computedStyles = JSON.parse(computedStylesData);
    
    // Analyze design system
    const colors = await analyzeColorUsage(computedStyles);
    const typography = await analyzeTypography(computedStyles);
    const spacing = await analyzeSpacing(computedStyles);
    
    const designSystem = { colors, typography, spacing };
    
    // Save design system JSON
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'design-system.json'),
      JSON.stringify(designSystem, null, 2)
    );
    
    // Generate Tailwind config
    const tailwindConfig = await generateTailwindConfig(designSystem);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'tailwind.config.js'),
      tailwindConfig
    );
    
    // Generate CSS variables
    const cssVariables = await generateCSSVariables(designSystem);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'css-variables.css'),
      cssVariables
    );
    
    // Generate Figma tokens
    const figmaTokens = await generateFigmaTokens(designSystem);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'figma-tokens.json'),
      figmaTokens
    );
    
    console.log('✅ Design System Extracted!\n');
    console.log('📊 Statistics:');
    console.log(`  Colors: ${colors.all.length} unique`);
    console.log(`  Fonts: ${typography.fonts.length} families`);
    console.log(`  Font sizes: ${typography.sizes.length} sizes`);
    console.log(`  Spacing values: ${spacing.spacing.length} values`);
    console.log(`  Border radius: ${spacing.radius.length} values`);
    console.log('\n📁 Output:');
    console.log(`  ${path.join(OUTPUT_DIR, 'design-system.json')}`);
    console.log(`  ${path.join(OUTPUT_DIR, 'tailwind.config.js')}`);
    console.log(`  ${path.join(OUTPUT_DIR, 'css-variables.css')}`);
    console.log(`  ${path.join(OUTPUT_DIR, 'figma-tokens.json')}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nMake sure to run extract-website.mjs first.');
    process.exit(1);
  }
}

main();
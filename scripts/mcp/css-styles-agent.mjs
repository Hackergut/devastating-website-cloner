/**
 * MCP Agent: CSS → React Styles Converter  
 * Applica gli stili CSS estratti ai componenti
 * 
 * Input: docs/extraction/source/stylesheets.json
 *        docs/extraction/component-styles.json
 * Output: styles applicati ai componenti
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STYLESHEETS_FILE = path.join(__dirname, '..', '..', 'docs', 'extraction', 'source', 'stylesheets.json');
const COMPONENT_STYLES_FILE = path.join(__dirname, '..', '..', 'docs', 'extraction', 'component-styles.json');
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'src', 'app');

async function applyCSSStyles() {
  console.log('🎨 MCP Agent: Applying CSS styles...\n');
  
  const stylesheetsRaw = await fs.readFile(STYLESHEETS_FILE, 'utf-8');
  const stylesheets = JSON.parse(stylesheetsRaw);
  
  let componentStylesRaw = '{}';
  try {
    componentStylesRaw = await fs.readFile(COMPONENT_STYLES_FILE, 'utf-8');
  } catch (e) {
    console.log('  ⚠ No component-styles.json, creating from stylesheets...');
  }
  const componentStyles = JSON.parse(componentStylesRaw);
  
  // Estrai CSS inline
  let allCSS = '';
  stylesheets.forEach(sheet => {
    if (sheet.type === 'inline' && sheet.css) {
      allCSS += sheet.css + '\n';
    }
  });
  
  // Estrai variabili CSS (colori, fonts, spacing)
  const cssVariables = extractCSSVariables(allCSS);
  console.log(`  ✓ Extracted ${Object.keys(cssVariables).length} CSS variables`);
  
  // Genera globals.css con variabili reali
  const globalsCSS = generateGlobalsCSS(cssVariables, allCSS);
  await fs.writeFile(path.join(OUTPUT_DIR, 'globals.css'), globalsCSS);
  console.log(`  ✓ Generated globals.css with real CSS variables`);
  
  // Genera Tailwind config con colori reali
  const tailwindConfig = generateTailwindConfig(cssVariables);
  await fs.writeFile(path.join(__dirname, '..', 'tailwind.config.ts'), tailwindConfig);
  console.log(`  ✓ Generated tailwind.config.ts with extracted colors`);
  
  // Genera mappa classi → stili
  const classStyles = extractClassStyles(allCSS);
  await fs.writeFile(
    path.join(__dirname, '..', '..', 'docs', 'extraction', 'class-styles-map.json'),
    JSON.stringify(classStyles, null, 2)
  );
  console.log(`  ✓ Extracted ${Object.keys(classStyles).length} class styles`);
  
  console.log(`\n✅ CSS styles applied!`);
  return { cssVariables, classStyles };
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

function extractClassStyles(css) {
  const classStyles = {};
  const regex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
  let match;
  
  while ((match = regex.exec(css)) !== null) {
    const className = match[1];
    const styles = match[2].trim();
    
    // Salta classi troppo generiche
    if (!['container', 'row', 'col'].includes(className) && styles.length > 10) {
      classStyles[className] = styles;
    }
  }
  
  return classStyles;
}

function generateGlobalsCSS(variables, css) {
  const colorVars = Object.entries(variables)
    .filter(([k]) => k.includes('color') || k.includes('Color') || k.includes('background'))
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  
  const fontVars = Object.entries(variables)
    .filter(([k]) => k.includes('font') || k.includes('Font'))
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  
  return `/* Generated from extracted CSS */
/* Source: docs/extraction/source/stylesheets.json */

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Colors extracted from Ledger.com */
${colorVars || '  --color-primary: #0055FF;\n  --color-background: #FFFFFF;'}
  
  /* Fonts extracted from Ledger.com */
${fontVars || '  --font-inter: "Inter", sans-serif;'}
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
}

body {
  font-family: var(--font-inter, Inter, sans-serif);
  background: var(--color-background, #FFFFFF);
  color: var(--color-text, #000000);
}

/* Real CSS extracted from site */
${css.slice(0, 10000)}
`;
}

function generateTailwindConfig(variables) {
  const colors = {};
  Object.entries(variables)
    .filter(([k]) => k.includes('color') || k.includes('Color'))
    .forEach(([k, v]) => {
      const colorName = k.replace('--', '').replace('-color', '').replace(/-/g, '');
      colors[colorName] = v;
    });
  
  return `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)},
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
`;
}

applyCSSStyles().catch(console.error);
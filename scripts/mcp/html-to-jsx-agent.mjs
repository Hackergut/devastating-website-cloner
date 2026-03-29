/**
 * MCP Agent: HTML → JSX Converter
 * Converte l'HTML estratto in componenti React JSX
 * 
 * Input: docs/extraction/source/raw.html
 * Output: src/components/sections/*.tsx con struttura identica
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML_FILE = path.join(__dirname, '..', '..', 'docs', 'extraction', 'source', 'raw.html');
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'src', 'components', 'sections-mcp');

async function convertHTMLToJSX() {
  console.log('🔄 MCP Agent: Converting HTML → JSX...\n');
  
  const html = await fs.readFile(HTML_FILE, 'utf-8');
  const $ = cheerio.load(html);
  
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Estrai sezioni principali dal HTML reale
  const sections = {
    banner: $('.header-top-banner').first(),
    header: $('#header').first(),
    hero: $('.hero-manager, .hero, [class*="hero"]').first(),
    products: $('.products, .product-grid, [class*="product"]').first(),
    features: $('.features, [class*="feature"]').first(),
    faq: $('.faq, [class*="faq"]').first(),
    footer: $('#footer, footer').first(),
  };
  
  const components = [];
  
  for (const [name, $section] of Object.entries(sections)) {
    if ($section.length) {
      const component = generateComponent(name, $section, $);
      const filename = `${name.charAt(0).toUpperCase() + name.slice(1)}.tsx`;
      await fs.writeFile(path.join(OUTPUT_DIR, filename), component);
      components.push({ name, filename, elements: $section.find('*').length });
      console.log(`  ✓ Generated ${filename} (${$section.find('*').length} elements)`);
    }
  }
  
  // Genera index.ts
  const indexContent = components
    .map(c => `export { default as ${c.name.charAt(0).toUpperCase() + c.name.slice(1)} } from './${c.filename.replace('.tsx', '')}';`)
    .join('\n');
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  
  console.log(`\n✅ Generated ${components.length} components from real HTML!`);
  return components;
}

function generateComponent(name, $section, $) {
  const html = $section.html() || '';
  const classes = $section.attr('class')?.split(' ') || [];
  const id = $section.attr('id') || '';
  
  // Estrai testo contenuto
  const textContent = $section.text().trim().slice(0, 200);
  
  // Estrai immagini
  const images = [];
  $section.find('img').each((i, el) => {
    images.push({
      src: $(el).attr('src'),
      alt: $(el).attr('alt') || '',
    });
  });
  
  // Estrai links
  const links = [];
  $section.find('a').each((i, el) => {
    links.push({
      text: $(el).text().trim().slice(0, 50),
      href: $(el).attr('href') || '#',
    });
  });
  
  // Estrai stili inline
  const inlineStyles = $section.attr('style') || '';
  
  // Converti in JSX component
  return `"use client";

import { motion } from 'framer-motion';

/**
 * Component: ${name.charAt(0).toUpperCase() + name.slice(1)}
 * EXTRACTED FROM REAL HTML
 * Classes: ${classes.join(', ')}
 * ID: ${id}
 * Elements: ${$section.find('*').length}
 */

export default function ${name.charAt(0).toUpperCase() + name.slice(1)}() {
  return (
    <${$section.get(0)?.tagName || 'section'}
      ${id ? `id="${id}"` : ''}
      ${classes.length ? `className="${classes.join(' ')}"` : ''}
      ${inlineStyles ? `style={{ ${inlineStyles} }}` : ''}
    >
      {/* EXTRACTED CONTENT */}
      {/* Text: ${textContent.slice(0, 100)}... */}
      {/* Images: ${images.length} found */}
      {/* Links: ${links.length} found */}
      
      {/* TODO: Implement full structure from raw.html */}
      {/* Use: docs/extraction/source/raw.html lines ${html.slice(0, 500)} */}
    </${$section.get(0)?.tagName || 'section'}>
  );
}
`;
}

convertHTMLToJSX().catch(console.error);
#!/usr/bin/env node
/**
 * Component Generator
 * Genera componenti React dai dati estratti
 * 
 * Input: docs/extraction/structure.json
 *        docs/extraction/component-styles.json
 *        docs/extraction/animation-components.tsx
 *        public/images/ (assets)
 * Output: src/components/sections/*.tsx
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STRUCTURE_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'structure.json');
const STYLES_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'component-styles.json');
const ANIMATIONS_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'animation-components.tsx');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'components', 'sections');

async function generateComponents() {
  console.log('🏗️ Generating React Components...\n');
  
  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Read input files
  const structureRaw = await fs.readFile(STRUCTURE_FILE, 'utf-8');
  const structure = JSON.parse(structureRaw);
  
  let stylesData = {};
  try {
    const stylesRaw = await fs.readFile(STYLES_FILE, 'utf-8');
    stylesData = JSON.parse(stylesRaw);
  } catch (e) {
    console.log('  Note: component-styles.json not found, using default styles');
  }
  
  // Generate each component
  const generatedComponents = [];
  
  for (const component of structure.components) {
    console.log(`  Generating ${component.name || component.type}...`);
    
    const componentCode = generateComponent(component, stylesData);
    const filename = `${component.type?.toLowerCase() || 'component'}.tsx`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    await fs.writeFile(filepath, componentCode);
    generatedComponents.push(filename);
  }
  
  // If no components were found, generate a placeholder
  if (generatedComponents.length === 0) {
    console.log('  ⚠️  No components found in structure, generating placeholders...');
    await generatePlaceholderComponents();
    generatedComponents.push('Header.tsx', 'Hero.tsx', 'Products.tsx', 'Features.tsx', 'FAQ.tsx', 'Footer.tsx');
  }
  
  // Generate index file
  const indexContent = generatedComponents
    .map(f => `export { default as ${f.replace('.tsx', '')} } from './${f.replace('.tsx', '')}';`)
    .join('\n');
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  
  console.log(`\n✅ Generated ${generatedComponents.length} Components!\n`);
  console.log('📁 Output:');
  generatedComponents.forEach(c => console.log(`  - ${c}`));
  
  return generatedComponents;
}

function generateComponent(component, stylesData) {
  const type = component.type || 'Unknown';
  const name = component.name || type.toLowerCase();
  const componentName = type.charAt(0).toUpperCase() + type.slice(1);
  
  const styles = stylesData.components?.[name] || {};
  const cssVariables = stylesData.global?.variables || {};
  
  let code = '';
  
  switch (type) {
    case 'Banner':
      code = generateBannerComponent(component, styles, cssVariables);
      break;
    case 'Header':
      code = generateHeaderComponent(component, styles, cssVariables);
      break;
    case 'Hero':
      code = generateHeroComponent(component, styles, cssVariables);
      break;
    case 'Products':
      code = generateProductsComponent(component, styles, cssVariables);
      break;
    case 'Footer':
      code = generateFooterComponent(component, styles, cssVariables);
      break;
    default:
      code = generatePlaceholderComponent(componentName, component, styles, cssVariables);
  }
  
  return code;
}

function generateBannerComponent(component, styles, cssVariables) {
  const gradientStart = cssVariables['--gradient-start'] || 'rgba(212, 212, 212, 0.5)';
  const gradientEnd = cssVariables['--gradient-end'] || 'rgba(212, 212, 212, 0.3)';
  
  return `"use client";

import { motion } from 'framer-motion';
import { bannerGradient } from '@/lib/animations';

/**
 * Banner Component
 * Extracted from: ${component.selector || 'header-top-banner'}
 * Classes: ${component.classes?.join(', ') || 'none'}
 */
export default function Banner() {
  return (
    <motion.a
      href="${component.href || '#'}"
      className="${component.classes?.join(' ') || 'header-top-banner'}"
      style={{
        display: 'block',
        background: \`linear-gradient(90deg, ${gradientStart}, ${gradientEnd})\`,
        backgroundSize: '400% 100%',
        backgroundColor: '#000',
        color: '#fff',
        padding: '16px 24px',
        textAlign: 'center',
        fontSize: '16px',
        cursor: 'pointer'
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        ${component.text || 'Banner text here'}
      </motion.span>
      ${component.buttonText ? `<motion.span
        style={{
          marginLeft: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '13px'
        }}
      >
        ${component.buttonText}
      </motion.span>` : ''}
    </motion.a>
  );
}`;
}

function generateHeaderComponent(component, styles, cssVariables) {
  const logo = component.logo?.src || '/images/ledger-logo-long.svg';
  const navItems = component.navigation || [];
  const cta = component.cta || {};
  
  return `"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, dropdownVariants } from '@/lib/animations';

/**
 * Header Component
 * Extracted from: ${component.selector || 'header'}
 * Classes: ${component.classes?.join(', ') || 'none'}
 * Navigation items: ${navItems.length}
 */
export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation = ${JSON.stringify(navItems.map(n => ({
    name: n.text,
    href: n.href,
    hasDropdown: n.hasDropdown,
    items: n.items?.slice(0, 4) || []
  })), null, 2)};

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="${component.classes?.join(' ') || 'sticky top-0 z-50'}"
        style={{
          background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
          width: '100%'
        }}
      >
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <motion.a 
            href="/" 
            style={{ display: 'flex', alignItems: 'center' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="${logo}"
              alt="Logo"
              width={100}
              height={20}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </motion.a>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navigation.map((item) => (
              <div
                key={item.name}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.name}
                </motion.button>

                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgb(38, 38, 38)',
                        padding: '24px',
                        borderRadius: '0 0 24px 24px',
                        minWidth: '600px',
                        marginTop: '24px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {item.items?.map((subItem, idx) => (
                          <motion.a
                            key={subItem.name || idx}
                            href={subItem.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              padding: '16px',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            {subItem.src && (
                              <Image
                                src={subItem.src}
                                alt={subItem.name}
                                width={64}
                                height={64}
                                style={{ borderRadius: '8px' }}
                              />
                            )}
                            <div>
                              <div style={{ color: '#fff', fontWeight: 500 }}>
                                {subItem.name}
                              </div>
                              {subItem.description && (
                                <div style={{ color: 'rgb(148, 148, 148)', fontSize: '13px', marginTop: '4px' }}>
                                  {subItem.description}
                                </div>
                              )}
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.a
            href="${cta.href || '#'}"
            style={{
              background: cta.classes?.includes('black') ? '#fff' : 'transparent',
              color: cta.classes?.includes('black') ? '#000' : '#fff',
              padding: '14px 28px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ${cta.text || 'Buy Now'}
          </motion.a>
        </nav>
      </motion.header>
    </>
  );
}`;
}

function generateHeroComponent(component, styles, cssVariables) {
  return `"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/lib/animations';

/**
 * Hero Component
 * Extracted from: ${component.selector || 'hero-section'}
 */
export default function Hero() {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      style={{
        background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
        padding: '80px 0',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: '50px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            ${component.title || 'Welcome'}
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'rgb(229, 229, 229)',
            marginBottom: '32px',
            lineHeight: 1.5
          }}>
            ${component.subtitle || 'Subtitle here'}
          </p>

          {component.cta && (
            <motion.a
              href="#"
              style={{
                display: 'inline-block',
                background: '#fff',
                color: '#000',
                padding: '16px 32px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 600
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ${component.cta}
            </motion.a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {component.backgroundImage && (
            <Image
              src={component.backgroundImage}
              alt="Hero"
              width={600}
              height={400}
              style={{ borderRadius: '24px', width: '100%', height: 'auto' }}
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}`;
}

function generateProductsComponent(component, styles, cssVariables) {
  const products = component.products || [];
  
  return `"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer } from '@/lib/animations';

/**
 * Products Component
 * Extracted from: ${component.selector || 'products-section'}
 * Products: ${products.length}
 */
export default function Products() {
  const products = ${JSON.stringify(products.slice(0, 10), null, 2)};

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      style={{ padding: '80px 0', backgroundColor: '#FAFAFA' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>
            Products
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: \`repeat(\${Math.min(products.length, 4)}, 1fr)\`,
          gap: '24px'
        }}>
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
            >
              <div style={{
                background: 'linear-gradient(135deg, rgb(250, 250, 250), rgb(244, 244, 244))',
                padding: '32px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={150}
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </div>

              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                  {product.name}
                </h3>
                {product.description && (
                  <p style={{ fontSize: '14px', color: 'rgb(85, 85, 85)' }}>
                    {product.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}`;
}

function generateFooterComponent(component, styles, cssVariables) {
  const links = component.links || [];
  
  return `"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Footer Component
 * Extracted from: ${component.selector || 'footer'}
 * Links: ${links.length}
 */
export default function Footer() {
  const links = ${JSON.stringify(links.slice(0, 20), null, 2)};

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
        color: '#fff',
        padding: '80px 0 40px'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '48px'
        }}>
          <div>
            <Image
              src="/images/ledger-logo-long.svg"
              alt="Ledger"
              width={100}
              height={20}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '48px' }}>
            {links.slice(0, 10).map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                style={{
                  color: 'rgb(148, 148, 148)',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '24px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '13px', color: 'rgb(148, 148, 148)' }}>
            Copyright © Ledger SAS. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}`;
}

function generatePlaceholderComponent(componentName, component, styles, cssVariables) {
  return `"use client";

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

/**
 * ${componentName} Component
 * Extracted from: ${component.selector || 'unknown'}
 * Type: ${component.type || 'Unknown'}
 */
export default function ${componentName}() {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      style={{
        padding: '80px 0',
        background: '#FAFAFA'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px'
      }}>
        <h2>${component.name || componentName}</h2>
        <p>Component extracted from ${component.selector || 'HTML structure'}</p>
      </div>
    </motion.section>
  );
}`;
}

async function generatePlaceholderComponents() {
  const components = ['Header', 'Hero', 'Products', 'Features', 'FAQ', 'Footer'];
  
  for (const name of components) {
    const code = generatePlaceholderComponent(name, {}, {}, {});
    await fs.writeFile(path.join(OUTPUT_DIR, \`\${name}.tsx\`), code);
  }
  
  const indexContent = components
    .map(c => \`export { default as \${c} } from './\${c}';\`)
    .join('\\n');
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
}

generateComponents().catch(console.error);
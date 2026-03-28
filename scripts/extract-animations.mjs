#!/usr/bin/env node
/**
 * Animation & Transition Extractor
 * Extracts all animations, transitions, keyframes from CSS
 * 
 * Usage: node scripts/extract-animations.mjs
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = process.argv[2] || 'https://example.com';
const TIMEOUT = parseInt(process.argv[3]) || 60000;
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'extraction');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

async function extractAnimations(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  page.setDefaultTimeout(TIMEOUT);
  
  console.log(`🎬 Extracting animations from ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: TIMEOUT });
  
  // Extract all CSS animations and transitions
  const animations = await page.evaluate(() => {
    const results = {
      keyframes: [],
      transitions: [],
      animations: []
    };
    
    // Extract @keyframes from stylesheets
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules).forEach(rule => {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            results.keyframes.push({
              name: rule.name,
              cssText: rule.cssText
            });
          }
        });
      } catch (e) {
        // CORS error, skip
      }
    });
    
    // Extract transitions from elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      
      if (styles.transition && styles.transition !== 'none') {
        const classNameStr = (el.className && typeof el.className === 'string') 
          ? el.className 
          : (el.className && el.className.baseVal) || '';
        results.transitions.push({
          selector: el.tagName.toLowerCase() + 
            (el.id ? `#${el.id}` : '') + 
            (classNameStr ? '.' + classNameStr.split(' ').slice(0, 2).join('.') : ''),
          transition: styles.transition,
          transitionProperty: styles.transitionProperty,
          transitionDuration: styles.transitionDuration,
          transitionTimingFunction: styles.transitionTimingFunction,
          transitionDelay: styles.transitionDelay
        });
      }
      
      if (styles.animation && styles.animation !== 'none 0s') {
        const classNameStr = (el.className && typeof el.className === 'string') 
          ? el.className 
          : (el.className && el.className.baseVal) || '';
        results.animations.push({
          selector: el.tagName.toLowerCase() + 
            (el.id ? `#${el.id}` : '') + 
            (classNameStr ? '.' + classNameStr.split(' ').slice(0, 2).join('.') : ''),
          animation: styles.animation,
          animationName: styles.animationName,
          animationDuration: styles.animationDuration,
          animationTimingFunction: styles.animationTimingFunction,
          animationDelay: styles.animationDelay,
          animationIterationCount: styles.animationIterationCount,
          animationDirection: styles.animationDirection,
          animationFillMode: styles.animationFillMode
        });
      }
    });
    
    // Deduplicate transitions
    const seenTransitions = new Set();
    results.transitions = results.transitions.filter(t => {
      const key = `${t.selector}-${t.transition}`;
      if (seenTransitions.has(key)) return false;
      seenTransitions.add(key);
      return true;
    });
    
    // Deduplicate animations
    const seenAnimations = new Set();
    results.animations = results.animations.filter(a => {
      const key = `${a.selector}-${a.animation}`;
      if (seenAnimations.has(key)) return false;
      seenAnimations.add(key);
      return true;
    });
    
    return results;
  });
  
  // Test scroll-triggered animations
  console.log('🎮 Testing scroll animations...');
  const scrollAnimations = await page.evaluate(async () => {
    const results = [];
    const elements = document.querySelectorAll('[data-aos], [data-scroll], [class*="animate"]');
    
    for (const el of elements) {
      const before = {
        opacity: window.getComputedStyle(el).opacity,
        transform: window.getComputedStyle(el).transform
      };
      
      // Scroll element into view
      el.scrollIntoView({ behavior: 'instant' });
      await new Promise(r => setTimeout(r, 500));
      
      const after = {
        opacity: window.getComputedStyle(el).opacity,
        transform: window.getComputedStyle(el).transform
      };
      
      if (before.opacity !== after.opacity || before.transform !== after.transform) {
        results.push({
          selector: el.tagName.toLowerCase() + 
            (el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : ''),
          trigger: 'scroll',
          before,
          after
        });
      }
    }
    
    return results;
  });
  
  animations.scrollTriggered = scrollAnimations;
  
  await browser.close();
  return animations;
}

async function generateFramerMotionComponents(animations) {
  return `// Auto-generated Framer Motion components
// Based on extracted animations

import { motion } from 'framer-motion';

// Keyframe animations
export const keyframeAnimations = {
${animations.keyframes.map(kf => {
  const name = kf.name;
  return `  ${name}: {
    keyframes: \`${kf.cssText}\`
  },`;
}).join('\n')}
} as const;

// Transition variants
export const transitions = {
${animations.transitions.slice(0, 20).map(t => {
  const name = t.selector.replace(/[^a-zA-Z0-9]/g, '_');
  return `  ${name}: {
    transition: '${t.transition}',
    property: '${t.transitionProperty}',
    duration: '${t.transitionDuration}',
    timing: '${t.transitionTimingFunction}'
  },`;
}).join('\n')}
} as const;

// Animation variants for Framer Motion
export const animationVariants = {
${animations.animations.slice(0, 20).map(a => {
  const name = a.selector.replace(/[^a-zA-Z0-9]/g, '_');
  return `  ${name}: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: ${parseFloat(a.animationDuration) || 0.3},
        ease: '${a.animationTimingFunction}'
      }
    }
  },`;
}).join('\n')}
} as const;

// Scroll-triggered animations
export const scrollAnimations = {
${animations.scrollTriggered.slice(0, 10).map((sa, i) => {
  return `  scrollAnimation${i}(): {
    opacity: [${sa.before.opacity}, ${sa.after.opacity}],
    transition: { duration: 0.5 }
  },`;
}).join('\n')}
} as const;

// Utility hooks
export function useScrollAnimation() {
  return {
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };
}
`;
}

async function main() {
  await ensureDir(OUTPUT_DIR);
  
  try {
    const animations = await extractAnimations(TARGET_URL);
    
    // Save animations JSON
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'animations.json'),
      JSON.stringify(animations, null, 2)
    );
    
    // Generate Framer Motion components
    const framerComponents = await generateFramerMotionComponents(animations);
    await fs.writeFile(
      path.join(OUTPUT_DIR, '..', 'design-system', 'framer-motion-components.tsx'),
      framerComponents
    );
    
    console.log('✅ Animations Extracted!\n');
    console.log('📊 Statistics:');
    console.log(`  Keyframes: ${animations.keyframes.length}`);
    console.log(`  Transitions: ${animations.transitions.length}`);
    console.log(`  Animations: ${animations.animations.length}`);
    console.log(`  Scroll-triggered: ${animations.scrollTriggered.length}`);
    console.log('\n📁 Output:');
    console.log(`  ${path.join(OUTPUT_DIR, 'animations.json')}`);
    console.log(`  ${path.join(OUTPUT_DIR, '..', 'design-system', 'framer-motion-components.tsx')}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
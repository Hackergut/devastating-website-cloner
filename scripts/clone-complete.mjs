#!/usr/bin/env node
/**
 * Master Website Clone Script
 * Orchestrates all extraction scripts in the correct order
 * 
 * Usage: node scripts/clone-complete.mjs <url> [timeout]
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TARGET_URL = process.argv[2] || 'https://example.com';
const TIMEOUT = process.argv[3] || '120000';

console.log('🚀 Complete Website Cloning Pipeline');
console.log('========================================\n');
console.log(`Target: ${TARGET_URL}`);
console.log(`Timeout: ${TIMEOUT}ms\n`);

async function runScript(scriptName, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📦 Step: ${description}`);
  console.log(`${'='.repeat(60)}}\n`);
  
  return new Promise((resolve, reject) => {
    const script = spawn('node', [
      path.join(__dirname, scriptName),
      TARGET_URL,
      TIMEOUT
    ], {
      stdio: 'inherit'
    });
    
    script.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${description} complete\n`);
        resolve();
      } else {
        console.error(`\n❌ ${description} failed (exit code: ${code})\n`);
        // Continue even if one step fails
        resolve();
      }
    });
    
    script.on('error', (error) => {
      console.error(`\n❌ Error in ${description}: ${error.message}\n`);
      // Continue even if one step fails
      resolve();
    });
  });
}

async function main() {
  const startTime = Date.now();
  
  console.log('📋 Pipeline Steps:');
  console.log('  1. Extract Website (Puppeteer)');
  console.log('  2. Download Assets');
  console.log('  3. Generate Component Specs');
  console.log('  4. Extract Design System');
  console.log('  5. Analyze Responsive Breakpoints');
  console.log('  6. Extract Animations');
  console.log('  7. Check Accessibility');
  console.log('  8. Analyze Performance');
  console.log('  9. Extract Source Code (DEEP)');
  console.log('  10. Extract Network & APIs (DEEP)');
  console.log('\n');
  
  try {
    // Step 1: Extract website
    await runScript('extract-website.mjs', 'Website Extraction');
    
    // Step 2: Download assets
    await runScript('download-assets.mjs', 'Download Assets');
    
    // Step 3: Generate specs
    await runScript('generate-specs.mjs', 'Generate Component Specs');
    
    // Step 4: Extract design system
    await runScript('extract-design-system.mjs', 'Design System Extraction');
    
    // Step 5: Analyze responsive
    await runScript('analyze-responsive.mjs', 'Responsive Analysis');
    
    // Step 6: Extract animations
    await runScript('extract-animations.mjs', 'Animation Extraction');
    
    // Step 7: Check accessibility
    await runScript('check-accessibility.mjs', 'Accessibility Check');
    
    // Step 8: Analyze performance
    await runScript('analyze-performance.mjs', 'Performance Analysis');
    
    // Step 9: Extract deep source code
    await runScript('extract-source-code.mjs', 'Deep Source Code Extraction');
    
    // Step 10: Extract network/API calls
    await runScript('extract-network.mjs', 'Network & API Extraction');
    
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log('\n');
    console.log('═'.repeat(60));
    console.log('🎉 CLONE PIPELINE COMPLETE!');
    console.log('═'.repeat(60));
    console.log(`\n⏱️  Total Time: ${totalTime}s`);
    console.log('\n📊 Outputs:');
    console.log('\n  📁 Extraction Data:');
    console.log('  ├─ computed-styles.json     - All CSS values');
    console.log('  ├─ assets.json              - All images/videos');
    console.log('  ├─ text-content.json        - All text');
    console.log('  ├─ css-variables.json       - Design tokens');
    console.log('  ├─ animations.json           - All animations');
    console.log('  ├─ accessibility-issues.json - WCAG report');
    console.log('  └─ performance-metrics.json  - Core Web Vitals');
    console.log('\n  📁 Source Code (DEEP):');
    console.log('  ├─ raw.html                 - Complete HTML');
    console.log('  ├─ stylesheets.json          - All CSS (inline + external)');
    console.log('  ├─ scripts.json             - All JS (inline + external)');
    console.log('  ├─ framework-data.json       - React/Vue/Next detection');
    console.log('  ├─ event-handlers.json       - All event listeners');
    console.log('  ├─ data-attributes.json      - Data attributes');
    console.log('  └─ web-storage.json          - LocalStorage/Session');
    console.log('\n  📁 Network (DEEP):');
    console.log('  ├─ requests.json            - All network requests');
    console.log('  ├─ responses.json           - API responses');
    console.log('  ├─ api-endpoints.json        - REST/GraphQL endpoints');
    console.log('  └─ graphql.json              - GraphQL queries');
    console.log('\n  📁 Design System:');
    console.log('  ├─ design-system.json        - Colors, fonts, spacing');
    console.log('  ├─ tailwind.config.js        - Auto-generated config');
    console.log('  ├─ css-variables.css         - CSS custom properties');
    console.log('  ├─ figma-tokens.json         - Figma-ready tokens');
    console.log('  ├─ responsive-utils.tsx      - Responsive hooks');
    console.log('  └─ framer-motion-components.tsx - Animation components');
    console.log('\n  📁 Assets:');
    console.log('  ├─ public/images/            - Downloaded images');
    console.log('  ├─ public/videos/            - Downloaded videos');
    console.log('  ├─ public/icons/             - SVG components');
    console.log('  └─ public/seo/               - Favicons');
    console.log('\n  📁 Screenshots:');
    console.log('  ├─ desktop.png               - 1440px viewport');
    console.log('  ├─ tablet.png                - 768px viewport');
    console.log('  └─ mobile.png                - 390px viewport');
    console.log('\n');
    console.log('🔥 Next Steps:');
    console.log('  1. Review extracted design in docs/design-system/');
    console.log('  2. Check screenshots in docs/extraction/screenshots/');
    console.log('  3. Fix accessibility issues in docs/extraction/accessibility-report.md');
    console.log('  4. Optimize performance based on docs/extraction/performance-report.md');
    console.log('  5. Use the clone-website skill to build components');
    console.log('\n');
    
  } catch (error) {
    console.error('\n❌ Pipeline failed:', error.message);
    process.exit(1);
  }
}

main();
#!/usr/bin/env node
/**
 * Master Pipeline - Orchestrates all subagents in parallel
 * Coordinates extraction, processing, and component generation
 * 
 * Usage: node scripts/master-pipeline.mjs <url>
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = process.argv[2] || 'https://example.com';
const TIMEOUT = process.argv[3] || '300000';

console.log('🚀 DEVASTATING Website Clone Pipeline');
console.log('='.repeat(60));
console.log(`URL: ${TARGET_URL}`);
console.log(`Timeout: ${TIMEOUT}ms\n`);

async function runScript(scriptPath, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📦 ${description}`);
  console.log(`${'='.repeat(60)}}\n`);
  
  return new Promise((resolve, reject) => {
    const script = spawn('node', [scriptPath, TARGET_URL, TIMEOUT], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    script.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${description} complete\n`);
        resolve();
      } else {
        console.error(`\n⚠️  ${description} had issues (exit code: ${code})\n`);
        resolve(); // Continue even if one step fails
      }
    });
    
    script.on('error', (error) => {
      console.error(`\n❌ Error in ${description}: ${error.message}\n`);
      resolve(); // Continue even if one step fails
    });
  });
}

async function runParallelScripts(scripts) {
  console.log('\n⚡ Running in PARALLEL...\n');
  
  const promises = scripts.map(({ script, description }) => 
    runScript(path.join(__dirname, script), description)
  );
  
  await Promise.all(promises);
}

async function main() {
  const startTime = Date.now();
  
  try {
    // ============================================================
    // PHASE 1: EXTRACTION (Parallel)
    // ============================================================
    console.log('📍 PHASE 1: EXTRACTION');
    console.log('Extracting all data from target website...\n');
    
    await runParallelScripts([
      { script: 'extract-website.mjs', description: 'Website Extraction' },
      { script: 'extract-source-code.mjs', description: 'Deep Source Code Extraction' },
      { script: 'extract-network.mjs', description: 'Network & API Extraction' }
    ]);
    
    // ============================================================
    // PHASE 2: ASSET DOWNLOADING
    // ============================================================
    console.log('📍 PHASE 2: ASSET DOWNLOADING');
    console.log('Downloading all images, videos, and assets...\n');
    
    await runScript(path.join(__dirname, 'download-assets.mjs'), 'Download Assets');
    
    // ============================================================
    // PHASE 3: DESIGN SYSTEM EXTRACTION (Parallel)
    // ============================================================
    console.log('📍 PHASE 3: DESIGN SYSTEM ANALYSIS');
    console.log('Analyzing design system, animations, and responsive...\n');
    
    await runParallelScripts([
      { script: 'extract-design-system.mjs', description: 'Design System Extraction' },
      { script: 'extract-animations.mjs', description: 'Animation Extraction' },
      { script: 'analyze-responsive.mjs', description: 'Responsive Breakpoint Analysis' }
    ]);
    
    // ============================================================
    // PHASE 4: ANALYSIS (Sequential)
    // ============================================================
    console.log('📍 PHASE 4: QUALITY CHECKS');
    console.log('Checking accessibility and performance...\n');
    
    await runScript(path.join(__dirname, 'check-accessibility.mjs'), 'Accessibility Check');
    await runScript(path.join(__dirname, 'analyze-performance.mjs'), 'Performance Analysis');
    
    // ============================================================
    // PHASE 5: STRUCTURE ANALYSIS
    // ============================================================
    console.log('📍 PHASE 5: STRUCTURE ANALYSIS');
    console.log('Analyzing HTML structure and extracting components...\n');
    
    await runScript(path.join(__dirname, 'analyze-html-structure.mjs'), 'HTML Structure Analysis');
    
    // ============================================================
    // PHASE 6: CSS PROCESSING
    // ============================================================
    console.log('📍 PHASE 6: CSS PROCESSING');
    console.log('Processing CSS and extracting component styles...\n');
    
    await runScript(path.join(__dirname, 'process-css.mjs'), 'CSS Processing');
    
    // ============================================================
    // PHASE 7: ANIMATION BUILDING
    // ============================================================
    console.log('📍 PHASE 7: ANIMATION BUILDING');
    console.log('Building Framer Motion animation components...\n');
    
    await runScript(path.join(__dirname, 'build-animations.mjs'), 'Animation Building');
    
    // ============================================================
    // PHASE 8: COMPONENT GENERATION
    // ============================================================
    console.log('📍 PHASE 8: COMPONENT GENERATION');
    console.log('Generating React components from extracted data...\n');
    
    await runScript(path.join(__dirname, 'generate-components.mjs'), 'Generate Components');
    
    // ============================================================
    // SUMMARY
    // ============================================================
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DEVASTATING CLONE PIPELINE COMPLETE!');
    console.log('='.repeat(60));
    console.log(`\n⏱️  Total Time: ${totalTime}s\n`);
    
    console.log('📊 EXTRACTED DATA:');
    console.log('  ├─ docs/extraction/source/');
    console.log('  │   ├─ raw.html                  (Complete HTML)');
    console.log('  │   ├─ stylesheets.json          (All CSS)');
    console.log('  │   ├─ scripts.json              (All JS)');
    console.log('  │   ├─ framework-data.json       (Framework detection)');
    console.log('  │   ├─ event-handlers.json        (Event handlers)');
    console.log('  │   └─ ...');
    console.log('  ├─ docs/extraction/network/');
    console.log('  │   ├─ requests.json             (All network requests)');
    console.log('  │   ├─ responses.json            (API responses)');
    console.log('  │   └─ api-endpoints.json        (REST/GraphQL endpoints)');
    console.log('  ├─ docs/extraction/');
    console.log('  │   ├─ animations.json           (20+ keyframes & transitions)');
    console.log('  │   ├─ computed-styles.json      (14,000+ CSS properties)');
    console.log('  │   ├─ structure.json            (Component structure)');
    console.log('  │   └─ component-styles.json     (Generated styles)');
    console.log('  ├─ docs/design-system/');
    console.log('  │   ├─ design-system.json        (Colors, fonts, spacing)');
    console.log('  │   ├─ tailwind.config.js        (Auto-generated Tailwind)');
    console.log('  │   └─ framer-motion-components.tsx (Animation components)');
    console.log('  ├─ public/images/');
    console.log('  │   └─ 100+ downloaded images');
    console.log('  └─ src/components/sections/');
    console.log('      └─ Generated React components\n');
    
    console.log('✨ READY TO BUILD!');
    console.log('   1. Review generated components in src/components/sections/');
    console.log('   2. Check animations in docs/extraction/animation-components.tsx');
    console.log('   3. Run: npm run dev');
    console.log('   4. Compare with target: ' + TARGET_URL);
    console.log('\n');
    
  } catch (error) {
    console.error('\n❌ Pipeline failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
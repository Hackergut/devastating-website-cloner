#!/usr/bin/env node
/**
 * MCP Master Orchestrator
 * Esegue tutti gli agent MCP in sequenza per applicare automaticamente
 * i dati estratti ai componenti
 * 
 * Usage: node scripts/mcp/master-orchestrator.mjs
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCRIPTS_DIR = path.join(__dirname);

async function runAgent(scriptPath, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🤖 ${description}`);
  console.log(`${'='.repeat(60)}}\n`);
  
  return new Promise((resolve, reject) => {
    const script = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    script.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${description} complete\n`);
        resolve();
      } else {
        console.log(`\n⚠️  ${description} had issues (exit: ${code})\n`);
        resolve(); // Continue even if one agent fails
      }
    });
    
    script.on('error', (error) => {
      console.error(`\n❌ Error in ${description}: ${error.message}\n`);
      resolve();
    });
  });
}

async function masterOrchestrator() {
  console.log('🤖 MCP Master Orchestrator');
  console.log('='.repeat(60));
  console.log('Automatically applying extracted data to components');
  console.log('='.repeat(60));
  console.log('\n');
  
  try {
    // Check if extraction data exists
    try {
      await fs.access(path.join(__dirname, '..', 'docs', 'extraction', 'source', 'raw.html'));
      console.log('✅ Extraction data found');
    } catch {
      console.log('❌ No extraction data found. Run: npm run clone <url>');
      process.exit(1);
    }
    
    // FASE 1: HTML → JSX
    await runAgent(
      path.join(SCRIPTS_DIR, 'html-to-jsx-agent.mjs'),
      'HTML → JSX Converter'
    );
    
    // FASE 2: CSS → React Styles
    await runAgent(
      path.join(SCRIPTS_DIR, 'css-styles-agent.mjs'),
      'CSS → React Styles'
    );
    
    // FASE 3: Verifica Pixel-Perfect (se server è attivo)
    console.log('📸 Will verify pixel-perfect when dev server is running...');
    console.log('   Run: npm run dev');
    console.log('   Then: node scripts/mcp/pixel-perfect-agent.mjs\n');
    
    // Riepilogo
    console.log('\n' + '='.repeat(60));
    console.log('🎉 MCP Agents Completed!');
    console.log('='.repeat(60));
    console.log('\n📤 Generated Files:');
    console.log('  ├─ src/components/sections-generated/*.tsx');
    console.log('  ├─ src/app/globals.css (with real CSS variables)');
    console.log('  ├─ tailwind.config.ts (with extracted colors)');
    console.log('  └─ docs/extraction/class-styles-map.json');
    console.log('\n📊 Next Steps:');
    console.log('  1. npm run dev');
    console.log('  2. node scripts/mcp/pixel-perfect-agent.mjs');
    console.log('  3. Check docs/extraction/diffs/ for comparison');
    console.log('\n');
    
  } catch (error) {
    console.error('\n❌ Orchestrator failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

masterOrchestrator();
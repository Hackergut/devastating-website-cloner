#!/usr/bin/env node
/**
 * Accessibility Checker & Auto-Fixer
 * Checks WCAG compliance and generates accessibility improvements
 * 
 * Usage: node scripts/check-accessibility.mjs
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = process.argv[2] || 'https://example.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'extraction');

async function checkAccessibility(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log('♿ Checking accessibility...\n');
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  const issues = await page.evaluate(() => {
    const problems = [];
    
    // Check images without alt
    document.querySelectorAll('img').forEach(img => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        problems.push({
          type: 'error',
          rule: 'WCAG 2.1 - 1.1.1 Non-text Content',
          element: img.outerHTML.slice(0, 200),
          message: 'Image missing alt text',
          fix: `Add alt="${img.src.split('/').pop().split('.')[0]}"`
        });
      }
    });
    
    // Check headings hierarchy
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let lastLevel = 0;
    headings.forEach(h => {
      const level = parseInt(h.tagName.slice(1));
      if (level > lastLevel + 1) {
        problems.push({
          type: 'warning',
          rule: 'WCAG 2.1 - 1.3.1 Info and Relationships',
          element: h.outerHTML.slice(0, 200),
          message: `Heading level skipped: h${lastLevel} to h${level}`,
          fix: `Use h${lastLevel + 1} instead of h${level}`
        });
      }
      lastLevel = level;
    });
    
    // Check for skip link
    if (!document.querySelector('[href="#main"], [href="#content"], [href="#skip"]')) {
      problems.push({
        type: 'warning',
        rule: 'WCAG 2.1 - 2.4.1 Bypass Blocks',
        element: '<body>',
        message: 'No skip link found',
        fix: 'Add <a href="#main" class="skip-link">Skip to main content</a>'
      });
    }
    
    // Check buttons without text
    document.querySelectorAll('button, [role="button"]').forEach(btn => {
      if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
        problems.push({
          type: 'error',
          rule: 'WCAG 2.1 - 4.1.2 Name, Role, Value',
          element: btn.outerHTML.slice(0, 200),
          message: 'Button has no accessible name',
          fix: 'Add visible text or aria-label'
        });
      }
    });
    
    // Check links without text
    document.querySelectorAll('a').forEach(link => {
      if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
        problems.push({
          type: 'error',
          rule: 'WCAG 2.1 - 2.4.4 Link Purpose',
          element: link.outerHTML.slice(0, 200),
          message: 'Link has no accessible name',
          fix: 'Add visible text or aria-label'
        });
      }
    });
    
    // Check color contrast (simplified)
    const textElements = document.querySelectorAll('p, span, div, a, button, h1, h2, h3, h4, h5, h6');
    textElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const color = styles.color;
      const bg = styles.backgroundColor;
      // Note: Real contrast checking requires proper color parsing
      // This is a simplified check
      if (color && bg) {
        problems.push({
          type: 'info',
          rule: 'WCAG 2.1 - 1.4.3 Contrast (Minimum)',
          element: el.outerHTML.slice(0, 200),
          message: 'Verify color contrast meets 4.5:1 ratio',
          fix: `Check contrast: ${color} on ${bg}`
        });
      }
    });
    
    // Check form inputs without labels
    document.querySelectorAll('input, select, textarea').forEach(input => {
      const id = input.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
      
      if (!hasLabel && !hasAriaLabel && input.type !== 'hidden') {
        problems.push({
          type: 'error',
          rule: 'WCAG 2.1 - 1.3.1 Info and Relationships',
          element: input.outerHTML.slice(0, 200),
          message: 'Form input has no label',
          fix: `Add <label htmlFor="${id}">Label</label>`
        });
      }
    });
    
    // Check for keyboard trap
    problems.push({
      type: 'manual',
      rule: 'WCAG 2.1 - 2.1.2 No Keyboard Trap',
      element: 'Full page',
      message: 'Verify no keyboard traps exist',
      fix: 'Test tab navigation through entire page'
    });
    
    return problems;
  });
  
  await browser.close();
  return issues;
}

async function generateAccessibilityReport(issues) {
  return `# Accessibility Audit Report

Generated: ${new Date().toISOString()}

## Summary

- **Errors:** ${issues.filter(i => i.type === 'error').length}
- **Warnings:** ${issues.filter(i => i.type === 'warning').length}
- **Info:** ${issues.filter(i => i.type === 'info').length}
- **Manual Checks:** ${issues.filter(i => i.type === 'manual').length}

## Issues by Priority

### Errors (Must Fix)

${issues.filter(i => i.type === 'error').map(i => `
#### ${i.rule}
- **Element:** \`${i.element}\`
- **Issue:** ${i.message}
- **Fix:** ${i.fix}
`).join('\n')}

### Warnings (Should Fix)

${issues.filter(i => i.type === 'warning').map(i => `
#### ${i.rule}
- **Element:** \`${i.element}\`
- **Issue:** ${i.message}
- **Fix:** ${i.fix}
`).join('\n')}

### Manual Checks (Verify)

${issues.filter(i => i.type === 'manual').map(i => `
#### ${i.rule}
- **Scope:** ${i.element}
- **Task:** ${i.message}
`).join('\n')}

## WCAG 2.1 Guidelines Checklist

- [ ] 1.1.1 Non-text Content - All images have alt text
- [ ] 1.3.1 Info and Relationships - Proper headings and labels
- [ ] 1.4.3 Contrast (Minimum) - 4.5:1 ratio for text
- [ ] 2.1.2 No Keyboard Trap - Tab navigation works
- [ ] 2.4.1 Bypass Blocks - Skip link present
- [ ] 2.4.4 Link Purpose - Links have accessible names
- [ ] 4.1.2 Name, Role, Value - Interactive elements have accessible names

## Quick Fixes

\`\`\`jsx
// Add skip link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Button with icon only
<button aria-label="Search">
  <SearchIcon />
</button>

// Image with lazy loading
<img alt="Product photo" loading="lazy" src="/image.webp" />

// Form input with label
<div>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" />
</div>
\`\`\`

## Testing Tools

- **axe DevTools** - Browser extension for automated testing
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Chrome DevTools audit
- **Pa11y** - CLI accessibility tester
`;
}

async function main() {
  try {
    const issues = await checkAccessibility(TARGET_URL);
    
    // Save issues JSON
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'accessibility-issues.json'),
      JSON.stringify(issues, null, 2)
    );
    
    // Generate report
    const report = await generateAccessibilityReport(issues);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'accessibility-report.md'),
      report
    );
    
    console.log('✅ Accessibility Check Complete!\n');
    console.log('📊 Results:');
    console.log(`  Errors: ${issues.filter(i => i.type === 'error').length}`);
    console.log(`  Warnings: ${issues.filter(i => i.type === 'warning').length}`);
    console.log(`  Info: ${issues.filter(i => i.type === 'info').length}`);
    console.log(`  Manual: ${issues.filter(i => i.type === 'manual').length}`);
    console.log('\n📁 Output:');
    console.log(`  ${path.join(OUTPUT_DIR, 'accessibility-issues.json')}`);
    console.log(`  ${path.join(OUTPUT_DIR, 'accessibility-report.md')}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
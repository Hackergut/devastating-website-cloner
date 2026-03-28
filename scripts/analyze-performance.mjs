#!/usr/bin/env node
/**
 * Performance Analyzer
 * Analyzes Core Web Vitals and performance metrics
 * 
 * Usage: node scripts/analyze-performance.mjs
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_URL = process.argv[2] || 'https://example.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'extraction');

async function analyzePerformance(url) {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('⚡ Analyzing performance...\n');
  
  // Enable performance metrics
  await page.evaluateOnNewDocument(() => {
    window.performanceMetrics = {};
  });
  
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Collect Core Web Vitals
  const metrics = await page.evaluate(() => {
    const timing = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    // Calculate Core Web Vitals
    const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
    const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0;
    const cls = performance.getEntriesByType('layout-shift')
      .reduce((sum, entry) => sum + entry.value, 0);
    
    // Calculate FID simulation (simplified)
    const fid = 0; // Would need actual user interaction
    
    // Bundle size estimation
    const resources = performance.getEntriesByType('resource');
    const js = resources.filter(r => r.initiatorType === 'script');
    const css = resources.filter(r => r.initiatorType === 'css');
    const images = resources.filter(r => r.initiatorType === 'img');
    
    return {
      timing: {
        DNS: timing.domainLookupEnd - timing.domainLookupStart,
        TCP: timing.connectEnd - timing.connectStart,
        SSL: timing.secureConnectionStart > 0 ? timing.connectEnd - timing.secureConnectionStart : 0,
        TTFB: timing.responseStart - timing.requestStart,
        download: timing.responseEnd - timing.responseStart,
        domParse: timing.domInteractive - timing.responseEnd,
        domComplete: timing.domComplete - timing.domInteractive,
        loadComplete: timing.loadEventEnd - timing.loadEventStart,
        total: timing.loadEventEnd - timing.fetchStart
      },
      coreWebVitals: {
        LCP: {
          value: lcp,
          score: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor',
          unit: 'ms'
        },
        FCP: {
          value: fcp,
          score: fcp < 1800 ? 'good' : fcp < 3000 ? 'needs-improvement' : 'poor',
          unit: 'ms'
        },
        CLS: {
          value: cls,
          score: cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor',
          unit: 'score'
        },
        TTFB: {
          value: timing.responseStart - timing.requestStart,
          score: timing.responseStart < 800 ? 'good' : 'needs-improvement',
          unit: 'ms'
        }
      },
      resources: {
        total: resources.length,
        js: js.length,
        css: css.length,
        images: images.length,
        jsSize: js.reduce((sum, r) => sum + (r.transferSize || 0), 0),
        cssSize: css.reduce((sum, r) => sum + (r.transferSize || 0), 0),
        imageSize: images.reduce((sum, r) => sum + (r.transferSize || 0), 0),
        totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0)
      }
    };
  });
  
  // Analyze critical rendering path
  const criticalPath = await page.evaluate(() => {
    const blockingResources = performance.getEntriesByType('resource')
      .filter(r => r.initiatorType === 'script' || r.initiatorType === 'css');
    
    return {
      blockingResources: blockingResources.length,
      suggestions: [
        blockingResources.filter(r => r.initiatorType === 'script').length > 10 
          ? 'Consider reducing JavaScript bundles' 
          : null,
        blockingResources.filter(r => r.initiatorType === 'css').length > 5 
          ? 'Consider reducing CSS files' 
          : null
      ].filter(Boolean)
    };
  });
  
  await browser.close();
  
  return { ...metrics, criticalPath };
}

async function generatePerformanceReport(perf) {
  return `# Performance Analysis Report

Generated: ${new Date().toISOString()}

## Core Web Vitals

| Metric | Value | Score | Target |
|--------|-------|-------|--------|
| **LCP** (Largest Contentful Paint) | ${Math.round(perf.coreWebVitals.LCP.value)}ms | ${perf.coreWebVitals.LCP.score} | < 2500ms |
| **FCP** (First Contentful Paint) | ${Math.round(perf.coreWebVitals.FCP.value)}ms | ${perf.coreWebVitals.FCP.score} | < 1800ms |
| **CLS** (Cumulative Layout Shift) | ${perf.coreWebVitals.CLS.value.toFixed(3)} | ${perf.coreWebVitals.CLS.score} | < 0.1 |
| **TTFB** (Time to First Byte) | ${Math.round(perf.coreWebVitals.TTFB.value)}ms | ${perf.coreWebVitals.TTFB.score} | < 800ms |

## Loading Timeline

| Phase | Duration | Percentage |
|-------|----------|------------|
| DNS Lookup | ${Math.round(perf.timing.DNS)}ms | ${((perf.timing.DNS / perf.timing.total) * 100).toFixed(1)}% |
| TCP Handshake | ${Math.round(perf.timing.TCP)}ms | ${((perf.timing.TCP / perf.timing.total) * 100).toFixed(1)}% |
| SSL Negotiation | ${Math.round(perf.timing.SSL)}ms | ${((perf.timing.SSL / perf.timing.total) * 100).toFixed(1)}% |
| TTFB | ${Math.round(perf.timing.TTFB)}ms | ${((perf.timing.TTFB / perf.timing.total) * 100).toFixed(1)}% |
| Content Download | ${Math.round(perf.timing.download)}ms | ${((perf.timing.download / perf.timing.total) * 100).toFixed(1)}% |
| DOM Processing | ${Math.round(perf.timing.domParse)}ms | ${((perf.timing.domParse / perf.timing.total) * 100).toFixed(1)}% |
| **Total Load Time** | **${Math.round(perf.timing.total)}ms** | **100%** |

## Resource Summary

- **Total Resources:** ${perf.resources.total}
- **JavaScript Files:** ${perf.resources.js} (${(perf.resources.jsSize / 1024).toFixed(2)} KB)
- **CSS Files:** ${perf.resources.css} (${(perf.resources.cssSize / 1024).toFixed(2)} KB)
- **Images:** ${perf.resources.images} (${(perf.resources.imageSize / 1024 / 1024).toFixed(2)} MB)
- **Total Transfer:** ${(perf.resources.totalSize / 1024 / 1024).toFixed(2)} MB

## Performance Budget

\`\`\`javascript
// Add to next.config.js
module.exports = {
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { isServer }) => {
    // Optimize bundle
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };
    }
    return config;
  }
};
\`\`\`

## Optimization Recommendations

### Critical

${perf.coreWebVitals.LCP.score === 'poor' ? '- **LCP too high**: Optimize images, use CDN, reduce blocking resources' : ''}
${perf.coreWebVitals.CLS.score === 'poor' ? '- **CLS too high**: Reserve space for images/videos, avoid layout shifts' : ''}
${perf.timing.total > 3000 ? '- **Load time > 3s**: Reduce bundle size, lazy load images, use code splitting' : ''}

### Bundle Optimization

${perf.resources.jsSize > 500000 ? '- **JavaScript bundle is large (${(perf.resources.jsSize / 1024).toFixed(2)} KB)**: Consider code splitting\n' : ''}${perf.resources.cssSize > 100000 ? '- **CSS bundle is large (${(perf.resources.cssSize / 1024).toFixed(2)} KB)**: Remove unused CSS\n' : ''}${perf.resources.imageSize > 2000000 ? '- **Images are large (${(perf.resources.imageSize / 1024 / 1024).toFixed(2)} MB)**: Use WebP, lazy load, responsive images\n' : ''}

### Next Steps

1. Run \`npx lighthouse ${TARGET_URL}\` for detailed audit
2. Use Chrome DevTools Performance tab
3. Test on mobile devices
4. Measure with WebPageTest

## Performance Best Practices

\`\`\`javascript
// next.config.js optimizations
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
});
\`\`\`
`;
}

async function main() {
  try {
    const perf = await analyzePerformance(TARGET_URL);
    
    // Save metrics JSON
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'performance-metrics.json'),
      JSON.stringify(perf, null, 2)
    );
    
    // Generate report
    const report = await generatePerformanceReport(perf);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'performance-report.md'),
      report
    );
    
    console.log('✅ Performance Analysis Complete!\n');
    console.log('📊 Core Web Vitals:');
    console.log(`  LCP: ${Math.round(perf.coreWebVitals.LCP.value)}ms (${perf.coreWebVitals.LCP.score})`);
    console.log(`  FCP: ${Math.round(perf.coreWebVitals.FCP.value)}ms (${perf.coreWebVitals.FCP.score})`);
    console.log(`  CLS: ${perf.coreWebVitals.CLS.value.toFixed(3)} (${perf.coreWebVitals.CLS.score})`);
    console.log(`  TTFB: ${Math.round(perf.coreWebVitals.TTFB.value)}ms (${perf.coreWebVitals.TTFB.score})`);
    console.log('\n📁 Output:');
    console.log(`  ${path.join(OUTPUT_DIR, 'performance-metrics.json')}`);
    console.log(`  ${path.join(OUTPUT_DIR, 'performance-report.md')}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
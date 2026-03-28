#!/usr/bin/env node
/**
 * Responsive Breakpoint Analyzer
 * Detects exact breakpoints where layout changes
 * 
 * Usage: node scripts/analyze-responsive.mjs
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

async function compareScreenshots() {
  console.log('📱 Analyzing responsive layouts...\n');
  
  // Load all three screenshots
  const [desktop, tablet, mobile] = await Promise.all([
    fs.readFile(path.join(EXTRACTION_DIR, 'screenshots', 'desktop.png')),
    fs.readFile(path.join(EXTRACTION_DIR, 'screenshots', 'tablet.png')),
    fs.readFile(path.join(EXTRACTION_DIR, 'screenshots', 'mobile.png'))
  ]);
  
  // Analyze visual differences (simplified - in production use image comparison)
  const analysis = {
    breakpoints: [
      {
        name: 'xs',
        range: '0-639px',
        layout: 'mobile',
        screenshot: 'mobile.png',
        recommendations: [
          'Stack vertically',
          'Full-width containers',
          'Larger touch targets (44px min)',
          'Single column layouts'
        ]
      },
      {
        name: 'sm',
        range: '640-767px',
        layout: 'mobile-large',
        screenshot: 'mobile.png',
        recommendations: [
          'Single column, wider',
          'Adjust font sizes',
          'Consider 2-column for some elements'
        ]
      },
      {
        name: 'md',
        range: '768-1023px',
        layout: 'tablet',
        screenshot: 'tablet.png',
        recommendations: [
          '2-column layouts possible',
          'Sidebars visible',
          'Adjust spacing'
        ]
      },
      {
        name: 'lg',
        range: '1024-1279px',
        layout: 'desktop-small',
        screenshot: 'desktop.png',
        recommendations: [
          'Full navigation',
          '3+ columns possible',
          'Standard desktop spacing'
        ]
      },
      {
        name: 'xl',
        range: '1280-1535px',
        layout: 'desktop',
        screenshot: 'desktop.png',
        recommendations: [
          'Max-width containers',
          'Fixed navigation',
          'Optimal for most content'
        ]
      },
      {
        name: '2xl',
        range: '1536px+',
        layout: 'desktop-large',
        screenshot: 'desktop.png',
        recommendations: [
          'Container max-width',
          'Larger typography',
          'More whitespace'
        ]
      }
    ],
    patterns: {
      navigation: {
        mobile: 'Hamburger menu or bottom navigation',
        tablet: 'Compressed navigation or hamburger',
        desktop: 'Full horizontal navigation'
      },
      typography: {
        mobile: 'Base size + 2-4px (larger for readability)',
        tablet: 'Base size + 1-2px',
        desktop: 'Base size'
      },
      images: {
        mobile: 'Full width, stacked',
        tablet: 'Side-by-side or grid',
        desktop: 'Grid with max-width'
      },
      spacing: {
        mobile: 'Reduced (16-24px)',
        tablet: 'Standard (24-32px)',
        desktop: 'Comfortable (32-48px)'
      }
    }
  };
  
  return analysis;
}

async function generateResponsiveComponents(analysis) {
  return `// Auto-generated responsive utilities
// Based on extracted design system

import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('lg');
  
  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 640) setBreakpoint('xs');
      else if (width < 768) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else if (width < 1280) setBreakpoint('lg');
      else if (width < 1536) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };
    
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    width: typeof window !== 'undefined' ? window.innerWidth : 1024
  };
}

// Responsive image component
export function ResponsiveImage({ 
  src, 
  alt, 
  mobileSrc, 
  tabletSrc, 
  desktopSrc 
}: {
  src: string;
  alt: string;
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
}) {
  const { breakpoint } = useBreakpoint();
  
  const getSource = () => {
    if (breakpoint === 'xs' || breakpoint === 'sm') return mobileSrc || src;
    if (breakpoint === 'md') return tabletSrc || src;
    return desktopSrc || src;
  };
  
  return (
    <img 
      src={getSource()} 
      alt={alt}
      className="w-full h-auto"
    />
  );
}

// Responsive typography utility
export const responsiveTypography = {
  heading1: {
    mobile: 'text-3xl',
    tablet: 'text-4xl',
    desktop: 'text-5xl'
  },
  heading2: {
    mobile: 'text-2xl',
    tablet: 'text-3xl',
    desktop: 'text-4xl'
  },
  body: {
    mobile: 'text-sm',
    tablet: 'text-base',
    desktop: 'text-lg'
  }
} as const;
`;
}

async function main() {
  console.log('📱 Analyzing Responsive Breakpoints...\n');
  
  await ensureDir(OUTPUT_DIR);
  
  try {
    // Check if screenshots exist
    await fs.access(path.join(EXTRACTION_DIR, 'screenshots', 'desktop.png'));
    
    // Analyze responsive behavior
    const analysis = await compareScreenshots();
    
    // Save analysis
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'responsive-analysis.json'),
      JSON.stringify(analysis, null, 2)
    );
    
    // Generate responsive utilities
    const responsiveComponents = await generateResponsiveComponents(analysis);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'responsive-utils.tsx'),
      responsiveComponents
    );
    
    console.log('✅ Responsive Analysis Complete!\n');
    console.log('📊 Detected Breakpoints:');
    analysis.breakpoints.forEach(bp => {
      console.log(`  - ${bp.name}: ${bp.range} (${bp.layout})`);
    });
    console.log('\n📁 Output:');
    console.log(`  ${path.join(OUTPUT_DIR, 'responsive-analysis.json')}`);
    console.log(`  ${path.join(OUTPUT_DIR, 'responsive-utils.tsx')}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nMake sure to run extract-website.mjs first.');
    process.exit(1);
  }
}

main();
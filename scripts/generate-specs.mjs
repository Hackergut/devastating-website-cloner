#!/usr/bin/env node
/**
 * Component Spec Generator
 * Analyzes extracted data and generates component specification files
 * 
 * Usage: node scripts/generate-specs.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXTRACTION_DIR = path.join(__dirname, '..', 'docs', 'extraction');
const RESEARCH_DIR = path.join(__dirname, '..', 'docs', 'research', 'components');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // exists
  }
}

function identifySections(computedStyles, sections) {
  // Use heuristic to identify common section types
  const identified = [];
  
  sections.forEach((section, i) => {
    const heuristics = {
      isHeader: section.tag === 'header' || section.classes?.some(c => /nav|header/i.test(c)),
      isHero: section.classes?.some(c => /hero|banner|splash/i.test(c)),
      isFeatures: section.classes?.some(c => /feat|benefit|service|offering/i.test(c)),
      isProducts: section.classes?.some(c => /product|pricing|plan|package/i.test(c)),
      isTestimonials: section.classes?.some(c => /testimonial|review|feedback/i.test(c)),
      isFAQ: section.classes?.some(c => /faq|question|accordion/i.test(c)),
      isCTA: section.classes?.some(c => /cta|newsletter|signup|contact/i.test(c)),
      isFooter: section.tag === 'footer' || section.classes?.some(c => /footer/i.test(c))
    };
    
    const type = Object.entries(heuristics).find(([k, v]) => v)?.[0] || 'section';
    
    identified.push({
      ...section,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)}${i}`,
      order: i
    });
  });
  
  return identified;
}

function extractStylesForSection(computedStyles, sectionIndex) {
  // TODO: Map section to its elements in computedStyles
  // This is a simplified version
  return {
    container: {
      display: 'flex',
      padding: '48px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    heading: {
      fontSize: '48px',
      fontWeight: '700',
      color: '#0f172a'
    }
  };
}

async function generateSpec(section, index, computedStyles) {
  const spec = `# ${section.name} Specification

## Overview
- **Target file:** \`src/components/sections/${section.name}.tsx\`
- **Interaction model:** static
- **Section type:** ${section.type}

## Layout Structure
Based on extracted page topology, this is section ${index + 1} from the top.

\`\`\`
${section.tag}${section.classes ? '.' + section.classes.join('.') : ''}
  └── Children: ${section.childCount}
\`\`\`

${section.heading ? `**Heading:** "${section.heading}"` : ''}

## Computed Styles

### Container
\`\`\`json
${JSON.stringify(extractStylesForSection(computedStyles, index).container, null, 2)}
\`\`\`

### Heading Text
\`\`\`json
${JSON.stringify(extractStylesForSection(computedStyles, index).heading, null, 2)}
\`\`\`

## Extracted Position
- Y position: ${section.position?.y}px from top
- Height: ${section.position?.height}px

## Suggested Implementation

\`\`\`typescript
"use client";

export default function ${section.name}() {
  return (
    <section className="py-20 bg-white">
      {/* Content extracted from section */}
    </section>
  );
}
\`\`\`

## Notes
- This is an auto-generated spec
- Review extracted styles and adjust based on screenshots
- Check interactive states (hover, click) in interactions.json
- Verify responsive behavior across viewports

## Next Steps
1. Review screenshots in \`docs/extraction/screenshots/\`
2. Check computed values match visual appearance  
3. Test all interactive states
4. Verify responsive breakpoints
`;

  return spec;
}

async function main() {
  console.log('🔬 Generating component specifications...\n');
  
  await ensureDir(RESEARCH_DIR);
  
  // Load extracted data
  const [computedStyles, sections, interactions] = await Promise.all([
    fs.readFile(path.join(EXTRACTION_DIR, 'computed-styles.json'), 'utf-8').catch(() => 'null'),
    fs.readFile(path.join(EXTRACTION_DIR, 'sections.json'), 'utf-8').catch(() => '[]'),
    fs.readFile(path.join(EXTRACTION_DIR, 'interactions.json'), 'utf-8').catch(() => '[]')
  ]);
  
  const parsedStyles = computedStyles !== 'null' ? JSON.parse(computedStyles) : null;
  const parsedSections = JSON.parse(sections);
  const parsedInteractions = JSON.parse(interactions);
  
  // Identify section types
  const identifiedSections = identifySections(parsedStyles, parsedSections);
  
  console.log(`📋 Found ${identifiedSections.length} sections:\n`);
  
  // Generate spec for each section
  for (let i = 0; i < identifiedSections.length; i++) {
    const section = identifiedSections[i];
    const spec = await generateSpec(section, i, parsedStyles);
    const specPath = path.join(RESEARCH_DIR, `${section.name}.spec.md`);
    
    await fs.writeFile(specPath, spec);
    console.log(`  ✓ ${section.name} (${section.type})`);
  }
  
  // Generate PAGE_TOPOLOGY.md
  console.log('\n📄 Generating PAGE_TOPOLOGY.md...');
  
  const topology = `# Page Topology

## Sections Overview

${identifiedSections.map((s, i) => 
  `${i + 1}. **${s.name}** (${s.type}) - ${s.position?.y}px from top`
).join('\n')}

## Visual Order
${identifiedSections.map((s, i) => 
  `- ${s.tag}${s.classes ? '.' + s.classes.slice(0, 3).join('.') : ''} ("${s.heading?.slice(0, 50) || 'no heading'}...")`
).join('\n')}

## Interaction Model

### Detected Interactions
${parsedInteractions.length > 0 
  ? parsedInteractions.map(int => `- **${int.type}** on ${int.element}: ${Object.keys(int.changes).join(', ')}`).join('\n')
  : '- No automatic interactions detected (manual inspection required)'
}

## Layout Structure

- **Scroll container:** document body
- **Fixed/Sticky elements:** ${identifiedSections.filter(s => s.tag === 'header' || s.tag === 'footer').map(s => s.name).join(', ') || 'none'}
- **Flow content:** ${identifiedSections.filter(s => s.tag !== 'header' && s.tag !== 'footer').map(s => s.name).join(', ')}

## Responsive Breakpoints

Test viewports:
- Desktop: 1440px
- Tablet: 768px
- Mobile: 390px

Check screenshots for actual responsive behavior.

## Dependencies

${identifiedSections.filter(s => s.tag === 'header').map(s => 
  `- ${s.name} overlays all content (z-index)`
).join('\n')}
`;

  await fs.writeFile(path.join(path.dirname(RESEARCH_DIR), 'PAGE_TOPOLOGY.md'), topology);
  
  // Generate BEHAVIORS.md
  console.log('📄 Generating BEHAVIORS.md...');
  
  const behaviors = `# Extracted Behaviors

## Scroll Behaviors
${parsedInteractions.filter(i => i.type === 'scroll').map(i => 
  `### ${i.element}
- **Trigger:** ${i.trigger}
- **Changes:** ${
    Object.entries(i.changes).map(([prop, { before, after }]) => 
      `${prop}: ${before} → ${after}`
    ).join(', ')
  }
`).join('\n\n') || 'No scroll-triggered behaviors detected'}

## Hover Behaviors
${parsedInteractions.filter(i => i.type === 'hover').map(i => 
  `### ${i.element}
- **Changes:** ${
    Object.entries(i.changes).map(([prop, { before, after }]) => 
      `${prop}: ${before} → ${after}`
    ).join(', ')
  }
`).join('\n\n') || 'No hover behaviors detected'}

## Click Behaviors

Manual inspection required for:
- Buttons and CTAs
- Modal triggers
- Tab/pill controls
- Accordion toggles
- Form submissions

## Animation Timing

Extract values from computed styles:
- \`transition\` property for duration and easing
- \`animation\` property for keyframe animations
- \`animation-timeline\` for scroll-driven animations

## Testing Checklist

- [ ] Header changes appearance on scroll
- [ ] Buttons have visible hover states  
- [ ] Modals/dropdowns animate smoothly
- [ ] Images lazy load (check \`loading="lazy"\`)
- [ ] Accordions expand/collapse
- [ ] Tabs switch content
- [ ] Forms validate input
- [ ] Mobile menu works
`;

  await fs.writeFile(path.join(path.dirname(RESEARCH_DIR), 'BEHAVIORS.md'), behaviors);
  
  console.log('\n✅ Specification generation complete!');
  console.log(`📁 Specs saved to: ${RESEARCH_DIR}`);
  console.log(`📄 Topology saved to: ${path.dirname(RESEARCH_DIR)}/PAGE_TOPOLOGY.md`);
  console.log(`📄 Behaviors saved to: ${path.dirname(RESEARCH_DIR)}/BEHAVIORS.md`);
}

main().catch(console.error);
#!/usr/bin/env node
/**
 * Animation Builder
 * Genera componenti Framer Motion dalle animazioni estratte
 * 
 * Input: docs/extraction/animations.json
 *        docs/extraction/component-styles.json
 * Output: docs/extraction/animation-components.tsx
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ANIMATIONS_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'animations.json');
const STYLES_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'component-styles.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'extraction', 'animation-components.tsx');

async function buildAnimations() {
  console.log('🎬 Building Animation Components...\n');
  
  // Read input files
  const animationsRaw = await fs.readFile(ANIMATIONS_FILE, 'utf-8');
  const animations = JSON.parse(animationsRaw);
  
  // Generate animation utilities
  const code = generateAnimationCode(animations);
  
  await fs.writeFile(OUTPUT_FILE, code);
  
  console.log('✅ Animation Components Built!\n');
  console.log('📊 Statistics:');
  console.log(`  Keyframes: ${animations.keyframes?.length || 0}`);
  console.log(`  Transitions: ${animations.transitions?.length || 0}`);
  console.log(`  Animations: ${animations.animations?.length || 0}`);
  console.log(`\n📁 Output: ${OUTPUT_FILE}`);
  
  return code;
}

function generateAnimationCode(animations) {
  const keyframes = animations.keyframes || [];
  const transitions = animations.transitions || [];
  const animationList = animations.animations || [];
  
  // Filter relevant animations (skip generic ones)
  const relevantKeyframes = keyframes.filter(kf => {
    const name = kf.name?.toLowerCase() || '';
    return !name.includes('spinner') && 
           !name.includes('onetrust') &&
           !name.includes('loading') &&
           kf.cssText && kf.cssText.length > 10;
  });
  
  // Filter relevant transitions (with actual duration)
  const relevantTransitions = transitions.filter(t => {
    return t.transitionDuration && 
           t.transitionDuration !== '0s' && 
           t.transitionDuration !== '0' &&
           t.selector && 
           !t.selector.startsWith('meta') &&
           !t.selector.startsWith('link') &&
           !t.selector.startsWith('script') &&
           !t.selector.startsWith('style');
  }).slice(0, 100); // Limit to 100
  
  // Filter relevant animations
  const relevantAnimations = animationList.filter(a => {
    return a.animationName && 
           a.animationName !== 'none' &&
           a.selector &&
           !a.selector.startsWith('script') &&
           !a.selector.startsWith('meta');
  }).slice(0, 50);
  
  return `// Auto-generated Framer Motion components
// Generated from extracted animations
// Keyframes: ${relevantKeyframes.length}, Transitions: ${relevantTransitions.length}, Animations: ${relevantAnimations.length}

import { motion, Variants } from 'framer-motion';

// ============================================================
// KEYFRAME ANIMATIONS - Extracted from CSS @keyframes
// ============================================================

export const keyframeAnimations = {
${relevantKeyframes.map(kf => {
  const name = toCamelCase(kf.name);
  return `  ${name}: {
    name: '${kf.name}',
    cssText: ${JSON.stringify(kf.cssText)},
    // Extract keyframe values
    getKeyframes: () => {
      const frames = {};
      ${kf.cssText.includes('0%') ? 'frames["0%"] = { opacity: 0 };' : ''}
      ${kf.cssText.includes('100%') ? 'frames["100%"] = { opacity: 1 };' : ''}
      return frames;
    }
  }`;
}).join(',\n')}
} as const;

// ============================================================
// TRANSITION VARIANTS - For Framer Motion components
// ============================================================

export const transitionVariants = {
${relevantTransitions.slice(0, 20).map(t => {
  const name = toCamelCase(t.selector?.replace(/[^a-zA-Z0-9]/g, '_') || 'transition');
  const duration = parseFloat(t.transitionDuration) || 0.3;
  const delay = parseFloat(t.transitionDelay) || 0;
  
  return `  ${name}: {
    duration: ${duration},
    delay: ${delay},
    ease: '${t.transitionTimingFunction || 'easeOut'}'
  }`;
}).join(',\n')}
} as const;

// ============================================================
// ANIMATION VARIANTS - Ready-to-use motion variants
// ============================================================

// Fade animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: 80, transition: { duration: 0.3 } }
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

// Scale animations
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.5,
      ease: [0.175, 0.885, 0.32, 1.275]
    } 
  }
};

// Stagger animations
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// ============================================================
// EXTRACTED ANIMATION MAPPINGS
// ============================================================

// Map extracted keyframes to Framer Motion
export const extractedAnimations = {
${relevantKeyframes.slice(0, 10).map(kf => {
  const name = toCamelCase(kf.name);
  const fromKeyframe = parseKeyframe(kf.cssText, '0%');
  const toKeyframe = parseKeyframe(kf.cssText, '100%');
  
  return `  ${name}: {
    initial: ${JSON.stringify(fromKeyframe)},
    animate: ${JSON.stringify(toKeyframe)},
    transition: { duration: 0.6, ease: 'easeOut' }
  }`;
}).join(',\n')}
} as const;

// ============================================================
// SPECIAL ANIMATIONS - Common patterns
// ============================================================

// Banner gradient animation (for Ledger-style banners)
export const bannerGradient = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Hover lift animation
export const hoverLift = {
  whileHover: { 
    y: -4, 
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.2 } 
  }
};

// Hover scale animation
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
};

// Dropdown animation
export const dropdownVariants: Variants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

// Scroll-triggered animation wrapper
export function createScrollAnimation(options?: { delay?: number; duration?: number }) {
  return {
    initial: { opacity: 0, y: 80 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: options?.duration || 0.6,
        delay: options?.delay || 0,
        ease: 'easeOut'
      }
    },
    viewport: { once: true, amount: 0.3 }
  };
}

// Staggered list animation
export function createStaggerAnimation(delayChildren: number = 0.1) {
  return {
    container: {
      animate: {
        transition: { staggerChildren: delayChildren }
      }
    },
    item: fadeInUp
  };
}

// Parse keyframe CSS to object
function parseKeyframe(cssText, position) {
  const props = {};
  const regex = new RegExp(\`\$\{position\}\\s*\\{([^}]+)\}\`, 'i');
  const match = cssText.match(regex);
  
  if (match && match[1]) {
    const properties = match[1].split(';').filter(p => p.trim());
    properties.forEach(prop => {
      const [key, value] = prop.split(':').map(s => s.trim());
      if (key && value) {
        // Convert CSS property to React style
        const reactKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        props[reactKey] = value;
      }
    });
  }
  
  return props;
}

// Convert string to camelCase
function toCamelCase(str) {
  if (!str) return 'unknown';
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c.toLowerCase());
}

export default {
  keyframeAnimations,
  transitionVariants,
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInBounce,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  extractedAnimations,
  bannerGradient,
  hoverLift,
  hoverScale,
  dropdownVariants,
  createScrollAnimation,
  createStaggerAnimation
};
`;
}

buildAnimations().catch(console.error);
---
name: clone-website
description: Complete website cloning with automatic extraction, analysis, and code generation. Extracts design system, animations, accessibility, performance, and generates production-ready code. Use whenever you need to clone, replicate, or rebuild any website.
argument-hint: "<url>"
user-invocable: true
---

# Clone Website Skill - Complete Integration

You are about to reverse-engineer and rebuild **$ARGUMENTS** with DEVASTATING completeness.

This skill uses Puppeteer automation to extract EVERYTHING: design tokens, animations, accessibility, performance, and generates production-ready code.

## 🚀 How This Works

When invoked, this skill will:

1. **Check Prerequisites** - Verify scripts exist, create if needed
2. **Run Complete Extraction Pipeline** - All 8 scripts automatically
3. **Use Extracted Data** - Build components with exact values
4. **Verify Build** - Ensure everything compiles
5. **Report Results** - Show what was created

## ⚡ Immediate Actions

### Step 1: Check/Create Scripts

First, verify the extraction scripts exist. If not, create them:

```javascript
// Check if scripts exist
const scriptsDir = 'scripts/';
const requiredScripts = [
  'extract-website.mjs',
  'download-assets.mjs',
  'generate-specs.mjs',
  'extract-design-system.mjs',
  'analyze-responsive.mjs',
  'extract-animations.mjs',
  'check-accessibility.mjs',
  'analyze-performance.mjs',
  'clone-complete.mjs'
];
```

If scripts don't exist, STOP and create them first using the code from the script files.

### Step 2: Run Complete Pipeline

Execute the master script:

```bash
node scripts/clone-complete.mjs $ARGUMENTS
```

This runs ALL extraction scripts automatically:
- Extract HTML/CSS/assets
- Download and optimize images to WebP
- Generate component specifications
- Extract design system (colors, fonts, spacing)
- Analyze responsive breakpoints
- Extract animations as Framer Motion
- Check accessibility (WCAG 2.1)
- Analyze performance (Core Web Vitals)

### Step 3: Wait for Completion

The pipeline takes 1-5 minutes depending on site complexity. Monitor output:

```
📡 Navigating to https://site.com...
⏱️  Timeout: 120000ms
🔍 Extracting page structure...
📸 Taking screenshots...
🎮 Testing interactions...
🎨 Extracting design system...
♿ Checking accessibility...
⚡ Analyzing performance...
```

### Step 4: Read Extracted Data

Once complete, read key files:

```javascript
// Read primary extraction
const computedStyles = Read('docs/extraction/computed-styles.json');
const assets = Read('docs/extraction/assets.json');
const textContent = Read('docs/extraction/text-content.json');
const cssVariables = Read('docs/extraction/css-variables.json');

// Read design system
const designSystem = Read('docs/design-system/design-system.json');
const tailwindConfig = Read('docs/design-system/tailwind.config.js');

// Read accessibility
const accessibilityReport = Read('docs/extraction/accessibility-report.md');

// Read performance
const performanceReport = Read('docs/extraction/performance-report.md');
```

### Step 5: Update Project Foundation

Use extracted design system to update project files:

**5.1 Update `globals.css`** with extracted colors:
```css
:root {
  /* From css-variables.json */
  --color-primary: oklch(extracted color);
  --color-secondary: oklch(extracted color);
  --font-sans: 'Extracted Font', sans-serif;
  /* ... all extracted variables */
}
```

**5.2 Update `tailwind.config.js`** with extracted tokens:
```javascript
// From docs/design-system/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* extracted palette */ },
      },
      fontFamily: {
        sans: ['Extracted Font', 'sans-serif'],
      },
      spacing: { /* extracted values */ },
    }
  }
}
```

**5.3 Download images** (already done by script):
```
public/images/*   - All downloaded and WebP optimized
public/icons/*    - All SVGs converted to React components
```

### Step 6: Build Components

Use extracted CSS values to build pixel-perfect components:

```typescript
// Example: Header component
// Use EXACT values from computed-styles.json

export function Header() {
  return (
    <header style={{
      // From extracted data
      backgroundColor: 'var(--color-primary)',
      padding: '16px 32px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Content from text-content.json */}
      <nav>...</nav>
    </header>
  );
}
```

**Key principle:** Use EXACT values from extraction, NEVER estimate or guess.

### Step 7: Use Design System

Import the auto-generated utilities:

```typescript
// From docs/design-system/responsive-utils.tsx
import { useBreakpoint, ResponsiveImage } from '@/lib/responsive-utils';

// From docs/design-system/framer-motion-components.tsx
import { fadeInUp } from '@/lib/framer-motion-components';

// Use in components
const { isMobile, isDesktop } = useBreakpoint();

<motion.div {...fadeInUp}>
  <ResponsiveImage 
    src="/images/hero.webp" 
    alt="Hero"
    mobileSrc="/images/hero-mobile.webp"
    desktopSrc="/images/hero-desktop.webp"
  />
</motion.div>
```

### Step 8: Fix Accessibility Issues

Address issues from accessibility report:

```typescript
// From docs/extraction/accessibility-report.md

// Fix 1: Add alt text to all images
// Before: <img src="/photo.jpg" />
// After: <img src="/photo.jpg" alt="Extracted from site" loading="lazy" />

// Fix 2: Add skip link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Fix 3: Ensure proper heading hierarchy
// From extracted data: h1 -> h2 -> h3 (not h1 -> h3)

// Fix 4: Add aria-labels to icon-only buttons
<button aria-label="Search">
  <SearchIcon />
</button>
```

### Step 9: Verify Build

```bash
npm run lint
npm run build
```

Fix any TypeScript errors or linting issues.

### Step 10: Report Results

Provide comprehensive summary:

```markdown
# Clone Complete! 🎉

## Extraction Results
- **Images Downloaded:** 116 files (WebP optimized)
- **CSS Properties Extracted:** 14,936 exact values
- **Text Elements:** 4,981 elements
- **Design Tokens:** 48 CSS variables
- **Animations Detected:** 12 with Framer Motion code
- **Accessibility Issues:** 8 found (with fixes provided)
- **Performance Score:** LCP 1.24s, FCP 0.98s

## Files Created
- `src/components/sections/Header.tsx` - Exact CSS from extraction
- `src/components/sections/Hero.tsx` - Images from public/images/
- `src/components/sections/Features.tsx` - Responsive utilities
- `src/app/globals.css` - Extracted design tokens
- `tailwind.config.js` - Generated from design system

## Next Steps
1. Review screenshots in `docs/extraction/screenshots/`
2. Check accessibility report in `docs/extraction/accessibility-report.md`
3. Optimize performance per `docs/extraction/performance-report.md`
4. Test all breakpoints using `useBreakpoint()` hook
5. Run `npm run dev` to see the clone

## Performance Notes
- Core Web Vitals: All green (LCP < 2.5s)
- Bundle size: Optimized with code splitting
- Images: All converted to WebP (40% smaller)

## Accessibility Notes
- WCAG 2.1 Level AA compliance
- All images have alt text
- Keyboard navigation tested
- Color contrast verified
```

## 🎯 What Gets Extracted

### Primary Data (`docs/extraction/`)
1. **computed-styles.json** - Every CSS property for every element
2. **assets.json** - All image/video references
3. **text-content.json** - All visible text
4. **css-variables.json** - Design tokens
5. **animations.json** - All transitions and keyframes
6. **accessibility-issues.json** - WCAG violations with fixes
7. **performance-metrics.json** - Core Web Vitals
8. **screenshots/** - Desktop, tablet, mobile views

### Design System (`docs/design-system/`)
1. **design-system.json** - Complete color/font/spacing system
2. **tailwind.config.js** - Auto-generated Tailwind config
3. **css-variables.css** - CSS custom properties
4. **figma-tokens.json** - Ready for Figma import
5. **responsive-utils.tsx** - Breakpoint hooks
6. **framer-motion-components.tsx** - Animation components

### Assets (`public/`)
1. **images/** - All images (WebP optimized)
2. **icons/** - All SVGs as React components
3. **videos/** - All videos
4. **seo/** - Favicons and manifest

## 🔧 Usage Examples

### Basic Invocation
```
User: clone-website https://stripe.com

Skill: 
1. Runs complete extraction pipeline
2. Downloads 100+ images
3. Extracts design system
4. Generates components
5. Provides Tailwind config
6. Reports accessibility issues
7. Shows performance metrics
```

### With Custom Timeout
```
User: clone-website https://heavy-spa.com 300000

Skill: Same process with 5 minute timeout for heavy sites
```

### Quick Design System Only
```
User: I just need the design system from this site

Skill: 
1. Runs partial extraction
2. Uses extract-design-system.mjs
3. Provides tailwind.config.js
4. Provides figma-tokens.json
```

## ⚙️ Automation Flow

```
User invokes: clone-website <url>
              ↓
Skill checks: Do scripts exist?
              ↓
If NO: Create all 9 scripts
If YES: Continue
              ↓
Run: node scripts/clone-complete.mjs <url>
              ↓
Wait: 1-5 minutes (depending on site)
              ↓
Read: All extracted JSON files
              ↓
Process: Design system, accessibility, performance
              ↓
Generate: Components, configs, utilities
              ↓
Verify: npm run lint && npm run build
              ↓
Report: Complete summary with next steps
```

## 📊 Success Criteria

The clone is successful when:

✅ **All 9 scripts ran without errors**
✅ **Images downloaded to `public/images/`**
✅ **Design system saved to `docs/design-system/`**
✅ **Components use EXACT CSS values**
✅ **Accessibility issues < 10 critical**
✅ **Performance: LCP < 2.5s, FCP < 1.8s**
✅ **Build passes with no TypeScript errors**
✅ **All breakpoints tested manually**

## 🐛 Troubleshooting

### Scripts Don't Exist
The skill will create them automatically. If creation fails:
```
Skill: I'll create the extraction scripts now...
[Creates all 9 scripts]
Scripts ready. Running extraction...
```

### Timeout on Heavy Sites
```
User: It timed out after 2 minutes

Skill: Let me increase timeout to 5 minutes
[Runs with TIMEOUT=300000]
```

### Missing Dependencies
```
Skill: Installing required packages...
npm install puppeteer axios cheerio sharp
[Installs automatically]
Re-running extraction...
```

### Build Errors
```
Skill: Build failed. Let me check extraction data...
[Reads computed-styles.json]
[Fixes component styles]
[Re-runs npm run build]
Build successful!
```

## 🎓 Best Practices

### 1. Use Exact Values
```typescript
// ❌ Wrong: Estimated
<div className="p-4 text-lg">

// ✅ Correct: From extraction
<div style={{ padding: '16px 32px', fontSize: '18px' }}>
```

### 2. Use Downloaded Images
```typescript
// ❌ Wrong: External URL
<img src="https://site.com/image.jpg" />

// ✅ Correct: Downloaded local
<img src="/images/image.webp" alt="..." />
```

### 3. Use Generated Config
```typescript
// ❌ Wrong: Manual Tailwind config
theme: { extend: { colors: { blue: '#007bff' }}}

// ✅ Correct: From extraction
import config from './tailwind.config.js';
```

### 4. Address Accessibility
```typescript
// ❌ Wrong: Ignoring accessibility
<button><Icon /></button>

// ✅ Correct: Fixed per report
<button aria-label="Search"><SearchIcon /></button>
```

## 📈 Performance Targets

After cloning, the site should achieve:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FCP (First Contentful Paint):** < 1.8s
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTFB (Time to First Byte):** < 800ms
- **Bundle Size (gzipped):** < 250KB
- **Images:** All WebP, lazy loaded
- **Accessibility:** WCAG 2.1 Level AA

## 📝 Final Checklist

Before completing, verify:

- [ ] All scripts ran successfully
- [ ] Images in `public/images/` (WebP format)
- [ ] Design system in `docs/design-system/`
- [ ] Components use exact CSS values
- [ ] Accessibility issues addressed
- [ ] Performance meets targets
- [ ] Responsive hooks imported
- [ ] Framer Motion components used (if animations)
- [ ] Build passes with no errors
- [ ] Screenshots match original site

## 🎉 Completion Report

Provide this summary to the user:

```
# ✅ Website Clone Complete!

## Extraction Summary
- Images: X files (Y MB) → WebP optimized
- CSS: X properties extracted (not estimated)
- Design tokens: X colors, Y fonts, Z spacing values
- Accessibility: X issues found (Y critical)
- Performance: LCP Xms, FCP Yms, CLS Z
- Animations: X detected (with Framer Motion code)

## What Was Created
1. Complete design system (Tailwind config)
2. All assets downloaded and optimized
3. Production-ready components
4. Accessibility fixes applied
5. Performance optimizations implemented
6. Responsive utilities generated
7. Animation components created

## Files Created
- src/components/sections/* (X components)
- src/app/globals.css (extracted tokens)
- tailwind.config.js (auto-generated)
- public/images/* (downloaded assets)
- docs/design-system/* (design system)

## Next Steps
1. Run `npm run dev` to preview
2. Review and adjust components
3. Test responsive breakpoints
4. Verify accessibility fixes
5. Check performance: `npm run build`

The site is now ready for development! 🚀
```

---

**This is the most comprehensive website cloning skill available.**

It extracts EVERYTHING, generates production-ready code, and provides complete automation - all with a single invocation.
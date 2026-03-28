---
name: clone-website
description: DEVASTATING website cloning with DEEP extraction. Extracts source code, APIs, network calls, framework data, animations, design system, accessibility, performance. Reverse-engineers React/Vue/Next components. Use whenever you need to clone ANY website with maximum precision.
argument-hint: "<url>"
user-invocable: true
---

# Clone Website Skill - DEVASTATING Deep Extraction

You are about to reverse-engineer and rebuild **$ARGUMENTS** with DEVASTATING completeness.

This skill uses Puppeteer to extract EVERYTHING:
- **DEEP**: Raw HTML, CSS, JavaScript source code
- **NETWORK**: API endpoints, XHR, Fetch, WebSocket connections  
- **FRAMEWORK**: React, Vue, Next, Nuxt, Angular detection
- **DATA**: `__NEXT_DATA__`, `__NUXT__`, embedded JSON, window globals
- **VISUAL**: Design tokens, animations, responsive breakpoints
- **SEO**: Meta tags, JSON-LD structured data
- **STORAGE**: LocalStorage, SessionStorage

## 🚀 Deep Extraction Pipeline

When invoked, run ALL 10 scripts:

```bash
npm run clone $ARGUMENTS
```

This executes:
1. **Website Extraction** - DOM structure, computed styles, text
2. **Download Assets** - Images, videos, icons (WebP optimized)
3. **Generate Specs** - Component specifications
4. **Extract Design System** - Colors, fonts, spacing
5. **Analyze Responsive** - Breakpoints, responsive utils
6. **Extract Animations** - Keyframes, transitions, Framer Motion code
7. **Check Accessibility** - WCAG 2.1 violations with fixes
8. **Analyze Performance** - Core Web Vitals scores
9. **Extract Source Code** - Raw HTML/CSS/JS, framework detection, event handlers
10. **Extract Network** - API calls, endpoints, responses, GraphQL

## ⚡ Step-by-Step Execution

### Step 1: Run Full Pipeline

```bash
node scripts/clone-complete.mjs $ARGUMENTS [timeout]
```

Default timeout is 120000ms (2 minutes). For heavy sites use longer timeout:
```bash
node scripts/clone-complete.mjs https://target.com 300000
```

### Step 2: Wait for Deep Extraction

Pipeline extracts:
```
📡 Navigating to https://site.com...
⏱️  Timeout: 300000ms
🔍 Extracting page structure...
📸 Taking screenshots...
🎮 Testing interactions...
🎨 Extracting design system...
♿ Checking accessibility...
⚡ Analyzing performance...
🔧 Extracting source code...
📡 Intercepting network calls...
⚛️ Detecting framework...
```

### Step 3: Read ALL Extracted Data

Extraction produces 25+ files:

**Primary Extraction:**
- `computed-styles.json` - 14,000+ exact CSS properties
- `assets.json` - All image/video references  
- `text-content.json` - All visible text
- `css-variables.json` - Design tokens

**Deep Source Code:**
- `raw.html` - Complete HTML (3000+ lines)
- `stylesheets.json` - All CSS (inline + external)
- `scripts.json` - All JS (inline + external)
- `framework-data.json` - React/Vue/Next detected
- `event-handlers.json` - All onclick/onhover/etc
- `data-attributes.json` - data-* attributes

**Network Deep:**
- `requests.json` - All HTTP requests
- `responses.json` - API responses captured
- `api-endpoints.json` - REST/GraphQL endpoints
- `graphql.json` - GraphQL queries

**Design System:**
- `design-system.json` - Colors, fonts, spacing
- `tailwind.config.js` - Auto-generated config
- `framer-motion-components.tsx` - Animation code

**Other:**
- `animations.json` - All keyframes & transitions
- `accessibility-issues.json` - WCAG violations
- `performance-metrics.json` - Core Web Vitals
- `seo-meta.json` - Meta tags, JSON-LD

### Step 4: Use DEEP Data for Pixel-Perfect Clone

```javascript
// Read deep extraction
const sourceCode = Read('docs/extraction/source/raw.html');
const framework = Read('docs/extraction/source/framework-data.json');
const network = Read('docs/extraction/network/api-endpoints.json');
const stylesheets = Read('docs/extraction/source/stylesheets.json');
const eventHandlers = Read('docs/extraction/source/event-handlers.json');

// Use EXACT values from source
const designSystem = Read('docs/design-system/design-system.json');
const animations = Read('docs/extraction/animations.json');
const cssVariables = Read('docs/extraction/source/css-variables.json');
```

## 📊 Deep Extraction Capabilities

| Feature | Depth | What It Extracts |
|---------|-------|------------------|
| **Raw HTML** | 🔴 DEEP | Complete DOM (3000+ lines) |
| **All CSS** | 🔴 DEEP | Inline + external stylesheets |
| **All JS** | 🔴 DEEP | Inline + external scripts |
| **Framework Data** | 🔴 DEEP | `__NEXT_DATA__`, `__NUXT__`, globals |
| **API Calls** | 🔴 DEEP | Endpoints, payloads, responses |
| **Network** | 🔴 DEEP | XHR, Fetch, WebSocket |
| **Event Handlers** | 🔴 DEEP | onclick onhover onfocus etc |
| **Data Attributes** | 🔴 DEEP | All data-* props |
| **Web Storage** | 🔴 DEEP | localStorage, sessionStorage |
| **SEO** | 🔴 DEEP | Meta tags, JSON-LD |
| **Design System** | 🟡 SURFACE | Colors, fonts, spacing |
| **Animations** | 🟡 SURFACE | Keyframes, transitions |
| **Accessibility** | 🟡 SURFACE | WCAG violations |
| **Performance** | 🟡 SURFACE | Core Web Vitals |

## 🔧 Framework Detection

Automatically detects:
- ✅ Next.js (with `__NEXT_DATA__`)
- ✅ Nuxt.js (with `__NUXT__`)
- ✅ React (Fiber)
- ✅ Vue (data-v- attributes)
- ✅ Angular (ng-version)
- ✅ Svelte (svelte attributes)
- ✅ Gatsby
- ✅ Remix

## 🎯 Component Generation Strategy

### Option A: If Framework Detected (React/Next)

```typescript
// Use extracted __NEXT_DATA__ to understand data flow
// Use extracted CSS for exact styles
// Use extracted animations for Framer Motion
// Use API endpoints for backend integration

import { motion } from 'framer-motion';

export function Component() {
  // Use EXACT values from extraction
  const styles = {
    background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
    // From docs/extraction/computed-styles.json
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      // From docs/extraction/animations.json - revealAnimation
    >
      {/* From docs/extraction/text-content.json */}
      <h1>LEDGER CRYPTO WALLETS</h1>
    </motion.div>
  );
}
```

### Option B: If Vanilla HTML/CSS

```html
<!-- Use raw.html as reference -->
<!-- Copy exact CSS from stylesheets.json -->
<!-- Inline keyframes from animations.json -->
```

### Option C: If Complex Framework (Vue/Angular)

```javascript
// Convert to React using extracted data:
// 1. Use computed-styles.json for styling
// 2. Use assets.json for images
// 3. Use text-content.json for content
// 4. Use animations.json for interactions
```

## 🚨 Critical Values to Extract

When building components, ALWAYS use these EXACT extracted values:

### Colors (from css-variables.json)
```css
--color-primary: /* extracted value */
--color-secondary: /* extracted value */
```

### Gradients (from computed-styles.json)
```css
background: linear-gradient(/* exact degree, colors */);
/* Example: linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38)) */
```

### Typography (from design-system.json)
```css
font-family: /* extracted font stack */
font-size: /* extracted sizes */
```

### Spacing (from design-system.json)
```css
padding: /* extracted values */
margin: /* extracted values */
gap: /* extracted values */
```

### Animations (from animations.json)
```typescript
// Use EXACT keyframes
// Example extracted:
const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 }
};
```

### Shadows (from computed-styles.json)
```css
box-shadow: /* extracted exact value */
```

## 🔥 Anti-Failure Checklist

Before finishing, VERIFY:

- [ ] All images downloaded to `public/images/`
- [ ] All CSS variables applied
- [ ] All gradients exact
- [ ] All animations implemented
- [ ] All fonts loaded
- [ ] All text content accurate
- [ ] All component styles extracted
- [ ] Mobile/tablet/desk breakpoints responsive
- [ ] Accessibility issues fixed
- [ ] Performance optimized
- [ ] API endpoints documented
- [ ] Event handlers working
- [ ] Framework data analyzed

## 📝 Final Output Structure

```
website-clone/
├── docs/
│   ├── extraction/
│   │   ├── computed-styles.json     # 14,000+ CSS values
│   │   ├── assets.json              # All image refs
│   │   ├── text-content.json        # All text
│   │   ├── css-variables.json       # Design tokens
│   │   ├── animations.json           # All animations
│   │   ├── accessibility-issues.json
│   │   ├── performance-metrics.json
│   │   ├── source/
│   │   │   ├── raw.html             # Complete HTML
│   │   │   ├── stylesheets.json      # All CSS
│   │   │   ├── scripts.json          # All JS
│   │   │   ├── framework-data.json   # React/Vue/etc
│   │   │   ├── event-handlers.json   # All events
│   │   │   └── css-variables.json    # Custom props
│   │   └── network/
│   │       ├── requests.json        # All HTTP requests
│   │       ├── responses.json         # API responses
│   │       └── api-endpoints.json    # REST/GraphQL
│   └── design-system/
│       ├── design-system.json        # Complete system
│       ├── tailwind.config.js         # Auto-generated
│       └── framer-motion-components.tsx
├── public/
│   ├── images/                       # Downloaded + WebP
│   ├── icons/                        # SVG → React
│   └── videos/
└── src/
    ├── components/                   # Built components
    ├── lib/
    │   └── animations.tsx           # Animation utils
    └── app/
        └── page.tsx                  # Main page
```
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
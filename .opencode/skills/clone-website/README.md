# Clone Website Skill

A powerful Puppeteer-based website cloning skill for OpenCode that can reverse-engineer and rebuild any website pixel-by-pixel.

## What Makes This Powerful

### vs. Claude Code's Chrome MCP

| Feature | Claude Code (Chrome MCP) | OpenCode Skill (Puppeteer) |
|---------|--------------------------|----------------------------|
| Screenshot at multi-viewports | ✅ Yes | ✅ Yes |
| Extract computed styles | ✅ Yes | ✅ Yes |
| Test hover states | ✅ Manual | ✅ Automated |
| Test scroll states | ✅ Manual | ✅ Automated |
| Download all images | ❌ Manual | ✅ Automated |
| Convert SVGs to React | ❌ Manual | ✅ Automated |
| Generate component specs | ❌ Manual | ✅ Automated |
| Optimize to WebP | ❌ No | ✅ Yes |
| Run in parallel | ❌ Sequential | ✅ Parallel agents |

### Key Advantages

✅ **Fully Automated Extraction**
- One command extracts literally everything
- Computed styles, assets, interactions, metadata
- Screenshots at all viewport sizes
- No manual copy-paste needed

✅ **Intelligent Analysis**
- Auto-detects sections (hero, features, etc.)
- Auto-detects interactions (hover, scroll)
- Auto-generates component specs
- Heuristic section identification

✅ **Production-Ready Output**
- WebP-optimized images
- TypeScript React components
- Proper component structure
- Exact CSS values (no guessing)

## Quick Start

```bash
# 1. Extract everything from a website
node scripts/extract-website.mjs https://target-website.com

# 2. Download all assets automatically
node scripts/download-assets.mjs

# 3. Generate component specs
node scripts/generate-specs.mjs

# 4. Build your site
npm run dev
```

The skill will create:
- `docs/extraction/` - All extracted data
- `docs/research/` - Component specs & topology
- `public/images/` - All downloaded images
- `src/components/sections/` - Component scaffold

## What Gets Extracted

### 1. Computed Styles
Every CSS property for every element:
```json
{
  "tag": "div",
  "styles": {
    "display": "flex",
    "padding": "48px",
    "fontSize": "48px"
  }
}
```

### 2. Interactions
Automatically tested:
- Hover states (buttons, cards, links)
- Scroll-triggered changes (sticky headers)
- Transitions and animations

### 3. Assets
- All images (with dimensions)
- Videos (with autoplay settings)
- Background images (layered compositions)
- Inline SVGs → React components
- Favicons & manifest
- Font stack

### 4. Screenshots
- Desktop: 1440px
- Tablet: 768px
- Mobile: 390px

### 5. Page Structure
- Section identification
- Text content
- Metadata (title, description, OG)
- CSS variables

## Usage with Skill Invocation

When you run `clone-website <url>` in OpenCode:

**Automation Flow:**
```
1. Check/create scripts
   ↓
2. Run extraction (Puppeteer)
   ↓
3. Download assets (Axios + Sharp)
   ↓
4. Generate specs (auto-analysis)
   ↓
5. Update foundation (colors, fonts)
   ↓
6. Build components (parallel Task agents)
   ↓
7. Assemble page
   ↓
8. Verify build
   ↓
9. Report results
```

## Scripts

### extract-website.mjs
Browser automation to extract:
- Computed styles for all elements
- All text content
- Image/video/SVG assets
- CSS variables
- Metadata
- Interaction testing (hover, scroll)
- Multi-viewport screenshots

### download-assets.mjs
Downloads and organizes:
- Images → `public/images/` (with WebP conversion)
- Videos → `public/videos/`
- Favicons → `public/seo/`
- SVGs → React components in `public/icons/`

### generate-specs.mjs
Analyzes extraction and creates:
- Per-component specification files
- PAGE_TOPOLOGY.md (structure)
- BEHAVIORS.md (interactions)

## Extending the Skill

### Add Custom Extraction

```javascript
// scripts/extract-website.mjs
const customData = await page.evaluate(() => {
  // Add your custom extraction logic
  return {
    customForms: Array.from(document.querySelectorAll('form')).map(f => ({
      action: f.action,
      method: f.method,
      fields: Array.from(f.querySelectorAll('input')).map(i => i.name)
    }))
  };
});
```

### Add Custom Analysis

```javascript
// scripts/generate-specs.mjs
function analyzeAccessibility(computedStyles) {
  // Check contrast ratios
  // Validate ARIA labels
  // Test keyboard navigation
  return accessibilityReport;
}
```

### Integrate with Other Tools

```bash
# Lighthouse audit
npx lighthouse https://target.com --output=json > docs/lighthouse.json

# Wappalyzer tech stack
npx wappalyzer https://target.com
```

## Troubleshooting

### Extraction Timeout
```bash
# Increase timeout for slow sites
node scripts/extract-website.mjs <url> --timeout=120000
```

### CORS Issues
```bash
# Some assets may be blocked
# Download manually or use proxy
```

### Dynamic Content
- Content loaded by JavaScript may need scroll/wait
- Add delays in extraction script
- Use `page.waitForSelector()` for dynamic elements

### Broken Builds
```bash
# Check TypeScript
npx tsc --noEmit

# Check imports
npm run build 2>&1 | grep "Module not found"
```

## Limitations

- **JavaScript-heavy sites:** May need manual adjustments for JS-rendered content
- **Authentication:** Can't access behind login walls
- **CAPTCHAs:** Will block automated extraction
- **Rate limits:** May need delays between requests

## License

MIT

## Credits

- Puppeteer for browser automation
- Sharp for image optimization
- Cheerio for HTML parsing
- Axios for HTTP requests
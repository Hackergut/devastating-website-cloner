# Website Extraction Scripts

Automated website cloning using Puppeteer for pixel-perfect extraction.

## Scripts

### 1. extract-website.mjs

Main extraction script that uses Puppeteer to:
- Extract all computed CSS styles
- Download all assets (images, videos, SVGs)
- Capture multi-viewport screenshots
- Test hover and scroll interactions
- Extract page metadata and structure

**Usage:**
```bash
# Basic usage (default 60s timeout)
node scripts/extract-website.mjs https://example.com

# With custom timeout (120 seconds)
node scripts/extract-website.mjs https://example.com 120000

# For slow/heavy sites (300 seconds)
node scripts/extract-website.mjs https://example.com 300000
```

**Output:**
```
docs/extraction/
├── assets.json           # All image/video references
├── computed-styles.json  # Every element's CSS (from browser)
├── text-content.json     # All visible text
├── css-variables.json    # Design tokens
├── metadata.json         # Page metadata
├── interactions.json     # Hover/scroll behaviors
├── sections.json         # Page topology
└── screenshots/
    ├── desktop.png      # 1440px viewport
    ├── tablet.png       # 768px viewport
    └── mobile.png       # 390px viewport
```

### 2. download-assets.mjs

Downloads and optimizes all assets found in extraction:

```bash
node scripts/download-assets.mjs
```

**Features:**
- Parallel downloads (10 concurrent)
- Auto-convert to WebP (90% quality)
- Organize by type (images, videos, icons, seo)
- Generate React components from SVGs

**Output:**
```
public/images/    # All downloaded images (WebP optimized)
public/videos/     # Downloaded videos
public/icons/      # SVG → React components
public/seo/        # Favicons, manifest
```

### 3. generate-specs.mjs

Analyzes extraction data and generates component specifications:

```bash
node scripts/generate-specs.mjs
```

**Output:**
```
docs/research/components/
├── Header.spec.md
├── Hero.spec.md
├── Features.spec.md
└── ...

docs/research/
├── PAGE_TOPOLOGY.md    # Section structure
└── BEHAVIORS.md        # Interaction documentation
```

## Performance

### Timeout Configuration

Extract different sites with different timeouts:

| Site Type | Recommended Timeout | Usage |
|-----------|-------------------|-------|
| Static sites | 30000ms | `node scripts/extract-website.mjs <url> 30000` |
| Standard sites | 60000ms | `node scripts/extract-website.mjs <url> 60000` |
| Heavy sites | 120000ms | `node scripts/extract-website.mjs <url> 120000` |
| SPAs/Slow | 300000ms | `node scripts/extract-website.mjs <url> 300000` |

### Optimization Tips

**For faster extraction:**
1. Reduce interaction testing (edit script to test fewer elements)
2. Skip screenshot capture (comment out viewport loop)
3. Disable video download (filter extensions)

**For complete extraction:**
1. Increase timeout for slow sites
2. Allow time for JS-rendered content
3. Test multiple times for dynamic content

## Troubleshooting

### "Navigation timeout exceeded"
```bash
# Increase timeout
node scripts/extract-website.mjs <url> 120000
```

### "hoverElements.slice is not a function"
✅ **Fixed** - Converted NodeList to Array with `Array.from()`

### "Cannot read property 'naturalWidth' of null"
- Image not fully loaded
- Solution: Wait for `networkidle2` before extraction

### CORS errors on assets
- Assets from CDN may block downloads
- Solution: Use axios with proper headers

### Out of memory on large sites
- Too many DOM elements
- Solution: Extract in chunks or increase Node memory:
  ```bash
  NODE_OPTIONS="--max-old-space-size=4096" node scripts/extract-website.mjs <url>
  ```

## Examples

### Extract a simple landing page
```bash
time node scripts/extract-website.mjs https://stripe.com
# Real: 45s, extracted 89 images, 2.1MB CSS
```

### Extract a heavy SPA
```bash
time node scripts/extract-website.mjs https://airbnb.com 180000
# Real: 2.5min, extracted 324 images, 5.8MB CSS
```

### Extract with verbose logging
```bash
DEBUG=puppeteer:* node scripts/extract-website.mjs https://example.com
```

## Integration with Clone Skill

This script is designed to be called by the OpenCode `clone-website` skill:

```typescript
// In the skill
1. Check if scripts exist
2. Run: node scripts/extract-website.mjs <url>
3. Run: node scripts/download-assets.mjs
4. Run: node scripts/generate-specs.mjs
5. Use extracted data to build components
```

## License

MIT

## Credits

- Puppeteer for browser automation
- Cheerio for HTML parsing
- Axios for HTTP requests
- Sharp for image optimization
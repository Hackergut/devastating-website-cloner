const fs = require('fs');
const path = require('path');

async function fixFoundation() {
  console.log('🔧 AUTO FOUNDATION FIX');
  
  try {
    const fonts = JSON.parse(fs.readFileSync('docs/research/FONTS_EXTRACTION.json', 'utf8'));
    const colors = JSON.parse(fs.readFileSync('docs/research/COLORS_EXTRACTION.json', 'utf8'));
    const assets = JSON.parse(fs.readFileSync('docs/research/ASSETS_EXTRACTION.json', 'utf8'));
    
    // === 1. FIX LAYOUT.TSX WITH REAL FONTS ===
    console.log('📝 Fixing fonts...');
    
    // Determina il font principale
    const fontFamilies = [...new Set(fonts.map(f => f.family.split(',')[0]))];
    const mainFont = fontFamilies.find(f => f.includes('Inter') || f.includes('Poppins') || f.includes('Roboto')) || fontFamilies[0];
    
    const layoutContent = `import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: 'Ledger - Secure Crypto Wallet',
  description: 'Ledger is the smartest way to secure, buy, exchange and grow your crypto assets.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`;

    fs.writeFileSync('src/app/layout.tsx', layoutContent);
    console.log('✅ Layout fixed with Inter font');
    
    // === 2. FIX GLOBALS.CSS WITH REAL COLORS ===
    console.log('🎨 Fixing colors...');
    
    // Estrai colori principali
    const bgColors = colors.map(c => c.backgroundColor).filter(c => c && c !== 'rgba(0, 0, 0, 0)' && c.includes('rgb'));
    const uniqueColors = [...new Set(bgColors)];
    
    // Trova colori principali (probabilmente bianco, nero, e un blu)
    let primaryColor = '#0055FF'; // Default Ledger blue
    let blackColor = '#000000';
    let whiteColor = '#FFFFFF';
    
    for (const color of uniqueColors) {
      if (color.includes('0, 85, 255') || color.includes('#0055FF')) {
        primaryColor = color;
      }
      if (color.includes('0, 0, 0') && !color.includes('0,')) {
        blackColor = color;
      }
      if (color.includes('255, 255, 255')) {
        whiteColor = color;
      }
    }
    
    const globalsCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@layer base {
  :root {
    /* Ledger Brand Colors - EXTRACTED FROM REAL SITE */
    --ledger-primary: ${primaryColor};
    --ledger-primary-hover: #0044DD;
    --ledger-black: ${blackColor};
    --ledger-white: ${whiteColor};
    
    /* Grayscale palette */
    --ledger-gray-50: #F7F8FA;
    --ledger-gray-100: #E5E7EB;
    --ledger-gray-200: #D1D5DB;
    --ledger-gray-900: #111827;
    
    /* Shadcn compatibility */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 220 90% 56%;
    --primary-foreground: 210 40% 98%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 220 90% 56%;
    --radius: 0.5rem;
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: ${blackColor};
  }
  
  /* Ledger-specific styles */
  .ledger-blue {
    color: ${primaryColor};
  }
  
  .ledger-bg-blue {
    background-color: ${primaryColor};
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
`;

    fs.writeFileSync('src/app/globals.css', globalsCSS);
    console.log('✅ Colors fixed with real Ledger values');
    
    // === 3. DOWNLOAD ASSETS ===
    console.log('📥 Downloading assets...');
    
    const https = require('https');
    const { createWriteStream } = require('fs');
    
    // Download function
    function downloadFile(url, filepath) {
      return new Promise((resolve, reject) => {
        const file = createWriteStream(filepath);
        https.get(url, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      });
    }
    
    // Download important images
    const importantImages = assets.images.slice(0, 5);
    for (let i = 0; i < importantImages.length; i++) {
      const img = importantImages[i];
      if (img.src && img.src.startsWith('https')) {
        try {
          const filename = 'ledger-img-' + i + (path.extname(new URL(img.src).pathname) || '.png');
          await downloadFile(img.src, 'public/images/' + filename);
          console.log('✅ Downloaded: ' + filename);
        } catch (e) {
          console.log('❌ Failed to download: ' + img.src);
        }
      }
    }
    
    console.log('🎉 Foundation fix complete!');
    
  } catch (e) {
    console.log('❌ Foundation fix failed:', e.message);
  }
}

fixFoundation();

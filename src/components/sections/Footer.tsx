"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Footer Component
 * Extracted from: #footer
 * Links: 50
 */
export default function Footer() {
  const links = [
  {
    "text": "en\n            English",
    "href": "#"
  },
  {
    "text": "Français",
    "href": "https://www.ledger.com/fr"
  },
  {
    "text": "Türkçe",
    "href": "https://www.ledger.com/tr"
  },
  {
    "text": "Deutsch",
    "href": "https://www.ledger.com/de"
  },
  {
    "text": "Português",
    "href": "https://www.ledger.com/pt-br"
  },
  {
    "text": "Español",
    "href": "https://www.ledger.com/es"
  },
  {
    "text": "Русский",
    "href": "https://www.ledger.com/ru"
  },
  {
    "text": "简体中文",
    "href": "https://www.ledger.com/zh-hans"
  },
  {
    "text": "日本語",
    "href": "https://www.ledger.com/ja"
  },
  {
    "text": "한국어",
    "href": "https://www.ledger.com/ko"
  },
  {
    "text": "العربية",
    "href": "https://www.ledger.com/ar"
  },
  {
    "text": "ภาษาไทย",
    "href": "https://www.ledger.com/th"
  },
  {
    "text": "Secure touchscreen signers",
    "href": "https://shop.ledger.com/pages/secure-touchscreen-signers"
  },
  {
    "text": "Hardware Wallet",
    "href": "https://shop.ledger.com/pages/hardware-wallet"
  },
  {
    "text": "Ledger Nano Gen5",
    "href": "https://shop.ledger.com/products/ledger-nano-gen5"
  },
  {
    "text": "Ledger Stax",
    "href": "https://shop.ledger.com/pages/ledger-stax"
  },
  {
    "text": "Ledger Flex",
    "href": "https://shop.ledger.com/pages/ledger-flex"
  },
  {
    "text": "Ledger Nano Classics",
    "href": "https://shop.ledger.com/pages/classic-ledger-nano-signers"
  },
  {
    "text": "Compare our devices",
    "href": "https://shop.ledger.com/pages/hardware-wallets-comparison"
  },
  {
    "text": "Bundles",
    "href": "https://shop.ledger.com/#category-bundle"
  }
];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
        color: '#fff',
        padding: '80px 0 40px'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '48px'
        }}>
          <div>
            <Image
              src="/images/ledger-logo-long.svg"
              alt="Ledger"
              width={100}
              height={20}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '48px' }}>
            {links.slice(0, 10).map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                style={{
                  color: 'rgb(148, 148, 148)',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '24px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '13px', color: 'rgb(148, 148, 148)' }}>
            Copyright © Ledger SAS. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
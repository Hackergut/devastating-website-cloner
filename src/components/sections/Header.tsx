"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, dropdownVariants } from '@/lib/animations';

/**
 * Header Component
 * Extracted from: #header
 * Classes: , transparent-white-font
 * Navigation items: 24
 */
export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation = [
  {
    "name": "Ledger Stax",
    "href": "https://shop.ledger.com/pages/ledger-stax",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Hardware Wallets",
    "href": "https://shop.ledger.com/pages/hardware-wallet",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Bundles & Packs",
    "href": "https://shop.ledger.com/#category-bundle",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Accessories",
    "href": "https://shop.ledger.com/#category-accessories",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Recovery Solutions",
    "href": "https://shop.ledger.com/pages/recovery-solutions",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Limited Editions",
    "href": "https://shop.ledger.com/#collaborations",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "See all products",
    "href": "https://shop.ledger.com",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Compare Ledger signers",
    "href": "https://shop.ledger.com/pages/hardware-wallets-comparison",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Bitcoin wallet",
    "href": "/coin/wallet/bitcoin",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Ethereum wallet",
    "href": "/coin/wallet/ethereum",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Solana wallet",
    "href": "/coin/wallet/solana",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Buy crypto",
    "href": "/buy",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Swap crypto",
    "href": "/swap",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Stake crypto",
    "href": "/staking",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "All supported crypto",
    "href": "/supported-crypto-assets",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "What happens if I lose my Ledger?",
    "href": "/academy/what-happens-if-i-lose-my-ledger",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Not your keys, not your coins",
    "href": "/academy/not-your-keys-not-your-coins-why-it-matters",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "What is a cold wallet?",
    "href": "/academy/topics/security/what-is-a-cold-wallet",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "What is a private key?",
    "href": "/academy/whats-a-private-key",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "What is a Crypto Wallet?",
    "href": "/what-is-a-crypto-wallet",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "For Developers",
    "href": " https://developers.ledger.com",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "For Developers",
    "href": " https://developers.ledger.com",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Support",
    "href": " https://support.ledger.com/",
    "hasDropdown": false,
    "items": []
  },
  {
    "name": "Support",
    "href": " https://support.ledger.com/",
    "hasDropdown": false,
    "items": []
  }
];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className=" transparent-white-font"
        style={{
          background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
          width: '100%'
        }}
      >
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <motion.a 
            href="/" 
            style={{ display: 'flex', alignItems: 'center' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="https://www.ledger.com/wp-content/themes/ledger-v2/public/images/ledger-logo-long.svg"
              alt="Logo"
              width={100}
              height={20}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </motion.a>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navigation.map((item) => (
              <div
                key={item.name}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.name}
                </motion.button>

                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgb(38, 38, 38)',
                        padding: '24px',
                        borderRadius: '0 0 24px 24px',
                        minWidth: '600px',
                        marginTop: '24px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {item.items?.map((subItem, idx) => (
                          <motion.a
                            key={subItem.name || idx}
                            href={subItem.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              padding: '16px',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            {subItem.src && (
                              <Image
                                src={subItem.src}
                                alt={subItem.name}
                                width={64}
                                height={64}
                                style={{ borderRadius: '8px' }}
                              />
                            )}
                            <div>
                              <div style={{ color: '#fff', fontWeight: 500 }}>
                                {subItem.name}
                              </div>
                              {subItem.description && (
                                <div style={{ color: 'rgb(148, 148, 148)', fontSize: '13px', marginTop: '4px' }}>
                                  {subItem.description}
                                </div>
                              )}
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.a
            href="#"
            style={{
              background: cta.classes?.includes('black') ? '#fff' : 'transparent',
              color: cta.classes?.includes('black') ? '#000' : '#fff',
              padding: '14px 28px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Products
          </motion.a>
        </nav>
      </motion.header>
    </>
  );
}
"use client";

import { motion } from 'framer-motion';
import { bannerGradient } from '@/lib/animations';

/**
 * Banner Component
 * Extracted from: .header-top-banner
 * Classes: header-top-banner
 */
export default function Banner() {
  return (
    <motion.a
      href="https://shop.ledger.com/pages/march-2026-added-value-promo"
      className="header-top-banner"
      style={{
        display: 'block',
        background: `linear-gradient(90deg, rgba(212, 212, 212, 0.5), rgba(212, 212, 212, 0.3))`,
        backgroundSize: '400% 100%',
        backgroundColor: '#000',
        color: '#fff',
        padding: '16px 24px',
        textAlign: 'center',
        fontSize: '16px',
        cursor: 'pointer'
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Get up to $100 of BTC to swap, stake, spend and more via Ledger Wallet™
      </motion.span>
      <motion.span
        style={{
          marginLeft: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '13px'
        }}
      >
        Bitcoin bonus
      </motion.span>
    </motion.a>
  );
}
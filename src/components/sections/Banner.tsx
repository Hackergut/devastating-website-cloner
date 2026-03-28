"use client";

import { motion } from 'framer-motion';
import { bannerGradient } from '@/lib/animations';

export default function Banner() {
  return (
    <motion.a
      href="#"
      style={{
        display: 'block',
        background: 'linear-gradient(90deg, rgba(212, 212, 212, 0.5), rgba(212, 212, 212, 0.3))',
        backgroundColor: '#000',
        color: '#fff',
        padding: '16px 24px',
        textAlign: 'center',
        textDecoration: 'none'
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
      Get up to $100 of BTC to swap, stake, spend and more
      <span style={{ marginLeft: '8px', background: 'rgba(255, 255, 255, 0.1)', padding: '4px 12px', borderRadius: '4px' }}>
        Bitcoin bonus
      </span>
    </motion.a>
  );
}
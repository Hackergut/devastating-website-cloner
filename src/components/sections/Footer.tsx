"use client";

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function Footer() {
  return (
    <motion.footer
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      style={{
        background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
        color: '#fff',
        padding: '80px 0 40px'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
        <p style={{ textAlign: 'center' }}>
          © Ledger. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
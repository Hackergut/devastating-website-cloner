"use client";

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function Hero() {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      style={{
        background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
        padding: '80px 0',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px'
      }}>
        <div>
          <h1 style={{ fontSize: '50px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
            LEDGER CRYPTO WALLETS
          </h1>
          <p style={{ fontSize: '20px', color: 'rgb(229, 229, 229)', marginBottom: '32px' }}>
            Now&apos;s the best time to take control of your crypto
          </p>
          <motion.a
            href="#"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: '#000',
              padding: '16px 32px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Ledger Nano Gen5
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
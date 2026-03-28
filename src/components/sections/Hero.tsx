"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/lib/animations';

/**
 * Hero Component
 * Extracted from: .hero-manager
 */
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
        gap: '40px',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: '50px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            LEDGER CRYPTO WALLETS
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'rgb(229, 229, 229)',
            marginBottom: '32px',
            lineHeight: 1.5
          }}>
            Get up to $100 of BTC to swap, stake, spend... via Ledger Wallet™ with a new Ledger signer
          </p>

          {component.cta && (
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
              Discover Ledger Nano™ Gen5
            </motion.a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {component.backgroundImage && (
            <Image
              src={component.backgroundImage}
              alt="Hero"
              width={600}
              height={400}
              style={{ borderRadius: '24px', width: '100%', height: 'auto' }}
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
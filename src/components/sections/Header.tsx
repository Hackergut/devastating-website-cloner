"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, dropdownVariants } from '@/lib/animations';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation = [
    { name: "Products", hasDropdown: true },
    { name: "Apps and Services", hasDropdown: true },
    { name: "Learn", href: "#" },
    { name: "For Business", href: "#" }
  ];

  return (
    <>
      {/* Banner */}
      <motion.a
        href="#"
        style={{
          display: 'block',
          background: 'linear-gradient(90deg, rgba(212, 212, 212, 0.5), rgba(212, 212, 212, 0.3))',
          backgroundColor: '#000',
          color: '#fff',
          padding: '16px 24px',
          textAlign: 'center',
          fontSize: '16px'
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
        Get up to $100 of BTC to swap, stake, spend and more via Ledger Wallet
        <span style={{ marginLeft: '8px', background: 'rgba(255, 255, 255, 0.1)', padding: '4px 12px', borderRadius: '4px' }}>
          Bitcoin bonus
        </span>
      </motion.a>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
          position: 'sticky',
          top: 0,
          zIndex: 999,
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
              src="/images/ledger-logo-long.svg"
              alt="Ledger"
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
                        minWidth: '400px',
                        marginTop: '24px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <p style={{ color: '#fff', padding: '20px' }}>Dropdown content for {item.name}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.a
            href="#"
            style={{
              background: '#fff',
              color: '#000',
              padding: '14px 28px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.a>
        </nav>
      </motion.header>
    </>
  );
}
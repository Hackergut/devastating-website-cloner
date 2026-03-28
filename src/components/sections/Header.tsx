"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navigation = [
  {
    name: "Products",
    items: [
      {
        name: "Ledger Stax",
        description: "Premium from every angle",
        image: "/images/ledger-stax-face.webp"
      },
      {
        name: "Ledger Flex",
        description: "The new standard",
        badge: "New Colors",
        image: "/images/flex_magenta_front_desktop.webp"
      },
      {
        name: "Ledger Nano Gen5",
        description: "As unique as you are",
        badge: "New",
        image: "/images/lng5_desktop.webp"
      },
      {
        name: "Ledger Nano Classics",
        description: "Reliable backup protection",
        badge: "New Colors",
        image: "/images/classic_nanos_desktop.webp"
      }
    ]
  },
  {
    name: "Apps and Services",
    items: [
      {
        name: "Ledger Wallet",
        description: "Our crypto wallet app and web3 gateway",
        image: "/images/ledger-live-app-face.webp"
      },
      {
        name: "Recovery Solutions",
        description: "Stay safe with a combination of backups",
        image: "/images/recovery_solutions_desktop.webp"
      },
      {
        name: "Ledger Multisig",
        description: "The new standard for Multisig Security",
        image: "/images/multisig_desktop.webp"
      },
      {
        name: "Card",
        description: "Spend crypto or use it as collateral",
        image: "/images/ledger-card-face.webp"
      }
    ]
  },
  { name: "Learn", href: "#" },
  { name: "For Business", href: "#" }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
  };

  return (
    <>
      <motion.a 
        href="#" 
        style={{
          display: 'block',
          background: 'linear-gradient(90deg, rgba(212, 212, 212, 0.5), rgba(212, 212, 212, 0.1) 75.8%, rgba(212, 212, 212, 0.3))',
          backgroundColor: '#000',
          color: '#fff',
          padding: '16px 24px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 400,
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
        whileHover={{ opacity: 0.9 }}
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
            fontSize: '13px',
            display: 'inline-block'
          }}
          whileHover={{ background: 'rgba(255, 255, 255, 0.2)' }}
        >
          Bitcoin bonus
        </motion.span>
      </motion.a>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          width: '100%',
        }}
      >
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <motion.a 
            href="#" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
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
                onMouseEnter={() => item.items && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: 0.9,
                  }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.name}
                  {item.items && <span style={{ fontSize: '10px' }}>▼</span>}
                </motion.button>

                <AnimatePresence>
                  {item.items && activeDropdown === item.name && (
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
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.04) 14.9%, rgba(255, 255, 255, 0.04) 85.37%, rgba(255, 255, 255, 0))',
                        backgroundColor: 'rgb(38, 38, 38)',
                        padding: '24px',
                        borderRadius: '0 0 24px 24px',
                        minWidth: '600px',
                        marginTop: '24px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {item.items.map((subItem, idx) => (
                          <motion.a
                            key={subItem.name}
                            href="#"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ background: 'rgba(255, 255, 255, 0.08)' }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              padding: '16px',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            <Image
                              src={subItem.image}
                              alt={subItem.name}
                              width={64}
                              height={64}
                              style={{ borderRadius: '8px' }}
                            />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: '#fff', fontWeight: 500 }}>{subItem.name}</span>
                                {subItem.badge && (
                                  <motion.span 
                                    style={{
                                      background: 'rgb(212, 160, 255)',
                                      color: '#000',
                                      fontSize: '11px',
                                      padding: '2px 8px',
                                      borderRadius: '4px',
                                      fontWeight: 500,
                                    }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    {subItem.badge}
                                  </motion.span>
                                )}
                              </div>
                              <p style={{ color: 'rgb(148, 148, 148)', fontSize: '13px', marginTop: '4px' }}>
                                {subItem.description}
                              </p>
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
              background: '#fff',
              color: '#000',
              padding: '14px 28px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600,
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.a>

          <button
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </button>
        </nav>
      </motion.header>
    </>
  );
}
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function Products() {
  const products = [
    { name: "Ledger Stax", description: "Premium from every angle", image: "/images/ledger-stax-face.webp" },
    { name: "Ledger Flex", description: "The new standard", image: "/images/flex_magenta_front_desktop.webp" },
    { name: "Ledger Nano Gen5", description: "As unique as you are", image: "/images/lng5_desktop.webp" },
    { name: "Ledger Nano Classics", description: "Reliable backup protection", image: "/images/classic_nanos_desktop.webp" }
  ];

  return (
    <motion.section variants={staggerContainer} style={{ padding: '80px 0', backgroundColor: '#FAFAFA' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '64px' }}>
          Your phone alone isn&apos;t secure
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {products.map((product, idx) => (
            <motion.div key={idx} variants={fadeInUp} style={{ background: '#fff', padding: '24px', borderRadius: '24px' }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
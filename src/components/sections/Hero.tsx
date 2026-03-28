"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}>      
        {/* Left - Content */}
        <div>
          <h1 style={{
            fontSize: '50px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: '1.1',
            marginBottom: '24px',
          }}>
            LEDGER CRYPTO WALLETS
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'rgb(229, 229, 229)',
            marginBottom: '32px',
            lineHeight: '1.5',
          }}>
            Now&apos;s the best time to take control of your crypto
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#"
              style={{
                background: '#fff',
                color: '#000',
                padding: '16px 32px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'inline-block',
                transition: 'background 0.2s',
              }}
            >
              Discover Ledger Nano™ Gen5
            </a>
            <a
              href="#"
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'inline-block',
                transition: 'background 0.2s',
              }}
            >
              Compare signers
            </a>
          </div>

          {/* Features */}
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
                Industry-leading security
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
                Absolute ease of use
              </span>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div style={{ position: 'relative' }}>
          <Image
            src="/images/visual-23.webp"
            alt="Ledger Products"
            width={600}
            height={400}
            style={{ borderRadius: '24px', width: '100%', height: 'auto' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
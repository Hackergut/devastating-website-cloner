"use client";

import { useState } from "react";
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

  return (
    <>
      {/* Banner */}
      <a 
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
          transition: 'opacity 0.2s',
        }}
      >
        Get up to $100 of BTC to swap, stake, spend and more via Ledger Wallet™
        <span style={{ 
          marginLeft: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '13px'
        }}>
          Bitcoin bonus
        </span>
      </a>

      {/* Header */}
      <header style={{
        background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        width: '100%',
      }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src="/images/ledger-logo-long.svg"
              alt="Ledger"
              width={100}
              height={20}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navigation.map((item) => (
              <div
                key={item.name}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.items && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
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
                    transition: 'opacity 0.2s',
                  }}
                >
                  {item.name}
                  {item.items && <span style={{ fontSize: '10px' }}>▼</span>}
                </button>

                {/* Dropdown */}
                {item.items && activeDropdown === item.name && (
                  <div style={{
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
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.name}
                          href="#"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'background 0.2s',
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
                                <span style={{
                                  background: 'rgb(212, 160, 255)',
                                  color: '#000',
                                  fontSize: '11px',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontWeight: 500,
                                }}>
                                  {subItem.badge}
                                </span>
                              )}
                            </div>
                            <p style={{ color: 'rgb(148, 148, 148)', fontSize: '13px', marginTop: '4px' }}>
                              {subItem.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#"
            style={{
              background: '#fff',
              color: '#000',
              padding: '14px 28px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
          >
            Buy Now
          </a>

          {/* Mobile menu button */}
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
      </header>
    </>
  );
}
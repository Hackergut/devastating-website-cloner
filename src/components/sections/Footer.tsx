import Image from "next/image";

const footerLinks = {
  products: [
    { name: "Secure touchscreen signers", href: "#" },
    { name: "Hardware Wallet", href: "#" },
    { name: "Ledger Nano Gen5", href: "#" },
    { name: "Ledger Stax", href: "#" },
    { name: "Ledger Flex", href: "#" },
    { name: "Ledger Nano Classics", href: "#" },
    { name: "Compare our devices", href: "#" },
    { name: "Bundles", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "All products", href: "#" },
    { name: "Downloads", href: "#" }
  ],
  cryptoAssets: [
    { name: "Bitcoin wallet", href: "#" },
    { name: "Ethereum wallet", href: "#" },
    { name: "Solana wallet", href: "#" },
    { name: "Cardano wallet", href: "#" },
    { name: "XRP wallet", href: "#" },
    { name: "Monero wallet", href: "#" },
    { name: "USDT wallet", href: "#" },
    { name: "See all assets", href: "#" },
    { name: "Crypto Wallet", href: "#" }
  ],
  getStarted: [
    { name: "Start using your Ledger device", href: "#" },
    { name: "Compatible wallets and services", href: "#" },
    { name: "How to buy Bitcoin", href: "#" },
    { name: "Bitcoin Hardware Wallet", href: "#" }
  ],
  business: [
    { name: "Ledger Enterprise Solutions", href: "#" }
  ],
  about: [
    { name: "Our vision", href: "#" },
    { name: "Ledger Academy", href: "#" },
    { name: "The company", href: "#" },
    { name: "Blog", href: "#" }
  ],
  legal: [
    { name: "Legal Center", href: "#" },
    { name: "Sales Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Disclaimers", href: "#" }
  ]
};

const socialLinks = [
  { name: "Reddit", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "TikTok", href: "#" }
];

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(123deg, rgb(10, 10, 10), rgb(38, 38, 38))',
      color: '#fff',
      padding: '80px 0 40px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr repeat(4, 1fr)',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Logo & Newsletter */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Image
                src="/images/ledger-logo-long.svg"
                alt="Ledger"
                width={100}
                height={20}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p style={{
              fontSize: '14px',
              color: 'rgb(148, 148, 148)',
              marginBottom: '16px',
            }}>
              Subscribe to our newsletter
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '100px',
                  padding: '12px 20px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  flex: 1,
                }}
              />
              <button
                style={{
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    transition: 'background 0.2s',
                  }}
                >
                  {social.name.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Products</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.products.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: 'rgb(148, 148, 148)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Crypto Assets */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Crypto Assets</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.cryptoAssets.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: 'rgb(148, 148, 148)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started + Business */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Get started</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.getStarted.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: 'rgb(148, 148, 148)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', marginTop: '24px' }}>
              For Business
            </h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.business.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: 'rgb(148, 148, 148)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About + Legal */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>About</h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.about.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: 'rgb(148, 148, 148)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', marginTop: '24px' }}>
              Legal
            </h3>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.legal.map((link) => (
                <li key={link.name} style={{ marginBottom: '8px' }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '14px',
                      color: 'rgb(148, 148, 148)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontSize: '13px',
            color: 'rgb(148, 148, 148)',
          }}>
            Copyright © Ledger SAS. All rights reserved.
          </p>
          <Image
            src="/images/payment-methods-logos.webp"
            alt="Payment methods"
            width={200}
            height={24}
            style={{ opacity: 0.8 }}
          />
        </div>
      </div>
    </footer>
  );
}
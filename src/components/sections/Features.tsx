import Image from "next/image";

const cryptoAssets = [
  { name: "Bitcoin", logo: "/images/Bitcoin-Logo.webp" },
  { name: "Ethereum", logo: "/images/Ethereum-logo.png" },
  { name: "XRP", logo: "/images/XRP-logo.png" },
  { name: "TRON", logo: "/images/Tron-Logo.png" },
  { name: "Tether", logo: "/images/SizeXL-TypeCoin-AssetUSDT.png" },
  { name: "BNB", logo: "/images/bnb-logo.webp" },
  { name: "Solana", logo: "/images/Solana-logo.png" },
  { name: "Cardano", logo: "/images/Cardano-logo.png" },
  { name: "Dogecoin", logo: "/images/Doge-Logo.png" },
  { name: "Chainlink", logo: "/images/Chainlink-logo.png" },
  { name: "Polygon", logo: "/images/matic-token-icon.png" },
  { name: "Polkadot", logo: "/images/Polkadot-logo.png" },
  { name: "Wrapped Bitcoin", logo: "/images/Wrapped-Bitcoin-logo-1.png" },
  { name: "Litecoin", logo: "/images/litecoin.png" },
  { name: "Dai", logo: "/images/Dai-logo.png" },
  { name: "Shiba Inu", logo: "/images/shiba.png" },
  { name: "Uniswap", logo: "/images/Uniswap-logo.png" },
  { name: "Optimism", logo: "/images/Optimism.png" },
  { name: "Arbitrum", logo: "/images/Arbitrum-logo.png" },
  { name: "USD Coin", logo: "/images/USD_Coin_icon.png" }
];

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgb(212, 160, 255)" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
    ),
    title: "More clarity",
    description: "Faster trades with real time market and portfolio insights."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgb(212, 160, 255)" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
      </svg>
    ),
    title: "More choice",
    description: "Navigate dApps with ease. Compare top service providers across chains."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgb(212, 160, 255)" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: "More control",
    description: "Swap smarter. Earn more simply. Spend daily."
  }
];

export default function Features() {
  return (
    <>
      {/* Manage Crypto */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '16px',
            }}>
              Manage 15,000+ crypto daily
            </h2>
            <p style={{ fontSize: '16px', color: 'rgb(85, 85, 85)' }}>
              Bitcoin, Ethereum, Solana, XRP, stablecoins... you name it, it&apos;s here.
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            marginBottom: '48px',
          }}>
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: 'center',
                  padding: '32px',
                  borderRadius: '24px',
                  background: 'rgb(250, 250, 250)',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgb(85, 85, 85)', lineHeight: '1.5' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Crypto Logos */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p style={{ fontSize: '14px', color: 'rgb(148, 148, 148)', marginBottom: '24px' }}>
              Supports
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: '24px',
              justifyItems: 'center',
            }}>
              {cryptoAssets.map((asset) => (
                <div
                  key={asset.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Image
                    src={asset.logo}
                    alt={asset.name}
                    width={32}
                    height={32}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="#"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: '1px solid #000',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              See all supported cryptos
            </a>
          </div>
        </div>
      </section>

      {/* Card Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'rgb(250, 250, 250)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            {/* Left - Content */}
            <div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 700,
                marginBottom: '24px',
                lineHeight: '1.2',
              }}>
                Get cashback. Use crypto daily
              </h2>
              <p style={{
                fontSize: '16px',
                color: 'rgb(85, 85, 85)',
                lineHeight: '1.6',
                marginBottom: '32px',
              }}>
                Pay everywhere you go with a simple tap. Collect rewards in stablecoins or BTC.
              </p>
              <a
                href="#"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  border: '1px solid #000',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Free crypto card
              </a>
            </div>

            {/* Right - Image */}
            <div>
              <Image
                src="/images/top_up_desktop.webp"
                alt="Ledger Wallet Features"
                width={600}
                height={400}
                style={{ borderRadius: '24px', width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
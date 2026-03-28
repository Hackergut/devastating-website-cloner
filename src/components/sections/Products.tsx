import Image from "next/image";

const products = [
  {
    name: "Ledger Stax™",
    description: "Premium from every angle, the elegant way to diversify your wealth and explore DeFi.",
    features: ["3.7\" curved screen"],
    image: "/images/stax_3x.webp"
  },
  {
    name: "Ledger Flex™",
    description: "The new standard to buy, swap, stake and build your portfolio with ease.",
    features: ["2.8\" GORILLA GLASS screen"],
    image: "/images/flex_comparison_block.webp"
  },
  {
    name: "Ledger Nano™ Gen5",
    description: "The fun, accessible way to manage your money, logins and digital life with clarity.",
    features: ["2.8\" Lightweight screen"],
    image: "/images/Nano-Gen5-visual.webp",
    isNew: true
  },
  {
    name: "Ledger Nano™ Classics",
    description: "Reliable backup signers to swap, stake and HODL at home or on the go.",
    features: ["1.1\" screen"],
    image: "/images/ledger_nanos_ranges_comparison.webp"
  }
];

export default function Products() {
  return (
    <section id="products" style={{ padding: '80px 0', backgroundColor: '#FAFAFA' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#000',
            marginBottom: '16px',
            lineHeight: '1.2',
          }}>
            Your phone alone isn&apos;t secure
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgb(85, 85, 85)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Only Ledger signers keep you safe. Don&apos;t be a victim of identity theft or wallet drains.
          </p>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }}>
          {products.map((product) => (
            <div
              key={product.name}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div style={{
                background: 'linear-gradient(135deg, rgb(250, 250, 250), rgb(244, 244, 244))',
                padding: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                position: 'relative',
              }}>
                {product.isNew && (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#000',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}>
                    New
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={150}
                  style={{ objectFit: 'contain' }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}>
                  {product.name}
                </h3>
                <ul style={{ marginBottom: '12px' }}>
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '13px',
                        color: 'rgb(85, 85, 85)',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="rgb(212, 160, 255)">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p style={{
                  fontSize: '14px',
                  color: 'rgb(85, 85, 85)',
                  marginBottom: '16px',
                  lineHeight: '1.5',
                }}>
                  {product.description}
                </p>
                <a
                  href="#"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    border: '1px solid #000',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'background 0.2s',
                  }}
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
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
            Compare Ledger signers
          </a>
        </div>
      </div>
    </section>
  );
}
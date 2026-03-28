import { Button } from "@/components/ui/button";

const features = [
  {
    icon: (
      <svg className="h-12 w-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
    ),
    title: "More clarity",
    description: "Faster trades with real time market and portfolio insights."
  },
  {
    icon: (
      <svg className="h-12 w-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
      </svg>
    ),
    title: "More choice",
    description: "Navigate dApps with ease. Compare top service providers across chains."
  },
  {
    icon: (
      <svg className="h-12 w-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: "More control",
    description: "Swap smarter. Earn more simply. Spend daily."
  }
];

const cryptoAssets = [
  { name: "Bitcoin", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/12/Bitcoin-Logo.webp" },
  { name: "Ethereum", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/12/Ethereum-logo.png" },
  { name: "XRP", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/12/XRP-logo.png" },
  { name: "TRON", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/12/Tron-Logo.png" },
  { name: "Tether", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/12/SizeXL-TypeCoin-AssetUSDT.png" },
  { name: "BNB", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/12/bnb-logo.webp" },
  { name: "Solana", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Solana-logo.png" },
  { name: "Cardano", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Cardano-logo.png" },
  { name: "Dogecoin", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Doge-Logo.png" },
  { name: "Chainlink", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Chainlink-logo.png" },
  { name: "Polygon", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/matic-token-icon.png" },
  { name: "Polkadot", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Polkadot-logo.png" },
  { name: "Wrapped Bitcoin", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Wrapped-Bitcoin-logo-1.png" },
  { name: "Litecoin", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/litecoin.png" },
  { name: "Dai", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Dai-logo.png" },
  { name: "Shiba Inu", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/shiba.png" },
  { name: "Uniswap", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/Uniswap-logo.png" },
  { name: "Optimism", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2023/05/Optimism.png" },
  { name: "Arbitrum", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2023/05/Arbitrum-logo.png" },
  { name: "USD Coin", logo: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2022/11/USD_Coin_icon.png" }
];

export default function Features() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Manage 15,000+ crypto daily
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Bitcoin, Ethereum, Solana, XRP, stablecoins... you name it, it&apos;s here.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex h-16 w-16 items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">Supports</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-8 sm:grid-cols-5 md:grid-cols-10">
            {cryptoAssets.map((asset) => (
              <div key={asset.name} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={asset.logo}
                    alt={asset.name}
                    className="h-8 w-8 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button variant="outline">
              See all supported cryptos
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get cashback. Use crypto daily
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Pay everywhere you go with a simple tap. Collect rewards in stablecoins or BTC.
              </p>
              <div className="mt-8">
                <Button variant="outline" size="lg">
                  Free crypto card
                </Button>
              </div>
            </div>
            <div>
              <img
                src="https://ledger-wp-website-s3-prd.ledger.com/uploads/2025/10/top_up_desktop.webp"
                alt="Ledger Wallet Features"
                className="w-full rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
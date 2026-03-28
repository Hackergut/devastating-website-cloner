import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Ledger Stax™",
    description: "Premium from every angle, the elegant way to diversify your wealth and explore DeFi.",
    features: ["3.7\" curved screen"],
    rating: "4.5/5",
    image: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2024/10/stax_3x.webp",
    link: "#"
  },
  {
    name: "Ledger Flex™",
    description: "The new standard to buy, swap, stake and build your portfolio with ease.",
    features: ["2.8\" GORILLA GLASS screen"],
    rating: "4.3/5",
    image: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2024/07/flex_comparison_block.webp",
    link: "#"
  },
  {
    name: "Ledger Nano™ Gen5",
    description: "The fun, accessible way to manage your money, logins and digital life with clarity.",
    features: ["2.8\" Lightweight screen"],
    rating: "4/5",
    image: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2025/10/Nano-Gen5-visual.webp",
    link: "#",
    isNew: true
  },
  {
    name: "Ledger Nano™ Classics",
    description: "Reliable backup signers to swap, stake and HODL at home or on the go.",
    features: ["1.1\" screen"],
    rating: "4.5/5",
    image: "https://ledger-wp-website-s3-prd.ledger.com/uploads/2024/07/ledger_nanos_ranges_comparison.webp",
    link: "#"
  }
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your phone alone isn&apos;t secure
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Only Ledger signers keep you safe. Don&apos;t be a victim of identity theft or wallet drains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                {product.isNew && (
                  <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    New
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <ul className="mt-3 space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <svg className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">{product.description}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" className="px-8">
            Compare Ledger signers
          </Button>
        </div>
      </div>
    </section>
  );
}
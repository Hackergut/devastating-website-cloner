import { Button } from "@/components/ui/button";

const footerLinks = {
  products: {
    title: "Products",
    links: [
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
    ]
  },
  cryptoAssets: {
    title: "Crypto Assets",
    links: [
      { name: "Bitcoin wallet", href: "#" },
      { name: "Ethereum wallet", href: "#" },
      { name: "Solana wallet", href: "#" },
      { name: "Cardano wallet", href: "#" },
      { name: "XRP wallet", href: "#" },
      { name: "Monero wallet", href: "#" },
      { name: "USDT wallet", href: "#" },
      { name: "See all assets", href: "#" },
      { name: "Crypto Wallet", href: "#" }
    ]
  },
  cryptoServices: {
    title: "Crypto Services",
    links: [
      { name: "Crypto Prices", href: "#" },
      { name: "Buying crypto", href: "#" },
      { name: "Staking crypto", href: "#" },
      { name: "Swapping crypto", href: "#" }
    ]
  },
  business: {
    title: "For Business",
    links: [
      { name: "Ledger Enterprise Solutions", href: "#" }
    ]
  },
  developers: {
    title: "For Developers",
    links: [
      { name: "The Developer Portal", href: "#" }
    ]
  },
  getStarted: {
    title: "Get started",
    links: [
      { name: "Start using your Ledger device", href: "#" },
      { name: "Compatible wallets and services", href: "#" },
      { name: "How to buy Bitcoin", href: "#" },
      { name: "Bitcoin Hardware Wallet", href: "#" }
    ]
  },
  support: {
    title: "See also",
    links: [
      { name: "Support", href: "#" },
      { name: "Bounty program", href: "#" },
      { name: "Resellers", href: "#" },
      { name: "Ledger Press Kit", href: "#" },
      { name: "Affiliates", href: "#" },
      { name: "Status", href: "#" },
      { name: "Developers", href: "#" },
      { name: "Partners", href: "#" }
    ]
  },
  careers: {
    title: "Careers",
    links: [
      { name: "Join us", href: "#" },
      { name: "All jobs", href: "#" }
    ]
  },
  about: {
    title: "About",
    links: [
      { name: "Our vision", href: "#" },
      { name: "Ledger Academy", href: "#" },
      { name: "The company", href: "#" },
      { name: "Blog", href: "#" }
    ]
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Legal Center", href: "#" },
      { name: "Sales Terms and Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Disclaimers", href: "#" }
    ]
  }
};

const socialLinks = [
  { name: "Reddit", href: "#", icon: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.742c.688 0 1.251.546 1.251 1.228 0 .67-.547 1.228-1.252 1.228-.687 0-1.25-.557-1.25-1.228 0-.67.546-1.228 1.25-1.228zm-3.52 2.728c.858 0 1.552.684 1.552 1.532v7.996c0 .848-.694 1.532-1.552 1.532s-1.552-.684-1.552-1.532V8.002c0-.848.694-1.532 1.552-1.532zm-6.896 4.84c0-.848.694-1.532 1.552-1.532s1.552.684 1.552 1.532v4.688c0 .848-.694 1.532-1.552 1.532s-1.552-.684-1.552-1.532v-4.688z" },
  { name: "Facebook", href: "#", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", href: "#", icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" },
  { name: "Twitter", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "YouTube", href: "#", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "TikTok", href: "#", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.52-.87.59-1.35 1.63-1.26 2.67.07.92.68 1.78 1.54 2.17.96.47 2.16.37 3.02-.33.68-.55 1.07-1.4 1.18-2.26.03-3.5.01-7 .02-10.5z" }
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 100 100" className="h-10 w-10" fill="currentColor">
                <circle cx="50" cy="50" r="45" fill="currentColor"/>
                <text x="50" y="65" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold">L</text>
              </svg>
              <span className="text-2xl font-bold">Ledger</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
              <Button className="bg-white text-black hover:bg-gray-200">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.products.title}</h3>
            <ul className="space-y-2">
              {footerLinks.products.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.cryptoAssets.title}</h3>
            <ul className="space-y-2">
              {footerLinks.cryptoAssets.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.getStarted.title}</h3>
            <ul className="space-y-2">
              {footerLinks.getStarted.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold mt-6 mb-4">{footerLinks.business.title}</h3>
            <ul className="space-y-2">
              {footerLinks.business.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.about.title}</h3>
            <ul className="space-y-2">
              {footerLinks.about.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold mt-6 mb-4">{footerLinks.legal.title}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              Copyright © Ledger SAS. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://www.ledger.com/wp-content/themes/ledger-v2/public/images/payment-methods-logos.webp"
                alt="Payment methods"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
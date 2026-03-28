import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'ledger-wp-website-s3-prd.ledger.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ledger.com',
      },
    ],
  },
};

export default nextConfig;

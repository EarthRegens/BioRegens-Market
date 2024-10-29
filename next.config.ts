import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['austingriffith.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.dweb.link',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.cf-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'nftstorage.link',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      }
    ],
  },
};

export default nextConfig;

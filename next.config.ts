import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/collega-ebay',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/collega-ebay`
      }
    ]
  }
};

export default nextConfig;

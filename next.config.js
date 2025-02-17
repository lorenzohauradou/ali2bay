/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/collega-ebay',
        destination: 'http://localhost:5001/collega-ebay',
      },
      {
        source: '/check-ebay-status',
        destination: 'http://localhost:5001/check-ebay-status',
      },
      {
        source: '/ebay-callback',
        destination: 'http://localhost:5001/ebay-callback',
      },
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false
}

module.exports = nextConfig 
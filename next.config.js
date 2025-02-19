/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/collega-ebay',
        destination: 'https://api.ali2bay.com/collega-ebay',
      },
      {
        source: '/check-ebay-status',
        destination: 'https://api.ali2bay.com/check-ebay-status',
      },
      {
        source: '/ebay-callback',
        destination: 'https://api.ali2bay.com/ebay-callback',
      },
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false
}

module.exports = nextConfig 
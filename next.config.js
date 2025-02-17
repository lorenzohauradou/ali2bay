/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/collega-ebay',
        destination: 'https://www.ali2bay.com/collega-ebay',
      },
      {
        source: '/check-ebay-status',
        destination: 'https://www.ali2bay.com/check-ebay-status',
      },
      {
        source: '/ebay-callback',
        destination: 'https://www.ali2bay.com/ebay-callback',
      },
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false
}

module.exports = nextConfig 
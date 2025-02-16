/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
    return [
      {
        source: '/collega-ebay',
        destination: `${apiUrl}/collega-ebay`
      },
      {
        source: '/check-ebay-status',
        destination: `${apiUrl}/check-ebay-status`
      },
      {
        source: '/ebay-callback',
        destination: `${apiUrl}/ebay-callback`
      },
      {
        source: '/scrape',
        destination: `${apiUrl}/scrape`
      }
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false
}

module.exports = nextConfig 
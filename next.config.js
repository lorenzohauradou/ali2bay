/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    return [
      {
        source: '/collega-ebay',
        destination: `${apiUrl}/collega-ebay`
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
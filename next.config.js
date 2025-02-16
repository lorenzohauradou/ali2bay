/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    return [
      {
        source: '/collega-ebay',
        destination: `${apiUrl}/collega-ebay`
      }
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false
}

module.exports = nextConfig 
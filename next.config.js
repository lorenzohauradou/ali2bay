/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.ali2bay.com'
      : 'http://localhost:5001'
    
    console.log('Using API URL:', apiUrl) // Debug log
    
    return [
      {
        source: '/collega-ebay',
        destination: `${apiUrl}/collega-ebay`,
      },
      {
        source: '/check-ebay-status',
        destination: `${apiUrl}/check-ebay-status`,
      },
      {
        source: '/ebay-callback',
        destination: `${apiUrl}/ebay-callback`,
      },
    ]
  },
  reactStrictMode: true,
  poweredByHeader: false
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/product-images/**',  // Covers all product images
      },
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

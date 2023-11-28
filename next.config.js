/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.pngwing.com',
        port: '',
        pathname: '/ko/free-png-byvir',
      },
    ],
  },
}
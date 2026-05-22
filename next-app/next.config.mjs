/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ensure only one React instance
  },
  transpilePackages: ['react-i18next', 'i18next'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.kelugroup.ch/api/:path*',
      },
    ]
  },
}

export default nextConfig
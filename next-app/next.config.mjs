import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default withNextIntl(nextConfig)
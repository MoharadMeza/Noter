/** @type {import('next').NextConfig} */

import { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Image optimization settings
  images: {
    domains: [], // Add any external image domains you need
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // API configuration
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },

  // Security headers
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },

  // Build output configuration
  output: 'standalone',

  // Enable source maps in production
  productionBrowserSourceMaps: true,
}

const withNextIntl = createNextIntlPlugin('./src/config/i18n/request.ts')

export default withNextIntl(nextConfig)

const path = require('path')
const Dotenv = require('dotenv-webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const alias = {
  '@/components': path.join(__dirname, 'components'),
  '@/containers': path.join(__dirname, 'containers'),
  '@/hooks': path.join(__dirname, 'hooks'),
  '@/props': path.join(__dirname, 'props'),
  '@/utils': path.join(__dirname, 'utils'),
  '@/store': path.join(__dirname, 'store')
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: false
      }
    ]
  },
  async headers() {
    // Read URLs from environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://simdatuk-api.ekuator.id'
    const contentUrl = process.env.NEXT_PUBLIC_CONTENT_URL || 'https://content.ekuator.id'
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://simdatuk.ekuator.id'

    const ContentSecurityPolicy = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      connect-src 'self' ${frontendUrl}/ ${apiUrl}/ https://www.google.com;
      font-src 'self' https://fonts.gstatic.com data:;
      img-src 'self' ${frontendUrl}/ ${apiUrl}/ ${contentUrl}/ data: blob:;
      frame-src 'self' https://www.google.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `

    const securityHeaders = [
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
      },
      {
        key: 'Cache-Control',
        value: 'no-store, no-cache, must-revalidate'
      },
      {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
      }
    ]

    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },
  webpack: (config) => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env.local'),
        systemvars: true
      }),
      new CaseSensitivePathsPlugin()
    ]
    config.resolve.alias = Object.assign({}, config.resolve.alias, alias)
    return config
  }
}

module.exports = nextConfig

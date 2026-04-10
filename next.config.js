/** @type {import('next').NextConfig} */
const withPWA = process.env.NODE_ENV === 'production'
  ? require('next-pwa')({
      dest: 'public',
      register: true,
      skipWaiting: true,
      runtimeCaching: [
        { urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'google-fonts', expiration: { maxEntries: 4, maxAgeSeconds: 31536000 } } },
        { urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i, handler: 'StaleWhileRevalidate', options: { cacheName: 'static-images', expiration: { maxEntries: 64, maxAgeSeconds: 2592000 } } },
        { urlPattern: /\.(?:js|css)$/i, handler: 'StaleWhileRevalidate', options: { cacheName: 'static-resources' } },
        { urlPattern: /.*/i, handler: 'NetworkFirst', options: { cacheName: 'others', networkTimeoutSeconds: 10, expiration: { maxEntries: 32, maxAgeSeconds: 86400 } } },
      ],
    })
  : (config) => config

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.in' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',       value: 'nosniff' },
          { key: 'X-Frame-Options',              value: 'DENY' },
          { key: 'X-XSS-Protection',             value: '1; mode=block' },
          { key: 'Referrer-Policy',              value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',           value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Strict-Transport-Security',    value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          { key: 'Content-Security-Policy',      value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://www.google-analytics.com; frame-ancestors 'none';" },
        ],
      },
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|otf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      { source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
    ]
  },

  async redirects() {
    return [{ source: '/:path+/', destination: '/:path+', permanent: true }]
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react', 'framer-motion', 'recharts',
      '@radix-ui/react-avatar', '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs', '@radix-ui/react-select',
    ],
  },
}

module.exports = withPWA(nextConfig)
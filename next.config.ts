import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'localhost:3000', '127.0.0.1', '127.0.0.1:3000', 'arthur-website-rho.vercel.app', 'd339edqwpgf4vl.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
}

export default withPayload(nextConfig)

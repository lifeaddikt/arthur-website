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
  },
}

export default withPayload(withPayload(nextConfig))

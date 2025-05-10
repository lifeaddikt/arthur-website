import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/nav/Navbar'
import { ThemeProvider } from 'next-themes'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arthur Paumier | Photographies',
  description:
    'Arthur Paumier\'s photography portfolio — a personal collection of visual explorations through architecture, textures, landscapes, and natural forms.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || 'https://arthur-website-rho.vercel.app'
  ),
  keywords: [
    'photography',
    'portfolio',
    'Arthur Paumier',
    'photographs',
    'photographe',
    'art',
    'visual arts',
    'architecture',
    'textures',
    'landscapes',
    'natural forms',
    'photographie',
    'french',
    'rennes',
    'france',
    'design',
    'matière',
    'noir et blanc',
    'black and white',
  ],
  authors: [{ name: 'Arthur Paumier' }],
  creator: 'Arthur Paumier',
  publisher: 'Arthur Paumier',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_URL || 'https://arthur-website-rho.vercel.app',
    title: 'Arthur Paumier | Photographies',
    description:
      'Arthur Paumier\'s photography portfolio — a personal collection of visual explorations through architecture, textures, landscapes, and natural forms.',
    siteName: 'Arthur Paumier Photography',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arthur Paumier | Photographies',
    description:
      'Arthur Paumier\'s photography portfolio — a personal collection of visual explorations through architecture, textures, landscapes, and natural forms.',
    creator: '@arthurpaumier',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arthur Paumier Photography',
    url: process.env.NEXT_PUBLIC_URL || 'https://arthur-website-rho.vercel.app',
    description:
      'Arthur Paumier\'s photography portfolio — a personal collection of visual explorations through architecture, textures, landscapes, and natural forms.',
    author: {
      '@type': 'Person',
      name: 'Arthur Paumier',
    },
  }

  return (
    <ViewTransitions>
      <html lang='en' suppressHydrationWarning>
        <head>
          <meta name='bfcache-detected' content='true' />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem={false}
          >
            <div className='flex w-[100vw] h-[100vh] overflow-hidden'>
              <Navbar />
              {children}
            </div>
          </ThemeProvider>
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  )
}

export default RootLayout

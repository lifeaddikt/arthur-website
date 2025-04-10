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
  description: 'Photographies portfolio',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || 'https://arthur-website-rho.vercel.app'
  ),
  icons: {
    icon: '/favicon.ico',
  },
}

export const headers = {
  'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  'X-Content-Type-Options': 'nosniff',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ViewTransitions>
      <html lang='en' suppressHydrationWarning>
        <head>
          <meta name='bfcache-detected' content='true' />
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

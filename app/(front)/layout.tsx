import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '@/components/nav/Navbar'
import { ThemeProvider } from 'next-themes'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'

// Preload essential fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arthur Paumier | Portfolio',
  description: 'Photographies portfolio',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://arthur-website-rho.vercel.app'),
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
          <meta name="bfcache-detected" content="true" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
            <div className='flex w-[100vw] h-[100vh] overflow-hidden'>
              <Navbar />
              {children}
            </div>
          </ThemeProvider>
          <SpeedInsights />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Support back/forward cache
                window.addEventListener('pageshow', (event) => {
                  if (event.persisted) {
                    // Page was restored from bfcache
                    document.dispatchEvent(new CustomEvent('bfcache:restore'));
                  }
                });
              `,
            }}
          />
        </body>
      </html>
    </ViewTransitions>
  )
}

export default RootLayout
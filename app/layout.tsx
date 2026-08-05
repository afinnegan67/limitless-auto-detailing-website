import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', weight: ['500', '600'] })

export const metadata: Metadata = {
  title: 'Limitless Auto Detailing | Mobile Car Detailing in Seattle, WA',
  description: 'Professional mobile auto detailing at your Seattle-area home or office. Interior resets, complete details, paint protection, and maintenance.',
  openGraph: {
    title: 'Limitless Auto Detailing | Seattle Mobile Detailing',
    description: 'Professional vehicle care brought directly to your home or office.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08110c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background ${geist.variable} ${geistMono.variable} ${cormorant.variable}`}>
      <body>
        {children}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}

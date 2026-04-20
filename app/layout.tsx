import type { Metadata, Viewport } from 'next'
import { Inter_Tight, Fraunces } from 'next/font/google'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Noma Resorts · The $10K Challenge',
  description: 'A season of adventure. Complete missions with your team. Win extraordinary.',
}

export const viewport: Viewport = {
  themeColor: '#0A0908',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${fraunces.variable}`}>
      <body className="bg-[#0A0908] text-[#F3EFE6] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

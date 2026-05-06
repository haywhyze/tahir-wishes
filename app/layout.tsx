import type { Metadata } from 'next'
import { Cormorant_Garamond, Italiana, Montserrat } from 'next/font/google'
import './globals.css'

const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tahir is One — Send a Wish',
  description:
    "Tahir's 1st birthday — Birthday Soirée on 06 May 2026. Leave a wish for our little prince.",
  openGraph: {
    title: 'Tahir is One — Send a Wish',
    description: "Birthday Soirée · 06.05.2026 · Cave Lux, Fortunate Hub, Ilorin",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${italiana.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}

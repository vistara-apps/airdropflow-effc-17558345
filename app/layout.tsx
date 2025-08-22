
import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@coinbase/onchainkit/styles.css'
import { Providers } from './providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'AirdropFlow - Streamline Your Crypto Airdrops',
  description: 'A platform for creating and managing crypto airdrops with gated claim pages and referral systems, targeting token distribution and community growth.',
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: `${process.env.NEXT_PUBLIC_URL}/og-image.png`,
      button: {
        title: 'Launch AirdropFlow',
        action: {
          type: 'launch_frame',
          name: 'AirdropFlow',
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: `${process.env.NEXT_PUBLIC_URL}/splash.png`,
          splashBackgroundColor: '#f8fafc',
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

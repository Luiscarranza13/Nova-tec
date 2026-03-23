import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.mx'),
  title: {
    default: 'NovaTec | Desarrollo de Software Premium',
    template: '%s | NovaTec',
  },
  description: 'Transformamos Ideas en Software Excepcional. Desarrollo web, móvil y soluciones tecnológicas de alto nivel para tu empresa.',
  keywords: ['desarrollo de software', 'desarrollo web', 'desarrollo móvil', 'consultoría tecnológica', 'NovaTec'],
  authors: [{ name: 'NovaTec' }],
  creator: 'NovaTec',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://novatec.mx',
    siteName: 'NovaTec',
    title: 'NovaTec | Desarrollo de Software Premium',
    description: 'Transformamos Ideas en Software Excepcional.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NovaTec',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NovaTec | Desarrollo de Software Premium',
    description: 'Transformamos Ideas en Software Excepcional.',
    images: ['/og-image.png'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}

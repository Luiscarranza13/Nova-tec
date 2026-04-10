import type { Metadata, Viewport } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieConsent } from '@/components/ui/cookie-consent'
import { DotNavigation } from '@/components/ui/dot-navigation'
import './globals.css'

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Inter: best-in-class body font — used by Vercel, Linear, Notion
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
  weight: ['600', '700', '800'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
})

// ─── Site config ──────────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.pe'
const SITE_NAME = 'NovaTec'
const SITE_DESCRIPTION =
  'Transformamos ideas en software excepcional. Desarrollo web, móvil y soluciones tecnológicas de alto nivel para empresas en Cajamarca y todo el Perú.'

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#0d1117' },
  ],
}

// ─── Root metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Desarrollo de Software en Cajamarca, Perú`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'desarrollo de software Cajamarca',
    'desarrollo web Perú',
    'aplicaciones móviles Cajamarca',
    'diseño UI UX',
    'software a medida',
    'consultoría tecnológica',
    'NovaTec',
    'Senati Cajamarca',
    'empresa de tecnología Perú',
    'desarrollo web profesional',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  alternates: {
    canonical: SITE_URL,
    languages: { 'es-PE': SITE_URL },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Desarrollo de Software en Cajamarca, Perú`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `/og?title=${encodeURIComponent(SITE_NAME + ' — Desarrollo de Software')}&description=${encodeURIComponent(SITE_DESCRIPTION)}`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Desarrollo de Software Premium en Cajamarca`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Desarrollo de Software en Cajamarca`,
    description: SITE_DESCRIPTION,
    images: [`/og?title=${encodeURIComponent(SITE_NAME + ' — Desarrollo de Software')}`],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

// ─── JSON-LD structured data ──────────────────────────────────────────────────
const jsonLd = [
  // LocalBusiness — better for local SEO than generic Organization
  {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SoftwareApplication'],
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
    },
    image: `${SITE_URL}/og-image.png`,
    description: SITE_DESCRIPTION,
    telephone: '+51-918-146-783',
    email: 'NovaTec.Empresarial@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Senati Cajamarca',
      addressLocality: 'Cajamarca',
      addressRegion: 'Cajamarca',
      addressCountry: 'PE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.1638,
      longitude: -78.5001,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
    currenciesAccepted: 'PEN',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: {
      '@type': 'Country',
      name: 'Perú',
    },
    serviceType: [
      'Desarrollo Web',
      'Desarrollo Móvil',
      'Software a Medida',
      'Diseño UI/UX',
      'Consultoría Tecnológica',
    ],
    sameAs: [],
  },
  // WebSite with SearchAction for sitelinks searchbox
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'es-PE',
    publisher: { '@id': `${SITE_URL}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/portafolio?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
]

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://supabase.co" />
        <meta name="format-detection" content="telephone=no" />
        {/* CSP + COOP for Best Practices */}
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieConsent />
          <DotNavigation />
        </Providers>
      </body>
    </html>
  )
}

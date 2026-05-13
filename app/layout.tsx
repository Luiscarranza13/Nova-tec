import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";

import { CookieConsent } from "@/components/ui/cookie-consent";
import { DotNavigation } from "@/components/ui/dot-navigation";
import "./globals.css";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  preload: false,
  weight: ["600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.novatec.ink"
).trim();
const SITE_NAME = "NovaTec";
const SITE_TAGLINE = "Agencia de Desarrollo de Software en Cajamarca, Perú";
const SITE_DESCRIPTION =
  "NovaTec — Agencia líder de desarrollo de software, páginas web y aplicaciones móviles en Cajamarca, Perú. Creamos sistemas a medida, e-commerce, apps iOS/Android y soluciones tecnológicas que hacen crecer tu empresa. Cotiza gratis hoy.";

// Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

// Root metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `NovaTec | Desarrollo de Software y Páginas Web en Cajamarca, Perú`,
    template: `%s | NovaTec — Desarrollo de Software Perú`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // Marca propia (superar a novatec.click)
    "NovaTec",
    "NovaTec Perú",
    "NovaTec Cajamarca",
    "NovaTec desarrollo web",
    "NovaTec software",
    "novatec.ink",
    // Servicios core
    "desarrollo de software Cajamarca",
    "desarrollo de software Perú",
    "agencia de desarrollo web Cajamarca",
    "agencia de desarrollo web Perú",
    "páginas web Cajamarca",
    "páginas web para empresas Perú",
    "creación de páginas web corporativas",
    "diseño web profesional Cajamarca",
    "diseño web Perú",
    // Aplicaciones
    "aplicaciones móviles Perú",
    "desarrollo de apps iOS Android Perú",
    "aplicaciones a medida Cajamarca",
    // Software
    "sistemas a medida Perú",
    "software empresarial Cajamarca",
    "desarrollo de sistemas ERP Perú",
    "software de gestión empresarial",
    "automatización de procesos empresariales",
    // E-commerce
    "tienda online Perú",
    "e-commerce Cajamarca",
    "desarrollo de tiendas virtuales",
    // Consultoría
    "consultoría tecnológica empresarial Perú",
    "transformación digital empresas Perú",
    "empresas de tecnología en Cajamarca",
    // Long-tail locales
    "empresa de software en Cajamarca",
    "programadores web Cajamarca",
    "desarrolladores web Perú",
    "agencia digital Cajamarca",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
    languages: { "es-PE": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: `${SITE_NAME} — ${SITE_TAGLINE}`,
    title: `NovaTec | Agencia de Desarrollo de Software en Cajamarca, Perú`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          "NovaTec — Desarrollo de Software en Cajamarca"
        )}&description=${encodeURIComponent(SITE_DESCRIPTION)}`,
        width: 1200,
        height: 630,
        alt: `NovaTec — Agencia de Desarrollo de Software en Cajamarca, Perú`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `NovaTec | Desarrollo de Software y Web en Cajamarca, Perú`,
    description: SITE_DESCRIPTION,
    images: [
      `/og?title=${encodeURIComponent(
        "NovaTec — Desarrollo de Software Cajamarca"
      )}`,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// JSON-LD structured data
const jsonLd = [
  // 1. ProfessionalService + LocalBusiness (máxima relevancia local)
  {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: "NovaTec",
    alternateName: ["NovaTec Perú", "NovaTec Cajamarca", "NovaTec Software"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    slogan: "Desarrollo de Software que hace crecer tu empresa",
    telephone: "+51-918-146-783",
    email: "NovaTec.Empresarial@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Senati Cajamarca",
      addressLocality: "Cajamarca",
      addressRegion: "Cajamarca",
      postalCode: "06001",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -7.1638,
      longitude: -78.5001,
    },
    hasMap: "https://maps.google.com/?q=-7.1638,-78.5001",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "PEN",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, Yape, Plin",
    areaServed: [
      { "@type": "City", name: "Cajamarca" },
      { "@type": "State", name: "Cajamarca" },
      { "@type": "Country", name: "Perú" },
    ],
    knowsAbout: [
      "Desarrollo Web",
      "Desarrollo de Software",
      "Aplicaciones Móviles",
      "Software a Medida",
      "Diseño UI/UX",
      "Consultoría Tecnológica",
      "E-commerce",
      "Sistemas ERP",
      "Next.js",
      "React",
      "Node.js",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Desarrollo de Software",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo Web Profesional",
            description:
              "Páginas web corporativas, e-commerce y aplicaciones web modernas con Next.js y React en Cajamarca, Perú.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Aplicaciones Móviles iOS y Android",
            description:
              "Apps nativas y multiplataforma para iOS y Android desarrolladas en Perú.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software a Medida",
            description:
              "Sistemas ERP, CRM y software empresarial personalizado para empresas peruanas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diseño UI/UX",
            description:
              "Diseño de interfaces y experiencia de usuario profesional.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Consultoría Tecnológica",
            description:
              "Asesoría en arquitectura de software y transformación digital para empresas en Perú.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/novatec",
      "https://www.linkedin.com/company/novatec-peru",
    ],
  },
  // 2. WebSite con SearchAction (sitelinks searchbox en Google)
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "NovaTec — Desarrollo de Software en Cajamarca, Perú",
    description: SITE_DESCRIPTION,
    inLanguage: "es-PE",
    publisher: { "@id": `${SITE_URL}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/portafolio?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  // 3. Organization (para Knowledge Panel + logo en Google)
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "NovaTec",
    url: SITE_URL,
    // PNG requerido para que Google muestre el logo en resultados
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-918-146-783",
      contactType: "customer service",
      areaServed: "PE",
      availableLanguage: "Spanish",
    },
    foundingDate: "2016",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cajamarca",
      addressRegion: "Cajamarca",
      addressCountry: "PE",
    },
    sameAs: [
      "https://www.facebook.com/novatec",
      "https://www.linkedin.com/company/novatec-peru",
    ],
  },
  // 4. SiteLinksSearchBox — genera los subtítulos de páginas en Google
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NovaTec — Páginas principales",
    itemListElement: [
      {
        "@type": "SiteLinksSearchBox",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/portafolio?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  },
];

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/3dc379dc9b5dec12-s.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/e4af272ccee01ff0-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta
          httpEquiv="Cross-Origin-Opener-Policy"
          content="same-origin-allow-popups"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        <FacebookPixel />
        <Providers
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <CookieConsent />
          <DotNavigation />
        </Providers>
      </body>
    </html>
  );
}

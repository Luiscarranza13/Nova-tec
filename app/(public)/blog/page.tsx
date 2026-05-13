import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlogList } from '@/components/blog/BlogList'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

export const metadata: Metadata = {
  title: 'Blog de Tecnología y Desarrollo Web en Perú | NovaTec',
  description:
    'Artículos sobre desarrollo web, apps móviles, diseño UI/UX y tecnología para empresas en Cajamarca y Perú. Tips, tendencias y casos de éxito de NovaTec.',
  keywords: [
    'blog desarrollo web Perú',
    'tips tecnología empresas Cajamarca',
    'tendencias software Perú',
    'NovaTec blog',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog de Tecnología | NovaTec Cajamarca, Perú',
    description:
      'Artículos sobre desarrollo web, apps móviles y tecnología para empresas en Cajamarca y Perú.',
    images: [{ url: '/og?title=Blog NovaTec&description=Tips y tendencias tech para tu negocio', width: 1200, height: 630 }],
  },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-24 pb-32">
        <div className="container max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          <BlogList />
        </div>
      </main>
      <Footer />
    </>
  )
}

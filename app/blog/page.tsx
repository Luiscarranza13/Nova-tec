import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlogList } from '@/components/blog/BlogList'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

export const metadata: Metadata = {
  title: 'Blog — Tips y Tendencias Tech',
  description: 'Artículos sobre desarrollo web, móvil, diseño UI/UX y tecnología para empresas.',
  openGraph: {
    title: 'Blog NovaTec — Tips y Tendencias Tech',
    description: 'Artículos sobre desarrollo web, móvil, diseño UI/UX y tecnología.',
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

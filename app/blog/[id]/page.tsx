import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ArticleSchema } from '@/components/seo/SchemaMarkup'
import { BLOG_POSTS } from '@/lib/constants'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Extended posts map (same as BlogList)
const ALL_POSTS = [
  ...BLOG_POSTS,
  { id: 4,  title: 'Cómo elegir el stack tecnológico para tu startup',       excerpt: 'Guía práctica para seleccionar las tecnologías correctas según el tipo y escala de tu proyecto.',                    category: 'desarrollo', publishedAt: '2024-02-20', readTime: 10, featured: false },
  { id: 5,  title: 'Diseño UI/UX: Los 10 principios que debes conocer',      excerpt: 'Los fundamentos del diseño de interfaces que marcan la diferencia entre una app buena y una excelente.',             category: 'diseño',     publishedAt: '2024-02-15', readTime: 7,  featured: false },
  { id: 6,  title: 'AWS vs GCP vs Azure: ¿Cuál elegir en 2024?',             excerpt: 'Comparativa detallada de los tres grandes proveedores cloud para ayudarte a tomar la mejor decisión.',               category: 'cloud',      publishedAt: '2024-02-10', readTime: 14, featured: false },
]

export async function generateStaticParams() {
  return ALL_POSTS.map(p => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = ALL_POSTS.find(p => String(p.id) === params.id)
  if (!post) return { title: 'Post no encontrado' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.excerpt)}`, width: 1200, height: 630 }],
    },
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = ALL_POSTS.find(p => String(p.id) === params.id)
  if (!post) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.pe'

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        publishedAt={post.publishedAt}
        url={`${SITE_URL}/blog/${post.id}`}
      />
      <Header />
      <main id="main-content" className="min-h-screen pt-24 pb-32">
        <div className="container max-w-3xl mx-auto px-4">
          <Breadcrumbs />

          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2 mb-8 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Volver al blog
            </Button>
          </Link>

          <article>
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} min de lectura
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-6">{post.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 border-l-4 border-primary pl-5">{post.excerpt}</p>

            {/* Placeholder content */}
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
              <p>Este artículo está disponible en la versión completa del blog. El contenido completo se gestiona desde el panel de administración.</p>
              <p>Para leer el artículo completo, visita nuestro blog o contáctanos directamente.</p>
            </div>
          </article>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm text-center">
            <p className="text-lg font-semibold mb-2">¿Te gustó este artículo?</p>
            <p className="text-muted-foreground mb-6">Suscríbete para recibir más contenido como este directamente en tu email.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/blog"><Button variant="outline">Ver más artículos</Button></Link>
              <Link href="/contacto"><Button>Hablar con nosotros</Button></Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

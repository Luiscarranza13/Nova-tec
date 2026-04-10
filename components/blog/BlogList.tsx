'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calendar, Clock, Tag, ArrowRight, BookOpen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BLOG_POSTS } from '@/lib/constants'
import { useDebounce } from '@/lib/hooks/use-debounce'
import Link from 'next/link'

const CATEGORIES = ['Todos', 'desarrollo', 'frontend', 'marketing', 'diseño', 'cloud']
const POSTS_PER_PAGE = 6

// Extended mock posts for the full blog page
const ALL_POSTS = [
  ...BLOG_POSTS,
  { id: 4,  title: 'Cómo elegir el stack tecnológico para tu startup',       excerpt: 'Guía práctica para seleccionar las tecnologías correctas según el tipo y escala de tu proyecto.',                    category: 'desarrollo', publishedAt: '2024-02-20', readTime: 10, featured: false },
  { id: 5,  title: 'Diseño UI/UX: Los 10 principios que debes conocer',      excerpt: 'Los fundamentos del diseño de interfaces que marcan la diferencia entre una app buena y una excelente.',             category: 'diseño',     publishedAt: '2024-02-15', readTime: 7,  featured: false },
  { id: 6,  title: 'AWS vs GCP vs Azure: ¿Cuál elegir en 2024?',             excerpt: 'Comparativa detallada de los tres grandes proveedores cloud para ayudarte a tomar la mejor decisión.',               category: 'cloud',      publishedAt: '2024-02-10', readTime: 14, featured: false },
  { id: 7,  title: 'React Query vs SWR: Gestión de estado del servidor',     excerpt: 'Análisis profundo de las dos librerías más populares para manejo de datos asíncronos en React.',                    category: 'frontend',   publishedAt: '2024-02-05', readTime: 9,  featured: false },
  { id: 8,  title: 'Cómo aumentar conversiones con landing pages efectivas', excerpt: 'Estrategias probadas de CRO para transformar visitantes en clientes con páginas de aterrizaje optimizadas.',         category: 'marketing',  publishedAt: '2024-01-28', readTime: 11, featured: false },
  { id: 9,  title: 'TypeScript en 2024: Features que debes usar ya',         excerpt: 'Las características más útiles de TypeScript que mejorarán la calidad y mantenibilidad de tu código.',               category: 'desarrollo', publishedAt: '2024-01-20', readTime: 8,  featured: false },
  { id: 10, title: 'Microservicios vs Monolito: Cuándo usar cada uno',       excerpt: 'Análisis honesto de ambas arquitecturas con casos de uso reales para ayudarte a decidir.',                           category: 'desarrollo', publishedAt: '2024-01-15', readTime: 12, featured: false },
  { id: 11, title: 'Tailwind CSS: Por qué lo usamos en todos nuestros proyectos', excerpt: 'Nuestra experiencia usando Tailwind en producción y por qué lo recomendamos sobre CSS tradicional.',           category: 'frontend',   publishedAt: '2024-01-10', readTime: 6,  featured: false },
]

const categoryColors: Record<string, string> = {
  desarrollo: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  frontend:   'bg-violet-500/10 text-violet-500 border-violet-500/20',
  marketing:  'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  diseño:     'bg-pink-500/10 text-pink-500 border-pink-500/20',
  cloud:      'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
}

export function BlogList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return ALL_POSTS.filter(p => {
      const matchCat = category === 'Todos' || p.category === category
      const matchSearch = !debouncedSearch ||
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase())
      return matchCat && matchSearch
    })
  }, [category, debouncedSearch])

  const paginated = filtered.slice(0, page * POSTS_PER_PAGE)
  const hasMore = paginated.length < filtered.length

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          <span className="w-8 h-px bg-primary" />Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
          Artículos y Tips
          <br /><span className="text-gradient">para tu negocio</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Contenido sobre desarrollo, diseño y tecnología para impulsar tu empresa.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar artículos..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No se encontraron artículos</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post, idx) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Color bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${
                  post.category === 'desarrollo' ? 'from-blue-500 to-cyan-500' :
                  post.category === 'frontend'   ? 'from-violet-500 to-purple-500' :
                  post.category === 'marketing'  ? 'from-emerald-500 to-teal-500' :
                  post.category === 'diseño'     ? 'from-pink-500 to-rose-500' :
                  'from-cyan-500 to-sky-500'
                }`} />

                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime} min
                    </span>
                  </div>

                  <h2 className="text-lg font-bold font-heading mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${categoryColors[post.category] || 'bg-muted text-muted-foreground border-border'}`}>
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                    <Link href={`/blog/${post.id}`} className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all group-hover:gap-2">
                      Leer más <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setPage(p => p + 1)} className="gap-2 rounded-xl">
            Cargar más artículos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Mostrando {paginated.length} de {filtered.length} artículos
      </p>
    </div>
  )
}

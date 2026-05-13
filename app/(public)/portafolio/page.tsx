'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTA } from '@/components/home/CTA'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ExternalLink, FolderKanban, ArrowRight, Zap, Loader2 } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// ── Fallback images ──────────────────────────────────────────────────────────
const fallbackImages = [
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
]

// ── Estado config ────────────────────────────────────────────────────────────
const estadoConfig: Record<string, { label: string; color: string; dot: string }> = {
  pendiente:   { label: 'Pendiente',   color: 'bg-yellow-500/15 text-yellow-600 border-yellow-500/20', dot: 'bg-yellow-500' },
  en_progreso: { label: 'En Progreso', color: 'bg-blue-500/15 text-blue-600 border-blue-500/20',       dot: 'bg-blue-500' },
  en_revision: { label: 'En Revisión', color: 'bg-purple-500/15 text-purple-600 border-purple-500/20', dot: 'bg-purple-500' },
  completado:  { label: 'Completado',  color: 'bg-green-500/15 text-green-600 border-green-500/20',    dot: 'bg-green-500' },
  cancelado:   { label: 'Cancelado',   color: 'bg-red-500/15 text-red-600 border-red-500/20',          dot: 'bg-red-500' },
}

const FILTERS = ['Todos', 'En Progreso', 'Completado', 'En Revisión']

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PortafolioPage() {
  const [proyectos, setProyectos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Todos')

  useEffect(() => {
    const cargar = async () => {
      setLoading(true)
      try {
        // Usar service role key (JWT válido) para evitar problemas con sb_publishable
        const client = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data, error } = await client
          .from('proyectos')
          .select('*')
          .order('creado_en', { ascending: false })

        if (error) {
          console.error('Supabase error:', error.message)
          setLoading(false)
          return
        }

        const list = (data || []).map((p: any) => ({
          ...p,
          descripcion: p.descripcion ?? p.descripción ?? null,
          tecnologias: p.tecnologias ?? p.tecnologías ?? [],
          estado: (p.estado ?? p.Estado ?? 'pendiente').toLowerCase(),
        }))

        setProyectos(list)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  const filtered = activeFilter === 'Todos'
    ? proyectos
    : proyectos.filter(p => {
        const e = p.estado
        if (activeFilter === 'En Progreso')  return e === 'en_progreso'
        if (activeFilter === 'Completado')   return e === 'completado'
        if (activeFilter === 'En Revisión')  return e === 'en_revision'
        return false
      })

  const featured = proyectos.find(p => p.estado === 'completado') ?? proyectos[0] ?? null

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="bg-white pt-20 pb-8">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4"
            >
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Nuestro trabajo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-tight mb-3"
            >
              Proyectos que{' '}
              <span className="text-gradient">hablan por sí solos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground max-w-lg mx-auto mb-6"
            >
              Cada proyecto es una historia de transformación digital.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto"
            >
              {[['250+', 'Proyectos'], ['120+', 'Clientes'], ['98%', 'Éxito'], ['8+', 'Años']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-lg font-bold font-heading text-gradient">{v}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Proyecto destacado ── */}
        {!loading && featured && (
          <section className="bg-white pb-6">
            <div className="container max-w-7xl mx-auto px-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-primary" />Proyecto destacado
              </p>
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-52 sm:h-64 lg:h-auto min-h-[220px] bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.url_demo
                        ? `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(featured.url_demo)}?w=1200`
                        : (featured.imagen_url || fallbackImages[0])}
                      alt={featured.nombre}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {featured.estado && estadoConfig[featured.estado] && (
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md uppercase tracking-tight ${estadoConfig[featured.estado].color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${estadoConfig[featured.estado].dot} animate-pulse`} />
                          {estadoConfig[featured.estado].label}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-7 flex flex-col justify-center">
                    <h2 className="text-xl font-bold font-heading mb-2 text-slate-900">{featured.nombre}</h2>
                    {featured.descripcion && (
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">{featured.descripcion}</p>
                    )}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Progreso</span>
                        <span className="font-bold text-primary">{featured.progreso ?? 0}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${featured.progreso ?? 0}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full"
                        />
                      </div>
                    </div>
                    {featured.tecnologias?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {featured.tecnologias.map((t: string) => (
                          <span key={t} className="px-2 py-0.5 text-xs rounded border border-slate-200 bg-slate-50 text-slate-600">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {featured.url_demo && (
                        <a href={featured.url_demo} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="gap-1.5">Ver demo <ExternalLink className="h-3.5 w-3.5" /></Button>
                        </a>
                      )}
                      <Link href="/contacto">
                        <Button size="sm" variant="outline" className="gap-1.5 border-slate-200 text-slate-600">
                          Quiero algo así <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Filter bar — sticky justo encima del grid ── */}
        <div className="bg-white border-y border-slate-200/60 shadow-sm sticky top-16 md:top-[4.5rem] z-30">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2.5">
              {FILTERS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-primary text-white shadow-sm shadow-primary/20'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid de proyectos ── */}
        <section className="bg-slate-50/50 py-6">
          <div className="container max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Cargando proyectos...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 rounded-full bg-white shadow-sm mb-3">
                  <FolderKanban className="h-8 w-8 text-slate-300" />
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {proyectos.length === 0 ? 'No hay proyectos disponibles aún' : `No hay proyectos en "${activeFilter}"`}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {proyectos.length === 0 ? 'Vuelve pronto para ver nuestros trabajos.' : 'Prueba con otro filtro.'}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((project, index) => {
                    const cfg = estadoConfig[project.estado]
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, delay: index * 0.04 }}
                        className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300"
                      >
                        <div className="relative h-40 overflow-hidden bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.url_demo
                              ? `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(project.url_demo)}?w=800`
                              : (project.imagen_url || fallbackImages[index % fallbackImages.length])}
                            alt={project.nombre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {cfg && (
                            <div className="absolute top-2.5 left-2.5">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md uppercase ${cfg.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                {cfg.label}
                              </span>
                            </div>
                          )}
                          {project.url_demo && (
                            <a
                              href={project.url_demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 opacity-0 group-hover:opacity-100 transition-all hover:text-primary"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="text-sm font-bold font-heading mb-1 text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                            {project.nombre}
                          </h3>
                          {project.descripcion && (
                            <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{project.descripcion}</p>
                          )}
                          <div className="pt-2.5 border-t border-slate-100">
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-slate-400 uppercase tracking-wider">Desarrollo</span>
                              <span className="text-slate-700 font-bold">{project.progreso ?? 0}%</span>
                            </div>
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${project.progreso ?? 0}%` }}
                                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 + index * 0.03 }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                          </div>
                          {project.tecnologias?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {project.tecnologias.slice(0, 3).map((t: string) => (
                                <span key={t} className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-500">{t}</span>
                              ))}
                              {project.tecnologias.length > 3 && (
                                <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-50 text-slate-400">+{project.tecnologias.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </AnimatePresence>
            )}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTA } from '@/components/home/CTA'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import {
  ExternalLink, Loader2, FolderKanban, ArrowRight,
  CheckCircle2, Zap, Calendar,
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Proyecto } from '@/lib/supabase/types'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Imágenes de fallback por índice
const fallbackImages = [
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
]

const estadoConfig: Record<string, { label: string; color: string; dot: string }> = {
  pendiente:   { label: 'Pendiente',   color: 'bg-yellow-500/15 text-yellow-600 border-yellow-500/20', dot: 'bg-yellow-500' },
  en_progreso: { label: 'En Progreso', color: 'bg-blue-500/15 text-blue-600 border-blue-500/20',       dot: 'bg-blue-500' },
  en_revision: { label: 'En Revisión', color: 'bg-purple-500/15 text-purple-600 border-purple-500/20', dot: 'bg-purple-500' },
  completado:  { label: 'Completado',  color: 'bg-green-500/15 text-green-600 border-green-500/20',    dot: 'bg-green-500' },
  cancelado:   { label: 'Cancelado',   color: 'bg-red-500/15 text-red-600 border-red-500/20',          dot: 'bg-red-500' },
}

const categories = ['Todos', 'En Progreso', 'Completado', 'En Revisión']

export default function PortafolioPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [featured, setFeatured] = useState<Proyecto | null>(null)

  useEffect(() => {
    const cargar = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('proyectos')
          .select('*')
          .order('creado_en', { ascending: false })
        
        if (error) throw error
        
        const list = data || []
        setProyectos(list)
        // El proyecto destacado es el primero completado o el primero en general
        setFeatured(list.find(p => p.estado === 'completado') || list[0] || null)
      } catch (err) {
        console.error('Error cargando proyectos:', err)
      } finally {
        setLoading(false)
      }
    }
    cargar()

    const channel = supabase
      .channel('proyectos-public-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'proyectos' }, () => cargar())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const filtered = activeFilter === 'Todos'
    ? proyectos
    : proyectos.filter(p => {
        // Mapeo simple de estado a categoría para el filtro visual
        const cat = p.estado === 'completado' ? 'Completado' : p.estado === 'en_progreso' ? 'En Progreso' : 'Otros'
        return cat === activeFilter
      })



  return (
    <>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-chart-2/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container relative z-10 max-w-7xl mx-auto px-4 py-24 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-primary">Nuestro trabajo</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight mb-6">
              Proyectos que<br /><span className="text-gradient">hablan por sí solos</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Cada proyecto es una historia de transformación digital. Descubre cómo ayudamos a nuestros clientes a crecer.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              {[['250+', 'Proyectos entregados'], ['120+', 'Clientes satisfechos'], ['98%', 'Tasa de éxito'], ['8+', 'Años de experiencia']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-bold font-heading text-gradient">{v}</p>
                  <p className="text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Proyecto destacado ── */}
        {!loading && featured && (
          <section className="py-12">
            <div className="container max-w-7xl mx-auto px-4">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-primary" />Proyecto destacado
                </p>
                <div className="group rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="grid lg:grid-cols-2">
                    {/* Imagen */}
                    <div className="relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
                      <Image
                        src={featured.url_demo ? `https://s.microlink.io/${encodeURIComponent(featured.url_demo)}` : (featured.imagen_url || fallbackImages[0])}
                        alt={featured.nombre}
                        fill
                        unoptimized={!!featured.url_demo}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />


                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                      {/* Estado badge */}
                      <div className="absolute top-5 left-5">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border backdrop-blur-md shadow-lg uppercase tracking-widest ${estadoConfig[featured.estado]?.color}`}>
                          <span className={`w-2 h-2 rounded-full ${estadoConfig[featured.estado]?.dot} animate-pulse`} />
                          {estadoConfig[featured.estado]?.label}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-10 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900">{featured.nombre}</h2>
                      {featured.descripcion && (
                        <p className="text-slate-600 leading-relaxed mb-6">{featured.descripcion}</p>
                      )}

                      {/* Progreso */}
                      <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-500 font-medium">Progreso del desarrollo</span>
                          <span className="font-bold text-primary">{featured.progreso}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${featured.progreso}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Tecnologías */}
                      {featured.tecnologias && featured.tecnologias.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {featured.tecnologias.map(t => (
                            <span key={t} className="px-3 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        {featured.url_demo && (
                          <a href={featured.url_demo} target="_blank" rel="noopener noreferrer">
                            <Button className="gap-2 shadow-md shadow-primary/10">
                              Ver demo <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        )}
                        <Link href="/contacto">
                          <Button variant="outline" className="gap-2 border-slate-200 text-slate-600">
                            Quiero algo así <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Filtros ── */}
        <section className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3">
              {['Todos', 'En Progreso', 'Completado', 'En Revisión'].map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === cat ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grid de proyectos ── */}
        <section className="py-16 bg-slate-50/50">
          <div className="container max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="p-5 rounded-full bg-white shadow-sm mb-4">
                  <FolderKanban className="h-10 w-10 text-slate-300" />
                </div>
                <p className="text-lg font-semibold text-slate-900">No hay proyectos disponibles aún</p>
                <p className="text-slate-500 mt-1 text-sm">Vuelve pronto para ver nuestros trabajos.</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((project, index) => {
                    const cfg = estadoConfig[project.estado]
                    const img = project.imagen_url || fallbackImages[index % fallbackImages.length]
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.06 }}
                        className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                      >
                        {/* Imagen */}
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={project.url_demo ? `https://s.microlink.io/${encodeURIComponent(project.url_demo)}` : (project.imagen_url || fallbackImages[index % fallbackImages.length])}
                            alt={project.nombre}
                            fill
                            unoptimized={!!project.url_demo}
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Estado badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-sm uppercase tracking-tight ${cfg?.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg?.dot}`} />
                              {cfg?.label}
                            </span>
                          </div>

                          {/* Demo link */}
                          {project.url_demo && (
                            <a href={project.url_demo} target="_blank" rel="noopener noreferrer"
                              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:scale-110">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>

                        {/* Contenido */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold font-heading mb-2 text-slate-900 group-hover:text-primary transition-colors">{project.nombre}</h3>

                          {project.descripcion && (
                            <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">{project.descripcion}</p>
                          )}

                          {/* Progreso card */}
                          <div className="mb-6 pt-4 border-t border-slate-100">
                             <div className="flex justify-between text-[11px] mb-2 font-medium">
                               <span className="text-slate-400 uppercase tracking-wider">Desarrollo</span>
                               <span className="text-slate-900 font-bold">{project.progreso}%</span>
                             </div>
                             <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <motion.div
                                 initial={{ width: 0 }}
                                 animate={{ width: `${project.progreso}%` }}
                                 transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + index * 0.05 }}
                                 className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.4)]"
                               />
                             </div>
                          </div>

                          {/* Tecnologías */}
                          {project.tecnologias && project.tecnologias.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {project.tecnologias.slice(0, 3).map(t => (
                                <span key={t} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-slate-500">
                                  {t}
                                </span>
                              ))}
                              {project.tecnologias.length > 3 && (
                                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-50 text-slate-400">
                                  +{project.tecnologias.length - 3}
                                </span>
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



        {/* ── CTA ── */}
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}

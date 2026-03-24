'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    client: 'RetailMax',
    category: 'Web',
    description: 'Plataforma de comercio electrónico con panel de administración, pasarela de pagos y gestión de inventario.',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    client: 'FinCorp',
    category: 'Móvil',
    description: 'App de banca con autenticación biométrica y gestión de inversiones en tiempo real.',
    tags: ['React Native', 'Firebase'],
    gradient: 'from-emerald-600 to-teal-500',
  },
  {
    id: 3,
    name: 'Healthcare Dashboard',
    client: 'MediCare+',
    category: 'Dashboard',
    description: 'Panel de control para gestión de pacientes y reportes analíticos en tiempo real.',
    tags: ['React', 'D3.js', 'Node.js'],
    gradient: 'from-rose-600 to-pink-500',
  },
  {
    id: 4,
    name: 'SaaS Platform',
    client: 'TechStart',
    category: 'Web',
    description: 'Plataforma SaaS multi-tenant para gestión de proyectos con colaboración en tiempo real.',
    tags: ['Vue.js', 'GraphQL', 'AWS'],
    gradient: 'from-violet-600 to-purple-500',
  },
  {
    id: 5,
    name: 'Logistics App',
    client: 'FastShip',
    category: 'Móvil',
    description: 'Seguimiento de envíos en tiempo real con optimización de rutas inteligente.',
    tags: ['Flutter', 'Google Maps'],
    gradient: 'from-amber-600 to-orange-500',
  },
  {
    id: 6,
    name: 'CRM System',
    client: 'SalesForce Pro',
    category: 'Dashboard',
    description: 'CRM personalizado con automatización de ventas y pipelines visuales.',
    tags: ['Angular', 'NestJS'],
    gradient: 'from-indigo-600 to-blue-500',
  },
]

const categories = ['Todos', 'Web', 'Móvil', 'Dashboard']

export function Portfolio() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="portafolio" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-primary" />
              Portafolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
              Proyectos que
              <br />
              <span className="text-gradient">hablan por sí solos</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/portafolio">
              <Button variant="outline" className="group border-border/60 hover:border-primary/40">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50'
              }`}
            >
              {cat}
              {cat !== 'Todos' && (
                <span className={`ml-2 text-xs ${active === cat ? 'opacity-70' : 'opacity-50'}`}>
                  {projects.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gradient image area */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-white backdrop-blur-sm border border-white/20">
                      {project.category}
                    </span>
                  </div>
                  {/* Client badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20">
                      {project.client}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold font-heading">{project.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs rounded-lg bg-muted/60 text-muted-foreground border border-border/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

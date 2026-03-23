'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    client: 'RetailMax',
    category: 'Desarrollo Web',
    description: 'Plataforma de comercio electrónico con panel de administración, pasarela de pagos y gestión de inventario.',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    gradient: 'from-blue-600 to-cyan-500',
    size: 'large',
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    client: 'FinCorp',
    category: 'Desarrollo Móvil',
    description: 'App de banca con autenticación biométrica y gestión de inversiones.',
    tags: ['React Native', 'Firebase'],
    gradient: 'from-emerald-600 to-teal-500',
    size: 'small',
  },
  {
    id: 3,
    name: 'Healthcare Dashboard',
    client: 'MediCare+',
    category: 'Dashboard',
    description: 'Panel de control para gestión de pacientes y reportes analíticos en tiempo real.',
    tags: ['React', 'D3.js', 'Node.js'],
    gradient: 'from-rose-600 to-pink-500',
    size: 'small',
  },
  {
    id: 4,
    name: 'SaaS Platform',
    client: 'TechStart',
    category: 'Desarrollo Web',
    description: 'Plataforma SaaS multi-tenant para gestión de proyectos con colaboración en tiempo real.',
    tags: ['Vue.js', 'GraphQL', 'AWS'],
    gradient: 'from-violet-600 to-purple-500',
    size: 'large',
  },
  {
    id: 5,
    name: 'Logistics App',
    client: 'FastShip',
    category: 'Móvil',
    description: 'Seguimiento de envíos en tiempo real con optimización de rutas.',
    tags: ['Flutter', 'Google Maps'],
    gradient: 'from-amber-600 to-orange-500',
    size: 'small',
  },
  {
    id: 6,
    name: 'CRM System',
    client: 'SalesForce Pro',
    category: 'Desarrollo Web',
    description: 'CRM personalizado con automatización de ventas y pipelines.',
    tags: ['Angular', 'NestJS'],
    gradient: 'from-indigo-600 to-blue-500',
    size: 'small',
  },
]

export function Portfolio() {
  return (
    <section id="portafolio" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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

        {/* Masonry-style grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`group relative rounded-2xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${project.size === 'large' && index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
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
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold font-heading">{project.name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground/60 mb-3">{project.client}</p>
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
        </div>
      </div>
    </section>
  )
}

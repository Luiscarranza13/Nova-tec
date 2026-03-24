'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Loader2, FolderKanban } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Proyecto } from '@/lib/supabase/types'

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-red-500 to-pink-500',
  'from-purple-500 to-violet-500',
  'from-orange-500 to-amber-500',
  'from-indigo-500 to-blue-500',
]

const estadoLabels: Record<string, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En Progreso',
  en_revision: 'En Revisión',
  completado: 'Completado',
  cancelado: 'Cancelado',
}

export default function PortafolioPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from('proyectos')
        .select('*')
        .order('creado_en', { ascending: false })
      setProyectos(data || [])
      setLoading(false)
    }
    cargar()

    const channel = supabase
      .channel('proyectos-public')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'proyectos' }, () => cargar())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Nuestro <span className="text-primary">Portafolio</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Descubre cómo hemos ayudado a empresas a transformar sus negocios con tecnología.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : proyectos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="p-5 rounded-full bg-muted/50 mb-4">
                  <FolderKanban className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">No hay proyectos disponibles aún.</p>
                <p className="text-muted-foreground mt-1">Vuelve pronto para ver nuestros trabajos.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proyectos.map((project, index) => (
                  <Card key={project.id} className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <div className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} relative`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-medium bg-black/40 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                          {estadoLabels[project.estado] || project.estado}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold font-heading mb-2">{project.nombre}</h3>

                      {project.descripcion && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.descripcion}</p>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="font-medium">{project.progreso}%</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-700"
                              style={{ width: `${project.progreso}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

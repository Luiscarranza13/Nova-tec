import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    client: 'RetailMax',
    category: 'Desarrollo Web',
    description: 'Plataforma de comercio electrónico completa con panel de administración, pasarela de pagos y gestión de inventario.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    client: 'FinCorp',
    category: 'Desarrollo Móvil',
    description: 'Aplicación móvil de banca con autenticación biométrica, transferencias y gestión de inversiones.',
    tags: ['React Native', 'Firebase', 'Redux'],
    image: 'bg-gradient-to-br from-green-500 to-emerald-500',
  },
  {
    id: 3,
    name: 'Healthcare Dashboard',
    client: 'MediCare+',
    category: 'Dashboard',
    description: 'Panel de control para gestión de pacientes, citas médicas y reportes analíticos en tiempo real.',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    image: 'bg-gradient-to-br from-red-500 to-pink-500',
  },
  {
    id: 4,
    name: 'SaaS Platform',
    client: 'TechStart',
    category: 'Desarrollo Web',
    description: 'Plataforma SaaS multi-tenant para gestión de proyectos con colaboración en tiempo real.',
    tags: ['Vue.js', 'GraphQL', 'AWS', 'Docker'],
    image: 'bg-gradient-to-br from-purple-500 to-violet-500',
  },
  {
    id: 5,
    name: 'Logistics App',
    client: 'FastShip',
    category: 'Desarrollo Móvil',
    description: 'Aplicación de seguimiento de envíos en tiempo real con optimización de rutas y notificaciones push.',
    tags: ['Flutter', 'Google Maps', 'Firebase'],
    image: 'bg-gradient-to-br from-orange-500 to-amber-500',
  },
  {
    id: 6,
    name: 'CRM System',
    client: 'SalesForce Pro',
    category: 'Desarrollo Web',
    description: 'Sistema CRM personalizado con automatización de ventas, pipelines y integración con herramientas de email.',
    tags: ['Angular', 'NestJS', 'PostgreSQL'],
    image: 'bg-gradient-to-br from-indigo-500 to-blue-500',
  },
]

export const metadata = {
  title: 'Portafolio',
  description: 'Explora nuestros proyectos de desarrollo web, móvil y software.',
}

export default function PortafolioPage() {
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="group overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <div className={`h-48 ${project.image} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    
                    <h3 className="text-lg font-semibold font-heading mt-1 mb-1">
                      {project.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.client}
                    </p>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

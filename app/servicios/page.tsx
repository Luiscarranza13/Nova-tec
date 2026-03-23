import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import { Globe, Smartphone, Code, Palette, Cloud, Lightbulb } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Code,
  Palette,
  Cloud,
  Lightbulb,
}

const services = [
  {
    id: 'desarrollo-web',
    name: 'Desarrollo Web',
    description: 'Creamos sitios web y aplicaciones web modernas, rápidas y escalables utilizando las últimas tecnologías como Next.js, React y Node.js.',
    icon: 'Globe',
    features: [
      'Sitios web corporativos',
      'E-commerce',
      'Dashboards administrativos',
      'Progressive Web Apps (PWA)',
      'Aplicaciones web progresivas',
      'APIs RESTful y GraphQL',
    ],
  },
  {
    id: 'desarrollo-mobile',
    name: 'Desarrollo Móvil',
    description: 'Desarrollamos aplicaciones nativas e híbridas para iOS y Android con experiencia de usuario excepcional.',
    icon: 'Smartphone',
    features: [
      'iOS (Swift)',
      'Android (Kotlin)',
      'React Native',
      'Flutter',
      'Aplicaciones híbridas',
      'Integración con APIs',
    ],
  },
  {
    id: 'desarrollo-software',
    name: 'Desarrollo de Software',
    description: 'Construimos soluciones de software personalizadas adaptadas a las necesidades específicas de tu negocio.',
    icon: 'Code',
    features: [
      'Software a medida',
      'Sistemas empresariales',
      'Automatización de procesos',
      'Integración de sistemas',
      'Microservicios',
      'Mantenimiento y soporte',
    ],
  },
  {
    id: 'ui-ux',
    name: 'Diseño UI/UX',
    description: 'Creamos interfaces de usuario atractivas y experiencias de usuario fluidas que cautivan a tus clientes.',
    icon: 'Palette',
    features: [
      'Diseño de interfaces',
      'Prototipado',
      'Diseño responsive',
      'Design systems',
      'UX Research',
      'Pruebas de usabilidad',
    ],
  },
  {
    id: 'cloud',
    name: 'Soluciones Cloud',
    description: 'Implementamos infraestructura en la nube segura y escalable utilizando AWS, GCP o Azure.',
    icon: 'Cloud',
    features: [
      'AWS',
      'Microsoft Azure',
      'Google Cloud Platform',
      'DevOps',
      'CI/CD',
      'Serverless',
    ],
  },
  {
    id: 'consultoria',
    name: 'Consultoría Tech',
    description: 'Asesoramos a empresas en su transformación digital y adopción de nuevas tecnologías.',
    icon: 'Lightbulb',
    features: [
      'Auditorías técnicas',
      'Arquitectura de software',
      'Tech strategy',
      'Code review',
      'Mentoría técnica',
      'Evaluación de tecnologías',
    ],
  },
]

export const metadata = {
  title: 'Servicios',
  description: 'Explora nuestros servicios de desarrollo de software, web, móvil y consultoría tecnológica.',
}

export default function ServiciosPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Nuestros <span className="text-primary">Servicios</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Ofrecemos soluciones tecnológicas integrales para impulsar el crecimiento de tu negocio.
              </p>
            </div>

            <div className="space-y-16">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Code
                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold font-heading mb-4">
                        {service.name}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Card className={`p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Icon className="h-24 w-24 text-primary/40" />
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

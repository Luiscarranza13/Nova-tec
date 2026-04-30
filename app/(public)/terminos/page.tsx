import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de los servicios de NovaTec, empresa de desarrollo de software en Lima, Perú.',
  alternates: { canonical: '/terminos' },
  robots: { index: false, follow: false },
}

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="container max-w-3xl mx-auto px-4">
            <h1 className="text-4xl font-bold font-heading mb-8">
              Términos y <span className="text-primary">Condiciones</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">1. Aceptación de términos</h2>
                <p className="text-muted-foreground">
                  Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones.
                  Si no estás de acuerdo con alguno de estos términos, por favor no utilices nuestro sitio.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">2. Uso del sitio</h2>
                <p className="text-muted-foreground">
                  Este sitio web y su contenido son propiedad de NovaTec. Está prohibido copiar,
                  reproducir, distribuir o modificar cualquier parte del sitio sin nuestro consentimiento previo por escrito.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">3. Servicios</h2>
                <p className="text-muted-foreground">
                  Los servicios ofrecidos por NovaTec están sujetos a los términos específicos de cada proyecto.
                  Nos reservamos el derecho de modificar o discontinuar cualquier servicio en cualquier momento.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">4. Propiedad intelectual</h2>
                <p className="text-muted-foreground">
                  Todo el contenido, logotipos y materiales en este sitio son propiedad intelectual de NovaTec.
                  Está prohibido utilizar estos materiales sin autorización.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">5. Limitación de responsabilidad</h2>
                <p className="text-muted-foreground">
                  NovaTec no será responsable por daños directos, indirectos, incidentales o consecuentes
                  derivados del uso de este sitio web o de nuestros servicios.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">6. Contacto</h2>
                <p className="text-muted-foreground">
                  Para cualquier consulta sobre estos términos, escríbenos a{' '}
                  <a href="mailto:NovaTec.Empresarial@gmail.com" className="text-primary hover:underline">
                    NovaTec.Empresarial@gmail.com
                  </a>{' '}
                  o por WhatsApp al{' '}
                  <a href="https://wa.me/51918146783" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    +51 918 146 783
                  </a>.
                  Dirección: Senati Cajamarca, Perú.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

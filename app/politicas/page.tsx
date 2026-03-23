import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de NovaTec.',
}

export default function PoliticasPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="container max-w-3xl mx-auto px-4">
            <h1 className="text-4xl font-bold font-heading mb-8">
              Política de <span className="text-primary">Privacidad</span>
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">1. Información que recopilamos</h2>
                <p className="text-muted-foreground">
                  Recopilamos información que nos proporcionas directamente, como tu nombre,
                  correo electrónico y número de teléfono cuando llenas formularios en nuestro sitio web
                  o te comunicas con nosotros.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">2. Uso de la información</h2>
                <p className="text-muted-foreground">
                  Utilizamos la información recopilada para responder a tus consultas, proporcionarte
                  los servicios solicitados, mejorar nuestro sitio web y comunicarnos contigo sobre
                  actualizaciones o promociones.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">3. Protección de datos</h2>
                <p className="text-muted-foreground">
                  Implementamos medidas de seguridad adecuadas para proteger tu información personal
                  contra accesos no autorizados, alteraciones, divulgaciones o destrucciones.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">4. Cookies</h2>
                <p className="text-muted-foreground">
                  Nuestro sitio web utiliza cookies para mejorar tu experiencia de navegación.
                  Puedes optar por desactivar las cookies en tu navegador si lo prefieres.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">5. Contacto</h2>
                <p className="text-muted-foreground">
                  Si tienes alguna pregunta sobre esta política de privacidad, contáctanos en
                  hola@novatec.mx
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

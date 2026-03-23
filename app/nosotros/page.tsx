import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Nosotros',
  description: 'Conoce más sobre NovaTec, nuestra misión, visión y valores.',
}

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Sobre <span className="text-primary">NovaTec</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Somos una empresa de desarrollo de software comprometida con la excelencia
                y la innovación tecnológica.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

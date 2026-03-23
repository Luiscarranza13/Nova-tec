import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

export const metadata = {
  title: 'Planes',
  description: 'Planes y precios para el desarrollo de tu proyecto.',
}

export default function PlanesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Planes y <span className="text-primary">Precios</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Elige el plan que mejor se adapte a las necesidades de tu proyecto.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PRICING_PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={`h-full p-8 relative ${
                    plan.popular
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                        Más Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold font-heading">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold font-heading">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-muted-foreground text-sm"> MXN</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
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

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react'

const types = [
  { id: 'web',      label: 'Sitio Web',        base: 15000, roi: 3.2, months: 6  },
  { id: 'ecommerce',label: 'E-commerce',        base: 35000, roi: 5.8, months: 8  },
  { id: 'app',      label: 'App Móvil',         base: 45000, roi: 4.5, months: 10 },
  { id: 'saas',     label: 'Plataforma SaaS',   base: 80000, roi: 7.2, months: 14 },
  { id: 'erp',      label: 'Sistema ERP',       base: 60000, roi: 6.1, months: 12 },
]

export function ROICalculator() {
  const [type, setType] = useState(types[0])
  const [revenue, setRevenue] = useState(50000)

  const investment = type.base
  const annualGain = revenue * (type.roi - 1)
  const netROI = ((annualGain - investment) / investment * 100).toFixed(0)
  const payback = (investment / (annualGain / 12)).toFixed(1)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Calculadora de ROI
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            Calcula el retorno de tu
            <br /><span className="text-gradient">inversión tecnológica</span>
          </h2>
          <p className="text-muted-foreground">Estimación basada en proyectos reales de nuestros clientes.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 shadow-xl"
        >
          {/* Type selector */}
          <div className="mb-8">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Tipo de proyecto</label>
            <div className="flex flex-wrap gap-2">
              {types.map(t => (
                <button
                  key={t.id}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    type.id === t.id
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Revenue slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-muted-foreground">Ingresos anuales actuales</label>
              <span className="text-sm font-bold text-primary">S/ {revenue.toLocaleString()}</span>
            </div>
            <input
              type="range" min={10000} max={500000} step={5000}
              value={revenue}
              onChange={e => setRevenue(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>S/ 10,000</span><span>S/ 500,000</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, label: 'Inversión estimada', value: `S/ ${investment.toLocaleString()}`, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: TrendingUp, label: 'ROI proyectado (1 año)', value: `+${netROI}%`, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { icon: Calculator, label: 'Ganancia adicional', value: `S/ ${Math.round(annualGain).toLocaleString()}`, color: 'text-violet-500', bg: 'bg-violet-500/10' },
              { icon: Clock, label: 'Recuperación inversión', value: `${payback} meses`, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`rounded-xl ${bg} p-4 text-center`}>
                <Icon className={`h-5 w-5 ${color} mx-auto mb-2`} />
                <p className={`text-xl font-bold font-heading ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            * Estimaciones basadas en promedios de la industria. Los resultados reales pueden variar.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

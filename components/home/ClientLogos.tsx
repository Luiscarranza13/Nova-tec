'use client'

import { motion } from 'framer-motion'

const clients = [
  { name: 'RetailMax', abbr: 'RM', color: 'from-blue-500 to-cyan-500' },
  { name: 'FinCorp', abbr: 'FC', color: 'from-emerald-500 to-teal-500' },
  { name: 'TechStart', abbr: 'TS', color: 'from-violet-500 to-purple-500' },
  { name: 'FastShip', abbr: 'FS', color: 'from-amber-500 to-orange-500' },
  { name: 'MediCare+', abbr: 'MC', color: 'from-rose-500 to-pink-500' },
  { name: 'SalesForce Pro', abbr: 'SF', color: 'from-indigo-500 to-blue-500' },
  { name: 'CloudBase', abbr: 'CB', color: 'from-cyan-500 to-sky-500' },
  { name: 'DataSync', abbr: 'DS', color: 'from-fuchsia-500 to-violet-500' },
]

export function ClientLogos() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Empresas que confían en nosotros
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="group flex flex-col items-center gap-2 cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${client.color} p-0.5 shadow-lg group-hover:shadow-xl transition-shadow`}>
                <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground">{client.abbr}</span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground text-center leading-tight group-hover:text-foreground transition-colors">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/30"
        >
          {[
            { value: '120+', label: 'Clientes activos' },
            { value: '98%', label: 'Tasa de retención' },
            { value: '4.9★', label: 'Calificación promedio' },
            { value: '< 24h', label: 'Tiempo de respuesta' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold font-heading text-gradient">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

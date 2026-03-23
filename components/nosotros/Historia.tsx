'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    year: '2016',
    title: 'El comienzo',
    description: 'NovaTec nace en Ciudad de México con 3 fundadores y una visión clara: hacer tecnología de calidad accesible para empresas de todos los tamaños.',
    highlight: 'Primeros 10 clientes',
  },
  {
    year: '2018',
    title: 'Crecimiento acelerado',
    description: 'Expandimos el equipo a 10 personas y lanzamos nuestra práctica de desarrollo móvil. Completamos nuestro proyecto número 50.',
    highlight: '50 proyectos completados',
  },
  {
    year: '2020',
    title: 'Adaptación y resiliencia',
    description: 'Migramos a trabajo 100% remoto y ampliamos nuestra cartera de clientes internacionales. Lanzamos nuestra práctica de soluciones cloud.',
    highlight: 'Expansión internacional',
  },
  {
    year: '2022',
    title: 'Consolidación',
    description: 'Alcanzamos los 100 clientes satisfechos y 200 proyectos entregados. Abrimos nuestra segunda oficina en Guadalajara.',
    highlight: '100+ clientes activos',
  },
  {
    year: '2024',
    title: 'Liderazgo regional',
    description: 'Con 25 expertos en el equipo y más de 250 proyectos, nos posicionamos como referente en desarrollo de software en Latinoamérica.',
    highlight: '250+ proyectos',
  },
]

export function Historia() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-6">
              <span className="w-8 h-px bg-primary" />
              Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-6">
              8 años
              <br />
              <span className="text-gradient">construyendo el futuro</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Desde una pequeña startup hasta convertirnos en referente regional,
              cada año ha sido un capítulo de aprendizaje, crecimiento y superación.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '8+', label: 'Años de experiencia' },
                { value: '25+', label: 'Expertos en equipo' },
                { value: '250+', label: 'Proyectos entregados' },
                { value: '120+', label: 'Clientes satisfechos' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border/50 bg-card/60 p-4">
                  <p className="text-2xl font-bold font-heading text-gradient">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />

            <div className="space-y-10">
              {milestones.map((m, index) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-full border-2 border-primary/30 bg-card flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-primary">{m.year.slice(2)}</span>
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="text-xs font-bold text-primary">{m.year}</span>
                        <h3 className="text-lg font-semibold font-heading">{m.title}</h3>
                      </div>
                      <span className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {m.highlight}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

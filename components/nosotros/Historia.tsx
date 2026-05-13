'use client'

import { motion } from 'framer-motion'

const milestones = [
  { year: '2016', title: 'El comienzo', description: 'NovaTec nace en Cajamarca con 3 fundadores y una visión clara: hacer tecnología de calidad accesible para empresas de todos los tamaños.', highlight: 'Primeros 10 clientes' },
  { year: '2018', title: 'Crecimiento acelerado', description: 'Expandimos el equipo a 10 personas y lanzamos nuestra práctica de desarrollo móvil. Completamos nuestro proyecto número 50.', highlight: '50 proyectos' },
  { year: '2020', title: 'Adaptación y resiliencia', description: 'Migramos a trabajo 100% remoto y ampliamos nuestra cartera de clientes internacionales. Lanzamos nuestra práctica de soluciones cloud.', highlight: 'Expansión global' },
  { year: '2022', title: 'Consolidación', description: 'Alcanzamos los 100 clientes satisfechos y 200 proyectos entregados. Abrimos nuestra segunda oficina en Lima.', highlight: '100+ clientes' },
  { year: '2024', title: 'Liderazgo regional', description: 'Con 25 expertos en el equipo y más de 250 proyectos, nos posicionamos como referente en desarrollo de software en Latinoamérica.', highlight: '250+ proyectos' },
]

const stats = [
  { value: '8+',   label: 'Años de experiencia' },
  { value: '25+',  label: 'Expertos en equipo' },
  { value: '250+', label: 'Proyectos entregados' },
  { value: '120+', label: 'Clientes satisfechos' },
]

export function Historia() {
  return (
    <section className="home-section">
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Nuestra Historia
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-tight mb-3">
            8 años{' '}
            <span className="text-gradient">construyendo el futuro</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Desde una pequeña startup hasta convertirnos en referente regional,
            cada año ha sido un capítulo de aprendizaje y superación.
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 text-center">
              <p className="text-2xl sm:text-3xl font-bold font-heading text-gradient">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Timeline ── all items are self-contained, properly centered ── */}
        <div className="max-w-2xl mx-auto">
          {milestones.map((m, index) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-4 sm:gap-6 mb-6 last:mb-0"
            >
              {/* Left: year column + connector */}
              <div className="flex flex-col items-center shrink-0">
                {/* Year badge */}
                <div className="w-14 h-14 rounded-full border-2 border-primary/30 bg-white shadow-sm flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-primary text-center leading-tight">{m.year}</span>
                </div>
                {/* Connector line below (hidden on last item) */}
                {index < milestones.length - 1 && (
                  <div className="flex-1 w-px bg-gradient-to-b from-primary/30 to-slate-200 mt-1" />
                )}
              </div>

              {/* Right: card */}
              <div className="flex-1 min-w-0 pb-6 last:pb-0">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  {/* Year + title + badge row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <span className="text-xs font-bold text-primary">{m.year}</span>
                    <h3 className="text-base font-semibold font-heading">{m.title}</h3>
                    <span className="ml-auto shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                      {m.highlight}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

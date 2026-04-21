'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Alejandro Torres',
    role: 'CEO & Co-Fundador',
    bio: 'Ingeniero en sistemas con 12 años de experiencia. Apasionado por construir productos que resuelven problemas reales.',
    avatar: 'AT',
    gradient: 'from-primary to-indigo-500',
    skills: ['Product Strategy', 'Architecture', 'Leadership'],
  },
  {
    name: 'Sofía Ramírez',
    role: 'CTO & Co-Fundadora',
    bio: 'Experta en arquitectura de software y cloud. Lidera el equipo técnico con enfoque en calidad y escalabilidad.',
    avatar: 'SR',
    gradient: 'from-violet-500 to-purple-500',
    skills: ['Cloud', 'Backend', 'DevOps'],
  },
  {
    name: 'Miguel Ángel López',
    role: 'Lead Frontend Developer',
    bio: 'Especialista en React y Next.js. Obsesionado con la experiencia de usuario y el rendimiento web.',
    avatar: 'ML',
    gradient: 'from-blue-500 to-cyan-500',
    skills: ['React', 'Next.js', 'UI/UX'],
  },
  {
    name: 'Valentina Cruz',
    role: 'Lead Designer',
    bio: 'Diseñadora UX/UI con ojo para los detalles. Crea interfaces que enamoran a los usuarios desde el primer clic.',
    avatar: 'VC',
    gradient: 'from-pink-500 to-rose-500',
    skills: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    name: 'Carlos Mendoza',
    role: 'Lead Mobile Developer',
    bio: 'Desarrollador móvil con experiencia en React Native y Flutter. Ha lanzado más de 30 apps en producción.',
    avatar: 'CM',
    gradient: 'from-green-500 to-emerald-500',
    skills: ['React Native', 'Flutter', 'iOS/Android'],
  },
  {
    name: 'Andrea Flores',
    role: 'Project Manager',
    bio: 'Certificada en Scrum y PMP. Garantiza que cada proyecto se entregue a tiempo, dentro del presupuesto y con calidad.',
    avatar: 'AF',
    gradient: 'from-amber-500 to-orange-500',
    skills: ['Scrum', 'Agile', 'PMP'],
  },
]

export function Equipo() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/40 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-primary" />
            Nuestro Equipo
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Las personas detrás
            <br />
            <span className="text-gradient">de cada proyecto</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Un equipo multidisciplinario de expertos apasionados por la tecnología
            y comprometidos con tu éxito.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${member.gradient}`} />

              <div className="p-7">
                {/* Avatar + social */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    {member.avatar}
                  </div>
                  <div className="flex gap-2">
                    {[Github, Linkedin, Twitter].map((Icon, i) => (
                      <a
                        key={i}
                        href="/"
                        aria-label="Perfil social"
                        className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>

                <h3 className="font-bold font-heading text-lg mb-0.5">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{member.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-lg bg-muted/60 text-muted-foreground border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-dashed border-border/60 bg-card/30 p-8 text-center"
        >
          <p className="text-lg font-semibold font-heading mb-2">¿Quieres unirte al equipo?</p>
          <p className="text-muted-foreground text-sm mb-5">
            Siempre estamos buscando talento apasionado por la tecnología.
          </p>
          <a
            href="mailto:careers@novatec.mx"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            careers@novatec.mx →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

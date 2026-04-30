'use client'

import React from 'react'
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
              <div className={`h-1.5 w-full bg-gradient-to-r ${member.gradient}`} />
              <div className="p-7">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    {member.avatar}
                  </div>
                  <div className="flex gap-2">
                    {[Github, Linkedin, Twitter].map((Icon, i) => (
                      <a key={i} href="/" aria-label="Perfil social" className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200">
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
                <h3 className="font-bold font-heading text-lg mb-0.5">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 text-xs rounded-lg bg-muted/60 text-muted-foreground border border-border/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <JoinForm />
      </div>
    </section>
  )
}

function JoinForm() {
  const [form, setForm] = React.useState({ nombre: '', rol: '', experiencia: '', habilidades: '', mensaje: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = [
      `🚀 *Solicitud para unirse al equipo NovaTec*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Nombre:* ${form.nombre}`,
      `💼 *Rol deseado:* ${form.rol}`,
      `📅 *Experiencia:* ${form.experiencia}`,
      `🛠️ *Habilidades:* ${form.habilidades}`,
      `📝 *Motivación:*`,
      form.mensaje,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `_Enviado desde novatec.pe/nosotros_`,
    ].join('\n')

    window.open(`https://wa.me/51918146783?text=${encodeURIComponent(text)}`, '_blank')
  }

  const field = 'px-3 py-2 text-sm rounded-lg border border-border/60 bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 rounded-2xl border border-dashed border-border/60 bg-card/30 p-8"
    >
      <div className="text-center mb-8">
        <p className="text-lg font-semibold font-heading mb-2">¿Quieres unirte al equipo?</p>
        <p className="text-muted-foreground text-sm">
          Siempre estamos buscando talento apasionado por la tecnología. Completa el formulario y te contactamos por WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Nombre completo *</label>
            <input required value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Tu nombre completo" className={field} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Rol que deseas *</label>
            <input required value={form.rol} onChange={e => setForm(p => ({ ...p, rol: e.target.value }))} placeholder="Ej: Frontend Developer" className={field} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Años de experiencia *</label>
            <select required value={form.experiencia} onChange={e => setForm(p => ({ ...p, experiencia: e.target.value }))} className={field}>
              <option value="">Selecciona...</option>
              <option>Menos de 1 año</option>
              <option>1 - 2 años</option>
              <option>3 - 5 años</option>
              <option>Más de 5 años</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Principales habilidades *</label>
            <input required value={form.habilidades} onChange={e => setForm(p => ({ ...p, habilidades: e.target.value }))} placeholder="Ej: React, Node.js, Figma" className={field} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">¿Por qué quieres unirte? *</label>
          <textarea required rows={3} value={form.mensaje} onChange={e => setForm(p => ({ ...p, mensaje: e.target.value }))} placeholder="Cuéntanos sobre ti, tu motivación y qué puedes aportar al equipo..." className={`${field} resize-none`} />
        </div>

        <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white text-sm font-semibold transition-colors duration-200 shadow-lg shadow-green-500/20">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882l6.186-1.443A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.724.868.936-3.617-.235-.372A9.818 9.818 0 1112 21.818z"/>
          </svg>
          Enviar solicitud por WhatsApp
        </button>
      </form>
    </motion.div>
  )
}

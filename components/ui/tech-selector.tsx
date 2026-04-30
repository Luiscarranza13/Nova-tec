'use client'

import { useState, useRef, useEffect } from 'react'
import { X, ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

// Lista completa de tecnologías agrupadas
export const TECH_GROUPS: Record<string, string[]> = {
  'Frontend': ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'Three.js', 'Astro'],
  'Backend': ['Node.js', 'NestJS', 'Express.js', 'Python', 'Django', 'FastAPI', 'Go', 'Rust', 'PHP', 'Laravel', 'Ruby on Rails', 'Java', 'Spring Boot', '.NET', 'GraphQL', 'REST API', 'tRPC', 'WebSockets'],
  'Móvil': ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin', 'Ionic', 'Capacitor', 'PWA'],
  'Base de Datos': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Supabase', 'Firebase', 'Prisma', 'Drizzle', 'PlanetScale', 'Neon'],
  'Cloud & DevOps': ['AWS', 'GCP', 'Azure', 'Vercel', 'Netlify', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'Linux', 'Nginx'],
  'IA & ML': ['OpenAI API', 'LangChain', 'TensorFlow', 'PyTorch', 'Hugging Face', 'Pinecone', 'Vercel AI SDK'],
  'Herramientas': ['Git', 'GitHub', 'Figma', 'Jira', 'Notion', 'Stripe', 'Twilio', 'SendGrid', 'Cloudinary', 'Mapbox', 'Algolia'],
  'Testing': ['Jest', 'Vitest', 'Playwright', 'Cypress', 'Testing Library', 'Storybook'],
}

export const ALL_TECHS = Object.values(TECH_GROUPS).flat()

interface TechSelectorProps {
  value: string[]
  onChange: (techs: string[]) => void
  placeholder?: string
  className?: string
}

export function TechSelector({ value, onChange, placeholder = 'Seleccionar tecnologías...', className }: TechSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = (tech: string) => {
    if (value.includes(tech)) onChange(value.filter(t => t !== tech))
    else onChange([...value, tech])
  }

  const remove = (tech: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter(t => t !== tech))
  }

  const filtered = search.trim()
    ? Object.entries(TECH_GROUPS).reduce<Record<string, string[]>>((acc, [group, techs]) => {
        const matches = techs.filter(t => t.toLowerCase().includes(search.toLowerCase()))
        if (matches.length) acc[group] = matches
        return acc
      }, {})
    : TECH_GROUPS

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="min-h-[44px] w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 flex flex-wrap gap-1.5 items-center hover:border-indigo-400 focus-within:border-indigo-400 transition-colors"
      >
        {value.length === 0 && (
          <span className="text-sm text-slate-400 select-none">{placeholder}</span>
        )}
        {value.map(tech => (
          <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium">
            {tech}
            <button onClick={e => remove(tech, e)} className="hover:text-red-500 transition-colors ml-0.5">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <ChevronDown className={cn('h-4 w-4 text-slate-400 ml-auto shrink-0 transition-transform', open && 'rotate-180')} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar tecnología..."
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-400 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-64 overflow-y-auto p-2 space-y-3">
            {Object.entries(filtered).map(([group, techs]) => (
              <div key={group}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-1">{group}</p>
                <div className="flex flex-wrap gap-1">
                  {techs.map(tech => {
                    const selected = value.includes(tech)
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggle(tech)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all',
                          selected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
                        )}
                      >
                        {tech}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            {Object.keys(filtered).length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">Sin resultados para "{search}"</p>
            )}
          </div>

          {/* Footer */}
          {value.length > 0 && (
            <div className="border-t border-slate-100 px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">{value.length} seleccionada{value.length !== 1 ? 's' : ''}</span>
              <button onClick={() => onChange([])} className="text-xs text-red-500 hover:text-red-600 font-medium">
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

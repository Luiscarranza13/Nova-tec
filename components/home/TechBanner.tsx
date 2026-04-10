'use client'

// Pure CSS marquee — zero JS, zero Framer Motion, zero TBT impact
const techs = [
  { name: 'Next.js',    color: '#ffffff' },
  { name: 'React',      color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js',    color: '#68A063' },
  { name: 'Flutter',    color: '#54C5F8' },
  { name: 'AWS',        color: '#FF9900' },
  { name: 'Supabase',   color: '#3ECF8E' },
  { name: 'Docker',     color: '#2496ED' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'GraphQL',    color: '#E10098' },
  { name: 'Tailwind',   color: '#38BDF8' },
  { name: 'Figma',      color: '#F24E1E' },
  { name: 'Vercel',     color: '#ffffff' },
  { name: 'Firebase',   color: '#FFCA28' },
  { name: 'Redis',      color: '#DC382D' },
  { name: 'Stripe',     color: '#635BFF' },
]

const doubled = [...techs, ...techs]

function TechPill({ tech }: { tech: typeof techs[0] }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm whitespace-nowrap shrink-0">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}60` }}
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-muted-foreground">{tech.name}</span>
    </div>
  )
}

export function TechBanner() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/30" aria-label="Stack tecnológico">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" aria-hidden="true" />

      <div className="mb-8 text-center">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Stack tecnológico que usamos
        </span>
      </div>

      {/* Row 1 — CSS animation only, no JS */}
      <div className="flex overflow-hidden" aria-hidden="true">
        <div className="flex gap-4 shrink-0 animate-marquee-left">
          {doubled.map((tech, i) => <TechPill key={i} tech={tech} />)}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex overflow-hidden mt-4" aria-hidden="true">
        <div className="flex gap-4 shrink-0 animate-marquee-right">
          {[...doubled].reverse().map((tech, i) => <TechPill key={i} tech={tech} />)}
        </div>
      </div>
    </section>
  )
}

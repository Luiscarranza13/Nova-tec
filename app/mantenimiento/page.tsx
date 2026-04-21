import { Settings } from 'lucide-react'

export default function MantenimientoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
          <Settings className="h-10 w-10 text-violet-400 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">En Mantenimiento</h1>
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          Estamos realizando mejoras en el sitio. Volvemos pronto.
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

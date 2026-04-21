'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, EyeOff, Loader2, LogIn, Shield,
  Code2, Zap, Globe, FolderKanban, MessageSquare, CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'
import Image from 'next/image'

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

const features = [
  { icon: FolderKanban, label: 'Gestión de proyectos', desc: 'Seguimiento en tiempo real' },
  { icon: Globe,        label: 'Panel de servicios',   desc: 'Administra tu catálogo' },
  { icon: MessageSquare,label: 'Mensajes y cotizaciones', desc: 'Responde a tus clientes' },
  { icon: Zap,          label: 'Dashboard en vivo',    desc: 'Métricas al instante' },
]

// Floating particles
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}))

function LoginForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null)

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(provider)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/admin` },
      })
      if (error) throw error
    } catch {
      toast.error(`Error al iniciar sesión con ${provider}`)
      setSocialLoading(null)
    }
  }

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0] as keyof LoginFormData] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      if (error || !data.session) {
        toast.error('Credenciales incorrectas', {
          description: 'Verifica tu correo y contraseña.',
        })
        return
      }
      setSuccess(true)
      toast.success('¡Bienvenido de nuevo!')
      await new Promise(r => setTimeout(r, 800))
      window.location.href = redirect
    } catch {
      toast.error('Error de conexión', { description: 'Intenta de nuevo.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* ══════════════════════════════════════
          PANEL IZQUIERDO — visual
      ══════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between overflow-hidden">

        {/* Imagen de fondo */}
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=3840&q=100"
          alt="NovaTec background"
          fill
          className="object-cover object-center scale-105"
          priority
        />

        {/* Overlay: claro en el centro, oscuro en bordes donde va el texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80" />

        {/* Grid sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px]" />

        {/* Blobs animados */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]"
        />

        {/* Partículas flotantes */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-12, 12, -12], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Contenido */}
        <div className="relative z-10 p-12">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/40 rounded-xl blur-md group-hover:blur-lg transition-all" />
                <div className="relative bg-gradient-to-br from-indigo-500 to-violet-500 p-2.5 rounded-xl shadow-lg">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white font-heading tracking-tight">
                Nova<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Tec</span>
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="relative z-10 px-12 pb-14 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest mb-4 drop-shadow-lg">Panel de administración</p>
            <h2 className="text-5xl font-bold text-white font-heading leading-[1.1] mb-5 drop-shadow-2xl [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              Tu negocio,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300">
                bajo control
              </span>
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-sm drop-shadow-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
              Gestiona proyectos, servicios, cotizaciones y mensajes desde un solo dashboard en tiempo real.
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-3">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/30 group-hover:border-indigo-400/40 transition-all duration-300 backdrop-blur-sm">
                  <f.icon className="h-[18px] w-[18px] text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white drop-shadow-md">{f.label}</p>
                  <p className="text-xs text-white/60">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Badge seguridad */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/20 text-xs text-white/70 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Conexión segura · SSL cifrado
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PANEL DERECHO — formulario
      ══════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">

        {/* Blob decorativo */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-indigo-100/70 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-100/50 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mb-8 lg:hidden"
          >
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-md">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading">
                Nova<span className="text-indigo-600">Tec</span>
              </span>
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-5">
              <Shield className="h-3.5 w-3.5" />
              Acceso restringido
            </div>
            <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2 leading-tight">
              Bienvenido de<br />vuelta
            </h1>
            <p className="text-slate-500 text-sm">Ingresa tus credenciales de administrador</p>
          </motion.div>

          {/* Card formulario */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-200/80 p-8"
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-6 text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </motion.div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">¡Acceso concedido!</p>
                    <p className="text-sm text-slate-500 mt-1">Redirigiendo al panel...</p>
                  </div>
                  <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@novatec.mx"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      error={!!errors.email}
                      autoComplete="email"
                      disabled={isLoading}
                      className="h-11 transition-all duration-200 focus:shadow-md focus:shadow-indigo-100"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => handleChange('password', e.target.value)}
                        error={!!errors.password}
                        autoComplete="current-password"
                        disabled={isLoading}
                        className="h-11 pr-11 transition-all duration-200 focus:shadow-md focus:shadow-indigo-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded"
                        tabIndex={-1}
                      >
                        <AnimatePresence mode="wait">
                          {showPassword ? (
                            <motion.span key="off" initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}>
                              <EyeOff className="h-4 w-4" />
                            </motion.span>
                          ) : (
                            <motion.span key="on" initial={{ opacity: 0, rotate: 10 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}>
                              <Eye className="h-4 w-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500"
                        >
                          {errors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-11 mt-1 font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200"
                      disabled={isLoading}
                    >
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Verificando...
                          </motion.span>
                        ) : (
                          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            Iniciar Sesión
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>

                  {/* Social login */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-muted-foreground">o continúa con</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => handleSocialLogin('google')} disabled={!!socialLoading}
                      className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border/60 bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 disabled:opacity-60">
                      {socialLoading === 'google' ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      )}
                      Google
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('github')} disabled={!!socialLoading}
                      className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border/60 bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 disabled:opacity-60">
                      {socialLoading === 'github' ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                      )}
                      GitHub
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-slate-400 mt-6"
          >
            NovaTec © {new Date().getFullYear()} · Todos los derechos reservados
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

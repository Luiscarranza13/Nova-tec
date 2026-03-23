'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Code2, Eye, EyeOff, Loader2, LogIn, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0] as keyof LoginFormData] = error.message
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
          description: 'Verifica tu correo y contraseña e intenta de nuevo.',
        })
        return
      }

      toast.success('¡Bienvenido de nuevo!')
      // Pequeña espera para que Supabase persista las cookies antes de navegar
      await new Promise(r => setTimeout(r, 300))
      window.location.href = redirect
    } catch {
      toast.error('Error de conexión', { description: 'Intenta de nuevo.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-[15%] left-[5%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[160px]" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-chart-2/8 rounded-full blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-2 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative bg-gradient-to-br from-primary to-chart-2 p-2.5 rounded-xl">
                <Code2 className="h-7 w-7 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight">
              Nova<span className="text-gradient">Tec</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl border border-border/40 shadow-2xl overflow-hidden">
          {/* Header con gradiente */}
          <div className="px-8 pt-8 pb-6 border-b border-border/30">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold font-heading">Acceso al Panel</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-[52px]">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@novatec.mx"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`h-11 bg-background/50 ${errors.email ? 'border-destructive' : ''}`}
                autoComplete="email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <Link
                  href="/recuperar-password"
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`h-11 bg-background/50 pr-11 ${errors.password ? 'border-destructive' : ''}`}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 mt-2 font-semibold shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-7 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className="text-primary hover:underline underline-offset-4 font-medium">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Nota de seguridad */}
        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          Conexión segura · NovaTec © {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

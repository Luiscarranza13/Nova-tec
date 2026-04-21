'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Eye, EyeOff, Loader2, CheckCircle2, User, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(80),
  email:  z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirm:  z.string(),
}).refine(d => d.password === d.confirm, { message: 'Las contraseñas no coinciden', path: ['confirm'] })

export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const strength = form.password.length === 0 ? 0
    : form.password.length < 4 ? 1 : form.password.length < 6 ? 2 : form.password.length < 8 ? 3 : 4
  const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400']
  const strengthLabels = ['', 'Muy débil', 'Débil', 'Regular', 'Fuerte']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.terms) { toast.error('Debes aceptar los términos'); return }

    const result = schema.safeParse(form)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.errors.forEach(e => { errs[e.path[0] as string] = e.message })
      setErrors(errs); return
    }
    setErrors({})
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.nombre } },
      })
      if (error) throw error
      setDone(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al crear cuenta'
      if (msg.includes('already registered')) toast.error('Este email ya está registrado')
      else toast.error(msg)
    } finally { setLoading(false) }
  }

  const set = (k: string, v: string | boolean) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => { const n = { ...p }; delete n[k]; return n })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/60 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-100/50 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[420px]">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-heading">Nova<span className="text-indigo-600">Tec</span></span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-200/80 p-8">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-6 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">¡Cuenta creada!</p>
                  <p className="text-sm text-slate-500 mt-1">Revisa tu email para confirmar tu cuenta.</p>
                </div>
                <Link href="/login">
                  <Button className="mt-2 gap-2">Ir al login <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold font-heading text-slate-900">Crear cuenta</h1>
                  <p className="text-slate-500 text-sm mt-1">Únete a NovaTec hoy</p>
                </div>

                {/* Nombre */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input value={form.nombre} onChange={e => set('nombre', e.target.value)}
                      placeholder="Tu nombre" className="pl-9 h-11" disabled={loading} />
                  </div>
                  {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder="tu@email.com" className="pl-9 h-11" disabled={loading} />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type={showPass ? 'text' : 'password'} value={form.password}
                      onChange={e => set('password', e.target.value)}
                      placeholder="••••••••" className="pl-9 pr-10 h-11" disabled={loading} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400">Seguridad: <span className="font-medium">{strengthLabels[strength]}</span></p>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                {/* Confirm */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Confirmar contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type={showConfirm ? 'text' : 'password'} value={form.confirm}
                      onChange={e => set('confirm', e.target.value)}
                      placeholder="••••••••" className="pl-9 pr-10 h-11" disabled={loading} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={form.terms} onChange={e => set('terms', e.target.checked)}
                    className="mt-0.5 accent-indigo-600" />
                  <span className="text-xs text-slate-500 leading-relaxed">
                    Acepto los{' '}
                    <Link href="/terminos" className="text-indigo-600 hover:underline">términos y condiciones</Link>
                    {' '}y la{' '}
                    <Link href="/politicas" className="text-indigo-600 hover:underline">política de privacidad</Link>
                  </span>
                </label>

                <Button type="submit" className="w-full h-11 font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200" disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Creando cuenta...</> : 'Crear Cuenta'}
                </Button>

                <p className="text-center text-sm text-slate-500">
                  ¿Ya tienes cuenta?{' '}
                  <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Inicia sesión</Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

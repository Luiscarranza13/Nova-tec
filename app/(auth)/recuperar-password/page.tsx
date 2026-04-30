'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, ArrowLeft, Loader2, Mail, CheckCircle2, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export default function RecuperarPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Ingresa un email válido')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/configuracion?tab=seguridad`,
      })
      if (error) throw error
      setSent(true)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al enviar el correo')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/60 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-100/50 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[400px]">

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
            {sent ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-4 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">¡Correo enviado!</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    Enviamos un enlace de recuperación a<br />
                    <span className="font-semibold text-slate-700">{email}</span>
                  </p>
                </div>
                <p className="text-xs text-slate-400">Revisa también tu carpeta de spam.</p>
                <Link href="/login" className="w-full mt-2">
                  <Button variant="outline" className="w-full gap-2">
                    <ArrowLeft className="h-4 w-4" /> Volver al login
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <KeyRound className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h1 className="text-2xl font-bold font-heading text-slate-900">Recuperar contraseña</h1>
                  <p className="text-slate-500 text-sm mt-1">Te enviaremos un enlace para restablecerla.</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="tu@email.com" className="pl-9 h-11" disabled={loading} required />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200" disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Enviando...</> : 'Enviar enlace de recuperación'}
                </Button>

                <Link href="/login" className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Volver al login
                </Link>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

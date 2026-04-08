'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import {
  Settings, Globe, Mail, Share2, User, Bell,
  BarChart3, Receipt, Lock, Eye, EyeOff,
  Percent, DollarSign, Smartphone,
  Upload, X, Loader2, CheckCircle2,
} from 'lucide-react'

const inputCls = 'bg-white border-slate-200 text-slate-900 h-11 rounded-xl placeholder:text-slate-400 focus:border-violet-400 transition-colors'
const textareaCls = 'bg-white border-slate-200 text-slate-900 rounded-xl placeholder:text-slate-400 resize-none focus:border-violet-400 transition-colors p-3'

const tabItems = [
  { value: 'perfil',         label: 'Mi Perfil',      icon: User      },
  { value: 'seguridad',      label: 'Seguridad',      icon: Lock      },
  { value: 'general',        label: 'General',        icon: Settings  },
  { value: 'contact',        label: 'Contacto',       icon: Mail      },
  { value: 'social',         label: 'Redes',          icon: Share2    },
  { value: 'seo',            label: 'SEO',            icon: Globe     },
  { value: 'notificaciones', label: 'Notificaciones', icon: Bell      },
  { value: 'facturacion',    label: 'Facturación',    icon: Receipt   },
]

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        <div className="px-7 py-5 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
        <div className="p-7 space-y-5">{children}</div>
      </div>
    </motion.div>
  )
}

function Field({ id, label, hint, children }: { id?: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

function SaveBtn({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) {
  return (
    <div className="flex justify-end pt-2">
      <Button onClick={onClick} disabled={loading}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-md shadow-violet-200 px-6 gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </div>
  )
}

function ToggleRow({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  )
}

// ─── Avatar uploader ─────────────────────────────────────────────
const ACCEPTED = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_MB = 2

function AvatarUploader({ currentUrl }: { currentUrl?: string | null }) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    if (!ACCEPTED.includes(file.type)) { toast.error('Formato no válido. Usa JPG, PNG, GIF o WebP'); return }
    if (file.size > MAX_MB * 1024 * 1024) { toast.error(`El archivo supera los ${MAX_MB}MB`); return }
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No autenticado')
      const ext = file.name.split('.').pop()
      const path = `avatars/${user.id}.${ext}`
      const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type })
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
      const { error: updateError } = await supabase.from('usuarios').update({ foto_url: publicUrl }).eq('id', user.id)
      if (updateError) throw updateError
      toast.success('Foto de perfil actualizada')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al subir la imagen'
      toast.error(msg)
      setPreview(null)
    } finally { setUploading(false) }
  }, [])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) processFile(f) }
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f) }

  return (
    <div className="flex items-start gap-6">
      <div className="relative shrink-0">
        <div className={`h-24 w-24 rounded-2xl border-2 overflow-hidden flex items-center justify-center transition-all duration-300 ${preview ? 'border-violet-400' : 'border-slate-200'} bg-gradient-to-br from-violet-50 to-indigo-50`}>
          {preview ? <img src={preview} alt="Avatar" className="h-full w-full object-cover" /> : <span className="text-slate-400 text-2xl font-bold select-none">NT</span>}
          {uploading && <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl"><Loader2 className="h-6 w-6 text-violet-600 animate-spin" /></div>}
        </div>
        {preview && !uploading && (
          <button onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = '' }}
            className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center hover:bg-red-400 transition-colors">
            <X className="h-3 w-3 text-white" />
          </button>
        )}
      </div>
      <div className="flex-1">
        <input ref={inputRef} type="file" accept={ACCEPTED.join(',')} className="hidden" onChange={onFileChange} />
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition-all duration-200 ${isDragging ? 'border-violet-400 bg-violet-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
        >
          <Upload className="h-5 w-5 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600"><span className="text-violet-600 font-medium">Haz clic</span> o arrastra tu imagen aquí</p>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG, GIF, WebP · Máx {MAX_MB}MB</p>
        </div>
      </div>
    </div>
  )
}

// ─── Perfil Tab ───────────────────────────────────────────────────
function PerfilTab() {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({ nombre: '', correo: '', telefono: '', foto_url: '' })

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserData(prev => ({ ...prev, correo: user.email || '' }))
      const { data } = await supabase.from('usuarios').select('*').eq('id', user.id).single()
      if (data) setUserData({ nombre: data.nombre_completo || '', correo: user.email || '', telefono: data.telefono || '', foto_url: data.foto_url || '' })
    }
    load()
  }, [])

  const guardar = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No autenticado')
      const { error } = await supabase.from('usuarios').upsert({
        id: user.id,
        nombre_completo: userData.nombre,
        telefono: userData.telefono || null,
        correo: userData.correo,
        actualizado_en: new Date().toISOString(),
      })
      if (error) throw error
      toast.success('Perfil actualizado correctamente')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar'
      toast.error(msg)
    } finally { setLoading(false) }
  }

  return (
    <SectionCard title="Información Personal" description="Datos de tu cuenta de administrador.">
      <AvatarUploader currentUrl={userData.foto_url} />
      <Separator className="bg-slate-100" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="fullName" label="Nombre completo">
          <Input id="fullName" value={userData.nombre} onChange={e => setUserData(p => ({ ...p, nombre: e.target.value }))} placeholder="Tu nombre completo" className={inputCls} />
        </Field>
        <Field id="adminEmail" label="Correo electrónico">
          <Input id="adminEmail" type="email" value={userData.correo} disabled className={`${inputCls} opacity-60 cursor-not-allowed bg-slate-50`} />
        </Field>
        <Field id="adminPhone" label="Teléfono">
          <Input id="adminPhone" type="tel" value={userData.telefono} onChange={e => setUserData(p => ({ ...p, telefono: e.target.value }))} placeholder="+51 999 999 999" className={inputCls} />
        </Field>
        <Field id="adminRole" label="Rol">
          <Input id="adminRole" value="Administrador" disabled className={`${inputCls} opacity-50 cursor-not-allowed bg-slate-50`} />
        </Field>
      </div>
      <SaveBtn onClick={guardar} loading={loading} />
    </SectionCard>
  )
}

// ─── Seguridad Tab ────────────────────────────────────────────────
function SeguridadTab() {
  const [loading, setLoading] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ currentPass: '', newPass: '', confirmPass: '' })

  const cambiarPassword = async () => {
    if (!form.newPass || form.newPass.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres')
      return
    }
    if (form.newPass !== form.confirmPass) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    try {
      // Verificar contraseña actual re-autenticando
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) throw new Error('No autenticado')

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: form.currentPass,
      })
      if (signInError) throw new Error('La contraseña actual es incorrecta')

      // Actualizar contraseña
      const { error } = await supabase.auth.updateUser({ password: form.newPass })
      if (error) throw error

      toast.success('Contraseña actualizada correctamente')
      setForm({ currentPass: '', newPass: '', confirmPass: '' })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al cambiar contraseña'
      toast.error(msg)
    } finally { setLoading(false) }
  }

  return (
    <SectionCard title="Cambiar Contraseña" description="Actualiza tu contraseña de acceso al panel.">
      <Field id="currentPass" label="Contraseña actual">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input id="currentPass" type={showCurrent ? 'text' : 'password'} value={form.currentPass}
            onChange={e => setForm(p => ({ ...p, currentPass: e.target.value }))}
            placeholder="••••••••" className={`${inputCls} pl-9 pr-10`} />
          <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
            {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="newPass" label="Nueva contraseña">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="newPass" type={showNew ? 'text' : 'password'} value={form.newPass}
              onChange={e => setForm(p => ({ ...p, newPass: e.target.value }))}
              placeholder="••••••••" className={`${inputCls} pl-9 pr-10`} />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <Field id="confirmPass" label="Confirmar contraseña">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="confirmPass" type={showConfirm ? 'text' : 'password'} value={form.confirmPass}
              onChange={e => setForm(p => ({ ...p, confirmPass: e.target.value }))}
              placeholder="••••••••" className={`${inputCls} pl-9 pr-10`} />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
      </div>

      {/* Password strength indicator */}
      {form.newPass && (
        <div className="space-y-1.5">
          <div className="flex gap-1">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                form.newPass.length >= i * 2
                  ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-amber-400' : i <= 3 ? 'bg-blue-400' : 'bg-emerald-400'
                  : 'bg-slate-200'
              }`} />
            ))}
          </div>
          <p className="text-xs text-slate-400">
            {form.newPass.length < 4 ? 'Muy débil' : form.newPass.length < 6 ? 'Débil' : form.newPass.length < 8 ? 'Regular' : 'Fuerte'}
          </p>
        </div>
      )}

      {form.confirmPass && form.newPass !== form.confirmPass && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X className="h-3 w-3" /> Las contraseñas no coinciden
        </p>
      )}
      {form.confirmPass && form.newPass === form.confirmPass && (
        <p className="text-xs text-emerald-500 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Las contraseñas coinciden
        </p>
      )}

      <p className="text-xs text-slate-400">Mínimo 8 caracteres. Incluye mayúsculas, números y símbolos para mayor seguridad.</p>
      <SaveBtn onClick={cambiarPassword} loading={loading} />
    </SectionCard>
  )
}

// ─── Page ────────────────────────────────────────────────────────
export default function ConfiguracionPage() {
  const saveMultiple = async (pairs: Record<string, string>) => {
    const rows = Object.entries(pairs).map(([clave, valor]) => ({ clave, valor, actualizado_en: new Date().toISOString() }))
    const { error } = await supabase.from('configuracion').upsert(rows, { onConflict: 'clave' })
    if (error) throw error
  }

  const makeSave = (pairs: Record<string, () => string>, msg = 'Configuración guardada') => async () => {
    try {
      const data: Record<string, string> = {}
      Object.entries(pairs).forEach(([k, fn]) => { data[k] = fn() })
      await saveMultiple(data)
      toast.success(msg)
    } catch (err: unknown) {
      const m = err instanceof Error ? err.message : 'Error al guardar'
      toast.error(m)
    }
  }

  // General state
  const [companyName, setCompanyName] = useState('NovaTec')
  const [tagline, setTagline] = useState('Transformamos Ideas en Software Excepcional')
  const [description, setDescription] = useState('Somos una empresa de desarrollo de software comprometida con la excelencia y la innovación tecnológica.')
  const [logo, setLogo] = useState('')
  const [savingGeneral, setSavingGeneral] = useState(false)

  // Contact state
  const [email, setEmail] = useState('hola@novatec.pe')
  const [phone, setPhone] = useState('+51 999 999 999')
  const [address, setAddress] = useState('Av. Tecnológico 123, Lima, Perú')
  const [hours, setHours] = useState('Lunes a Viernes: 9:00 - 18:00')
  const [whatsapp, setWhatsapp] = useState('')
  const [savingContact, setSavingContact] = useState(false)

  // SEO state
  const [metaTitle, setMetaTitle] = useState('NovaTec | Desarrollo de Software Premium')
  const [metaDesc, setMetaDesc] = useState('Transformamos Ideas en Software Excepcional. Desarrollo web, móvil y soluciones tecnológicas de alto nivel.')
  const [keywords, setKeywords] = useState('desarrollo de software, desarrollo web, desarrollo móvil')
  const [savingSeo, setSavingSeo] = useState(false)

  // Load config from DB on mount
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('configuracion').select('clave, valor')
      if (!data) return
      const map: Record<string, string> = {}
      data.forEach(r => { if (r.clave && r.valor) map[r.clave] = r.valor })
      if (map.nombre_empresa) setCompanyName(map.nombre_empresa)
      if (map.tagline) setTagline(map.tagline)
      if (map.descripcion) setDescription(map.descripcion)
      if (map.logo_url) setLogo(map.logo_url)
      if (map.correo_contacto) setEmail(map.correo_contacto)
      if (map.telefono) setPhone(map.telefono)
      if (map.direccion) setAddress(map.direccion)
      if (map.horario) setHours(map.horario)
      if (map.whatsapp) setWhatsapp(map.whatsapp)
      if (map.meta_titulo) setMetaTitle(map.meta_titulo)
      if (map.meta_descripcion) setMetaDesc(map.meta_descripcion)
      if (map.palabras_clave) setKeywords(map.palabras_clave)
    }
    load()
  }, [])

  const handleSaveGeneral = async () => {
    setSavingGeneral(true)
    try {
      await saveMultiple({ nombre_empresa: companyName, tagline, descripcion: description, logo_url: logo })
      toast.success('Configuración general guardada')
    } catch { toast.error('Error al guardar') }
    setSavingGeneral(false)
  }

  const handleSaveContact = async () => {
    setSavingContact(true)
    try {
      await saveMultiple({ correo_contacto: email, telefono: phone, direccion: address, horario: hours, whatsapp })
      toast.success('Datos de contacto guardados')
    } catch { toast.error('Error al guardar') }
    setSavingContact(false)
  }

  const handleSaveSeo = async () => {
    setSavingSeo(true)
    try {
      await saveMultiple({ meta_titulo: metaTitle, meta_descripcion: metaDesc, palabras_clave: keywords })
      toast.success('SEO guardado')
    } catch { toast.error('Error al guardar') }
    setSavingSeo(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-7 max-w-4xl">

      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100 mb-1">Panel Admin</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Configuración</h1>
          <p className="text-emerald-100 mt-1 text-sm">Ajusta los parámetros globales de tu plataforma</p>
        </div>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <div className="overflow-x-auto pb-1">
          <TabsList className="bg-slate-100 border border-slate-200 p-1 rounded-xl h-auto gap-1 w-max">
            {tabItems.map((t) => (
              <TabsTrigger key={t.value} value={t.value}
                className="rounded-lg px-4 py-2 text-sm text-slate-500 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm flex items-center gap-2 transition-all whitespace-nowrap font-medium">
                <t.icon className="h-3.5 w-3.5" />{t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* PERFIL */}
        <TabsContent value="perfil"><PerfilTab /></TabsContent>

        {/* SEGURIDAD */}
        <TabsContent value="seguridad"><SeguridadTab /></TabsContent>

        {/* GENERAL */}
        <TabsContent value="general">
          <SectionCard title="Identidad de Marca" description="Información principal que representa a tu empresa.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="companyName" label="Nombre oficial">
                <Input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} className={inputCls} />
              </Field>
              <Field id="tagline" label="Slogan / Tagline">
                <Input id="tagline" value={tagline} onChange={e => setTagline(e.target.value)} className={inputCls} />
              </Field>
            </div>
            <Field id="description" label="Descripción">
              <Textarea id="description" rows={3} value={description} onChange={e => setDescription(e.target.value)} className={textareaCls} />
            </Field>
            <Field id="logo" label="URL del Logo" hint="Recomendado: SVG o PNG con fondo transparente">
              <Input id="logo" type="url" value={logo} onChange={e => setLogo(e.target.value)} placeholder="https://..." className={inputCls} />
            </Field>
            <SaveBtn onClick={handleSaveGeneral} loading={savingGeneral} />
          </SectionCard>
        </TabsContent>

        {/* CONTACTO */}
        <TabsContent value="contact">
          <SectionCard title="Puntos de Contacto" description="Vías por las que tus clientes se comunicarán contigo.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="email" label="Correo principal">
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
              </Field>
              <Field id="phone" label="Teléfono">
                <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
              </Field>
            </div>
            <Field id="address" label="Dirección">
              <Textarea id="address" rows={2} value={address} onChange={e => setAddress(e.target.value)} className={textareaCls} />
            </Field>
            <Field id="hours" label="Horario de atención">
              <Input id="hours" value={hours} onChange={e => setHours(e.target.value)} className={inputCls} />
            </Field>
            <Field id="whatsapp" label="WhatsApp" hint="Número con código de país. Ej: 51999999999">
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input id="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="51999999999" className={`${inputCls} pl-9`} />
              </div>
            </Field>
            <SaveBtn onClick={handleSaveContact} loading={savingContact} />
          </SectionCard>
        </TabsContent>

        {/* REDES */}
        <TabsContent value="social">
          <SocialTab saveMultiple={saveMultiple} />
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo">
          <SectionCard title="Optimización SEO" description="Mejora la visibilidad de tu sitio en buscadores.">
            <Field id="metaTitle" label="Título Meta" hint="Máximo 60 caracteres recomendado">
              <Input id="metaTitle" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className={inputCls} />
            </Field>
            <Field id="metaDescription" label="Descripción Meta" hint="Máximo 160 caracteres recomendado">
              <Textarea id="metaDescription" rows={3} value={metaDesc} onChange={e => setMetaDesc(e.target.value)} className={textareaCls} />
            </Field>
            <Field id="keywords" label="Palabras clave" hint="Separadas por comas">
              <Input id="keywords" value={keywords} onChange={e => setKeywords(e.target.value)} className={inputCls} />
            </Field>
            <ToggleRow label="Modo Mantenimiento" description="Muestra una página de mantenimiento a los visitantes del sitio" />
            <SaveBtn onClick={handleSaveSeo} loading={savingSeo} />
          </SectionCard>
        </TabsContent>

        {/* NOTIFICACIONES */}
        <TabsContent value="notificaciones" className="space-y-5">
          <SectionCard title="Alertas por Email" description="Elige qué eventos te notifican por correo electrónico.">
            <ToggleRow label="Nuevo mensaje de contacto" description="Recibe un email cuando alguien llene el formulario de contacto" defaultChecked />
            <ToggleRow label="Nueva cotización solicitada" description="Notificación cuando un cliente solicite una cotización" defaultChecked />
            <ToggleRow label="Cotización aceptada" description="Alerta cuando un cliente acepte una propuesta comercial" defaultChecked />
            <ToggleRow label="Cotización rechazada" description="Alerta cuando un cliente rechace una propuesta" />
            <ToggleRow label="Nuevo registro de usuario" description="Notificación cuando alguien cree una cuenta en el sitio" />
            <SaveBtn onClick={() => toast.success('Preferencias guardadas')} />
          </SectionCard>
        </TabsContent>

        {/* FACTURACIÓN */}
        <TabsContent value="facturacion" className="space-y-5">
          <SectionCard title="Configuración Fiscal" description="Parámetros que se aplican automáticamente a todas las cotizaciones.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="taxRate" label="Tasa de impuesto (IGV)" hint="Porcentaje aplicado al subtotal">
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="taxRate" type="number" defaultValue="18" min="0" max="100" className={`${inputCls} pl-9`} />
                </div>
              </Field>
              <Field id="currency" label="Moneda">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="currency" defaultValue="PEN" className={`${inputCls} pl-9`} />
                </div>
              </Field>
              <Field id="currencySymbol" label="Símbolo de moneda">
                <Input id="currencySymbol" defaultValue="S/" className={inputCls} />
              </Field>
              <Field id="validDays" label="Días de validez por defecto" hint="Días que una cotización es válida">
                <Input id="validDays" type="number" defaultValue="30" min="1" className={inputCls} />
              </Field>
            </div>
            <SaveBtn onClick={() => toast.success('Configuración fiscal guardada')} />
          </SectionCard>
          <SectionCard title="Notas y Términos" description="Texto que aparece al pie de cada cotización generada.">
            <Field id="quotationNotes" label="Notas por defecto en cotizaciones">
              <Textarea id="quotationNotes" rows={3} defaultValue="Los precios están expresados en PEN e incluyen IGV. Esta cotización es válida por 30 días a partir de su fecha de emisión." className={textareaCls} />
            </Field>
            <Field id="paymentTerms" label="Términos de pago">
              <Textarea id="paymentTerms" rows={3} defaultValue="50% al inicio del proyecto, 50% a la entrega. Transferencia bancaria o depósito." className={textareaCls} />
            </Field>
            <SaveBtn onClick={() => toast.success('Términos guardados')} />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

// ─── Social Tab (separado para manejar su propio estado) ──────────
function SocialTab({ saveMultiple }: { saveMultiple: (pairs: Record<string, string>) => Promise<void> }) {
  const [saving, setSaving] = useState(false)
  const [social, setSocial] = useState({ facebook: '', twitter: '', instagram: '', linkedin: '', github: '', youtube: '' })

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('configuracion').select('clave, valor').in('clave', ['facebook', 'twitter', 'instagram', 'linkedin', 'github', 'youtube'])
      if (!data) return
      const map: Record<string, string> = {}
      data.forEach(r => { if (r.clave && r.valor) map[r.clave] = r.valor })
      setSocial(prev => ({ ...prev, ...map }))
    }
    load()
  }, [])

  const guardar = async () => {
    setSaving(true)
    try {
      await saveMultiple(social)
      toast.success('Redes sociales guardadas')
    } catch { toast.error('Error al guardar') }
    setSaving(false)
  }

  const fields = [
    { id: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
    { id: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/...' },
    { id: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
    { id: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
    { id: 'github', label: 'GitHub', placeholder: 'https://github.com/...' },
    { id: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
  ] as const

  return (
    <SectionCard title="Redes Sociales" description="Configura los enlaces a tus perfiles sociales.">
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((s) => (
          <Field key={s.id} id={s.id} label={s.label}>
            <Input id={s.id} type="url" value={social[s.id]} onChange={e => setSocial(p => ({ ...p, [s.id]: e.target.value }))} placeholder={s.placeholder} className={inputCls} />
          </Field>
        ))}
      </div>
      <SaveBtn onClick={guardar} loading={saving} />
    </SectionCard>
  )
}

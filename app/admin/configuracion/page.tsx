'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Receipt, Lock, Eye, EyeOff, Percent, DollarSign,
  Smartphone, Upload, X, Loader2, CheckCircle2,
  Facebook, Twitter, Instagram, Linkedin, Github, Youtube,
  Shield, Palette, Phone, MapPin, Clock,
} from 'lucide-react'

// ─── Styles ──────────────────────────────────────────────────────────────────
const inputCls = 'bg-white border-slate-200 text-slate-900 h-11 rounded-xl placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all'
const textareaCls = 'bg-white border-slate-200 text-slate-900 rounded-xl placeholder:text-slate-400 resize-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all p-3'

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

// ─── Shared Components ────────────────────────────────────────────────────────
function SectionCard({ title, description, icon: Icon, children }: {
  title: string; description: string; icon?: React.ElementType; children: React.ReactNode
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="px-7 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-start gap-3">
          {Icon && (
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
              <Icon className="h-4 w-4 text-violet-600" />
            </div>
          )}
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="p-7 space-y-5">{children}</div>
      </div>
    </motion.div>
  )
}

function Field({ id, label, hint, children }: {
  id?: string; label: string; hint?: string; children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  )
}

function SaveBtn({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) {
  return (
    <div className="flex justify-end pt-2">
      <Button onClick={onClick} disabled={loading}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-md shadow-violet-200/50 px-6 gap-2 h-11 font-medium transition-all hover:shadow-lg hover:shadow-violet-200/60 hover:-translate-y-0.5">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange}
        className="data-[state=checked]:bg-violet-600" />
    </div>
  )
}

// ─── Avatar Uploader ──────────────────────────────────────────────────────────
const ACCEPTED = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_MB = 2

function AvatarUploader({ currentUrl, initials, onUploaded }: {
  currentUrl?: string | null; initials?: string; onUploaded?: (url: string) => void
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setPreview(currentUrl || null) }, [currentUrl])

  const processFile = useCallback(async (file: File) => {
    if (!ACCEPTED.includes(file.type)) { toast.error('Formato no válido'); return }
    if (file.size > MAX_MB * 1024 * 1024) { toast.error(`Máximo ${MAX_MB}MB`); return }
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No autenticado')
      const ext = file.name.split('.').pop()
      const filePath = `avatars/${user.id}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('avatars').upload(filePath, file, { upsert: true, contentType: file.type })
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const { error: updateError } = await supabase.from('usuarios').upsert({
        id: user.id, correo: user.email ?? '', foto_url: publicUrl,
        actualizado_en: new Date().toISOString(),
      })
      if (updateError) throw updateError
      const stamped = `${publicUrl}?t=${Date.now()}`
      setPreview(stamped)
      onUploaded?.(publicUrl)
      toast.success('Foto de perfil actualizada')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al subir la imagen')
      setPreview(currentUrl || null)
    } finally { setUploading(false) }
  }, [currentUrl, onUploaded])

  return (
    <div className="flex items-start gap-6">
      <div className="relative shrink-0">
        <div className={`h-24 w-24 rounded-2xl border-2 overflow-hidden flex items-center justify-center transition-all duration-300 ${preview ? 'border-violet-400 shadow-lg shadow-violet-100' : 'border-slate-200'} bg-gradient-to-br from-violet-50 to-indigo-50`}>
          {preview
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
            : <span className="text-violet-400 text-2xl font-bold select-none">{initials || 'NT'}</span>
          }
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl backdrop-blur-sm">
              <Loader2 className="h-6 w-6 text-violet-600 animate-spin" />
            </div>
          )}
        </div>
        {preview && !uploading && (
          <button onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = '' }}
            className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center hover:bg-red-400 transition-colors shadow-sm">
            <X className="h-3 w-3 text-white" />
          </button>
        )}
      </div>
      <div className="flex-1">
        <input ref={inputRef} type="file" accept={ACCEPTED.join(',')} className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f) }} />
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f) }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 ${isDragging ? 'border-violet-400 bg-violet-50 scale-[1.01]' : 'border-slate-200 hover:border-violet-300 hover:bg-violet-50/50'}`}
        >
          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <Upload className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-600"><span className="text-violet-600 font-semibold">Haz clic</span> o arrastra tu imagen aquí</p>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG, GIF, WebP · Máx {MAX_MB}MB</p>
        </div>
      </div>
    </div>
  )
}

// ─── Perfil Tab ───────────────────────────────────────────────────────────────
function PerfilTab() {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({ nombre: '', correo: '', telefono: '', foto_url: '' })

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('usuarios').select('*').eq('id', user.id).single()
      setUserData({
        nombre: data?.nombre_completo || '',
        correo: user.email || '',
        telefono: data?.telefono || '',
        foto_url: data?.foto_url || '',
      })
    }
    load()
  }, [])

  const initials = userData.nombre
    ? userData.nombre.trim().split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
    : userData.correo.split('@')[0].slice(0, 2).toUpperCase()

  const guardar = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No autenticado')
      const { error } = await supabase.from('usuarios').upsert({
        id: user.id, nombre_completo: userData.nombre,
        telefono: userData.telefono || null, correo: userData.correo,
        actualizado_en: new Date().toISOString(),
      })
      if (error) throw error
      toast.success('Perfil actualizado correctamente')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al guardar')
    } finally { setLoading(false) }
  }

  return (
    <SectionCard title="Información Personal" description="Datos de tu cuenta de administrador." icon={User}>
      <AvatarUploader
        currentUrl={userData.foto_url} initials={initials}
        onUploaded={(url) => setUserData(p => ({ ...p, foto_url: url }))}
      />
      <Separator className="bg-slate-100" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="fullName" label="Nombre completo">
          <Input id="fullName" value={userData.nombre}
            onChange={e => setUserData(p => ({ ...p, nombre: e.target.value }))}
            placeholder="Tu nombre completo" className={inputCls} />
        </Field>
        <Field id="adminEmail" label="Correo electrónico">
          <Input id="adminEmail" type="email" value={userData.correo} disabled
            className={`${inputCls} opacity-60 cursor-not-allowed bg-slate-50`} />
        </Field>
        <Field id="adminPhone" label="Teléfono">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="adminPhone" type="tel" value={userData.telefono}
              onChange={e => setUserData(p => ({ ...p, telefono: e.target.value }))}
              placeholder="+51 999 999 999" className={`${inputCls} pl-9`} />
          </div>
        </Field>
        <Field id="adminRole" label="Rol">
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input id="adminRole" value="Administrador" disabled
              className={`${inputCls} pl-9 opacity-50 cursor-not-allowed bg-slate-50`} />
          </div>
        </Field>
      </div>
      <SaveBtn onClick={guardar} loading={loading} />
    </SectionCard>
  )
}

// ─── Seguridad Tab ────────────────────────────────────────────────────────────
function SeguridadTab() {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState({ current: false, new: false, confirm: false })
  const [form, setForm] = useState({ currentPass: '', newPass: '', confirmPass: '' })

  const strength = form.newPass.length === 0 ? 0
    : form.newPass.length < 4 ? 1 : form.newPass.length < 6 ? 2 : form.newPass.length < 8 ? 3 : 4

  const strengthLabel = ['', 'Muy débil', 'Débil', 'Regular', 'Fuerte']
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400']

  const cambiarPassword = async () => {
    if (!form.newPass || form.newPass.length < 8) { toast.error('Mínimo 8 caracteres'); return }
    if (form.newPass !== form.confirmPass) { toast.error('Las contraseñas no coinciden'); return }
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) throw new Error('No autenticado')
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: user.email, password: form.currentPass })
      if (signInError) throw new Error('Contraseña actual incorrecta')
      const { error } = await supabase.auth.updateUser({ password: form.newPass })
      if (error) throw error
      toast.success('Contraseña actualizada correctamente')
      setForm({ currentPass: '', newPass: '', confirmPass: '' })
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al cambiar contraseña')
    } finally { setLoading(false) }
  }

  const PasswordInput = ({ id, label, field, showKey }: { id: string; label: string; field: keyof typeof form; showKey: keyof typeof show }) => (
    <Field id={id} label={label}>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input id={id} type={show[showKey] ? 'text' : 'password'} value={form[field]}
          onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
          placeholder="••••••••" className={`${inputCls} pl-9 pr-10`} />
        <button type="button" onClick={() => setShow(p => ({ ...p, [showKey]: !p[showKey] }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
          {show[showKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </Field>
  )

  return (
    <SectionCard title="Cambiar Contraseña" description="Actualiza tu contraseña de acceso al panel." icon={Lock}>
      <PasswordInput id="currentPass" label="Contraseña actual" field="currentPass" showKey="current" />
      <div className="grid gap-5 md:grid-cols-2">
        <PasswordInput id="newPass" label="Nueva contraseña" field="newPass" showKey="new" />
        <PasswordInput id="confirmPass" label="Confirmar contraseña" field="confirmPass" showKey="confirm" />
      </div>
      <AnimatePresence>
        {form.newPass && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
            <div className="flex gap-1.5">
              {[1,2,3,4].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-slate-200'}`} />
              ))}
            </div>
            <p className="text-xs text-slate-500">Seguridad: <span className={`font-medium ${strength <= 1 ? 'text-red-500' : strength <= 2 ? 'text-amber-500' : strength <= 3 ? 'text-blue-500' : 'text-emerald-500'}`}>{strengthLabel[strength]}</span></p>
          </motion.div>
        )}
        {form.confirmPass && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`text-xs flex items-center gap-1.5 ${form.newPass !== form.confirmPass ? 'text-red-500' : 'text-emerald-500'}`}>
            {form.newPass !== form.confirmPass
              ? <><X className="h-3.5 w-3.5" /> Las contraseñas no coinciden</>
              : <><CheckCircle2 className="h-3.5 w-3.5" /> Las contraseñas coinciden</>}
          </motion.p>
        )}
      </AnimatePresence>
      <p className="text-xs text-slate-400">Mínimo 8 caracteres.</p>
      <SaveBtn onClick={cambiarPassword} loading={loading} />
    </SectionCard>
  )
}

// ─── Social Tab ───────────────────────────────────────────────────────────────
function SocialTab({ saveMultiple }: { saveMultiple: (pairs: Record<string, string>) => Promise<void> }) {
  const [saving, setSaving] = useState(false)
  const [social, setSocial] = useState({ facebook: '', twitter: '', instagram: '', linkedin: '', github: '', youtube: '' })

  useEffect(() => {
    supabase.from('configuracion').select('clave, valor')
      .in('clave', ['facebook', 'twitter', 'instagram', 'linkedin', 'github', 'youtube'])
      .then(({ data }) => {
        if (!data) return
        const map: Record<string, string> = {}
        data.forEach(r => { if (r.clave && r.valor) map[r.clave] = r.valor })
        setSocial(p => ({ ...p, ...map }))
      })
  }, [])

  const guardar = async () => {
    setSaving(true)
    try { await saveMultiple(social); toast.success('Redes sociales guardadas') }
    catch { toast.error('Error al guardar') }
    setSaving(false)
  }

  const fields = [
    { id: 'facebook',  label: 'Facebook',    placeholder: 'https://facebook.com/...', Icon: Facebook  },
    { id: 'twitter',   label: 'Twitter / X', placeholder: 'https://twitter.com/...',  Icon: Twitter   },
    { id: 'instagram', label: 'Instagram',   placeholder: 'https://instagram.com/...', Icon: Instagram },
    { id: 'linkedin',  label: 'LinkedIn',    placeholder: 'https://linkedin.com/...',  Icon: Linkedin  },
    { id: 'github',    label: 'GitHub',      placeholder: 'https://github.com/...',    Icon: Github    },
    { id: 'youtube',   label: 'YouTube',     placeholder: 'https://youtube.com/...',   Icon: Youtube   },
  ] as const

  return (
    <SectionCard title="Redes Sociales" description="Configura los enlaces a tus perfiles sociales." icon={Share2}>
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map(({ id, label, placeholder, Icon }) => (
          <Field key={id} id={id} label={label}>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input id={id} type="url" value={social[id]}
                onChange={e => setSocial(p => ({ ...p, [id]: e.target.value }))}
                placeholder={placeholder} className={`${inputCls} pl-9`} />
            </div>
          </Field>
        ))}
      </div>
      <SaveBtn onClick={guardar} loading={saving} />
    </SectionCard>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ConfiguracionPage() {
  const saveMultiple = async (pairs: Record<string, string>) => {
    const rows = Object.entries(pairs).map(([clave, valor]) => ({ clave, valor, actualizado_en: new Date().toISOString() }))
    const { error } = await supabase.from('configuracion').upsert(rows, { onConflict: 'clave' })
    if (error) throw error
  }

  // General
  const [companyName, setCompanyName] = useState('NovaTec')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [savingGeneral, setSavingGeneral] = useState(false)

  // Contact
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [hours, setHours] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [savingContact, setSavingContact] = useState(false)

  // SEO
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDesc, setMetaDesc] = useState('')
  const [keywords, setKeywords] = useState('')
  const [maintenance, setMaintenance] = useState(false)
  const [savingSeo, setSavingSeo] = useState(false)

  // Notificaciones
  const [notifs, setNotifs] = useState({
    nuevo_mensaje: true, nueva_cotizacion: true, cotizacion_aceptada: true,
    cotizacion_rechazada: false, nuevo_usuario: false,
  })
  const [savingNotifs, setSavingNotifs] = useState(false)

  // Facturación
  const [fiscal, setFiscal] = useState({ igv: '18', moneda: 'PEN', simbolo: 'S/', dias_validez: '30', notas: '', terminos: '' })
  const [savingFiscal, setSavingFiscal] = useState(false)

  useEffect(() => {
    supabase.from('configuracion').select('clave, valor').then(({ data }) => {
      if (!data) return
      const m: Record<string, string> = {}
      data.forEach(r => { if (r.clave && r.valor !== null) m[r.clave] = r.valor })
      if (m.nombre_empresa) setCompanyName(m.nombre_empresa)
      if (m.tagline) setTagline(m.tagline)
      if (m.descripcion) setDescription(m.descripcion)
      if (m.logo_url) setLogo(m.logo_url)
      if (m.correo_contacto) setEmail(m.correo_contacto)
      if (m.telefono) setPhone(m.telefono)
      if (m.direccion) setAddress(m.direccion)
      if (m.horario) setHours(m.horario)
      if (m.whatsapp) setWhatsapp(m.whatsapp)
      if (m.meta_titulo) setMetaTitle(m.meta_titulo)
      if (m.meta_descripcion) setMetaDesc(m.meta_descripcion)
      if (m.palabras_clave) setKeywords(m.palabras_clave)
      if (m.modo_mantenimiento) setMaintenance(m.modo_mantenimiento === 'true')
      if (m.igv) setFiscal(p => ({ ...p, igv: m.igv }))
      if (m.moneda) setFiscal(p => ({ ...p, moneda: m.moneda }))
      if (m.simbolo_moneda) setFiscal(p => ({ ...p, simbolo: m.simbolo_moneda }))
      if (m.dias_validez) setFiscal(p => ({ ...p, dias_validez: m.dias_validez }))
      if (m.notas_cotizacion) setFiscal(p => ({ ...p, notas: m.notas_cotizacion }))
      if (m.terminos_pago) setFiscal(p => ({ ...p, terminos: m.terminos_pago }))
      setNotifs({
        nuevo_mensaje: m.notif_nuevo_mensaje !== 'false',
        nueva_cotizacion: m.notif_nueva_cotizacion !== 'false',
        cotizacion_aceptada: m.notif_cotizacion_aceptada !== 'false',
        cotizacion_rechazada: m.notif_cotizacion_rechazada === 'true',
        nuevo_usuario: m.notif_nuevo_usuario === 'true',
      })
    })
  }, [])

  const handleSaveGeneral = async () => {
    setSavingGeneral(true)
    try { await saveMultiple({ nombre_empresa: companyName, tagline, descripcion: description, logo_url: logo }); toast.success('Configuración general guardada') }
    catch { toast.error('Error al guardar') } finally { setSavingGeneral(false) }
  }

  const handleSaveContact = async () => {
    setSavingContact(true)
    try { await saveMultiple({ correo_contacto: email, telefono: phone, direccion: address, horario: hours, whatsapp }); toast.success('Contacto guardado') }
    catch { toast.error('Error al guardar') } finally { setSavingContact(false) }
  }

  const handleSaveSeo = async () => {
    setSavingSeo(true)
    try { await saveMultiple({ meta_titulo: metaTitle, meta_descripcion: metaDesc, palabras_clave: keywords, modo_mantenimiento: String(maintenance) }); toast.success('SEO guardado') }
    catch { toast.error('Error al guardar') } finally { setSavingSeo(false) }
  }

  const handleSaveNotifs = async () => {
    setSavingNotifs(true)
    try {
      await saveMultiple({
        notif_nuevo_mensaje: String(notifs.nuevo_mensaje),
        notif_nueva_cotizacion: String(notifs.nueva_cotizacion),
        notif_cotizacion_aceptada: String(notifs.cotizacion_aceptada),
        notif_cotizacion_rechazada: String(notifs.cotizacion_rechazada),
        notif_nuevo_usuario: String(notifs.nuevo_usuario),
      })
      toast.success('Preferencias de notificación guardadas')
    } catch { toast.error('Error al guardar') } finally { setSavingNotifs(false) }
  }

  const handleSaveFiscal = async () => {
    setSavingFiscal(true)
    try {
      await saveMultiple({
        igv: fiscal.igv, moneda: fiscal.moneda, simbolo_moneda: fiscal.simbolo,
        dias_validez: fiscal.dias_validez, notas_cotizacion: fiscal.notas, terminos_pago: fiscal.terminos,
      })
      toast.success('Configuración fiscal guardada')
    } catch { toast.error('Error al guardar') } finally { setSavingFiscal(false) }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-7 max-w-4xl">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-200/50">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100 mb-1">Panel Admin</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Configuración</h1>
          <p className="text-emerald-100 mt-1 text-sm">Ajusta los parámetros globales de tu plataforma</p>
        </div>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <div className="overflow-x-auto pb-1 -mx-1 px-1">
          <TabsList className="bg-slate-100/80 border border-slate-200 p-1 rounded-xl h-auto gap-0.5 w-max shadow-sm">
            {tabItems.map((t) => (
              <TabsTrigger key={t.value} value={t.value}
                className="rounded-lg px-4 py-2.5 text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all
                  text-slate-500 hover:text-slate-800
                  data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <t.icon className="h-3.5 w-3.5" />{t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="perfil"><PerfilTab /></TabsContent>
        <TabsContent value="seguridad"><SeguridadTab /></TabsContent>

        <TabsContent value="general">
          <SectionCard title="Identidad de Marca" description="Información principal que representa a tu empresa." icon={Palette}>
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

        <TabsContent value="contact">
          <SectionCard title="Puntos de Contacto" description="Vías por las que tus clientes se comunicarán contigo." icon={Mail}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="email" label="Correo principal">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className={`${inputCls} pl-9`} />
                </div>
              </Field>
              <Field id="phone" label="Teléfono">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={`${inputCls} pl-9`} />
                </div>
              </Field>
            </div>
            <Field id="address" label="Dirección">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Textarea id="address" rows={2} value={address} onChange={e => setAddress(e.target.value)} className={`${textareaCls} pl-9`} />
              </div>
            </Field>
            <Field id="hours" label="Horario de atención">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input id="hours" value={hours} onChange={e => setHours(e.target.value)} placeholder="Lunes a Viernes, 9:00 - 18:00" className={`${inputCls} pl-9`} />
              </div>
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

        <TabsContent value="social"><SocialTab saveMultiple={saveMultiple} /></TabsContent>

        <TabsContent value="seo">
          <SectionCard title="Optimización SEO" description="Mejora la visibilidad de tu sitio en buscadores." icon={Globe}>
            <Field id="metaTitle" label="Título Meta" hint={`${metaTitle.length}/60 caracteres recomendados`}>
              <Input id="metaTitle" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className={inputCls} />
            </Field>
            <Field id="metaDescription" label="Descripción Meta" hint={`${metaDesc.length}/160 caracteres recomendados`}>
              <Textarea id="metaDescription" rows={3} value={metaDesc} onChange={e => setMetaDesc(e.target.value)} className={textareaCls} />
            </Field>
            <Field id="keywords" label="Palabras clave" hint="Separadas por comas">
              <Input id="keywords" value={keywords} onChange={e => setKeywords(e.target.value)} className={inputCls} />
            </Field>
            <ToggleRow label="Modo Mantenimiento" description="Muestra una página de mantenimiento a los visitantes del sitio"
              checked={maintenance} onChange={setMaintenance} />
            <SaveBtn onClick={handleSaveSeo} loading={savingSeo} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="notificaciones">
          <SectionCard title="Alertas por Email" description="Elige qué eventos te notifican por correo electrónico." icon={Bell}>
            <ToggleRow label="Nuevo mensaje de contacto" description="Recibe un email cuando alguien llene el formulario de contacto"
              checked={notifs.nuevo_mensaje} onChange={v => setNotifs(p => ({ ...p, nuevo_mensaje: v }))} />
            <ToggleRow label="Nueva cotización solicitada" description="Notificación cuando un cliente solicite una cotización"
              checked={notifs.nueva_cotizacion} onChange={v => setNotifs(p => ({ ...p, nueva_cotizacion: v }))} />
            <ToggleRow label="Cotización aceptada" description="Alerta cuando un cliente acepte una propuesta comercial"
              checked={notifs.cotizacion_aceptada} onChange={v => setNotifs(p => ({ ...p, cotizacion_aceptada: v }))} />
            <ToggleRow label="Cotización rechazada" description="Alerta cuando un cliente rechace una propuesta"
              checked={notifs.cotizacion_rechazada} onChange={v => setNotifs(p => ({ ...p, cotizacion_rechazada: v }))} />
            <ToggleRow label="Nuevo registro de usuario" description="Notificación cuando alguien cree una cuenta en el sitio"
              checked={notifs.nuevo_usuario} onChange={v => setNotifs(p => ({ ...p, nuevo_usuario: v }))} />
            <SaveBtn onClick={handleSaveNotifs} loading={savingNotifs} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="facturacion" className="space-y-5">
          <SectionCard title="Configuración Fiscal" description="Parámetros que se aplican automáticamente a todas las cotizaciones." icon={Receipt}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="taxRate" label="Tasa de impuesto (IGV)" hint="Porcentaje aplicado al subtotal">
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="taxRate" type="number" value={fiscal.igv} min="0" max="100"
                    onChange={e => setFiscal(p => ({ ...p, igv: e.target.value }))} className={`${inputCls} pl-9`} />
                </div>
              </Field>
              <Field id="currency" label="Moneda">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="currency" value={fiscal.moneda}
                    onChange={e => setFiscal(p => ({ ...p, moneda: e.target.value }))} className={`${inputCls} pl-9`} />
                </div>
              </Field>
              <Field id="currencySymbol" label="Símbolo de moneda">
                <Input id="currencySymbol" value={fiscal.simbolo}
                  onChange={e => setFiscal(p => ({ ...p, simbolo: e.target.value }))} className={inputCls} />
              </Field>
              <Field id="validDays" label="Días de validez por defecto" hint="Días que una cotización es válida">
                <Input id="validDays" type="number" value={fiscal.dias_validez} min="1"
                  onChange={e => setFiscal(p => ({ ...p, dias_validez: e.target.value }))} className={inputCls} />
              </Field>
            </div>
            <SaveBtn onClick={handleSaveFiscal} loading={savingFiscal} />
          </SectionCard>
          <SectionCard title="Notas y Términos" description="Texto que aparece al pie de cada cotización generada." icon={Receipt}>
            <Field id="quotationNotes" label="Notas por defecto en cotizaciones">
              <Textarea id="quotationNotes" rows={3} value={fiscal.notas}
                onChange={e => setFiscal(p => ({ ...p, notas: e.target.value }))}
                placeholder="Los precios están expresados en PEN e incluyen IGV..." className={textareaCls} />
            </Field>
            <Field id="paymentTerms" label="Términos de pago">
              <Textarea id="paymentTerms" rows={3} value={fiscal.terminos}
                onChange={e => setFiscal(p => ({ ...p, terminos: e.target.value }))}
                placeholder="50% al inicio del proyecto, 50% a la entrega..." className={textareaCls} />
            </Field>
            <SaveBtn onClick={handleSaveFiscal} loading={savingFiscal} />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

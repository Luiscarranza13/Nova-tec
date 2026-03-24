'use client'

import { useState, useRef, useCallback } from 'react'
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
  Percent, DollarSign, TrendingUp, Smartphone,
  Upload, X, Loader2,
} from 'lucide-react'

const inputCls = 'bg-white border-slate-200 text-slate-900 h-11 rounded-xl placeholder:text-slate-400 focus:border-violet-400 transition-colors'
const textareaCls = 'bg-white border-slate-200 text-slate-900 rounded-xl placeholder:text-slate-400 resize-none focus:border-violet-400 transition-colors p-3'

const tabItems = [
  { value: 'general',        label: 'General',        icon: Settings  },
  { value: 'contact',        label: 'Contacto',       icon: Mail      },
  { value: 'social',         label: 'Redes',          icon: Share2    },
  { value: 'seo',            label: 'SEO',            icon: Globe     },
  { value: 'perfil',         label: 'Mi Perfil',      icon: User      },
  { value: 'notificaciones', label: 'Notificaciones', icon: Bell      },
  { value: 'apariencia',     label: 'Apariencia',     icon: BarChart3 },
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

function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end pt-2">
      <Button onClick={onClick}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-md shadow-violet-200 px-6">
        Guardar cambios
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

function AvatarUploader() {
  const [preview, setPreview] = useState<string | null>(null)
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
    } catch (err: any) {
      toast.error(err?.message ?? 'Error al subir la imagen')
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

// ─── Page ────────────────────────────────────────────────────────
export default function ConfiguracionPage() {
  const [showPass, setShowPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const save = (msg = 'Configuración guardada') => () => toast.success(msg)

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

      <Tabs defaultValue="general" className="space-y-6">
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

        {/* GENERAL */}
        <TabsContent value="general">
          <SectionCard title="Identidad de Marca" description="Información principal que representa a tu empresa.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="companyName" label="Nombre oficial"><Input id="companyName" defaultValue="NovaTec" className={inputCls} /></Field>
              <Field id="tagline" label="Slogan / Tagline"><Input id="tagline" defaultValue="Transformamos Ideas en Software Excepcional" className={inputCls} /></Field>
            </div>
            <Field id="description" label="Descripción"><Textarea id="description" rows={3} defaultValue="Somos una empresa de desarrollo de software comprometida con la excelencia y la innovación tecnológica." className={textareaCls} /></Field>
            <Field id="logo" label="URL del Logo" hint="Recomendado: SVG o PNG con fondo transparente"><Input id="logo" type="url" placeholder="https://..." className={inputCls} /></Field>
            <SaveBtn onClick={save()} />
          </SectionCard>
        </TabsContent>

        {/* CONTACTO */}
        <TabsContent value="contact">
          <SectionCard title="Puntos de Contacto" description="Vías por las que tus clientes se comunicarán contigo.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="email" label="Correo principal"><Input id="email" type="email" defaultValue="hola@novatec.mx" className={inputCls} /></Field>
              <Field id="phone" label="Teléfono"><Input id="phone" type="tel" defaultValue="+52 (55) 1234 5678" className={inputCls} /></Field>
            </div>
            <Field id="address" label="Dirección"><Textarea id="address" rows={2} defaultValue="Av. Tecnológico 123, Ciudad de México, CP 06000" className={textareaCls} /></Field>
            <Field id="hours" label="Horario de atención"><Input id="hours" defaultValue="Lunes a Viernes: 9:00 - 18:00" className={inputCls} /></Field>
            <Field id="whatsapp" label="WhatsApp" hint="Número con código de país. Ej: 5215512345678">
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input id="whatsapp" placeholder="5215512345678" className={`${inputCls} pl-9`} />
              </div>
            </Field>
            <SaveBtn onClick={save()} />
          </SectionCard>
        </TabsContent>

        {/* REDES */}
        <TabsContent value="social">
          <SectionCard title="Redes Sociales" description="Configura los enlaces a tus perfiles sociales.">
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { id: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
                { id: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/...' },
                { id: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                { id: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
                { id: 'github', label: 'GitHub', placeholder: 'https://github.com/...' },
                { id: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
              ].map((s) => (
                <Field key={s.id} id={s.id} label={s.label}><Input id={s.id} type="url" placeholder={s.placeholder} className={inputCls} /></Field>
              ))}
            </div>
            <SaveBtn onClick={save()} />
          </SectionCard>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo">
          <SectionCard title="Optimización SEO" description="Mejora la visibilidad de tu sitio en buscadores.">
            <Field id="metaTitle" label="Título Meta" hint="Máximo 60 caracteres recomendado"><Input id="metaTitle" defaultValue="NovaTec | Desarrollo de Software Premium" className={inputCls} /></Field>
            <Field id="metaDescription" label="Descripción Meta" hint="Máximo 160 caracteres recomendado"><Textarea id="metaDescription" rows={3} defaultValue="Transformamos Ideas en Software Excepcional. Desarrollo web, móvil y soluciones tecnológicas de alto nivel." className={textareaCls} /></Field>
            <Field id="keywords" label="Palabras clave" hint="Separadas por comas"><Input id="keywords" defaultValue="desarrollo de software, desarrollo web, desarrollo móvil" className={inputCls} /></Field>
            <ToggleRow label="Modo Mantenimiento" description="Muestra una página de mantenimiento a los visitantes del sitio" />
            <SaveBtn onClick={save()} />
          </SectionCard>
        </TabsContent>

        {/* PERFIL */}
        <TabsContent value="perfil" className="space-y-5">
          <SectionCard title="Información Personal" description="Datos de tu cuenta de administrador.">
            <AvatarUploader />
            <Separator className="bg-slate-100" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="fullName" label="Nombre completo"><Input id="fullName" defaultValue="Administrador NovaTec" className={inputCls} /></Field>
              <Field id="adminEmail" label="Correo electrónico"><Input id="adminEmail" type="email" defaultValue="admin@novatec.mx" className={inputCls} /></Field>
              <Field id="adminPhone" label="Teléfono"><Input id="adminPhone" type="tel" placeholder="+52 55 0000 0000" className={inputCls} /></Field>
              <Field id="adminRole" label="Rol"><Input id="adminRole" defaultValue="Administrador" disabled className={`${inputCls} opacity-50 cursor-not-allowed bg-slate-50`} /></Field>
            </div>
            <SaveBtn onClick={save('Perfil actualizado')} />
          </SectionCard>
          <SectionCard title="Seguridad" description="Actualiza tu contraseña de acceso.">
            <Field id="currentPass" label="Contraseña actual">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input id="currentPass" type={showPass ? 'text' : 'password'} placeholder="••••••••" className={`${inputCls} pl-9 pr-10`} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="newPass" label="Nueva contraseña">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="newPass" type={showNewPass ? 'text' : 'password'} placeholder="••••••••" className={`${inputCls} pl-9 pr-10`} />
                  <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                    {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
              <Field id="confirmPass" label="Confirmar contraseña"><Input id="confirmPass" type="password" placeholder="••••••••" className={inputCls} /></Field>
            </div>
            <p className="text-xs text-slate-400">Mínimo 8 caracteres, incluye mayúsculas, números y símbolos.</p>
            <SaveBtn onClick={save('Contraseña actualizada')} />
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
            <SaveBtn onClick={save('Preferencias de notificación guardadas')} />
          </SectionCard>
          <SectionCard title="Resumen Periódico" description="Reportes automáticos enviados a tu correo.">
            <ToggleRow label="Resumen semanal" description="Recibe cada lunes un resumen de mensajes, cotizaciones y proyectos" defaultChecked />
            <ToggleRow label="Resumen mensual" description="Informe mensual con métricas y estadísticas del negocio" defaultChecked />
            <Field id="notifEmail" label="Correo para notificaciones" hint="Puede ser diferente al correo de tu cuenta">
              <Input id="notifEmail" type="email" defaultValue="admin@novatec.mx" className={inputCls} />
            </Field>
            <SaveBtn onClick={save('Preferencias de resumen guardadas')} />
          </SectionCard>
        </TabsContent>

        {/* APARIENCIA */}
        <TabsContent value="apariencia" className="space-y-5">
          <SectionCard title="Estadísticas del Sitio" description="Números que se muestran en la sección de stats del home.">
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { id: 'statProyectos', label: 'Proyectos completados', defaultValue: '250', suffix: '+', icon: TrendingUp, color: 'bg-violet-50 border-violet-100', iconCls: 'text-violet-500' },
                { id: 'statClientes',  label: 'Clientes satisfechos',  defaultValue: '120', suffix: '+', icon: User,       color: 'bg-blue-50 border-blue-100',   iconCls: 'text-blue-500'   },
                { id: 'statAnios',     label: 'Años de experiencia',   defaultValue: '8',   suffix: '+', icon: BarChart3,  color: 'bg-emerald-50 border-emerald-100', iconCls: 'text-emerald-500' },
                { id: 'statEquipo',    label: 'Expertos en equipo',    defaultValue: '25',  suffix: '+', icon: User,       color: 'bg-amber-50 border-amber-100', iconCls: 'text-amber-500'  },
              ].map((s) => (
                <div key={s.id} className={`flex items-center gap-3 p-4 rounded-xl border ${s.color} bg-white`}>
                  <div className={`p-2 rounded-lg ${s.color} shrink-0`}>
                    <s.icon className={`h-4 w-4 ${s.iconCls}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1.5">{s.label}</p>
                    <div className="flex items-center gap-2">
                      <Input id={s.id} type="number" defaultValue={s.defaultValue}
                        className="bg-slate-50 border-slate-200 text-slate-900 h-9 rounded-lg text-sm w-24 focus:border-violet-400" />
                      <span className="text-slate-500 text-sm font-medium">{s.suffix}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <SaveBtn onClick={save('Estadísticas actualizadas')} />
          </SectionCard>
          <SectionCard title="Textos del Hero" description="Contenido principal que ven los visitantes al entrar al sitio.">
            <Field id="heroTitle" label="Título principal"><Input id="heroTitle" defaultValue="Transformamos Ideas en" className={inputCls} /></Field>
            <Field id="heroHighlight" label="Palabra destacada (con gradiente)"><Input id="heroHighlight" defaultValue="Software Excepcional" className={inputCls} /></Field>
            <Field id="heroSubtitle" label="Subtítulo / descripción"><Textarea id="heroSubtitle" rows={2} defaultValue="Desarrollamos soluciones digitales de alto impacto que impulsan el crecimiento de tu empresa." className={textareaCls} /></Field>
            <SaveBtn onClick={save('Textos del hero actualizados')} />
          </SectionCard>
          <SectionCard title="Opciones de Visualización" description="Controla qué secciones son visibles en el sitio público.">
            <ToggleRow label="Mostrar sección Testimonios" description="Muestra u oculta los testimonios en el home" defaultChecked />
            <ToggleRow label="Mostrar sección Portafolio" description="Muestra u oculta los proyectos destacados en el home" defaultChecked />
            <ToggleRow label="Mostrar sección Planes" description="Muestra u oculta los planes de precios en el home" defaultChecked />
            <ToggleRow label="Mostrar botón de WhatsApp" description="Botón flotante de WhatsApp en todas las páginas" defaultChecked />
            <SaveBtn onClick={save('Opciones de visualización guardadas')} />
          </SectionCard>
        </TabsContent>

        {/* FACTURACIÓN */}
        <TabsContent value="facturacion" className="space-y-5">
          <SectionCard title="Configuración Fiscal" description="Parámetros que se aplican automáticamente a todas las cotizaciones.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="taxRate" label="Tasa de impuesto (IVA)" hint="Porcentaje aplicado al subtotal">
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="taxRate" type="number" defaultValue="16" min="0" max="100" className={`${inputCls} pl-9`} />
                </div>
              </Field>
              <Field id="currency" label="Moneda">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="currency" defaultValue="MXN" className={`${inputCls} pl-9`} />
                </div>
              </Field>
              <Field id="currencySymbol" label="Símbolo de moneda"><Input id="currencySymbol" defaultValue="$" className={inputCls} /></Field>
              <Field id="validDays" label="Días de validez por defecto" hint="Días que una cotización es válida"><Input id="validDays" type="number" defaultValue="30" min="1" className={inputCls} /></Field>
            </div>
            <SaveBtn onClick={save('Configuración fiscal guardada')} />
          </SectionCard>
          <SectionCard title="Datos de Facturación" description="Información legal de tu empresa para cotizaciones y facturas.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="razonSocial" label="Razón social"><Input id="razonSocial" placeholder="NovaTec S.A. de C.V." className={inputCls} /></Field>
              <Field id="rfc" label="RFC"><Input id="rfc" placeholder="NTC000101XXX" className={inputCls} /></Field>
            </div>
            <Field id="fiscalAddress" label="Domicilio fiscal"><Textarea id="fiscalAddress" rows={2} placeholder="Calle, número, colonia, CP, ciudad, estado" className={textareaCls} /></Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="regimenFiscal" label="Régimen fiscal"><Input id="regimenFiscal" placeholder="Ej. 601 - General de Ley Personas Morales" className={inputCls} /></Field>
              <Field id="cfdiUso" label="Uso de CFDI por defecto"><Input id="cfdiUso" placeholder="Ej. G03 - Gastos en general" className={inputCls} /></Field>
            </div>
            <SaveBtn onClick={save('Datos de facturación guardados')} />
          </SectionCard>
          <SectionCard title="Notas y Términos" description="Texto que aparece al pie de cada cotización generada.">
            <Field id="quotationNotes" label="Notas por defecto en cotizaciones">
              <Textarea id="quotationNotes" rows={3} defaultValue="Los precios están expresados en MXN e incluyen IVA. Esta cotización es válida por 30 días a partir de su fecha de emisión." className={textareaCls} />
            </Field>
            <Field id="paymentTerms" label="Términos de pago">
              <Textarea id="paymentTerms" rows={3} defaultValue="50% al inicio del proyecto, 50% a la entrega. Transferencia bancaria o depósito." className={textareaCls} />
            </Field>
            <SaveBtn onClick={save('Términos guardados')} />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

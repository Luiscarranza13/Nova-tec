'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

type Config = Record<string, string>

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<Config>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('configuracion').select('clave,valor').then(({ data, error }) => {
      if (error) toast.error('Error al cargar configuración')
      else {
        const map: Config = {}
        data?.forEach(r => { map[r.clave] = r.valor || '' })
        setConfig(map)
      }
      setLoading(false)
    })
  }, [])

  const set = (clave: string, valor: string) => setConfig(p => ({ ...p, [clave]: valor }))

  const guardar = async (claves: string[]) => {
    setSaving(true)
    const upserts = claves.map(clave => ({ clave, valor: config[clave] || '' }))
    const { error } = await supabase.from('configuracion').upsert(upserts, { onConflict: 'clave' })
    if (error) toast.error('Error al guardar')
    else toast.success('Configuración guardada')
    setSaving(false)
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold font-heading">Configuración</h2>
        <p className="text-muted-foreground">Administra la configuración del sitio</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contacto">Contacto</TabsTrigger>
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle>Información General</CardTitle><CardDescription>Configura la información básica de tu empresa</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Nombre de la Empresa</Label><Input value={config.nombre_empresa || ''} onChange={e => set('nombre_empresa', e.target.value)} /></div>
                <div className="space-y-2"><Label>Tagline</Label><Input value={config.tagline || ''} onChange={e => set('tagline', e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label>Descripción</Label><Textarea rows={3} value={config.descripcion || ''} onChange={e => set('descripcion', e.target.value)} /></div>
              <Button onClick={() => guardar(['nombre_empresa', 'tagline', 'descripcion'])} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacto">
          <Card>
            <CardHeader><CardTitle>Información de Contacto</CardTitle><CardDescription>Configura la información de contacto del sitio</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Correo Principal</Label><Input type="email" value={config.correo_contacto || ''} onChange={e => set('correo_contacto', e.target.value)} /></div>
                <div className="space-y-2"><Label>Teléfono</Label><Input value={config.telefono || ''} onChange={e => set('telefono', e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label>Dirección</Label><Textarea rows={2} value={config.direccion || ''} onChange={e => set('direccion', e.target.value)} /></div>
              <div className="space-y-2"><Label>Horario de Atención</Label><Input value={config.horario || ''} onChange={e => set('horario', e.target.value)} /></div>
              <Button onClick={() => guardar(['correo_contacto', 'telefono', 'direccion', 'horario'])} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader><CardTitle>Redes Sociales</CardTitle><CardDescription>Configura los enlaces a tus redes sociales</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {['facebook', 'twitter', 'instagram', 'linkedin', 'github'].map(red => (
                  <div key={red} className="space-y-2">
                    <Label className="capitalize">{red}</Label>
                    <Input type="url" placeholder={`https://${red}.com/...`} value={config[red] || ''} onChange={e => set(red, e.target.value)} />
                  </div>
                ))}
              </div>
              <Button onClick={() => guardar(['facebook', 'twitter', 'instagram', 'linkedin', 'github'])} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader><CardTitle>Configuración SEO</CardTitle><CardDescription>Optimiza tu sitio para los motores de búsqueda</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Título Meta</Label><Input value={config.meta_titulo || ''} onChange={e => set('meta_titulo', e.target.value)} /></div>
              <div className="space-y-2"><Label>Descripción Meta</Label><Textarea rows={3} value={config.meta_descripcion || ''} onChange={e => set('meta_descripcion', e.target.value)} /></div>
              <div className="space-y-2"><Label>Palabras Clave</Label><Input value={config.palabras_clave || ''} onChange={e => set('palabras_clave', e.target.value)} /></div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Modo Mantenimiento</p>
                  <p className="text-sm text-muted-foreground">Muestra una página de mantenimiento a los visitantes</p>
                </div>
                <Switch checked={config.modo_mantenimiento === 'true'} onCheckedChange={v => set('modo_mantenimiento', v ? 'true' : 'false')} />
              </div>
              <Button onClick={() => guardar(['meta_titulo', 'meta_descripcion', 'palabras_clave', 'modo_mantenimiento'])} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

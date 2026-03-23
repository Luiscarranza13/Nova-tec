'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function ConfiguracionPage() {
  const handleSave = () => {
    toast.success('Configuración guardada correctamente')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold font-heading">Configuración</h2>
        <p className="text-muted-foreground">Administra la configuración del sitio</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>
                Configura la información básica de tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input id="companyName" defaultValue="NovaTec" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" defaultValue="Transformamos Ideas en Software Excepcional" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" rows={4} defaultValue="Somos una empresa de desarrollo de software comprometida con la excelencia y la innovación tecnológica." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">URL del Logo</Label>
                <Input id="logo" type="url" placeholder="https://..." />
              </div>
              <Button onClick={handleSave}>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>
                Configura la información de contacto que se muestra en el sitio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Principal</Label>
                  <Input id="email" type="email" defaultValue="hola@novatec.mx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" defaultValue="+52 (55) 1234 5678" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Textarea id="address" rows={2} defaultValue="Av. Tecnológico 123, Ciudad de México, CP 06000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Horario de Atención</Label>
                <Input id="hours" defaultValue="Lunes a Viernes: 9:00 - 18:00" />
              </div>
              <Button onClick={handleSave}>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
              <CardDescription>
                Configura los enlaces a tus redes sociales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" type="url" placeholder="https://facebook.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input id="twitter" type="url" placeholder="https://twitter.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" type="url" placeholder="https://instagram.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" type="url" placeholder="https://linkedin.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" type="url" placeholder="https://github.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input id="youtube" type="url" placeholder="https://youtube.com/..." />
                </div>
              </div>
              <Button onClick={handleSave}>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Configuración SEO</CardTitle>
              <CardDescription>
                Optimiza tu sitio para los motores de búsqueda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Título Meta (Title)</Label>
                <Input id="metaTitle" defaultValue="NovaTec | Desarrollo de Software Premium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Descripción Meta</Label>
                <Textarea id="metaDescription" rows={3} defaultValue="Transformamos Ideas en Software Excepcional. Desarrollo web, móvil y soluciones tecnológicas de alto nivel para tu empresa." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Palabras Clave</Label>
                <Input id="keywords" defaultValue="desarrollo de software, desarrollo web, desarrollo móvil, consultoría tecnológica" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <Label className="text-base">Modo Mantenimiento</Label>
                  <p className="text-sm text-muted-foreground">Activa el modo de mantenimiento para mostrar una página de mantenimiento</p>
                </div>
                <Switch />
              </div>
              <Button onClick={handleSave}>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Globe, Smartphone, Code, Palette, Cloud, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Code,
  Palette,
  Cloud,
  Lightbulb,
}

const mockServices = [
  { id: 1, name: 'Desarrollo Web', category: 'Desarrollo', price: 25000, icon: 'Globe', isActive: true },
  { id: 2, name: 'Desarrollo Móvil', category: 'Desarrollo', price: 35000, icon: 'Smartphone', isActive: true },
  { id: 3, name: 'Desarrollo de Software', category: 'Desarrollo', price: 45000, icon: 'Code', isActive: true },
  { id: 4, name: 'Diseño UI/UX', category: 'Diseño', price: 15000, icon: 'Palette', isActive: true },
  { id: 5, name: 'Soluciones Cloud', category: 'Infraestructura', price: 20000, icon: 'Cloud', isActive: true },
  { id: 6, name: 'Consultoría Tech', category: 'Consultoría', price: 8000, icon: 'Lightbulb', isActive: false },
]

export default function ServiciosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading">Servicios</h2>
          <p className="text-muted-foreground">Gestiona tus servicios</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nuevo Servicio</DialogTitle>
              <DialogDescription>
                Agrega un nuevo servicio a tu catálogo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Nombre del servicio" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desarrollo">Desarrollo</SelectItem>
                    <SelectItem value="diseño">Diseño</SelectItem>
                    <SelectItem value="infraestructura">Infraestructura</SelectItem>
                    <SelectItem value="consultoria">Consultoría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Precio (MXN)</Label>
                <Input id="price" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Descripción del servicio..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success('Servicio creado')
                setIsDialogOpen(false)
              }}>
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service, index) => {
          const Icon = iconMap[service.icon] || Code
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={!service.isActive ? 'opacity-60' : ''}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={service.isActive} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-1">{service.name}</CardTitle>
                  <Badge variant="outline" className="mb-3">{service.category}</Badge>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(service.price)}</p>
                  <div className="flex justify-end mt-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

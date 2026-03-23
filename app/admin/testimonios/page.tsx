'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Star, Quote } from 'lucide-react'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'

const mockTestimonials = [
  { id: 1, name: 'María González', company: 'RetailMax', quote: 'NovaTec transformó completamente nuestra presencia digital.', rating: 5, isFeatured: true },
  { id: 2, name: 'Carlos Ruiz', company: 'FinCorp', quote: 'Trabajar con NovaTec fue una experiencia excepcional.', rating: 5, isFeatured: true },
  { id: 3, name: 'Ana Martínez', company: 'TechStart', quote: 'Necesitábamos un partner tecnológico que entendiera el ritmo startup.', rating: 5, isFeatured: false },
  { id: 4, name: 'Roberto Sánchez', company: 'FastShip', quote: 'La aplicación de logística optimizó nuestras operaciones en un 40%.', rating: 5, isFeatured: true },
]

export default function TestimoniosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTestimonials = mockTestimonials.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading">Testimonios</h2>
          <p className="text-muted-foreground">Gestiona los testimonios de tus clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Testimonio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nuevo Testimonio</DialogTitle>
              <DialogDescription>
                Agrega un nuevo testimonio de cliente.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del Cliente</Label>
                <Input id="name" placeholder="Nombre completo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" placeholder="Nombre de la empresa" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quote">Testimonio</Label>
                <Textarea id="quote" placeholder="Escribe el testimonio..." rows={4} />
              </div>
              <div className="grid gap-2">
                <Label>Calificación</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className="p-1">
                      <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success('Testimonio creado')
                setIsDialogOpen(false)
              }}>
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
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
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-4 w-4 text-primary/30" />
                  <p className="text-muted-foreground text-sm pl-4">{testimonial.quote}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Badge variant={testimonial.isFeatured ? 'default' : 'outline'}>
                    {testimonial.isFeatured ? 'Destacado' : 'Normal'}
                  </Badge>
                  <Switch checked={testimonial.isFeatured} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

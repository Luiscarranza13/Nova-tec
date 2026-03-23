'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Calendar, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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

const mockProjects = [
  { id: 1, name: 'E-commerce Platform', client: 'RetailMax', status: 'in_progress', budget: 85000, progress: 75, startDate: '2024-01-15', endDate: '2024-04-15' },
  { id: 2, name: 'Mobile Banking App', client: 'FinCorp', status: 'review', budget: 120000, progress: 90, startDate: '2024-02-01', endDate: '2024-05-01' },
  { id: 3, name: 'Healthcare Dashboard', client: 'MediCare+', status: 'in_progress', budget: 65000, progress: 45, startDate: '2024-03-01', endDate: '2024-06-01' },
  { id: 4, name: 'SaaS Platform', client: 'TechStart', status: 'pending', budget: 95000, progress: 20, startDate: '2024-03-15', endDate: '2024-07-15' },
  { id: 5, name: 'Logistics App', client: 'FastShip', status: 'completed', budget: 78000, progress: 100, startDate: '2023-11-01', endDate: '2024-02-01' },
]

const statusColors: Record<string, string> = {
  pending: 'warning',
  in_progress: 'info',
  review: 'secondary',
  completed: 'success',
  cancelled: 'destructive',
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  in_progress: 'En Progreso',
  review: 'En Revisión',
  completed: 'Completado',
  cancelled: 'Cancelado',
}

export default function ProyectosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading">Proyectos</h2>
          <p className="text-muted-foreground">Gestiona tus proyectos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nuevo Proyecto</DialogTitle>
              <DialogDescription>
                Crea un nuevo proyecto.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del Proyecto</Label>
                <Input id="name" placeholder="Nombre del proyecto" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailmax">RetailMax</SelectItem>
                    <SelectItem value="fincorp">FinCorp</SelectItem>
                    <SelectItem value="medicare">MediCare+</SelectItem>
                    <SelectItem value="techstart">TechStart</SelectItem>
                    <SelectItem value="fastship">FastShip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="budget">Presupuesto</Label>
                  <Input id="budget" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="progress">Progreso (%)</Label>
                  <Input id="progress" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Descripción del proyecto..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success('Proyecto creado')
                setIsDialogOpen(false)
              }}>
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="review">En Revisión</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium">{project.name}</p>
                    <Badge variant={statusColors[project.status] as any}>
                      {statusLabels[project.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{project.client}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium">{formatCurrency(project.budget)}</p>
                    <p className="text-xs text-muted-foreground">Presupuesto</p>
                  </div>
                  <div className="w-32">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progreso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
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
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

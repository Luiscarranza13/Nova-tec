'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Send, FileText } from 'lucide-react'
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
import { formatCurrency, formatDate } from '@/lib/utils'

const mockQuotations = [
  { id: 'COT-001', client: 'RetailMax', status: 'sent', subtotal: 85000, tax: 13600, total: 98600, validUntil: '2024-04-15', createdAt: '2024-03-15' },
  { id: 'COT-002', client: 'FinCorp', status: 'accepted', subtotal: 120000, tax: 19200, total: 139200, validUntil: '2024-04-01', createdAt: '2024-03-01' },
  { id: 'COT-003', client: 'MediCare+', status: 'draft', subtotal: 65000, tax: 10400, total: 75400, validUntil: '2024-04-20', createdAt: '2024-03-10' },
  { id: 'COT-004', client: 'TechStart', status: 'rejected', subtotal: 95000, tax: 15200, total: 110200, validUntil: '2024-03-25', createdAt: '2024-03-05' },
  { id: 'COT-005', client: 'FastShip', status: 'sent', subtotal: 78000, tax: 12480, total: 90480, validUntil: '2024-04-10', createdAt: '2024-03-20' },
]

const statusColors: Record<string, string> = {
  draft: 'secondary',
  sent: 'info',
  accepted: 'success',
  rejected: 'destructive',
}

const statusLabels: Record<string, string> = {
  draft: 'Borrador',
  sent: 'Enviada',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
}

export default function CotizacionesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredQuotations = mockQuotations.filter((quote) =>
    quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading">Cotizaciones</h2>
          <p className="text-muted-foreground">Gestiona tus cotizaciones</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cotización
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nueva Cotización</DialogTitle>
              <DialogDescription>
                Crea una nueva cotización para un cliente.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
              <div className="grid gap-2">
                <Label>Servicios</Label>
                <div className="border rounded-lg p-4 space-y-2">
                  {['Desarrollo Web', 'Desarrollo Móvil', 'Diseño UI/UX'].map((service) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="text-sm">{service}</span>
                      <Input type="number" placeholder="0" className="w-24 h-8" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea id="notes" placeholder="Notas adicionales..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validUntil">Válido hasta</Label>
                <Input id="validUntil" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success('Cotización creada')
                setIsDialogOpen(false)
              }}>
                Crear Cotización
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cotizaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredQuotations.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{quote.id}</p>
                      <Badge variant={statusColors[quote.status] as any}>
                        {statusLabels[quote.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{quote.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:block text-right">
                    <p className="font-medium">{formatCurrency(quote.total)}</p>
                    <p className="text-xs text-muted-foreground">Vence: {formatDate(quote.validUntil)}</p>
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
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar
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

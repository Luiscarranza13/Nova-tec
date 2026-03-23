'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, Phone, CheckCircle, MoreHorizontal, Reply, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'

const mockMessages = [
  { id: 1, name: 'Juan Pérez', email: 'juan@empresa.com', subject: 'Consulta sobre desarrollo web', message: 'Hola, me gustaría conocer los servicios de desarrollo web que ofrecen...', isRead: false, isResolved: false, createdAt: '2024-03-18 14:30' },
  { id: 2, name: 'Ana López', email: 'ana@techstart.io', subject: 'Cotización para app móvil', message: 'Necesito una cotización para una aplicación móvil de entrega...', isRead: true, isResolved: false, createdAt: '2024-03-17 10:15' },
  { id: 3, name: 'Carlos García', email: 'carlos@fincorp.mx', subject: 'Reunión de seguimiento', message: 'Me gustaría agendar una reunión para revisar el avance del proyecto...', isRead: true, isResolved: true, createdAt: '2024-03-16 09:00' },
  { id: 4, name: 'María Rodríguez', email: 'maria@retailmax.com', subject: 'Nueva funcionalidad', message: 'Quisiera agregar una nueva funcionalidad a nuestra plataforma...', isRead: false, isResolved: false, createdAt: '2024-03-15 16:45' },
]

export default function MensajesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMessages = mockMessages.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMarkAsRead = (id: number) => {
    toast.success('Mensaje marcado como leído')
  }

  const handleResolve = (id: number) => {
    toast.success('Mensaje marcado como resuelto')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading">Mensajes</h2>
          <p className="text-muted-foreground">Gestiona los mensajes de contacto</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{mockMessages.filter(m => !m.isRead).length} nuevos</Badge>
          <Badge variant="secondary">{mockMessages.filter(m => !m.isResolved).length} pendientes</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar mensajes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border transition-colors ${!message.isRead ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {message.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{message.name}</p>
                        {!message.isRead && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                        <Badge variant={message.isResolved ? 'success' : 'warning'}>
                          {message.isResolved ? 'Resuelto' : 'Pendiente'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{message.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {message.email}
                        </span>
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!message.isRead && (
                        <DropdownMenuItem onClick={() => handleMarkAsRead(message.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marcar como leído
                        </DropdownMenuItem>
                      )}
                      {!message.isResolved && (
                        <DropdownMenuItem onClick={() => handleResolve(message.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marcar como resuelto
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Reply className="mr-2 h-4 w-4" />
                        Responder
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

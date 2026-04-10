// =============================================
// NovaTec - Tipos de Base de Datos (v2)
// =============================================

export type Usuario = {
  id: string
  correo: string
  nombre_completo: string | null
  foto_url: string | null
  rol: 'admin' | 'usuario'
  telefono: string | null
  creado_en: string
  actualizado_en: string
}

export type Cliente = {
  id: string
  nombre: string
  correo: string
  empresa: string | null
  telefono: string | null
  notas: string | null
  creado_por: string | null
  creado_en: string
  actualizado_en: string
}

export type EstadoProyecto = 'pendiente' | 'en_progreso' | 'en_revision' | 'completado' | 'cancelado'

export type Proyecto = {
  id: string
  nombre: string
  descripcion: string | null
  imagen_url: string | null
  cliente_id: string | null
  cliente?: Cliente
  estado: EstadoProyecto
  presupuesto: number | null
  progreso: number
  tecnologias: string[] | null
  url_demo: string | null
  fecha_inicio: string | null
  fecha_fin: string | null
  creado_por: string | null
  creado_en: string
  actualizado_en: string
}

export type Servicio = {
  id: string
  nombre: string
  descripcion: string | null
  categoria: 'Desarrollo' | 'Diseño' | 'Infraestructura' | 'Consultoría' | null
  precio: number | null
  icono: string | null
  orden: number
  activo: boolean
  creado_en: string
  actualizado_en: string
}

export type EstadoCotizacion = 'borrador' | 'enviada' | 'aceptada' | 'rechazada'

export type Cotizacion = {
  id: string
  numero: string
  cliente_id: string | null
  cliente?: Cliente
  estado: EstadoCotizacion
  subtotal: number
  impuesto: number
  total: number
  notas: string | null
  valida_hasta: string | null
  creado_por: string | null
  creado_en: string
  actualizado_en: string
  items?: CotizacionItem[]
}

export type CotizacionItem = {
  id: string
  cotizacion_id: string
  servicio_id: string | null
  servicio?: Servicio
  descripcion: string | null
  cantidad: number
  precio_unitario: number
  total: number
}

export type Testimonio = {
  id: string
  nombre_cliente: string
  empresa: string | null
  foto_url: string | null
  comentario: string
  calificacion: number
  destacado: boolean
  creado_en: string
}

export type Mensaje = {
  id: string
  nombre: string
  correo: string
  asunto: string | null
  mensaje: string
  leido: boolean
  resuelto: boolean
  creado_en: string
}

export type Configuracion = {
  id: string
  clave: string
  valor: string | null
  actualizado_en: string
}

export type Newsletter = {
  id: string
  email: string
  activo: boolean
  suscrito_en: string
}

export type ActivityLog = {
  id: string
  accion: 'INSERT' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'CONFIG' | 'VIEW'
  tabla: string
  descripcion: string
  usuario_id: string | null
  usuario_email: string | null
  metadata: Record<string, unknown> | null
  creado_en: string
}

export type BlogPost = {
  id: string
  titulo: string
  slug: string
  extracto: string | null
  contenido: string | null
  imagen_url: string | null
  categoria: string
  tags: string[] | null
  publicado: boolean
  destacado: boolean
  tiempo_lectura: number
  autor_id: string | null
  publicado_en: string | null
  creado_en: string
  actualizado_en: string
}

export type PortafolioItem = {
  id: string
  nombre: string
  descripcion: string | null
  imagen_url: string | null
  tecnologias: string[] | null
  url_demo: string | null
  url_repo: string | null
  categoria: string
  cliente: string | null
  resultado: string | null
  destacado: boolean
  orden: number
  publicado: boolean
  creado_en: string
  actualizado_en: string
}

export type PageView = {
  id: string
  path: string
  referrer: string | null
  user_agent: string | null
  country: string | null
  creado_en: string
}

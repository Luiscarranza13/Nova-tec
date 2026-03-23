'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  FolderKanban, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  MessageSquare,
  Star,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

const kpis = [
  {
    title: 'Clientes Totales',
    value: '127',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Proyectos Activos',
    value: '34',
    change: '+8%',
    trend: 'up',
    icon: FolderKanban,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'Cotizaciones Pendientes',
    value: '18',
    change: '-3%',
    trend: 'down',
    icon: FileText,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    title: 'Ingresos del Mes',
    value: '$124,500',
    change: '+24%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
]

const revenueData = [
  { month: 'Oct', ingresos: 45000, gastos: 28000 },
  { month: 'Nov', ingresos: 52000, gastos: 31000 },
  { month: 'Dic', ingresos: 68000, gastos: 35000 },
  { month: 'Ene', ingresos: 85000, gastos: 42000 },
  { month: 'Feb', ingresos: 92000, gastos: 48000 },
  { month: 'Mar', ingresos: 124500, gastos: 52000 },
]

const projectStatusData = [
  { status: 'Completados', count: 45, color: '#22c55e' },
  { status: 'En Progreso', count: 28, color: '#3b82f6' },
  { status: 'En Revisión', count: 12, color: '#f59e0b' },
  { status: 'Pendientes', count: 8, color: '#6b7280' },
]

const recentProjects = [
  { name: 'E-commerce Platform', client: 'RetailMax', status: 'in_progress', progress: 75 },
  { name: 'Mobile Banking App', client: 'FinCorp', status: 'review', progress: 90 },
  { name: 'Healthcare Dashboard', client: 'MediCare+', status: 'in_progress', progress: 45 },
  { name: 'SaaS Platform', client: 'TechStart', status: 'pending', progress: 20 },
  { name: 'Logistics App', client: 'FastShip', status: 'completed', progress: 100 },
]

const statusColors: Record<string, string> = {
  pending: 'warning',
  in_progress: 'info',
  review: 'secondary',
  completed: 'success',
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  in_progress: 'En Progreso',
  review: 'En Revisión',
  completed: 'Completado',
}

const recentActivities = [
  { action: 'Nuevo cliente registrado', time: 'Hace 2 min', type: 'user', icon: Users },
  { action: 'Proyecto "E-commerce" actualizado', time: 'Hace 15 min', type: 'project', icon: FolderKanban },
  { action: 'Cotización #124 enviada', time: 'Hace 1 hora', type: 'quote', icon: FileText },
  { action: 'Nuevo mensaje de contacto', time: 'Hace 2 horas', type: 'message', icon: MessageSquare },
  { action: 'Testimonio aprobado', time: 'Hace 3 horas', type: 'testimonial', icon: Star },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading">Dashboard</h2>
          <p className="text-muted-foreground">Bienvenido de nuevo, Administrador</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Últimos 30 días
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs mt-1">
                  <span
                    className={`flex items-center ${
                      kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground ml-1">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading">Ingresos vs Gastos</CardTitle>
            <Button variant="outline" size="sm" className="gap-1">
              Ver Detalles
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ingresos" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorIngresos)" 
                    strokeWidth={2}
                    name="Ingresos"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gastos" 
                    stroke="#22c55e" 
                    fillOpacity={1} 
                    fill="url(#colorGastos)" 
                    strokeWidth={2}
                    name="Gastos"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="font-heading">Estado de Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectStatusData} layout="vertical" margin={{ left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="status" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading">Proyectos Recientes</CardTitle>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium truncate">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge variant={statusColors[project.status] as any} className="shrink-0">
                      {statusLabels[project.status]}
                    </Badge>
                    <div className="w-20">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progreso</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading">Actividad Reciente</CardTitle>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${i === 0 ? 'bg-primary/10' : 'bg-muted'}`}>
                    <activity.icon className={`h-4 w-4 ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

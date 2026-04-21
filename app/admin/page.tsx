"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FolderKanban,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Star,
  Clock,
  ArrowUpRight,
  Wrench,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "@/components/ui/dynamic-charts";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

type Stats = {
  clientes: number;
  proyectosActivos: number;
  cotizacionesPendientes: number;
  totalCotizaciones: number;
  mensajesNuevos: number;
  serviciosActivos: number;
  testimoniosDestacados: number;
};

type ProyectoReciente = {
  id: string;
  nombre: string;
  estado: string;
  progreso: number;
  cliente?: string;
};

const estadoConfig: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  pendiente: {
    label: "Pendiente",
    color: "bg-yellow-500/10 text-yellow-500",
    dot: "bg-yellow-500",
  },
  en_progreso: {
    label: "En Progreso",
    color: "bg-blue-500/10 text-blue-500",
    dot: "bg-blue-500",
  },
  en_revision: {
    label: "En Revisión",
    color: "bg-purple-500/10 text-purple-500",
    dot: "bg-purple-500",
  },
  completado: {
    label: "Completado",
    color: "bg-green-500/10 text-green-500",
    dot: "bg-green-500",
  },
  cancelado: {
    label: "Cancelado",
    color: "bg-red-500/10 text-red-500",
    dot: "bg-red-500",
  },
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    clientes: 0,
    proyectosActivos: 0,
    cotizacionesPendientes: 0,
    totalCotizaciones: 0,
    mensajesNuevos: 0,
    serviciosActivos: 0,
    testimoniosDestacados: 0,
  });
  const [proyectosRecientes, setProyectosRecientes] = useState<
    ProyectoReciente[]
  >([]);
  const [proyectosChart, setProyectosChart] = useState<
    { status: string; count: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  const cargar = async () => {
    const [
      { count: clientes },
      { data: proyectos },
      { data: cotizaciones },
      { count: mensajes },
      { count: servicios },
      { count: testimonios },
    ] = await Promise.all([
      supabase.from("clientes").select("*", { count: "exact", head: true }),
      supabase
        .from("proyectos")
        .select("*, clientes(nombre)")
        .order("creado_en", { ascending: false })
        .limit(5),
      supabase.from("cotizaciones").select("estado, total"),
      supabase
        .from("mensajes")
        .select("*", { count: "exact", head: true })
        .eq("leido", false),
      supabase
        .from("servicios")
        .select("*", { count: "exact", head: true })
        .eq("activo", true),
      supabase
        .from("testimonios")
        .select("*", { count: "exact", head: true })
        .eq("destacado", true),
    ]);

    const activos = (proyectos || []).filter(
      (p) => p.estado === "en_progreso" || p.estado === "en_revision",
    ).length;
    const pendientesCot = (cotizaciones || []).filter(
      (c) => c.estado === "borrador" || c.estado === "enviada",
    ).length;

    // Chart data: count by estado
    const estadoCount: Record<string, number> = {};
    (proyectos || []).forEach((p) => {
      estadoCount[p.estado] = (estadoCount[p.estado] || 0) + 1;
    });
    const chartData = Object.entries(estadoConfig).map(([key, cfg]) => ({
      status: cfg.label,
      count: estadoCount[key] || 0,
    }));

    setStats({
      clientes: clientes || 0,
      proyectosActivos: activos,
      cotizacionesPendientes: pendientesCot,
      totalCotizaciones: (cotizaciones || []).length,
      mensajesNuevos: mensajes || 0,
      serviciosActivos: servicios || 0,
      testimoniosDestacados: testimonios || 0,
    });

    setProyectosRecientes(
      (proyectos || []).slice(0, 5).map((p) => ({
        id: p.id,
        nombre: p.nombre,
        estado: p.estado,
        progreso: p.progreso,
        cliente: (p.clientes as any)?.nombre,
      })),
    );
    setProyectosChart(chartData);
    setLastUpdated(new Date());
    setMounted(true);
    setLoading(false);
  };

  useEffect(() => {
    cargar();

    // Realtime subscriptions
    const channels = [
      "clientes",
      "proyectos",
      "cotizaciones",
      "mensajes",
      "servicios",
      "testimonios",
    ].map((table) =>
      supabase
        .channel(`dash-${table}`)
        .on("postgres_changes", { event: "*", schema: "public", table }, () =>
          cargar(),
        )
        .subscribe(),
    );

    return () => {
      channels.forEach((c) => supabase.removeChannel(c));
    };
  }, []);

  const kpis = [
    {
      title: "Clientes Totales",
      value: stats.clientes,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      href: "/admin/clientes",
    },
    {
      title: "Proyectos Activos",
      value: stats.proyectosActivos,
      icon: FolderKanban,
      color: "text-violet-600",
      bg: "bg-violet-50",
      href: "/admin/proyectos",
    },
    {
      title: "Propuestas Pendientes",
      value: stats.cotizacionesPendientes,
      icon: FileText,
      color: "text-amber-600",
      bg: "bg-amber-50",
      href: "/admin/cotizaciones",
    },
    {
      title: "Mensajes Nuevos",
      value: stats.mensajesNuevos,
      icon: MessageSquare,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      href: "/admin/mensajes",
    },
  ];

  const barColors = ["#eab308", "#3b82f6", "#a855f7", "#22c55e", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading tracking-tight text-slate-900 border-none outline-none">
            Panel de Control
          </h2>
          <p className="text-slate-500 mt-1">
            Monitoreo en tiempo real de tu plataforma
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            En vivo
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={cargar}
            className="gap-2 border-border/60"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={kpi.href}>
              <Card className="border-border/50 hover:border-border hover:shadow-md transition-all duration-200 cursor-pointer group h-full">
                <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-2.5 rounded-xl ${kpi.bg}`}>
                      <kpi.icon
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${kpi.color}`}
                      />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {loading ? (
                        <span className="animate-pulse text-muted-foreground">
                          —
                        </span>
                      ) : (
                        kpi.value
                      )}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {kpi.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Secondary stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
        {[
          {
            label: "Servicios Activos",
            value: stats.serviciosActivos,
            icon: Wrench,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            href: "/admin/servicios",
          },
          {
            label: "Testimonios Destacados",
            value: stats.testimoniosDestacados,
            icon: Star,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            href: "/admin/testimonios",
          },
          {
            label: "Total Cotizaciones",
            value: stats.totalCotizaciones,
            icon: FileText,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
            href: "/admin/cotizaciones",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.06 }}
          >
            <Link href={s.href}>
              <Card className="border-border/50 hover:border-border hover:shadow-sm transition-all cursor-pointer">
                <CardContent className="p-3 sm:p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${s.bg} shrink-0`}>
                    <s.icon
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${s.color}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-bold truncate">
                      {loading ? "—" : s.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {s.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts + Projects */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Bar chart: proyectos por estado */}
        <Card className="lg:col-span-3 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Estado de Proyectos
            </CardTitle>
            <p className="text-xs text-muted-foreground">Distribución actual</p>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={proyectosChart}
                  layout="vertical"
                  margin={{ left: 0, right: 16 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border) / 0.4)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    allowDecimals={false}
                  />
                  <YAxis
                    dataKey="status"
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    width={82}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Proyectos">
                    {proyectosChart.map((_, index) => (
                      <Cell
                        key={index}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent projects */}
        <Card className="lg:col-span-4 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">
                Proyectos Recientes
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Últimos 5 proyectos
              </p>
            </div>
            <Link href="/admin/proyectos">
              <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                Ver todos <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : proyectosRecientes.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <FolderKanban className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No hay proyectos aún
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/50 overflow-x-auto">
                {proyectosRecientes.map((p, i) => {
                  const cfg = estadoConfig[p.estado] || {
                    label: p.estado,
                    color: "bg-muted text-muted-foreground",
                    dot: "bg-muted-foreground",
                  };
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 hover:bg-muted/30 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {p.nombre}
                        </p>
                        {p.cliente && (
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                            {p.cliente}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span
                          className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.color}`}
                        >
                          {cfg.label}
                        </span>
                        <div className="w-12 sm:w-16 hidden min-[400px]:block">
                          <div className="flex justify-end text-[10px] mb-1 text-muted-foreground">
                            {p.progreso}%
                          </div>
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${p.progreso}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Link href="/admin/mensajes">
          <Card className="border-border/50 hover:border-border hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {loading ? "—" : stats.mensajesNuevos}
                </p>
                <p className="text-sm text-muted-foreground">
                  Mensajes sin leer
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/testimonios">
          <Card className="border-border/50 hover:border-border hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/10">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {loading ? "—" : stats.testimoniosDestacados}
                </p>
                <p className="text-sm text-muted-foreground">
                  Testimonios destacados
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/servicios">
          <Card className="border-border/50 hover:border-border hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10">
                <Wrench className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {loading ? "—" : stats.serviciosActivos}
                </p>
                <p className="text-sm text-muted-foreground">
                  Servicios activos
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Last updated */}
      <p className="text-xs text-muted-foreground text-right flex items-center justify-end gap-1.5">
        <Clock className="h-3 w-3" />
        Última actualización:{" "}
        {mounted ? lastUpdated.toLocaleTimeString("es-PE") : "—"}
      </p>
    </div>
  );
}

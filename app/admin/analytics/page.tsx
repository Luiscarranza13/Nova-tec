"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "@/components/ui/dynamic-charts";
import {
  TrendingUp,
  Eye,
  Globe,
  Calendar,
  RefreshCw,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/export";

type AnalyticsData = {
  totalViews: number;
  topPages: { path: string; count: number }[];
  dailyViews: { date: string; count: number }[];
};

const DAYS_OPTIONS = [7, 14, 30, 90];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?days=${days}`);
      const json = await res.json();
      setData(json);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [days]);

  useEffect(() => {
    load();
  }, [load]);

  const avgDaily =
    data && data.dailyViews.length
      ? Math.round(data.totalViews / data.dailyViews.length)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-7"
    >
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-7 bg-gradient-to-br from-rose-600 to-pink-600 shadow-lg shadow-rose-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-200 mb-1">
              Panel Admin
            </p>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Analytics
            </h1>
            <p className="text-rose-200 mt-1 text-sm">
              Estadísticas de visitas del sitio web
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-white/20 rounded-xl p-1">
              {DAYS_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${days === d ? "bg-white text-rose-600" : "text-white hover:bg-white/20"}`}
                >
                  {d}d
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={load}
              className="h-9 w-9 rounded-xl border border-white/30 text-white hover:bg-white/20"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          {
            label: `Visitas (${days}d)`,
            value: data?.totalViews ?? "—",
            icon: Eye,
            bg: "bg-rose-50 border-rose-100",
            ic: "text-rose-500",
            ib: "bg-rose-100",
          },
          {
            label: "Promedio diario",
            value: avgDaily || "—",
            icon: TrendingUp,
            bg: "bg-violet-50 border-violet-100",
            ic: "text-violet-500",
            ib: "bg-violet-100",
          },
          {
            label: "Páginas únicas",
            value: data?.topPages.length ?? "—",
            icon: Globe,
            bg: "bg-blue-50 border-blue-100",
            ic: "text-blue-500",
            ib: "bg-blue-100",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div
              className={`rounded-2xl p-5 border ${s.bg} bg-white flex items-center gap-4`}
            >
              <div className={`p-3 rounded-xl ${s.ib} shrink-0`}>
                <s.icon className={`h-5 w-5 ${s.ic}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? "—" : s.value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Daily views area chart */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Visitas diarias</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Últimos {days} días
              </p>
            </div>
            <Calendar className="h-4 w-4 text-slate-400" />
          </div>
          <div className="h-[220px]">
            {loading ? (
              <div className="h-full bg-slate-50 rounded-xl animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.dailyViews || []}>
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border) / 0.4)"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickFormatter={(v) => v.slice(5)}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    labelFormatter={(v) => `Fecha: ${v}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#viewsGrad)"
                    name="Visitas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Top pages */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                Páginas más visitadas
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Top 10</p>
            </div>
            {data?.topPages && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => exportToCSV(data.topPages, "top-pages")}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-slate-50 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {(data?.topPages || []).slice(0, 8).map((p, i) => {
                const max = data?.topPages[0]?.count || 1;
                return (
                  <div key={p.path} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-4 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-700 truncate">
                          {p.path || "/"}
                        </span>
                        <span className="text-xs text-slate-400 shrink-0 ml-2">
                          {p.count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                          style={{ width: `${(p.count / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              {(!data?.topPages || data.topPages.length === 0) && (
                <p className="text-sm text-slate-400 text-center py-8">
                  Sin datos aún
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

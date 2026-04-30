"use client";

// Re-exportamos recharts con tipos correctos.
// El SSR se deshabilita en el componente padre con dynamic({ ssr: false }).
export {
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
  LineChart,
  Line,
  PieChart,
  Pie,
} from "recharts";

export function ChartSkeleton() {
  return (
    <div className="w-full h-full animate-pulse bg-muted/30 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-muted animate-spin border-2 border-muted-foreground border-t-transparent" />
        <span className="text-xs text-muted-foreground">Cargando gráfico...</span>
      </div>
    </div>
  );
}

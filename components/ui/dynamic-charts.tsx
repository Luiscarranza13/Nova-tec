"use client";

import dynamic from "next/dynamic";

const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false },
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), {
  ssr: false,
});
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), {
  ssr: false,
});
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), {
  ssr: false,
});

function ChartSkeleton() {
  return (
    <div className="w-full h-full animate-pulse bg-muted/30 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-muted animate-spin border-2 border-muted-foreground border-t-transparent" />
        <span className="text-xs text-muted-foreground">
          Cargando gráfico...
        </span>
      </div>
    </div>
  );
}

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
  ChartSkeleton,
};

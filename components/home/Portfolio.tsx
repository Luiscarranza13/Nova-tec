"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

const categories = ["Todos", "En Progreso", "Completado", "En Revisión"];

const gradients = [
  "from-indigo-600/20 to-blue-500/20",
  "from-emerald-600/20 to-teal-500/20",
  "from-rose-600/20 to-pink-500/20",
  "from-violet-600/20 to-purple-500/20",
  "from-amber-600/20 to-orange-500/20",
];

const estadoLabels: Record<string, string> = {
  completado: "Completado",
  en_progreso: "En Progreso",
  en_revision: "En Revisión",
  pendiente: "Pendiente",
};

export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Todos");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("proyectos")
        .select("*, clientes(nombre)")
        .order("creado_en", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();

    const channel = supabase
      .channel("proyectos-home-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "proyectos" },
        fetchProjects,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered =
    active === "Todos"
      ? projects
      : projects.filter((p) => {
          const cat = estadoLabels[p.estado] || "Otros";
          return cat === active;
        });

  return (
    <section id="portafolio" className="py-24 md:py-32 relative overflow-hidden bg-slate-50/30">
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-primary" />
              Nuestro Trabajo
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading leading-tight text-slate-900">
              Proyectos que están
              <br />
              <span className="text-gradient">transformando ideas</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/portafolio">
              <Button
                variant="outline"
                className="group border-slate-200 hover:border-primary/40 text-slate-600"
              >
                Ver portafolio completo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white text-slate-500 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="min-h-[400px] relative">
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-white overflow-hidden shadow-sm"
                >
                  <div className="h-48 bg-slate-100 animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-5 w-3/4 bg-slate-100 animate-pulse rounded" />
                    <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded" />
                    <div className="h-1.5 w-full bg-slate-100 animate-pulse rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="p-5 rounded-full bg-slate-50 mb-5">
                <FolderKanban className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                No hay proyectos registrados aún
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                Visita el panel de administración para añadir tus primeros proyectos.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image Area */}
                    <div className="relative h-56 overflow-hidden bg-slate-50">
                      {project.url_demo ? (
                        <Image
                          src={`https://s.microlink.io/${encodeURIComponent(project.url_demo)}`}
                          alt={project.nombre}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : project.imagen_url ? (
                        <Image
                          src={project.imagen_url}
                          alt={project.nombre}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
                           <FolderKanban className="h-12 w-12 text-slate-200" />
                        </div>
                      )}

                      {/* Estado badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-md border border-slate-200 uppercase tracking-tight">
                          {estadoLabels[project.estado]}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          {project.clientes?.nombre && (
                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                              {project.clientes.nombre}
                            </p>
                          )}
                          <h3 className="font-bold text-lg font-heading text-slate-900 group-hover:text-primary transition-colors">
                            {project.nombre}
                          </h3>
                        </div>
                        {project.url_demo && (
                          <a
                            href={project.url_demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-primary transition-all"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      
                      {project.descripcion && (
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2">
                          {project.descripcion}
                        </p>
                      )}

                      {/* Progreso */}
                      <div className="mb-6 pt-4 border-t border-slate-50">
                         <div className="flex justify-between text-[11px] mb-2">
                           <span className="text-slate-400 font-medium uppercase tracking-wider">Desarrollo</span>
                           <span className="text-slate-900 font-bold">{project.progreso}%</span>
                         </div>
                         <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <motion.div
                             initial={{ width: 0 }}
                             animate={{ width: `${project.progreso}%` }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className="h-full bg-primary rounded-full"
                           />
                         </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tecnologias?.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-50 text-slate-500 border border-slate-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

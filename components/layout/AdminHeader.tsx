"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Search,
  Command,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { SidebarContent } from "./Sidebar";

export function AdminHeader() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("AD");
  const [userAvatar, setUserAvatar] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserEmail(user.email || "");

      const { data } = await supabase
        .from("usuarios")
        .select("nombre_completo, foto_url")
        .eq("id", user.id)
        .single();

      const nombre = data?.nombre_completo || "";
      const foto = data?.foto_url || "";

      if (foto) setUserAvatar(`${foto}?t=${Date.now()}`);

      if (nombre) {
        const parts = nombre.trim().split(" ");
        const initials =
          parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : parts[0].slice(0, 2).toUpperCase();
        setUserName(nombre);
        setUserInitials(initials);
      } else if (user.email) {
        const local = user.email.split("@")[0];
        setUserName(local);
        setUserInitials(local.slice(0, 2).toUpperCase());
      }
    };
    loadUser();
  }, []);

  const getPageTitle = () => {
    const path = pathname.split("/").pop() || "";
    const titles: Record<string, string> = {
      "": "Panel de Control",
      admin: "Panel de Control",
      clientes: "Gestión de Clientes",
      proyectos: "Proyectos Activos",
      servicios: "Catálogo de Servicios",
      cotizaciones: "Propuestas Comerciales",
      testimonios: "Reseñas y Testimonios",
      mensajes: "Bandeja de Entrada",
      blog: "Administración de Blog",
      portafolio: "Galería de Portafolio",
      newsletter: "Suscripciones Newsletter",
      analytics: "Métricas y Analíticas",
      pipeline: "Pipeline de Ventas",
      configuracion: "Configuración del Sistema",
    };
    return titles[path] || "Panel Administrativo";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sesión cerrada");
    window.location.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 md:px-6 shadow-sm">
      <div className="flex-1 flex items-center gap-2 sm:gap-4 md:gap-8">
        {/* Mobile Sidebar Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-500"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 border-0">
            <SidebarContent mobile />
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-bold text-slate-900 font-heading truncate">
          {getPageTitle()}
        </h1>

        <div className="relative max-w-md w-full hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <Input
            placeholder="Buscar por cliente, proyecto o comandos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 bg-slate-100/50 border-transparent focus:bg-white focus:border-indigo-200 h-9 rounded-full text-sm transition-all shadow-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] text-slate-400 font-medium">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Ver notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-indigo-600 text-[10px] text-white flex items-center justify-center font-medium"
            aria-hidden="true"
          >
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-slate-100 px-2 transition-colors"
              aria-label="Menú de usuario"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={userAvatar}
                  alt={userName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block text-sm font-medium text-slate-700">
                {userName || "Admin"}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border-slate-200 shadow-xl rounded-xl p-1"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={userAvatar}
                    alt={userName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-semibold text-slate-900">
                    {userName || "Administrador"}
                  </p>
                  <p className="text-xs text-slate-500 truncate max-w-[140px]">
                    {userEmail}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 mx-1" />
            <DropdownMenuItem
              asChild
              className="text-slate-700 hover:bg-slate-50 cursor-pointer rounded-lg m-1"
            >
              <Link
                href="/admin/configuracion"
                className="flex w-full items-center"
              >
                <User className="mr-2 h-4 w-4 text-indigo-500" />
                <span>Mi Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-slate-700 hover:bg-slate-50 cursor-pointer rounded-lg m-1"
            >
              <Link
                href="/admin/configuracion"
                className="flex w-full items-center"
              >
                <Settings className="mr-2 h-4 w-4 text-slate-400" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 mx-1" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50 cursor-pointer rounded-lg m-1"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

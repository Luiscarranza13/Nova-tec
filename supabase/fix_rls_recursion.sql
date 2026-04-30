-- ============================================================
-- NovaTec — Fix: Recursión infinita en políticas RLS
-- EJECUTAR ESTE ARCHIVO EN: Supabase Dashboard → SQL Editor
-- ============================================================
-- El problema: las políticas hacen SELECT a "usuarios" para
-- verificar el rol, pero la política de "usuarios" también
-- hace SELECT a "usuarios" → recursión infinita.
--
-- La solución: función SECURITY DEFINER que bypasea RLS
-- al consultar la tabla usuarios.
-- ============================================================

-- ─── 1. Función helper que verifica si el usuario es admin ───
-- SECURITY DEFINER = corre con permisos del dueño (postgres),
-- no del usuario que llama → no activa RLS → no hay recursión.
CREATE OR REPLACE FUNCTION public.es_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.usuarios
    WHERE id = auth.uid() AND rol = 'admin'
  );
$$;

-- Dar permiso de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION public.es_admin() TO authenticated;

-- ─── 2. Reemplazar TODAS las políticas que causan recursión ──

-- ── usuarios ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "usuarios_leer_propio" ON public.usuarios;
CREATE POLICY "usuarios_leer_propio" ON public.usuarios
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.es_admin());

DROP POLICY IF EXISTS "usuarios_editar_propio" ON public.usuarios;
CREATE POLICY "usuarios_editar_propio" ON public.usuarios
  FOR ALL TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ── newsletter ───────────────────────────────────────────────
DROP POLICY IF EXISTS "newsletter_insertar_publico" ON public.newsletter;
CREATE POLICY "newsletter_insertar_publico" ON public.newsletter
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "newsletter_leer_admin" ON public.newsletter;
CREATE POLICY "newsletter_leer_admin" ON public.newsletter
  FOR SELECT TO authenticated USING (public.es_admin());

DROP POLICY IF EXISTS "newsletter_actualizar_admin" ON public.newsletter;
CREATE POLICY "newsletter_actualizar_admin" ON public.newsletter
  FOR UPDATE TO authenticated USING (public.es_admin());

DROP POLICY IF EXISTS "newsletter_eliminar_admin" ON public.newsletter;
CREATE POLICY "newsletter_eliminar_admin" ON public.newsletter
  FOR DELETE TO authenticated USING (public.es_admin());

-- ── mensajes ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "mensajes_insertar_publico" ON public.mensajes;
CREATE POLICY "mensajes_insertar_publico" ON public.mensajes
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "mensajes_leer_admin" ON public.mensajes;
CREATE POLICY "mensajes_leer_admin" ON public.mensajes
  FOR SELECT TO authenticated USING (public.es_admin());

DROP POLICY IF EXISTS "mensajes_actualizar_admin" ON public.mensajes;
CREATE POLICY "mensajes_actualizar_admin" ON public.mensajes
  FOR UPDATE TO authenticated USING (public.es_admin());

DROP POLICY IF EXISTS "mensajes_eliminar_admin" ON public.mensajes;
CREATE POLICY "mensajes_eliminar_admin" ON public.mensajes
  FOR DELETE TO authenticated USING (public.es_admin());

-- ── entradas_blog ────────────────────────────────────────────
DROP POLICY IF EXISTS "blog_leer_publico" ON public.entradas_blog;
CREATE POLICY "blog_leer_publico" ON public.entradas_blog
  FOR SELECT TO anon, authenticated
  USING (publicado = true OR public.es_admin());

DROP POLICY IF EXISTS "blog_insertar_admin" ON public.entradas_blog;
CREATE POLICY "blog_insertar_admin" ON public.entradas_blog
  FOR INSERT TO authenticated WITH CHECK (public.es_admin());

DROP POLICY IF EXISTS "blog_actualizar_admin" ON public.entradas_blog;
CREATE POLICY "blog_actualizar_admin" ON public.entradas_blog
  FOR UPDATE TO authenticated USING (public.es_admin());

DROP POLICY IF EXISTS "blog_eliminar_admin" ON public.entradas_blog;
CREATE POLICY "blog_eliminar_admin" ON public.entradas_blog
  FOR DELETE TO authenticated USING (public.es_admin());

-- ── elementos_portafolio ─────────────────────────────────────
DROP POLICY IF EXISTS "portafolio_leer_publico" ON public.elementos_portafolio;
CREATE POLICY "portafolio_leer_publico" ON public.elementos_portafolio
  FOR SELECT TO anon, authenticated
  USING (publicado = true OR public.es_admin());

DROP POLICY IF EXISTS "portafolio_insertar_admin" ON public.elementos_portafolio;
CREATE POLICY "portafolio_insertar_admin" ON public.elementos_portafolio
  FOR INSERT TO authenticated WITH CHECK (public.es_admin());

DROP POLICY IF EXISTS "portafolio_actualizar_admin" ON public.elementos_portafolio;
CREATE POLICY "portafolio_actualizar_admin" ON public.elementos_portafolio
  FOR UPDATE TO authenticated USING (public.es_admin());

DROP POLICY IF EXISTS "portafolio_eliminar_admin" ON public.elementos_portafolio;
CREATE POLICY "portafolio_eliminar_admin" ON public.elementos_portafolio
  FOR DELETE TO authenticated USING (public.es_admin());

-- ── visitas_pagina ───────────────────────────────────────────
DROP POLICY IF EXISTS "visitas_insertar_publico" ON public.visitas_pagina;
CREATE POLICY "visitas_insertar_publico" ON public.visitas_pagina
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "visitas_leer_admin" ON public.visitas_pagina;
CREATE POLICY "visitas_leer_admin" ON public.visitas_pagina
  FOR SELECT TO authenticated USING (public.es_admin());

-- ── registro_actividad ───────────────────────────────────────
DROP POLICY IF EXISTS "actividad_insertar_auth" ON public.registro_actividad;
CREATE POLICY "actividad_insertar_auth" ON public.registro_actividad
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "actividad_leer_admin" ON public.registro_actividad;
CREATE POLICY "actividad_leer_admin" ON public.registro_actividad
  FOR SELECT TO authenticated USING (public.es_admin());

-- ── servicios ────────────────────────────────────────────────
DROP POLICY IF EXISTS "servicios_leer_publico" ON public.servicios;
CREATE POLICY "servicios_leer_publico" ON public.servicios
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "servicios_escribir_admin" ON public.servicios;
CREATE POLICY "servicios_escribir_admin" ON public.servicios
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

-- ── testimonios ──────────────────────────────────────────────
DROP POLICY IF EXISTS "testimonios_leer_publico" ON public.testimonios;
CREATE POLICY "testimonios_leer_publico" ON public.testimonios
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "testimonios_escribir_admin" ON public.testimonios;
CREATE POLICY "testimonios_escribir_admin" ON public.testimonios
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

-- ── proyectos ────────────────────────────────────────────────
DROP POLICY IF EXISTS "proyectos_leer_publico" ON public.proyectos;
CREATE POLICY "proyectos_leer_publico" ON public.proyectos
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "proyectos_escribir_admin" ON public.proyectos;
CREATE POLICY "proyectos_escribir_admin" ON public.proyectos
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

-- ── clientes ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "clientes_escribir_admin" ON public.clientes;
CREATE POLICY "clientes_escribir_admin" ON public.clientes
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

-- ── cotizaciones ─────────────────────────────────────────────
DROP POLICY IF EXISTS "cotizaciones_escribir_admin" ON public.cotizaciones;
CREATE POLICY "cotizaciones_escribir_admin" ON public.cotizaciones
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

-- ── cotizacion_items ─────────────────────────────────────────
DROP POLICY IF EXISTS "cotizacion_items_escribir_admin" ON public.cotizacion_items;
CREATE POLICY "cotizacion_items_escribir_admin" ON public.cotizacion_items
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

-- ── configuracion ────────────────────────────────────────────
DROP POLICY IF EXISTS "configuracion_leer_publico" ON public.configuracion;
CREATE POLICY "configuracion_leer_publico" ON public.configuracion
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "configuracion_escribir_admin" ON public.configuracion;
CREATE POLICY "configuracion_escribir_admin" ON public.configuracion
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

-- ============================================================
-- Verificación: ejecuta esto para confirmar que funciona
-- SELECT public.es_admin();  -- debe retornar true si eres admin
-- ============================================================

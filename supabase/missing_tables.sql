-- ============================================================
-- NovaTec — Tablas faltantes para el panel admin
-- Todos los campos en español
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── 1. NEWSLETTER ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter (
  id              uuid NOT NULL DEFAULT uuid_generate_v4(),
  correo          text NOT NULL UNIQUE,
  activo          boolean NOT NULL DEFAULT true,
  suscrito_en     timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_pkey PRIMARY KEY (id)
);

-- ─── 2. ENTRADAS DE BLOG ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.entradas_blog (
  id              uuid NOT NULL DEFAULT uuid_generate_v4(),
  titulo          text NOT NULL,
  slug            text NOT NULL UNIQUE,
  extracto        text,
  contenido       text,
  imagen_url      text,
  categoria       text NOT NULL DEFAULT 'desarrollo',
  etiquetas       text[],
  publicado       boolean NOT NULL DEFAULT false,
  destacado       boolean NOT NULL DEFAULT false,
  tiempo_lectura  integer NOT NULL DEFAULT 5,
  autor_id        uuid REFERENCES public.usuarios(id) ON DELETE SET NULL,
  publicado_en    timestamp with time zone,
  creado_en       timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT entradas_blog_pkey PRIMARY KEY (id)
);

-- ─── 3. ELEMENTOS DE PORTAFOLIO ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.elementos_portafolio (
  id              uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre          text NOT NULL,
  descripcion     text,
  imagen_url      text,
  tecnologias     text[],
  url_demo        text,
  url_repositorio text,
  categoria       text NOT NULL DEFAULT 'Web',
  cliente         text,
  resultado       text,
  destacado       boolean NOT NULL DEFAULT false,
  orden           integer NOT NULL DEFAULT 0,
  publicado       boolean NOT NULL DEFAULT true,
  creado_en       timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT elementos_portafolio_pkey PRIMARY KEY (id)
);

-- ─── 4. VISITAS DE PÁGINA (Analytics) ────────────────────────
CREATE TABLE IF NOT EXISTS public.visitas_pagina (
  id              uuid NOT NULL DEFAULT uuid_generate_v4(),
  ruta            text NOT NULL,
  referidor       text,
  agente_usuario  text,
  pais            text,
  creado_en       timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT visitas_pagina_pkey PRIMARY KEY (id)
);

-- ─── 5. REGISTRO DE ACTIVIDAD ────────────────────────────────
CREATE TABLE IF NOT EXISTS public.registro_actividad (
  id              uuid NOT NULL DEFAULT uuid_generate_v4(),
  accion          text NOT NULL CHECK (accion = ANY (ARRAY['INSERTAR','ACTUALIZAR','ELIMINAR','INICIO_SESION','CONFIGURAR','VER'])),
  tabla           text NOT NULL,
  descripcion     text NOT NULL,
  usuario_id      uuid REFERENCES public.usuarios(id) ON DELETE SET NULL,
  correo_usuario  text,
  metadatos       jsonb,
  creado_en       timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT registro_actividad_pkey PRIMARY KEY (id)
);

-- ============================================================
-- RLS — Habilitar Row Level Security
-- ============================================================
ALTER TABLE public.newsletter             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entradas_blog          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elementos_portafolio   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitas_pagina         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registro_actividad     ENABLE ROW LEVEL SECURITY;

-- Tablas existentes
ALTER TABLE public.clientes               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cotizaciones           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cotizacion_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensajes               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proyectos              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicios              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonios            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios               ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- POLÍTICAS RLS
-- ============================================================

-- ── newsletter ──────────────────────────────────────────────
DROP POLICY IF EXISTS "newsletter_insertar_publico" ON public.newsletter;
CREATE POLICY "newsletter_insertar_publico" ON public.newsletter
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "newsletter_leer_admin" ON public.newsletter;
CREATE POLICY "newsletter_leer_admin" ON public.newsletter
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "newsletter_actualizar_admin" ON public.newsletter;
CREATE POLICY "newsletter_actualizar_admin" ON public.newsletter
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "newsletter_eliminar_admin" ON public.newsletter;
CREATE POLICY "newsletter_eliminar_admin" ON public.newsletter
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── mensajes ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "mensajes_insertar_publico" ON public.mensajes;
CREATE POLICY "mensajes_insertar_publico" ON public.mensajes
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "mensajes_leer_admin" ON public.mensajes;
CREATE POLICY "mensajes_leer_admin" ON public.mensajes
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "mensajes_actualizar_admin" ON public.mensajes;
CREATE POLICY "mensajes_actualizar_admin" ON public.mensajes
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "mensajes_eliminar_admin" ON public.mensajes;
CREATE POLICY "mensajes_eliminar_admin" ON public.mensajes
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── entradas_blog ────────────────────────────────────────────
DROP POLICY IF EXISTS "blog_leer_publico" ON public.entradas_blog;
CREATE POLICY "blog_leer_publico" ON public.entradas_blog
  FOR SELECT TO anon, authenticated
  USING (publicado = true OR EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "blog_insertar_admin" ON public.entradas_blog;
CREATE POLICY "blog_insertar_admin" ON public.entradas_blog
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "blog_actualizar_admin" ON public.entradas_blog;
CREATE POLICY "blog_actualizar_admin" ON public.entradas_blog
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "blog_eliminar_admin" ON public.entradas_blog;
CREATE POLICY "blog_eliminar_admin" ON public.entradas_blog
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── elementos_portafolio ─────────────────────────────────────
DROP POLICY IF EXISTS "portafolio_leer_publico" ON public.elementos_portafolio;
CREATE POLICY "portafolio_leer_publico" ON public.elementos_portafolio
  FOR SELECT TO anon, authenticated
  USING (publicado = true OR EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "portafolio_insertar_admin" ON public.elementos_portafolio;
CREATE POLICY "portafolio_insertar_admin" ON public.elementos_portafolio
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "portafolio_actualizar_admin" ON public.elementos_portafolio;
CREATE POLICY "portafolio_actualizar_admin" ON public.elementos_portafolio
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

DROP POLICY IF EXISTS "portafolio_eliminar_admin" ON public.elementos_portafolio;
CREATE POLICY "portafolio_eliminar_admin" ON public.elementos_portafolio
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── visitas_pagina ───────────────────────────────────────────
DROP POLICY IF EXISTS "visitas_insertar_publico" ON public.visitas_pagina;
CREATE POLICY "visitas_insertar_publico" ON public.visitas_pagina
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "visitas_leer_admin" ON public.visitas_pagina;
CREATE POLICY "visitas_leer_admin" ON public.visitas_pagina
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── registro_actividad ───────────────────────────────────────
DROP POLICY IF EXISTS "actividad_insertar_auth" ON public.registro_actividad;
CREATE POLICY "actividad_insertar_auth" ON public.registro_actividad
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "actividad_leer_admin" ON public.registro_actividad;
CREATE POLICY "actividad_leer_admin" ON public.registro_actividad
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── servicios ────────────────────────────────────────────────
DROP POLICY IF EXISTS "servicios_leer_publico" ON public.servicios;
CREATE POLICY "servicios_leer_publico" ON public.servicios
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "servicios_escribir_admin" ON public.servicios;
CREATE POLICY "servicios_escribir_admin" ON public.servicios
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── testimonios ──────────────────────────────────────────────
DROP POLICY IF EXISTS "testimonios_leer_publico" ON public.testimonios;
CREATE POLICY "testimonios_leer_publico" ON public.testimonios
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "testimonios_escribir_admin" ON public.testimonios;
CREATE POLICY "testimonios_escribir_admin" ON public.testimonios
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── proyectos ────────────────────────────────────────────────
DROP POLICY IF EXISTS "proyectos_leer_publico" ON public.proyectos;
CREATE POLICY "proyectos_leer_publico" ON public.proyectos
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "proyectos_escribir_admin" ON public.proyectos;
CREATE POLICY "proyectos_escribir_admin" ON public.proyectos
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── clientes ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "clientes_escribir_admin" ON public.clientes;
CREATE POLICY "clientes_escribir_admin" ON public.clientes
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── cotizaciones ─────────────────────────────────────────────
DROP POLICY IF EXISTS "cotizaciones_escribir_admin" ON public.cotizaciones;
CREATE POLICY "cotizaciones_escribir_admin" ON public.cotizaciones
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── cotizacion_items ─────────────────────────────────────────
DROP POLICY IF EXISTS "cotizacion_items_escribir_admin" ON public.cotizacion_items;
CREATE POLICY "cotizacion_items_escribir_admin" ON public.cotizacion_items
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── configuracion ────────────────────────────────────────────
DROP POLICY IF EXISTS "configuracion_leer_publico" ON public.configuracion;
CREATE POLICY "configuracion_leer_publico" ON public.configuracion
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "configuracion_escribir_admin" ON public.configuracion;
CREATE POLICY "configuracion_escribir_admin" ON public.configuracion
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin'));

-- ── usuarios ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "usuarios_leer_propio" ON public.usuarios;
CREATE POLICY "usuarios_leer_propio" ON public.usuarios
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR EXISTS (SELECT 1 FROM public.usuarios u2 WHERE u2.id = auth.uid() AND u2.rol = 'admin'));

DROP POLICY IF EXISTS "usuarios_editar_propio" ON public.usuarios;
CREATE POLICY "usuarios_editar_propio" ON public.usuarios
  FOR ALL TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_newsletter_correo          ON public.newsletter(correo);
CREATE INDEX IF NOT EXISTS idx_newsletter_activo          ON public.newsletter(activo);
CREATE INDEX IF NOT EXISTS idx_entradas_blog_slug         ON public.entradas_blog(slug);
CREATE INDEX IF NOT EXISTS idx_entradas_blog_publicado    ON public.entradas_blog(publicado);
CREATE INDEX IF NOT EXISTS idx_entradas_blog_categoria    ON public.entradas_blog(categoria);
CREATE INDEX IF NOT EXISTS idx_portafolio_orden           ON public.elementos_portafolio(orden);
CREATE INDEX IF NOT EXISTS idx_portafolio_publicado       ON public.elementos_portafolio(publicado);
CREATE INDEX IF NOT EXISTS idx_visitas_ruta               ON public.visitas_pagina(ruta);
CREATE INDEX IF NOT EXISTS idx_visitas_creado_en          ON public.visitas_pagina(creado_en);
CREATE INDEX IF NOT EXISTS idx_actividad_creado_en        ON public.registro_actividad(creado_en DESC);
CREATE INDEX IF NOT EXISTS idx_actividad_tabla            ON public.registro_actividad(tabla);

-- ============================================================
-- GRANTS
-- ============================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT         ON public.servicios              TO anon, authenticated;
GRANT SELECT         ON public.testimonios            TO anon, authenticated;
GRANT SELECT         ON public.proyectos              TO anon, authenticated;
GRANT SELECT         ON public.configuracion          TO anon, authenticated;
GRANT SELECT         ON public.entradas_blog          TO anon, authenticated;
GRANT SELECT         ON public.elementos_portafolio   TO anon, authenticated;

GRANT INSERT         ON public.mensajes               TO anon, authenticated;
GRANT INSERT         ON public.newsletter             TO anon, authenticated;
GRANT INSERT         ON public.visitas_pagina         TO anon, authenticated;

GRANT ALL            ON public.clientes               TO authenticated;
GRANT ALL            ON public.proyectos              TO authenticated;
GRANT ALL            ON public.cotizaciones           TO authenticated;
GRANT ALL            ON public.cotizacion_items       TO authenticated;
GRANT ALL            ON public.servicios              TO authenticated;
GRANT ALL            ON public.testimonios            TO authenticated;
GRANT ALL            ON public.mensajes               TO authenticated;
GRANT ALL            ON public.newsletter             TO authenticated;
GRANT ALL            ON public.entradas_blog          TO authenticated;
GRANT ALL            ON public.elementos_portafolio   TO authenticated;
GRANT ALL            ON public.visitas_pagina         TO authenticated;
GRANT ALL            ON public.registro_actividad     TO authenticated;
GRANT ALL            ON public.configuracion          TO authenticated;
GRANT ALL            ON public.usuarios               TO authenticated;

-- =============================================
-- NovaTec - Schema v2 (Mejoras adicionales)
-- Ejecutar DESPUÉS de schema.sql
-- =============================================

-- =============================================
-- FUNCIÓN: actualizar_timestamp (recrear por si no existe)
-- =============================================
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.actualizado_en = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TABLA: newsletter
-- =============================================
CREATE TABLE IF NOT EXISTS public.newsletter (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  activo      BOOLEAN NOT NULL DEFAULT true,
  suscrito_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cualquiera puede suscribirse al newsletter" ON public.newsletter;
DROP POLICY IF EXISTS "Autenticados pueden ver suscriptores" ON public.newsletter;
DROP POLICY IF EXISTS "Autenticados pueden gestionar suscriptores" ON public.newsletter;
DROP POLICY IF EXISTS "Autenticados pueden eliminar suscriptores" ON public.newsletter;

CREATE POLICY "Cualquiera puede suscribirse al newsletter"
  ON public.newsletter FOR INSERT WITH CHECK (true);
CREATE POLICY "Autenticados pueden ver suscriptores"
  ON public.newsletter FOR SELECT TO authenticated USING (true);
CREATE POLICY "Autenticados pueden gestionar suscriptores"
  ON public.newsletter FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Autenticados pueden eliminar suscriptores"
  ON public.newsletter FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: activity_log
-- =============================================
CREATE TABLE IF NOT EXISTS public.activity_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accion        TEXT NOT NULL CHECK (accion IN ('INSERT','UPDATE','DELETE','LOGIN','CONFIG','VIEW')),
  tabla         TEXT NOT NULL,
  descripcion   TEXT NOT NULL,
  usuario_id    UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  usuario_email TEXT,
  metadata      JSONB,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Autenticados pueden ver el log" ON public.activity_log;
DROP POLICY IF EXISTS "Autenticados pueden insertar en el log" ON public.activity_log;

CREATE POLICY "Autenticados pueden ver el log"
  ON public.activity_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Autenticados pueden insertar en el log"
  ON public.activity_log FOR INSERT TO authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_activity_log_creado_en ON public.activity_log(creado_en DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_usuario   ON public.activity_log(usuario_id);

-- =============================================
-- TABLA: blog_posts
-- =============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo         TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  extracto       TEXT,
  contenido      TEXT,
  imagen_url     TEXT,
  categoria      TEXT NOT NULL DEFAULT 'desarrollo',
  tags           TEXT[],
  publicado      BOOLEAN NOT NULL DEFAULT false,
  destacado      BOOLEAN NOT NULL DEFAULT false,
  tiempo_lectura INTEGER NOT NULL DEFAULT 5,
  autor_id       UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  publicado_en   TIMESTAMPTZ,
  creado_en      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Todos pueden ver posts publicados"       ON public.blog_posts;
DROP POLICY IF EXISTS "Autenticados pueden ver todos los posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Autenticados pueden crear posts"         ON public.blog_posts;
DROP POLICY IF EXISTS "Autenticados pueden editar posts"        ON public.blog_posts;
DROP POLICY IF EXISTS "Autenticados pueden eliminar posts"      ON public.blog_posts;

CREATE POLICY "Todos pueden ver posts publicados"
  ON public.blog_posts FOR SELECT USING (publicado = true);
CREATE POLICY "Autenticados pueden ver todos los posts"
  ON public.blog_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Autenticados pueden crear posts"
  ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Autenticados pueden editar posts"
  ON public.blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Autenticados pueden eliminar posts"
  ON public.blog_posts FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug      ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publicado ON public.blog_posts(publicado, publicado_en DESC);

DROP TRIGGER IF EXISTS trg_blog_posts_actualizado ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_actualizado
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

-- =============================================
-- TABLA: portafolio_items
-- =============================================
CREATE TABLE IF NOT EXISTS public.portafolio_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre         TEXT NOT NULL,
  descripcion    TEXT,
  imagen_url     TEXT,
  tecnologias    TEXT[],
  url_demo       TEXT,
  url_repo       TEXT,
  categoria      TEXT NOT NULL DEFAULT 'Web',
  cliente        TEXT,
  resultado      TEXT,
  destacado      BOOLEAN NOT NULL DEFAULT false,
  orden          INTEGER NOT NULL DEFAULT 0,
  publicado      BOOLEAN NOT NULL DEFAULT true,
  creado_en      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.portafolio_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Todos pueden ver portafolio publicado"  ON public.portafolio_items;
DROP POLICY IF EXISTS "Autenticados pueden gestionar portafolio" ON public.portafolio_items;

CREATE POLICY "Todos pueden ver portafolio publicado"
  ON public.portafolio_items FOR SELECT USING (publicado = true);
CREATE POLICY "Autenticados pueden gestionar portafolio"
  ON public.portafolio_items FOR ALL TO authenticated USING (true);

DROP TRIGGER IF EXISTS trg_portafolio_actualizado ON public.portafolio_items;
CREATE TRIGGER trg_portafolio_actualizado
  BEFORE UPDATE ON public.portafolio_items
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

-- =============================================
-- TABLA: page_views
-- =============================================
CREATE TABLE IF NOT EXISTS public.page_views (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path       TEXT NOT NULL,
  referrer   TEXT,
  user_agent TEXT,
  country    TEXT,
  creado_en  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cualquiera puede registrar una visita" ON public.page_views;
DROP POLICY IF EXISTS "Autenticados pueden ver analytics"     ON public.page_views;

CREATE POLICY "Cualquiera puede registrar una visita"
  ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Autenticados pueden ver analytics"
  ON public.page_views FOR SELECT TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_page_views_path  ON public.page_views(path, creado_en DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_fecha ON public.page_views(creado_en DESC);

-- =============================================
-- STORAGE: bucket media
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Media es pública"                ON storage.objects;
DROP POLICY IF EXISTS "Autenticados pueden subir media" ON storage.objects;
DROP POLICY IF EXISTS "Autenticados pueden actualizar media" ON storage.objects;
DROP POLICY IF EXISTS "Autenticados pueden eliminar media"   ON storage.objects;

CREATE POLICY "Media es pública"
  ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Autenticados pueden subir media"
  ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
CREATE POLICY "Autenticados pueden actualizar media"
  ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media');
CREATE POLICY "Autenticados pueden eliminar media"
  ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');

-- =============================================
-- FUNCIÓN: log_activity (helper RPC)
-- =============================================
CREATE OR REPLACE FUNCTION log_activity(
  p_accion      TEXT,
  p_tabla       TEXT,
  p_descripcion TEXT,
  p_metadata    JSONB DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.activity_log (accion, tabla, descripcion, usuario_id, usuario_email, metadata)
  VALUES (
    p_accion,
    p_tabla,
    p_descripcion,
    auth.uid(),
    (SELECT correo FROM public.usuarios WHERE id = auth.uid()),
    p_metadata
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- DATOS INICIALES: blog posts de ejemplo
-- =============================================
INSERT INTO public.blog_posts (titulo, slug, extracto, categoria, tiempo_lectura, publicado, destacado, publicado_en)
VALUES
  (
    '10 Errores Comunes al Desarrollar tu Primera App Móvil',
    '10-errores-app-movil',
    'Evita estos errores comunes que cometen muchas empresas al desarrollar su primera aplicación móvil.',
    'desarrollo', 8, true, true, NOW() - INTERVAL '30 days'
  ),
  (
    'Next.js 15: Novedades y Cómo Migrar tu App',
    'nextjs-15-novedades',
    'Análisis completo de las nuevas características de Next.js 15 y guía paso a paso para migración.',
    'frontend', 12, true, true, NOW() - INTERVAL '37 days'
  ),
  (
    'Guía Completa de SEO para SaaS',
    'guia-seo-saas',
    'Estrategias específicas de SEO diseñadas para aplicaciones SaaS y cómo aumentar tu visibilidad.',
    'marketing', 15, true, false, NOW() - INTERVAL '45 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DATOS INICIALES: portafolio de ejemplo
-- =============================================
INSERT INTO public.portafolio_items
  (nombre, descripcion, tecnologias, categoria, cliente, resultado, destacado, orden, publicado)
VALUES
  ('E-commerce Platform',   'Plataforma de comercio electrónico con panel de administración, pasarela de pagos y gestión de inventario.', ARRAY['Next.js','TypeScript','Stripe','Supabase'], 'Web',       'RetailMax',       '+180% ventas online',      true,  1, true),
  ('Mobile Banking App',    'App de banca con autenticación biométrica y gestión de inversiones en tiempo real.',                         ARRAY['React Native','Firebase','Node.js'],        'Móvil',     'FinCorp',         '50k+ descargas',           true,  2, true),
  ('Healthcare Dashboard',  'Panel de control para gestión de pacientes y reportes analíticos en tiempo real.',                           ARRAY['React','D3.js','Node.js','PostgreSQL'],     'Dashboard', 'MediCare+',       '+60% productividad',       false, 3, true),
  ('SaaS Platform',         'Plataforma SaaS multi-tenant para gestión de proyectos con colaboración en tiempo real.',                    ARRAY['Vue.js','GraphQL','AWS','Redis'],           'Web',       'TechStart',       '$250k inversión seed',     false, 4, true),
  ('Logistics App',         'Seguimiento de envíos en tiempo real con optimización de rutas inteligente.',                                ARRAY['Flutter','Google Maps','Node.js'],          'Móvil',     'FastShip',        '-40% costos operativos',   false, 5, true),
  ('CRM System',            'CRM personalizado con automatización de ventas y pipelines visuales.',                                       ARRAY['Angular','NestJS','PostgreSQL'],            'Dashboard', 'SalesForce Pro',  '3x velocidad de ventas',   false, 6, true)
ON CONFLICT DO NOTHING;

-- =============================================
-- NovaTec - Esquema de Base de Datos
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLA: usuarios
-- Extiende auth.users de Supabase
-- =============================================
CREATE TABLE public.usuarios (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  correo        TEXT NOT NULL,
  nombre_completo TEXT,
  foto_url      TEXT,
  rol           TEXT NOT NULL DEFAULT 'usuario' CHECK (rol IN ('admin', 'usuario')),
  telefono      TEXT,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ver propio perfil"
  ON public.usuarios FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Editar propio perfil"
  ON public.usuarios FOR UPDATE
  USING (auth.uid() = id);

-- Sin recursión: usa auth.jwt() para leer el rol del token
CREATE POLICY "Admin ve todos los usuarios"
  ON public.usuarios FOR SELECT
  USING (
    auth.uid() = id
    OR (auth.jwt() ->> 'role') = 'admin'
  );

-- =============================================
-- TABLA: clientes
-- =============================================
CREATE TABLE public.clientes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre        TEXT NOT NULL,
  correo        TEXT NOT NULL,
  empresa       TEXT,
  telefono      TEXT,
  notas         TEXT,
  creado_por    UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Autenticados pueden ver clientes"
  ON public.clientes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Autenticados pueden crear clientes"
  ON public.clientes FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Autenticados pueden editar clientes"
  ON public.clientes FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Autenticados pueden eliminar clientes"
  ON public.clientes FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: servicios
-- =============================================
CREATE TABLE public.servicios (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre        TEXT NOT NULL,
  descripcion   TEXT,
  categoria     TEXT CHECK (categoria IN ('Desarrollo', 'Diseño', 'Infraestructura', 'Consultoría')),
  precio        DECIMAL(12, 2),
  icono         TEXT,
  orden         INTEGER NOT NULL DEFAULT 0,
  activo        BOOLEAN NOT NULL DEFAULT true,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.servicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver servicios activos"
  ON public.servicios FOR SELECT USING (activo = true);

CREATE POLICY "Admin puede ver todos los servicios"
  ON public.servicios FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

CREATE POLICY "Admin puede crear servicios"
  ON public.servicios FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin puede editar servicios"
  ON public.servicios FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin puede eliminar servicios"
  ON public.servicios FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: proyectos
-- =============================================
CREATE TABLE public.proyectos (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre        TEXT NOT NULL,
  descripcion   TEXT,
  imagen_url    TEXT,
  tecnologias   TEXT[],
  url_demo      TEXT,
  cliente_id    UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  estado        TEXT NOT NULL DEFAULT 'pendiente'
                  CHECK (estado IN ('pendiente', 'en_progreso', 'en_revision', 'completado', 'cancelado')),
  presupuesto   DECIMAL(12, 2),
  progreso      INTEGER NOT NULL DEFAULT 0 CHECK (progreso >= 0 AND progreso <= 100),
  fecha_inicio  DATE,
  fecha_fin     DATE,
  creado_por    UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.proyectos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Autenticados pueden ver proyectos"
  ON public.proyectos FOR SELECT TO authenticated USING (true);

CREATE POLICY "Autenticados pueden crear proyectos"
  ON public.proyectos FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Autenticados pueden editar proyectos"
  ON public.proyectos FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Autenticados pueden eliminar proyectos"
  ON public.proyectos FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: cotizaciones
-- =============================================
CREATE TABLE public.cotizaciones (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numero        TEXT UNIQUE NOT NULL DEFAULT 'COT-' || to_char(NOW(), 'YYYYMMDD') || '-' || floor(random() * 9000 + 1000)::TEXT,
  cliente_id    UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  estado        TEXT NOT NULL DEFAULT 'borrador'
                  CHECK (estado IN ('borrador', 'enviada', 'aceptada', 'rechazada')),
  subtotal      DECIMAL(12, 2) NOT NULL DEFAULT 0,
  impuesto      DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total         DECIMAL(12, 2) NOT NULL DEFAULT 0,
  notas         TEXT,
  valida_hasta  DATE,
  creado_por    UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.cotizaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Autenticados pueden ver cotizaciones"
  ON public.cotizaciones FOR SELECT TO authenticated USING (true);

CREATE POLICY "Autenticados pueden crear cotizaciones"
  ON public.cotizaciones FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Autenticados pueden editar cotizaciones"
  ON public.cotizaciones FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Autenticados pueden eliminar cotizaciones"
  ON public.cotizaciones FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: cotizacion_items
-- Líneas de detalle de cada cotización
-- =============================================
CREATE TABLE public.cotizacion_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cotizacion_id   UUID NOT NULL REFERENCES public.cotizaciones(id) ON DELETE CASCADE,
  servicio_id     UUID REFERENCES public.servicios(id) ON DELETE SET NULL,
  descripcion     TEXT,
  cantidad        INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
  precio_unitario DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total           DECIMAL(12, 2) NOT NULL DEFAULT 0
);

ALTER TABLE public.cotizacion_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Autenticados pueden ver items de cotizacion"
  ON public.cotizacion_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Autenticados pueden crear items de cotizacion"
  ON public.cotizacion_items FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Autenticados pueden editar items de cotizacion"
  ON public.cotizacion_items FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Autenticados pueden eliminar items de cotizacion"
  ON public.cotizacion_items FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: mensajes
-- Mensajes del formulario de contacto
-- =============================================
CREATE TABLE public.mensajes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre      TEXT NOT NULL,
  correo      TEXT NOT NULL,
  asunto      TEXT,
  mensaje     TEXT NOT NULL,
  leido       BOOLEAN NOT NULL DEFAULT false,
  resuelto    BOOLEAN NOT NULL DEFAULT false,
  creado_en   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.mensajes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar un mensaje"
  ON public.mensajes FOR INSERT WITH CHECK (true);

CREATE POLICY "Autenticados pueden ver mensajes"
  ON public.mensajes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Autenticados pueden editar mensajes"
  ON public.mensajes FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Autenticados pueden eliminar mensajes"
  ON public.mensajes FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: testimonios
-- =============================================
CREATE TABLE public.testimonios (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre_cliente TEXT NOT NULL,
  empresa       TEXT,
  foto_url      TEXT,
  comentario    TEXT NOT NULL,
  calificacion  INTEGER NOT NULL DEFAULT 5 CHECK (calificacion >= 1 AND calificacion <= 5),
  destacado     BOOLEAN NOT NULL DEFAULT false,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.testimonios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver testimonios"
  ON public.testimonios FOR SELECT USING (true);

CREATE POLICY "Autenticados pueden crear testimonios"
  ON public.testimonios FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Autenticados pueden editar testimonios"
  ON public.testimonios FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Autenticados pueden eliminar testimonios"
  ON public.testimonios FOR DELETE TO authenticated USING (true);

-- =============================================
-- TABLA: configuracion
-- Ajustes generales del sitio (clave-valor)
-- =============================================
CREATE TABLE public.configuracion (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clave         TEXT UNIQUE NOT NULL,
  valor         TEXT,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.configuracion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos pueden ver la configuracion"
  ON public.configuracion FOR SELECT USING (true);

CREATE POLICY "Admin puede editar la configuracion"
  ON public.configuracion FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- =============================================
-- DATOS INICIALES: configuracion del sitio
-- =============================================
INSERT INTO public.configuracion (clave, valor) VALUES
  ('nombre_empresa',   'NovaTec'),
  ('tagline',          'Transformamos Ideas en Software Excepcional'),
  ('descripcion',      'Empresa de desarrollo de software a medida'),
  ('correo_contacto',  'contacto@novatec.mx'),
  ('telefono',         '+52 55 1234 5678'),
  ('direccion',        'Ciudad de México, México'),
  ('horario',          'Lunes a Viernes, 9:00 - 18:00'),
  ('facebook',         ''),
  ('twitter',          ''),
  ('instagram',        ''),
  ('linkedin',         ''),
  ('github',           ''),
  ('meta_titulo',      'NovaTec - Desarrollo de Software'),
  ('meta_descripcion', 'Transformamos ideas en software excepcional'),
  ('palabras_clave',   'desarrollo web, software, apps móviles, México'),
  ('modo_mantenimiento', 'false');

-- =============================================
-- DATOS INICIALES: servicios
-- =============================================
INSERT INTO public.servicios (nombre, descripcion, categoria, precio, icono, orden, activo) VALUES
  ('Desarrollo Web',          'Sitios y aplicaciones web modernas y responsivas',    'Desarrollo',     25000, 'Globe',      1, true),
  ('Desarrollo Móvil',        'Apps nativas y multiplataforma para iOS y Android',   'Desarrollo',     35000, 'Smartphone', 2, true),
  ('Desarrollo de Software',  'Software a medida para procesos empresariales',       'Desarrollo',     45000, 'Code',       3, true),
  ('Diseño UI/UX',            'Interfaces intuitivas centradas en el usuario',       'Diseño',         15000, 'Palette',    4, true),
  ('Soluciones Cloud',        'Infraestructura escalable en la nube',                'Infraestructura',20000, 'Cloud',      5, true),
  ('Consultoría Tech',        'Asesoría tecnológica para tu empresa',                'Consultoría',     8000, 'Lightbulb',  6, true);

-- =============================================
-- FUNCIÓN: actualizar campo actualizado_en
-- =============================================
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.actualizado_en = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar automáticamente actualizado_en
CREATE TRIGGER trg_usuarios_actualizado
  BEFORE UPDATE ON public.usuarios
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_clientes_actualizado
  BEFORE UPDATE ON public.clientes
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_servicios_actualizado
  BEFORE UPDATE ON public.servicios
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_proyectos_actualizado
  BEFORE UPDATE ON public.proyectos
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_cotizaciones_actualizado
  BEFORE UPDATE ON public.cotizaciones
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER trg_configuracion_actualizado
  BEFORE UPDATE ON public.configuracion
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

-- =============================================
-- FUNCIÓN: crear perfil al registrarse
-- Se ejecuta automáticamente cuando un usuario
-- se registra en Supabase Auth
-- =============================================
CREATE OR REPLACE FUNCTION crear_usuario_al_registrarse()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, correo, nombre_completo)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_crear_usuario
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION crear_usuario_al_registrarse();

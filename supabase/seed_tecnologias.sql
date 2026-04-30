-- ============================================================
-- NovaTec — Datos semilla: Tecnologías
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── Crear tabla de tecnologías ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.tecnologias (
  id          uuid NOT NULL DEFAULT uuid_generate_v4(),
  nombre      text NOT NULL UNIQUE,
  categoria   text NOT NULL,
  icono_url   text,
  activo      boolean NOT NULL DEFAULT true,
  CONSTRAINT tecnologias_pkey PRIMARY KEY (id)
);

ALTER TABLE public.tecnologias ENABLE ROW LEVEL SECURITY;

-- Lectura pública (se usa en formularios del admin)
DROP POLICY IF EXISTS "tecnologias_leer_publico" ON public.tecnologias;
CREATE POLICY "tecnologias_leer_publico" ON public.tecnologias
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "tecnologias_escribir_admin" ON public.tecnologias;
CREATE POLICY "tecnologias_escribir_admin" ON public.tecnologias
  FOR ALL TO authenticated
  USING (public.es_admin()) WITH CHECK (public.es_admin());

GRANT SELECT ON public.tecnologias TO anon, authenticated;
GRANT ALL    ON public.tecnologias TO authenticated;

-- ─── Insertar tecnologías ─────────────────────────────────────
INSERT INTO public.tecnologias (nombre, categoria) VALUES
  -- Frontend
  ('React',           'Frontend'),
  ('Next.js',         'Frontend'),
  ('Vue.js',          'Frontend'),
  ('Angular',         'Frontend'),
  ('Svelte',          'Frontend'),
  ('Astro',           'Frontend'),
  ('TypeScript',      'Frontend'),
  ('JavaScript',      'Frontend'),
  ('HTML5',           'Frontend'),
  ('CSS3',            'Frontend'),
  ('Tailwind CSS',    'Frontend'),
  ('Bootstrap',       'Frontend'),
  ('Framer Motion',   'Frontend'),
  ('Three.js',        'Frontend'),
  -- Backend
  ('Node.js',         'Backend'),
  ('NestJS',          'Backend'),
  ('Express.js',      'Backend'),
  ('Python',          'Backend'),
  ('Django',          'Backend'),
  ('FastAPI',         'Backend'),
  ('Go',              'Backend'),
  ('Rust',            'Backend'),
  ('PHP',             'Backend'),
  ('Laravel',         'Backend'),
  ('Ruby on Rails',   'Backend'),
  ('Java',            'Backend'),
  ('Spring Boot',     'Backend'),
  ('.NET',            'Backend'),
  ('GraphQL',         'Backend'),
  ('REST API',        'Backend'),
  ('tRPC',            'Backend'),
  ('WebSockets',      'Backend'),
  -- Móvil
  ('React Native',    'Móvil'),
  ('Flutter',         'Móvil'),
  ('Expo',            'Móvil'),
  ('Swift',           'Móvil'),
  ('Kotlin',          'Móvil'),
  ('Ionic',           'Móvil'),
  ('Capacitor',       'Móvil'),
  ('PWA',             'Móvil'),
  -- Base de Datos
  ('PostgreSQL',      'Base de Datos'),
  ('MySQL',           'Base de Datos'),
  ('MongoDB',         'Base de Datos'),
  ('Redis',           'Base de Datos'),
  ('SQLite',          'Base de Datos'),
  ('Supabase',        'Base de Datos'),
  ('Firebase',        'Base de Datos'),
  ('Prisma',          'Base de Datos'),
  ('Drizzle',         'Base de Datos'),
  ('PlanetScale',     'Base de Datos'),
  ('Neon',            'Base de Datos'),
  -- Cloud & DevOps
  ('AWS',             'Cloud & DevOps'),
  ('GCP',             'Cloud & DevOps'),
  ('Azure',           'Cloud & DevOps'),
  ('Vercel',          'Cloud & DevOps'),
  ('Netlify',         'Cloud & DevOps'),
  ('Docker',          'Cloud & DevOps'),
  ('Kubernetes',      'Cloud & DevOps'),
  ('Terraform',       'Cloud & DevOps'),
  ('CI/CD',           'Cloud & DevOps'),
  ('GitHub Actions',  'Cloud & DevOps'),
  ('Linux',           'Cloud & DevOps'),
  ('Nginx',           'Cloud & DevOps'),
  -- IA & ML
  ('OpenAI API',      'IA & ML'),
  ('LangChain',       'IA & ML'),
  ('TensorFlow',      'IA & ML'),
  ('PyTorch',         'IA & ML'),
  ('Hugging Face',    'IA & ML'),
  ('Pinecone',        'IA & ML'),
  ('Vercel AI SDK',   'IA & ML'),
  -- Herramientas
  ('Git',             'Herramientas'),
  ('GitHub',          'Herramientas'),
  ('Figma',           'Herramientas'),
  ('Jira',            'Herramientas'),
  ('Notion',          'Herramientas'),
  ('Stripe',          'Herramientas'),
  ('Twilio',          'Herramientas'),
  ('SendGrid',        'Herramientas'),
  ('Cloudinary',      'Herramientas'),
  ('Mapbox',          'Herramientas'),
  ('Algolia',         'Herramientas'),
  -- Testing
  ('Jest',            'Testing'),
  ('Vitest',          'Testing'),
  ('Playwright',      'Testing'),
  ('Cypress',         'Testing'),
  ('Testing Library', 'Testing'),
  ('Storybook',       'Testing')
ON CONFLICT (nombre) DO NOTHING;

-- ============================================================
-- Verificación
-- SELECT categoria, COUNT(*) FROM public.tecnologias GROUP BY categoria ORDER BY categoria;
-- ============================================================

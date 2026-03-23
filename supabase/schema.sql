-- =============================================
-- NovaTec - Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE (extends auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================
-- CLIENTS TABLE
-- =============================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view clients"
  ON public.clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clients"
  ON public.clients FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update clients"
  ON public.clients FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete clients"
  ON public.clients FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- PROJECTS TABLE
-- =============================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'review', 'completed', 'cancelled')),
  budget DECIMAL(12, 2),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date DATE,
  end_date DATE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- SERVICES TABLE
-- =============================================
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price DECIMAL(12, 2),
  icon TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON public.services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all services"
  ON public.services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON public.services FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update services"
  ON public.services FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete services"
  ON public.services FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- QUOTATIONS TABLE
-- =============================================
CREATE TABLE public.quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected')),
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
  tax DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL DEFAULT 0,
  notes TEXT,
  valid_until DATE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view quotations"
  ON public.quotations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert quotations"
  ON public.quotations FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update quotations"
  ON public.quotations FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete quotations"
  ON public.quotations FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- QUOTATION ITEMS TABLE
-- =============================================
CREATE TABLE public.quotation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_id UUID REFERENCES public.quotations(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL DEFAULT 0
);

ALTER TABLE public.quotation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view quotation items"
  ON public.quotation_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert quotation items"
  ON public.quotation_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update quotation items"
  ON public.quotation_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete quotation items"
  ON public.quotation_items FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- TESTIMONIALS TABLE
-- =============================================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_avatar TEXT,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view featured testimonials"
  ON public.testimonials FOR SELECT
  TO public
  USING (is_featured = true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON public.testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON public.testimonials FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- CONTACT MESSAGES TABLE
-- =============================================
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON public.contact_messages FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- SITE SETTINGS TABLE
-- =============================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_projects_client_id ON public.projects(client_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_quotations_client_id ON public.quotations(client_id);
CREATE INDEX idx_quotations_status ON public.quotations(status);
CREATE INDEX idx_quotation_items_quotation_id ON public.quotation_items(quotation_id);
CREATE INDEX idx_contact_messages_is_read ON public.contact_messages(is_read);
CREATE INDEX idx_contact_messages_is_resolved ON public.contact_messages(is_resolved);

-- =============================================
-- SEED DATA
-- =============================================

-- Insert default admin user (use your auth.users id after signup)
-- INSERT INTO public.profiles (id, email, full_name, role)
-- VALUES ('your-user-uuid', 'admin@novatec.mx', 'Administrador', 'admin');

-- Insert sample services
INSERT INTO public.services (name, description, category, price, icon, order_index) VALUES
  ('Desarrollo Web', 'Creamos sitios web y aplicaciones web modernas, rápidas y escalables.', 'Desarrollo', 25000, 'Globe', 1),
  ('Desarrollo Móvil', 'Desarrollamos aplicaciones nativas e híbridas para iOS y Android.', 'Desarrollo', 35000, 'Smartphone', 2),
  ('Desarrollo de Software', 'Construimos soluciones de software personalizadas.', 'Desarrollo', 45000, 'Code', 3),
  ('Diseño UI/UX', 'Creamos interfaces de usuario atractivas y experiencias fluidas.', 'Diseño', 15000, 'Palette', 4),
  ('Soluciones Cloud', 'Implementamos infraestructura en la nube segura y escalable.', 'Infraestructura', 20000, 'Cloud', 5),
  ('Consultoría Tech', 'Asesoramos a empresas en su transformación digital.', 'Consultoría', 8000, 'Lightbulb', 6);

-- Insert sample testimonials
INSERT INTO public.testimonials (client_name, client_company, quote, rating, is_featured) VALUES
  ('María González', 'RetailMax', 'NovaTec transformó completamente nuestra presencia digital. Su equipo entendió perfectamente nuestra visión y entregó un producto que superó nuestras expectativas.', 5, true),
  ('Carlos Ruiz', 'FinCorp', 'Trabajar con NovaTec fue una experiencia excepcional. Su metodología ágil nos mantuvo informados en cada etapa del proyecto.', 5, true),
  ('Ana Martínez', 'TechStart', 'Necesitábamos un partner tecnológico que entendiera el ritmo startup. NovaTec no solo entregó código de calidad, sino que también aportó ideas estratégicas.', 5, true),
  ('Roberto Sánchez', 'FastShip', 'La aplicación de logística que desarrolló NovaTec optimizó nuestras operaciones en un 40%. Su equipo técnico es de primer nivel.', 5, true);

-- Insert sample site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('company_name', 'NovaTec'),
  ('tagline', 'Transformamos Ideas en Software Excepcional'),
  ('email', 'hola@novatec.mx'),
  ('phone', '+52 (55) 1234 5678'),
  ('address', 'Av. Tecnológico 123, Ciudad de México, CP 06000'),
  ('facebook', 'https://facebook.com/novatec'),
  ('twitter', 'https://twitter.com/novatec'),
  ('instagram', 'https://instagram.com/novatec'),
  ('linkedin', 'https://linkedin.com/company/novatec'),
  ('github', 'https://github.com/novatec'),
  ('meta_title', 'NovaTec | Desarrollo de Software Premium'),
  ('meta_description', 'Transformamos Ideas en Software Excepcional. Desarrollo web, móvil y soluciones tecnológicas de alto nivel para tu empresa.');

-- =============================================
-- FUNCTION TO AUTOMATICALLY CREATE PROFILE ON SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- FUNCTION TO UPDATE TIMESTAMPS
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_quotations_updated_at
  BEFORE UPDATE ON public.quotations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

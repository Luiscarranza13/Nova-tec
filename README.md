# 🚀 NovaTec - Agencia de Desarrollo de Software

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Sitio web corporativo de NovaTec, agencia líder de desarrollo de software en Cajamarca, Perú. Construido con Next.js 15, TypeScript, Tailwind CSS y optimizado para SEO.

## ✨ Características

- ⚡ **Next.js 15** con App Router y Server Components
- 🎨 **Tailwind CSS** para estilos modernos y responsivos
- 🔍 **SEO Optimizado** con metadata completa y Schema.org
- 📱 **PWA** - Instalable como aplicación
- 🎭 **Animaciones** con Framer Motion
- 📊 **Analytics** - Google Analytics 4 y Facebook Pixel
- 🔒 **Seguridad** - Headers de seguridad y HTTPS
- ♿ **Accesibilidad** - WCAG 2.1 AA compliant
- 🌐 **i18n Ready** - Preparado para múltiples idiomas
- 📈 **Performance** - Core Web Vitals optimizados

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 15 (React 18)
- **Lenguaje:** TypeScript 5.3
- **Estilos:** Tailwind CSS 3.4
- **Animaciones:** Framer Motion 11
- **Iconos:** Lucide React
- **Formularios:** React Hook Form + Zod
- **UI Components:** Radix UI

### Backend & Database
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **API:** Next.js API Routes

### DevOps & Tools
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4, Facebook Pixel
- **SEO:** Next SEO, Schema.org
- **Testing:** (Próximamente)
- **CI/CD:** Vercel Auto Deploy

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm, yarn o pnpm
- Git

### Clonar el Repositorio
```bash
git clone https://github.com/novatec/website.git
cd website
```

### Instalar Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### Configurar Variables de Entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus credenciales:
```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key

# Analytics (opcional en desarrollo)
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_TAG_MANAGER=GTM-XXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL=XXXXXXXXX
```

### Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
novatec/
├── app/                      # App Router (Next.js 15)
│   ├── (auth)/              # Rutas de autenticación
│   ├── (home)/              # Página principal
│   ├── (public)/            # Páginas públicas
│   ├── admin/               # Panel de administración
│   ├── api/                 # API Routes
│   ├── layout.tsx           # Layout principal
│   ├── globals.css          # Estilos globales
│   ├── sitemap.ts           # Sitemap dinámico
│   └── robots.ts            # Robots.txt dinámico
├── components/              # Componentes React
│   ├── analytics/           # Componentes de analytics
│   ├── home/                # Componentes de la home
│   ├── layout/              # Header, Footer, etc.
│   ├── seo/                 # Componentes SEO
│   └── ui/                  # Componentes UI reutilizables
├── lib/                     # Utilidades y configuración
│   ├── analytics.ts         # Configuración de analytics
│   ├── seo-config.ts        # Configuración SEO
│   ├── constants.ts         # Constantes globales
│   └── utils.ts             # Funciones utilitarias
├── public/                  # Archivos estáticos
│   ├── logo.svg             # Logo
│   ├── logo.png             # Logo PNG
│   ├── robots.txt           # Robots.txt estático
│   └── site.webmanifest     # PWA manifest
├── middleware.ts            # Middleware de Next.js
├── next.config.js           # Configuración de Next.js
├── tailwind.config.ts       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
└── package.json             # Dependencias
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otros Proveedores
```bash
# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📊 SEO y Analytics

### Google Search Console
1. Verifica tu sitio en [Google Search Console](https://search.google.com/search-console)
2. Envía el sitemap: `https://www.novatec.ink/sitemap.xml`
3. Monitorea el rendimiento

### Google Analytics 4
1. Crea una propiedad GA4
2. Agrega el ID en `.env.local`
3. Los eventos se trackean automáticamente

### Google My Business
1. Crea tu perfil en [Google My Business](https://business.google.com)
2. Completa toda la información
3. Solicita reseñas a clientes

## 🎨 Personalización

### Colores
Edita `tailwind.config.ts`:
```typescript
colors: {
  primary: '#6366f1',    // Indigo
  secondary: '#06b6d4',  // Cyan
  // ...
}
```

### Fuentes
Edita `app/layout.tsx`:
```typescript
const inter = Inter({ subsets: ['latin'] })
const sora = Sora({ subsets: ['latin'] })
```

### Contenido
- **Servicios:** `lib/constants.ts` → `SERVICES`
- **Testimonios:** `components/home/Testimonials.tsx`
- **Portafolio:** `lib/constants.ts` → `PORTFOLIO_ITEMS`
- **Blog:** `lib/constants.ts` → `BLOG_POSTS`

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Producción
npm run build            # Build para producción
npm start                # Inicia servidor de producción

# Calidad de Código
npm run lint             # Ejecuta ESLint
npm run lint:fix         # Corrige errores de ESLint
npm run format           # Formatea código con Prettier
npm run typecheck        # Verifica tipos de TypeScript

# Utilidades
npm run check:admin      # Verifica configuración de admin
npm run test:admin       # Prueba CRUD de admin
```

## 🔒 Seguridad

- ✅ HTTPS obligatorio en producción
- ✅ Headers de seguridad configurados
- ✅ CORS configurado
- ✅ Rate limiting en APIs
- ✅ Validación de inputs
- ✅ Protección XSS y CSRF
- ✅ Sanitización de datos

## 📈 Performance

### Core Web Vitals Actuales
- **LCP:** < 2.5s ✅
- **FID:** < 100ms ✅
- **CLS:** < 0.1 ✅
- **FCP:** < 1.8s ✅
- **TTI:** < 3.8s ✅

### Optimizaciones Implementadas
- ✅ Image optimization con Next.js Image
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Preload de recursos críticos
- ✅ Minificación de JS/CSS
- ✅ Compresión Brotli/Gzip
- ✅ Cache optimization
- ✅ CDN (Vercel Edge Network)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 📞 Contacto

**NovaTec** - Agencia de Desarrollo de Software

- 🌐 Website: [https://www.novatec.ink](https://www.novatec.ink)
- 📧 Email: NovaTec.Empresarial@gmail.com
- 📱 WhatsApp: +51 918 146 783
- 📍 Ubicación: Cajamarca, Perú

---

## 🎯 Roadmap

### Q2 2026
- [ ] Implementar tests (Jest + React Testing Library)
- [ ] Agregar más idiomas (inglés)
- [ ] Dashboard de cliente
- [ ] Sistema de tickets
- [ ] Chat en vivo

### Q3 2026
- [ ] Blog con CMS headless
- [ ] Calculadora de presupuestos
- [ ] Sistema de pagos online
- [ ] Área de descargas
- [ ] Webinars y eventos

### Q4 2026
- [ ] App móvil (React Native)
- [ ] Integración con CRM
- [ ] Automatización de marketing
- [ ] A/B testing
- [ ] Personalización con IA

---

**Hecho con ❤️ por NovaTec en Cajamarca, Perú**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/novatec/website)

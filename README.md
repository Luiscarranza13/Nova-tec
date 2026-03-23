# NovaTec - Plataforma Web Corporativa

<p align="center">
  <img src="https://via.placeholder.com/150x150/6366f1/ffffff?text=NovaTec" alt="NovaTec Logo" />
</p>

Una plataforma web completa y moderna para tu empresa de desarrollo de software. Construida con Next.js 14, TypeScript, Tailwind CSS y Supabase.

## Características

### Landing Page
- ✅ Hero impactante con animaciones
- ✅ Servicios destacados
- ✅ ¿Por qué elegir NovaTec?
- ✅ Proceso de trabajo
- ✅ Portafolio
- ✅ Testimonios
- ✅ Planes y precios
- ✅ Sección de contacto
- ✅ Footer completo

### Panel de Administración
- ✅ Dashboard con métricas
- ✅ Gestión de clientes (CRUD)
- ✅ Gestión de proyectos (CRUD)
- ✅ Gestión de servicios (CRUD)
- ✅ Cotizaciones
- ✅ Testimonios
- ✅ Mensajes de contacto
- ✅ Configuración del sitio

### Autenticación
- ✅ Login
- ✅ Registro
- ✅ Recuperación de contraseña
- ✅ Rutas protegidas

## Stack Tecnológico

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Estilos:** Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Supabase (Auth, Database, Storage)
- **Formularios:** React Hook Form, Zod
- **Iconos:** Lucide React
- **Notificaciones:** Sonner

## Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd novatec
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local` y completa los valores:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=NovaTec
```

### 4. Configurar Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecuta el SQL del archivo `supabase/schema.sql` en el editor de SQL de Supabase
3. Copia las credenciales del proyecto

### 5. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── (public)/          # Páginas públicas
│   │   ├── page.tsx       # Home
│   │   ├── nosotros/     # Nosotros
│   │   ├── servicios/    # Servicios
│   │   ├── portafolio/    # Portafolio
│   │   ├── planes/       # Planes
│   │   ├── testimonios/  # Testimonios
│   │   ├── contacto/     # Contacto
│   │   ├── politicas/    # Política de privacidad
│   │   └── terminos/     # Términos y condiciones
│   ├── (auth)/           # Páginas de autenticación
│   │   ├── login/
│   │   ├── registro/
│   │   └── recuperar-password/
│   ├── (dashboard)/      # Panel administrativo
│   │   └── admin/
│   │       ├── page.tsx  # Dashboard
│   │       ├── clientes/
│   │       ├── proyectos/
│   │       ├── servicios/
│   │       ├── cotizaciones/
│   │       ├── testimonios/
│   │       ├── mensajes/
│   │       └── configuracion/
│   └── layout.tsx        # Layout raíz
├── components/
│   ├── ui/               # Componentes de shadcn/ui
│   ├── layout/           # Header, Footer, Sidebar
│   └── home/             # Componentes de la landing
├── lib/
│   ├── supabase/         # Cliente de Supabase
│   ├── constants.ts     # Constantes del proyecto
│   └── utils.ts          # Utilidades
└── supabase/
    └── schema.sql        # Esquema de base de datos
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint
- `npm run format` - Formatea el código con Prettier

## Personalización

### Colores

Edita los colores en `tailwind.config.ts`:

```typescript
colors: {
  primary: 'hsl(var(--primary))',
  accent: 'hsl(var(--accent))',
  // ...
}
```

### Contenido

Edita las constantes en `lib/constants.ts` para cambiar:
- Servicios
- Proceso
- Planes de precios
- Estadísticas

## Despliegue

### Vercel (Recomendado)

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio
3. Configura las variables de entorno
4. Despliega

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

<p align="center">
  © 2024 NovaTec. Todos los derechos reservados.
</p>

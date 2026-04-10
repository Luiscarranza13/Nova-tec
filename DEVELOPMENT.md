# 📖 Guía de Desarrollo - NovaTec

## Estructura de Carpetas

```
/app
  - Rutas y pages de Next.js
  - [slug] - rutas dinámicas
  - /admin - panel administrativo

/components
  - /ui - componentes base reutilizables
  - /layout - header, footer, sidebar
  - /home - componentes de página principal
  - /analytics - tracking y analytics
  - /admin - componentes admin

/lib
  - constants.ts - constantes
  - types.ts - tipos TypeScript
  - helpers.ts - funciones utilitarias
  - validation-schemas.ts - esquemas Zod
  - utils.ts - utilidades adicionales
  - /hooks - custom hooks
  - /supabase - cliente y tipos supabase

/public
  - assets estáticos
  - images, fonts, etc.

/supabase
  - schema.sql - definición de BD
```

## Convenciones de Código

### 1. **Componentes**

**Naming:**
```
✅ Button.tsx           // PascalCase para componentes
❌ button.tsx           // Evitar lowercase

✅ useForm.ts           // camelCase para hooks
❌ UseForm.ts           // Evitar PascalCase
```

**Estructura:**
```tsx
'use client'  // Especificar si es client component

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ComponentProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function MyComponent({ 
  children, 
  variant = 'primary', 
  className 
}: ComponentProps) {
  return (
    <button className={cn('...', className)}>
      {children}
    </button>
  )
}
```

### 2. **Tipos**

```typescript
// ❌ Evitar any
const data: any = {}

// ✅ Usar tipos específicos
interface User {
  id: string
  name: string
  email: string
}

const user: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com'
}
```

### 3. **Estilos**

**Tailwind + Framer Motion:**
```tsx
// ✅ Combinar Tailwind con cn() para conflictos
<div className={cn('p-4 bg-primary', isActive && 'bg-primary/80')}>
  
// ✅ Usar variables CSS para temas
// Definidas en globals.css

// ✅ Usar motion para animaciones
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>
```

### 4. **Formularios**

**Con Zod + React Hook Form:**
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '@/lib/validation-schemas'

export function ContactForm() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur'
  })

  const onSubmit = (data) => {
    // Datos validados automáticamente
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  )
}
```

---

## Best Practices

### 1. **Performance**

```tsx
// ❌ Importar todo
import * from 'framer-motion'

// ✅ Importar específicamente
import { motion } from 'framer-motion'

// ✅ Lazy loading de componentes pesados
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <LoadingSpinner />
})

// ✅ Memoization cuando sea necesario
import { memo } from 'react'

export const ExpensiveComponent = memo(function Component() {
  return <div>...</div>
})
```

### 2. **Seguridad**

```tsx
// ❌ No usar dangerouslySetInnerHTML sin escaping
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Escaear siempre contenido del usuario
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />

// ❌ No exponer datos sensibles en cliente
const apiKey = 'secret'  // ❌

// ✅ Usar variables de entorno
const apiKey = process.env.API_KEY  // Solo si es público: NEXT_PUBLIC_
```

### 3. **SEO**

```tsx
// Pages siempre tienen metadata
export const metadata: Metadata = {
  title: 'Mi página',
  description: 'Descripción clara y concisa',
  keywords: ['keyword1', 'keyword2'],
  openGraph: { /* ... */ }
}

// Usar heading hierarchy correctamente
<h1>Título principal</h1>
<h2>Subsecciones</h2>
<h3>Más específico</h3>

// No usar heading solo para estilos
// ❌ <h2 style="font-size: 12px">Texto pequeño</h2>
// ✅ <p className="text-sm">Texto pequeño</p>
```

### 4. **Accesibilidad**

```tsx
// ✅ Aria labels para elementos interactivos
<button aria-label="Cerrar modal" onClick={close}>
  ✕
</button>

// ✅ Contraste de color suficiente (WCAG AA)
// Use: https://webaim.org/resources/contrastchecker/

// ✅ Keyboard navigation
<input onKeyDown={(e) => {
  if (e.key === 'Escape') close()
}} />

// ✅ Semantic HTML
<header>...</header>
<main>...</main>
<footer>...</footer>
<section>
  <h2>Sección</h2>
</section>
```

---

## Workflow de Desarrollo

### 1. **Crear componente nuevo**

```bash
# 1. Crear archivo
touch components/ui/my-component.tsx

# 2. Actualizar tipos si necesario
# lib/types.ts

# 3. Exportar de index (si aplica)
# components/ui/index.ts

# 4. Usar en páginas
```

### 2. **Agregar feature**

```bash
# 1. Agregar tipos en lib/types.ts
# 2. Agregar constantes en lib/constants.ts
# 3. Crear componentes necesarios
# 4. Actualizar página que lo use
# 5. Testear responsiveness
# 6. Revisar SEO si aplica
```

### 3. **Merge a main**

```bash
# 1. Revisar que no haya console.logs de debug
# 2. Verificar TypeScript sin errores (npm run typecheck)
# 3. Limpiar imports no usados
# 4. Revisar accesibilidad
# 5. Testear en mobile
```

---

## Comandos Útiles

```bash
# Development
npm run dev              # Iniciar dev server

# Building
npm run build            # Build production
npm start                # Iniciar servidor production

# Code Quality
npm run lint             # Lint de ESLint
npm run lint:fix         # Fix automático
npm run format           # Format con Prettier
npm run typecheck        # Verificar tipos TypeScript

# Utility
npm run clean            # Limpiar build cache
```

---

## Debugging

### 1. **React DevTools**
- Instalar extensión en Chrome
- Inspecionar componentes en tiempo real
- Ver props y estado

### 2. **Framer Motion DevTools**
- Debugger visualizador
- Timeline animation

### 3. **Console Logging**
```tsx
// ❌ Dejar logs en código final
console.log('debug')

// ✅ Usar en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.log('debug only in dev')
}
```

### 4. **Next.js DevTools**
- F12 en navegador
- Network tab para API calls
- Performance tab

---

## Testing

### Setup con Jest + React Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Ejemplo test:**
```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

---

## Git Workflow

```bash
# Crear rama para feature
git checkout -b feature/nueva-feature

# Hacer cambios y commits
git add .
git commit -m "feat: agregar nueva feature"

# Push a origen
git push origin feature/nueva-feature

# Crear PR en GitHub
# Pedir 1+ reviews
# Merge cuando esté aprobado
```

**Commit Convention:**
```
feat:    Nueva feature
fix:     Corrección de bug
docs:    Documentación
style:   Formateo, sin cambios lógicos
refactor: Cambios sin feature/bug
perf:    Optimizaciones
test:    Tests
chore:   Build, deps, etc
```

---

## Troubleshooting

### "Module not found"
```bash
# Verificar que la ruta sea correcta
# Usar path aliases: @/components

# ❌ import Button from '../../../components/ui/button'
# ✅ import Button from '@/components/ui/button'
```

### "Type 'xxx' is not assignable"
```bash
# Revisar tipos en lib/types.ts
# Usar as const para literales
const variant = 'primary' as const

# Extender tipos si necesario
interface Extended extends Base {
  newProp: string
}
```

### Estilos no aplicando
```bash
# Verificar que Tailwind está configurado
# tailwind.config.ts debe incluir rutas correctas

# Limpiar cache
rm -rf .next
npm run dev
```

---

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Última actualización:** Abril 2026

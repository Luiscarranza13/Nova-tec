# ⚙️ Quick Setup - Mejoras NovaTec

## 🚀 Para Empezar Rápido

### 1. Configurar Google Analytics (Opcional)

```bash
# En tu archivo .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Reemplaza con tu GA ID
```

Obtén tu GA ID en: [Google Analytics](https://analytics.google.com)

---

### 2. Probar Nuevos Componentes

**Newsletter:**
```bash
# Ya está en la home page
# Prueba enviando un email válido
```

**FAQ:**
```bash
# Scroll hasta la sección FAQ
# Prueba filtrar por categorías
# Abre/cierra preguntas
```

**Case Studies:**
```bash
# Nueva sección después del Proceso
# 3 casos de éxito con resultados reales
```

**Blog Preview:**
```bash
# Artículos destacados
# Click para ver más (próximamente)
```

---

### 3. Usar en Nuevas Páginas

**Importar Newsletter:**
```typescript
import { Newsletter } from '@/components/home/Newsletter'

export default function MyPage() {
  return <Newsletter />
}
```

**Importar FAQ:**
```typescript
import { FAQ } from '@/components/home/FAQ'

export default function MyPage() {
  return <FAQ />
}
```

**Importar CaseStudies:**
```typescript
import { CaseStudies } from '@/components/home/CaseStudies'

export default function MyPage() {
  return <CaseStudies />
}
```

---

### 4. Validar Formularios

**Con Zod + React Hook Form:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '@/lib/validation-schemas'

export function MyContactForm() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(contactFormSchema)
  })

  return (
    <form onSubmit={handleSubmit((data) => {
      // Datos validados automáticamente!
      console.log(data)
    })}>
      <input {...register('name')} placeholder="Nombre" />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Enviar</button>
    </form>
  )
}
```

---

### 5. Usar Utilidades

```typescript
import { formatCurrency, formatDate, isValidEmail } from '@/lib/helpers'

// Formatear moneda
const precio = formatCurrency(15000)  // "S/ 15,000"

// Formatear fecha
const fecha = formatDate(new Date())   // "09/04/2026"

// Validar email
if (isValidEmail(email)) {
  // El email es válido!
}
```

---

## 📋 Checklist de Deploy

Antes de subir a producción:

- [ ] Configurar `NEXT_PUBLIC_GA_ID` en variables de entorno
- [ ] Revisar componentes en mobile
- [ ] Testear formularios
- [ ] Revisar colores en modo oscuro
- [ ] Verificar links funcionen
- [ ] Revisar SEO meta tags
- [ ] Probar en navegadores principales

```bash
# Checklist automático
npm run lint
npm run typecheck
npm run build
```

---

## 🎯 Guía Rápida de Características

| Feature | Ubicación | Uso |
|---------|-----------|-----|
| Newsletter | Home | Suscripciones |
| FAQ | Home | Preguntas frecuentes |
| Case Studies | Home | Social proof |
| Blog Preview | Home | Contenido destacado |
| Breadcrumbs | En cualquier página | Navegación |
| Form Validation | Cualquier formulario | Zod schemas |
| Analytics | Automático | Tracking |

---

## 🆘 Troubleshooting

### Newsletter no funciona
```
✅ Verificar conexión a internet
✅ Revisar consola del navegador (F12)
✅ Probar con email válido (ej: test@example.com)
```

### Componentes no aparecen
```
✅ Verificar que estén importados en el archivo
✅ Revisar que useClient esté en componente
✅ Limpiar cache: rm -rf .next && npm run dev
```

### Estilos raros en mobile
```
✅ Abrir DevTools (F12)
✅ Ir a Responsive Design Mode (Ctrl+Shift+M)
✅ Revisar Tailwind breakpoints
```

### TypeScript errors
```bash
✅ Ejecutar: npm run typecheck
✅ Los tipos están en: lib/types.ts
✅ Revisar interface correcta
```

---

## 📱 Testing en Móvil

```bash
# Emulador local
npm run dev
# Abre DevTools (F12)
# Click responsive design mode (Ctrl+Shift+M)

# Tu IP local (desde otro dispositivo)
# Nota la URL: http://localhost:3000
# Busca tu IP local con: ipconfig (Windows) o ifconfig (Mac)
# En móvil abre: http://TU_IP:3000
```

---

## 🔍 Verificar Setup

```bash
# Todos los tipos correctos?
npm run typecheck      # ✅ Sin errores

# Lint sin problemas?
npm run lint           # ✅ Sin warnings

# Build exitoso?
npm run build          # ✅ Build success

# Server corre bien?
npm start              # ✅ Listen on 3000
```

---

## 📚 Documentación Completa

Documentación detallada disponible en:

- 📖 **IMPROVEMENTS.md** - Todas las nuevas features
- 🛠️ **DEVELOPMENT.md** - Guía de desarrollo
- 📝 **CHANGELOG.md** - Historial de cambios

---

## 🤝 Necesitas Ayuda?

**Contacta a NovaTec:**
- 📧 NovaTec.Empresarial@gmail.com
- 📱 +51 918 146 783 (WhatsApp)
- 🌍 https://novatec.pe

---

## 🚀 Próximas Mejoras

Opciones para futuro:
- [ ] Implementar blog full
- [ ] Dashboard admin avanzado
- [ ] Chatbot AI
- [ ] App móvil
- [ ] Multi-idioma

---

**¡Listo para empezar! 🎉**

Versión: 2.0.0 | Actualizado: Abril 2026

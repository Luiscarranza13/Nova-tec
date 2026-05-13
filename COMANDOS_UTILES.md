# 🛠️ Comandos Útiles - NovaTec

## 📦 Instalación y Setup

```bash
# Clonar repositorio
git clone https://github.com/novatec/website.git
cd website

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install

# Copiar variables de entorno
cp .env.example .env.local

# Editar variables de entorno
code .env.local  # VS Code
nano .env.local  # Terminal
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# Abre: http://localhost:3000

# Iniciar en puerto específico
PORT=3001 npm run dev

# Limpiar cache y reiniciar
rm -rf .next
npm run dev
```

## 🏗️ Build y Producción

```bash
# Build para producción
npm run build

# Analizar bundle size
npm run build -- --analyze

# Iniciar servidor de producción
npm start

# Build y start
npm run build && npm start
```

## 🧹 Calidad de Código

```bash
# Ejecutar ESLint
npm run lint

# Corregir errores de ESLint automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format

# Verificar tipos de TypeScript
npm run typecheck

# Ejecutar todo (lint + format + typecheck)
npm run lint && npm run format && npm run typecheck
```

## 🔍 SEO y Análisis

```bash
# Verificar sitemap
curl https://www.novatec.ink/sitemap.xml

# Verificar robots.txt
curl https://www.novatec.ink/robots.txt

# Verificar metadata de una página
curl -I https://www.novatec.ink

# Lighthouse audit (requiere Chrome)
npx lighthouse https://www.novatec.ink --view

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://www.novatec.ink
```

## 📊 Performance

```bash
# Analizar bundle size
npm run build
npx @next/bundle-analyzer

# Verificar Core Web Vitals
npx web-vitals-cli https://www.novatec.ink

# Analizar con WebPageTest
# Ir a: https://www.webpagetest.org
# URL: https://www.novatec.ink
```

## 🗄️ Base de Datos (Supabase)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Inicializar proyecto
supabase init

# Iniciar Supabase local
supabase start

# Detener Supabase local
supabase stop

# Ver status
supabase status

# Crear migración
supabase migration new nombre_migracion

# Aplicar migraciones
supabase db push

# Reset database
supabase db reset
```

## 🔐 Seguridad

```bash
# Verificar vulnerabilidades
npm audit

# Corregir vulnerabilidades automáticamente
npm audit fix

# Corregir vulnerabilidades (forzado)
npm audit fix --force

# Actualizar dependencias
npm update

# Verificar dependencias desactualizadas
npm outdated
```

## 📸 Imágenes

```bash
# Optimizar imágenes con Sharp
npm install -g sharp-cli

# Convertir a WebP
sharp -i input.jpg -o output.webp

# Redimensionar
sharp -i input.jpg -o output.jpg --resize 1920x1080

# Optimizar todas las imágenes en carpeta
for file in public/images/*.{jpg,png}; do
  sharp -i "$file" -o "${file%.*}.webp"
done
```

## 🧪 Testing (Próximamente)

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con coverage
npm test -- --coverage

# Tests E2E
npm run test:e2e
```

## 📦 Deployment

```bash
# Deploy a Vercel (automático con git push)
git push origin main

# Deploy manual a Vercel
vercel

# Deploy a producción
vercel --prod

# Ver logs de deployment
vercel logs

# Ver dominios
vercel domains ls

# Agregar dominio
vercel domains add www.novatec.ink
```

## 🔄 Git

```bash
# Ver status
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: descripción del cambio"

# Push
git push origin main

# Pull
git pull origin main

# Crear rama
git checkout -b feature/nueva-funcionalidad

# Cambiar de rama
git checkout main

# Merge rama
git merge feature/nueva-funcionalidad

# Ver historial
git log --oneline --graph

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminar cambios)
git reset --hard HEAD~1
```

## 📊 Analytics

```bash
# Verificar Google Analytics
# Abrir en navegador con DevTools
# Network > Filter: google-analytics.com

# Verificar eventos
# Console:
gtag('event', 'test_event', { test: 'value' })

# Verificar Facebook Pixel
# Console:
fbq('track', 'PageView')
```

## 🌐 DNS y Dominio

```bash
# Verificar DNS
nslookup www.novatec.ink

# Verificar registros DNS
dig www.novatec.ink

# Verificar SSL
openssl s_client -connect www.novatec.ink:443

# Verificar headers
curl -I https://www.novatec.ink
```

## 📱 PWA

```bash
# Verificar manifest
curl https://www.novatec.ink/site.webmanifest

# Verificar service worker
# DevTools > Application > Service Workers

# Limpiar cache de service worker
# DevTools > Application > Clear storage
```

## 🔍 SEO Tools

```bash
# Verificar indexación en Google
site:www.novatec.ink

# Verificar backlinks
link:www.novatec.ink

# Verificar páginas similares
related:www.novatec.ink

# Verificar cache de Google
cache:www.novatec.ink

# Buscar keyword específica en sitio
site:www.novatec.ink "desarrollo de software"
```

## 📧 Email Testing

```bash
# Enviar email de prueba (con Resend)
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "NovaTec <noreply@novatec.ink>",
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

## 🔧 Utilidades

```bash
# Ver tamaño de carpetas
du -sh .next node_modules public

# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install

# Limpiar cache de Next.js
rm -rf .next

# Ver procesos en puerto 3000
lsof -i :3000

# Matar proceso en puerto 3000
kill -9 $(lsof -t -i:3000)

# Ver uso de memoria
node --max-old-space-size=4096 node_modules/.bin/next build

# Generar sitemap manualmente
npm run build
curl http://localhost:3000/sitemap.xml > public/sitemap.xml
```

## 📊 Monitoreo

```bash
# Verificar uptime
curl -I https://www.novatec.ink

# Monitoreo continuo (cada 60s)
watch -n 60 'curl -I https://www.novatec.ink'

# Verificar tiempo de respuesta
time curl https://www.novatec.ink > /dev/null

# Verificar desde múltiples ubicaciones
# Usar: https://www.dotcom-tools.com/website-speed-test
```

## 🎨 Diseño

```bash
# Generar favicon desde SVG
npm install -g sharp-cli
sharp -i public/logo.svg -o public/favicon.ico --resize 32x32

# Generar diferentes tamaños de logo
for size in 16 32 48 64 128 256 512; do
  sharp -i public/logo.svg -o public/logo-${size}.png --resize ${size}x${size}
done

# Optimizar SVG
npm install -g svgo
svgo public/logo.svg
```

## 📝 Contenido

```bash
# Contar palabras en archivo
wc -w content/blog/articulo.md

# Buscar palabra en todos los archivos
grep -r "keyword" content/

# Reemplazar texto en múltiples archivos
find . -name "*.md" -exec sed -i 's/old/new/g' {} +

# Generar tabla de contenidos
npm install -g markdown-toc
markdown-toc content/blog/articulo.md
```

## 🚀 Automatización

```bash
# Crear script de deploy
cat > deploy.sh << 'EOF'
#!/bin/bash
echo "🚀 Deploying to production..."
npm run lint
npm run typecheck
npm run build
git add .
git commit -m "deploy: $(date)"
git push origin main
echo "✅ Deployed!"
EOF

chmod +x deploy.sh
./deploy.sh
```

## 📊 Reportes

```bash
# Generar reporte de SEO
npx lighthouse https://www.novatec.ink --output=html --output-path=./reports/seo-report.html

# Generar reporte de performance
npx lighthouse https://www.novatec.ink --only-categories=performance --output=json --output-path=./reports/performance.json

# Generar reporte de accesibilidad
npx lighthouse https://www.novatec.ink --only-categories=accessibility --output=html --output-path=./reports/accessibility.html
```

## 🔍 Debug

```bash
# Ver logs de Next.js
npm run dev -- --debug

# Ver logs de build
npm run build -- --debug

# Ver variables de entorno
printenv | grep NEXT_PUBLIC

# Verificar configuración de Next.js
cat next.config.js

# Ver información del sistema
node -v
npm -v
git --version
```

## 📦 Backup

```bash
# Backup de base de datos (Supabase)
supabase db dump > backup-$(date +%Y%m%d).sql

# Backup de archivos
tar -czf backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .

# Restaurar backup
tar -xzf backup-20260513.tar.gz
```

## 🎯 Quick Commands

```bash
# Desarrollo rápido
alias dev="npm run dev"
alias build="npm run build"
alias start="npm start"
alias lint="npm run lint:fix && npm run format"

# Git rápido
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push origin main"
alias gl="git log --oneline --graph"

# Deploy rápido
alias deploy="npm run lint && npm run build && git push"

# Limpiar todo
alias clean="rm -rf .next node_modules && npm install"
```

## 📞 Soporte

¿Problemas con algún comando?

- 📧 Email: NovaTec.Empresarial@gmail.com
- 📱 WhatsApp: +51 918 146 783
- 🌐 Web: https://www.novatec.ink

---

**Última actualización:** Mayo 2026
**Versión:** 1.0

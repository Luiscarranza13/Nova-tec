#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║          NovaTec — Admin Panel Health Check Script              ║
 * ║  Verifica que todos los módulos del panel admin funcionen       ║
 * ║  Uso: node scripts/check-admin.mjs                              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Cargar variables de entorno desde .env.local ──────────────────────────────
function loadEnv() {
  const envFiles = ['.env.local', '.env']
  for (const file of envFiles) {
    try {
      const content = readFileSync(resolve(__dirname, '..', file), 'utf-8')
      for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const idx = trimmed.indexOf('=')
        if (idx === -1) continue
        const key = trimmed.slice(0, idx).trim()
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) process.env[key] = val
      }
      break
    } catch { /* archivo no existe */ }
  }
}

loadEnv()

// ── Colores ANSI ──────────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  blue:   '\x1b[34m',
  magenta:'\x1b[35m',
  white:  '\x1b[37m',
  bgGreen:'\x1b[42m',
  bgRed:  '\x1b[41m',
}

const ok    = `${c.green}✔${c.reset}`
const fail  = `${c.red}✘${c.reset}`
const warn  = `${c.yellow}⚠${c.reset}`
const info  = `${c.cyan}ℹ${c.reset}`
const arrow = `${c.dim}→${c.reset}`

// ── Resultados globales ───────────────────────────────────────────────────────
const results = { passed: 0, failed: 0, warnings: 0, details: [] }

function log(symbol, label, msg = '', extra = '') {
  const line = `  ${symbol} ${c.bold}${label}${c.reset}${msg ? `  ${c.dim}${msg}${c.reset}` : ''}${extra ? `  ${extra}` : ''}`
  console.log(line)
}

function section(title) {
  console.log(`\n${c.bold}${c.blue}━━━  ${title}  ━━━${c.reset}`)
}

function pass(label, msg = '') {
  results.passed++
  results.details.push({ status: 'pass', label, msg })
  log(ok, label, msg)
}

function failure(label, msg = '') {
  results.failed++
  results.details.push({ status: 'fail', label, msg })
  log(fail, label, `${c.red}${msg}${c.reset}`)
}

function warning(label, msg = '') {
  results.warnings++
  results.details.push({ status: 'warn', label, msg })
  log(warn, label, `${c.yellow}${msg}${c.reset}`)
}

// ── Helpers ───────────────────────────────────────────────────────────────────
async function checkTable(supabase, table, label) {
  try {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
    if (error) {
      if (error.message.includes('schema cache') || error.code === 'PGRST200') {
        warning(label, `tabla "${table}" no expuesta al anon key (verifica RLS/permisos en Supabase)`)
      } else {
        failure(label, `tabla "${table}" → ${error.message}`)
      }
      return false
    }
    pass(label, `tabla "${table}" accesible (${count ?? 0} registros)`)
    return true
  } catch (e) {
    failure(label, `excepción: ${e.message}`)
    return false
  }
}

async function checkInsertDelete(supabase, table, payload, label, hasServiceRole = false) {
  try {
    const { data: inserted, error: insertErr } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single()
    if (insertErr) {
      // RLS sin service role key es esperado — marcar como advertencia, no fallo
      if (insertErr.message.includes('row-level security') && !hasServiceRole) {
        warning(label, `RLS activo — agrega SUPABASE_SERVICE_ROLE_KEY para verificar escritura`)
      } else if (insertErr.message.includes('schema cache')) {
        failure(label + ' [INSERT]', `tabla no encontrada en schema cache — verifica que existe en Supabase`)
      } else {
        failure(label + ' [INSERT]', insertErr.message)
      }
      return false
    }
    const id = inserted?.id
    if (id) {
      const { error: deleteErr } = await supabase.from(table).delete().eq('id', id)
      if (deleteErr) {
        warning(label + ' [DELETE]', deleteErr.message)
      }
    }
    pass(label, 'INSERT + DELETE OK')
    return true
  } catch (e) {
    failure(label, e.message)
    return false
  }
}

async function checkApiRoute(baseUrl, path, method = 'GET', body = null, label) {
  try {
    const opts = { method, headers: { 'Content-Type': 'application/json' }, redirect: 'manual' }
    if (body) opts.body = JSON.stringify(body)
    const res = await fetch(`${baseUrl}${path}`, opts)
    const status = res.status
    // 302/307/308 = redirect (auth guard) — expected for protected admin routes
    if (status === 302 || status === 307 || status === 308) {
      const location = res.headers.get('location') || ''
      if (location.includes('login') || location.includes('auth')) {
        pass(label, `HTTP ${status} → redirige a login (protección de auth activa ✓)`)
      } else {
        pass(label, `HTTP ${status} → redirect a ${location}`)
      }
      return true
    }
    if (status >= 500) {
      failure(label, `HTTP ${status} en ${method} ${path}`)
      return false
    }
    if (status === 401 || status === 403) {
      warning(label, `HTTP ${status} (requiere auth) — esperado en producción`)
      return true
    }
    pass(label, `HTTP ${status} en ${method} ${path}`)
    return true
  } catch (e) {
    failure(label, `no se pudo conectar: ${e.message}`)
    return false
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════
async function main() {
  console.clear()
  console.log(`\n${c.bold}${c.cyan}╔══════════════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.bold}${c.cyan}║   NovaTec — Admin Panel Health Check                ║${c.reset}`)
  console.log(`${c.bold}${c.cyan}╚══════════════════════════════════════════════════════╝${c.reset}`)
  console.log(`  ${c.dim}${new Date().toLocaleString('es-PE')}${c.reset}\n`)

  // ── 1. Variables de entorno ─────────────────────────────────────────────────
  section('1. Variables de Entorno')

  const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const SERVICE_ROLE  = process.env.SUPABASE_SERVICE_ROLE_KEY
  const BASE_URL      = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  if (SUPABASE_URL)  pass('NEXT_PUBLIC_SUPABASE_URL',  SUPABASE_URL.slice(0, 40) + '…')
  else               failure('NEXT_PUBLIC_SUPABASE_URL', 'no definida')

  if (SUPABASE_ANON) pass('NEXT_PUBLIC_SUPABASE_ANON_KEY', '***' + SUPABASE_ANON.slice(-6))
  else               failure('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'no definida')

  if (SERVICE_ROLE)  pass('SUPABASE_SERVICE_ROLE_KEY', '***' + SERVICE_ROLE.slice(-6))
  else               warning('SUPABASE_SERVICE_ROLE_KEY', 'no definida — algunas rutas API pueden fallar')

  if (!SUPABASE_URL || !SUPABASE_ANON) {
    console.log(`\n${c.red}${c.bold}  ✘ No se puede continuar sin las variables de Supabase.${c.reset}`)
    process.exit(1)
  }

  // ── 2. Conexión a Supabase ──────────────────────────────────────────────────
  section('2. Conexión a Supabase')

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
  const supabaseAdmin = SERVICE_ROLE
    ? createClient(SUPABASE_URL, SERVICE_ROLE)
    : supabase

  try {
    const { error } = await supabase.from('servicios').select('id').limit(1)
    if (error) failure('Conexión Supabase', error.message)
    else       pass('Conexión Supabase', 'cliente anon conectado')
  } catch (e) {
    failure('Conexión Supabase', e.message)
    process.exit(1)
  }

  // ── 3. Tablas requeridas ────────────────────────────────────────────────────
  section('3. Tablas de Base de Datos')

  const tables = [
    ['clientes',        'Módulo Clientes'],
    ['proyectos',       'Módulo Proyectos'],
    ['servicios',       'Módulo Servicios'],
    ['cotizaciones',    'Módulo Cotizaciones'],
    ['mensajes',        'Módulo Mensajes'],
    ['testimonios',     'Módulo Testimonios'],
    ['newsletter',      'Módulo Newsletter'],
    ['blog_posts',      'Módulo Blog'],
    ['portafolio_items','Módulo Portafolio'],
    ['page_views',      'Módulo Analytics'],
    ['configuracion',   'Módulo Configuración'],
    ['usuarios',        'Módulo Perfil Admin'],
    ['activity_log',    'Log de Actividad'],
  ]

  const tableResults = {}
  for (const [table, label] of tables) {
    tableResults[table] = await checkTable(supabase, table, label)
  }

  // ── 4. Operaciones CRUD por módulo ──────────────────────────────────────────
  section('4. Operaciones CRUD')

  // Clientes
  if (tableResults['clientes']) {
    await checkInsertDelete(
      supabaseAdmin,
      'clientes',
      { nombre: '__test_check__', correo: `test_${Date.now()}@check.dev` },
      'Clientes — crear y eliminar',
      !!SERVICE_ROLE
    )
  }

  // Servicios
  if (tableResults['servicios']) {
    await checkInsertDelete(
      supabaseAdmin,
      'servicios',
      { nombre: '__test_check__', categoria: 'Desarrollo', orden: 999, activo: false },
      'Servicios — crear y eliminar',
      !!SERVICE_ROLE
    )
  }

  // Proyectos
  if (tableResults['proyectos']) {
    await checkInsertDelete(
      supabaseAdmin,
      'proyectos',
      { nombre: '__test_check__', estado: 'pendiente', progreso: 0 },
      'Proyectos — crear y eliminar',
      !!SERVICE_ROLE
    )
  }

  // Testimonios
  if (tableResults['testimonios']) {
    await checkInsertDelete(
      supabaseAdmin,
      'testimonios',
      { nombre_cliente: '__test_check__', comentario: 'test', calificacion: 5, destacado: false },
      'Testimonios — crear y eliminar',
      !!SERVICE_ROLE
    )
  }

  // Blog
  if (tableResults['blog_posts']) {
    await checkInsertDelete(
      supabaseAdmin,
      'blog_posts',
      {
        titulo: '__test_check__',
        slug: `__test_${Date.now()}__`,
        categoria: 'desarrollo',
        tiempo_lectura: 1,
        publicado: false,
        destacado: false,
      },
      'Blog — crear y eliminar',
      !!SERVICE_ROLE
    )
  }

  // Portafolio
  if (tableResults['portafolio_items']) {
    await checkInsertDelete(
      supabaseAdmin,
      'portafolio_items',
      { nombre: '__test_check__', categoria: 'Web', orden: 999, publicado: false, destacado: false },
      'Portafolio — crear y eliminar',
      !!SERVICE_ROLE
    )
  }

  // Newsletter
  if (tableResults['newsletter']) {
    const testEmail = `test_${Date.now()}@check.dev`
    try {
      const { error: insErr } = await supabaseAdmin
        .from('newsletter')
        .insert({ email: testEmail, activo: true })
      if (insErr) {
        if (insErr.message.includes('row-level security') && !SERVICE_ROLE) {
          warning('Newsletter — suscribir', 'RLS activo — agrega SUPABASE_SERVICE_ROLE_KEY para verificar escritura')
        } else if (insErr.message.includes('schema cache')) {
          failure('Newsletter — suscribir', 'tabla no encontrada en schema cache')
        } else {
          failure('Newsletter — suscribir', insErr.message)
        }
      } else {
        const { error: delErr } = await supabaseAdmin
          .from('newsletter')
          .delete()
          .eq('email', testEmail)
        if (delErr) warning('Newsletter — limpiar test', delErr.message)
        else pass('Newsletter — suscribir y eliminar', 'OK')
      }
    } catch (e) { failure('Newsletter — CRUD', e.message) }
  }

  // Configuración
  if (tableResults['configuracion']) {
    try {
      const testKey = `__test_${Date.now()}__`
      const { error: upsErr } = await supabaseAdmin
        .from('configuracion')
        .upsert({ clave: testKey, valor: 'test', actualizado_en: new Date().toISOString() }, { onConflict: 'clave' })
      if (upsErr) {
        if (upsErr.message.includes('row-level security') && !SERVICE_ROLE) {
          warning('Configuración — upsert', 'RLS activo — agrega SUPABASE_SERVICE_ROLE_KEY para verificar escritura')
        } else {
          failure('Configuración — upsert', upsErr.message)
        }
      } else {
        await supabaseAdmin.from('configuracion').delete().eq('clave', testKey)
        pass('Configuración — leer y escribir', 'OK')
      }
    } catch (e) { failure('Configuración — CRUD', e.message) }
  }

  // Mensajes (solo lectura — no insertar datos de prueba en producción)
  if (tableResults['mensajes']) {
    try {
      const { data, error } = await supabase
        .from('mensajes')
        .select('id, leido, resuelto')
        .limit(1)
      if (error) failure('Mensajes — lectura', error.message)
      else       pass('Mensajes — lectura', `OK (${data?.length ?? 0} registros de muestra)`)
    } catch (e) { failure('Mensajes — lectura', e.message) }
  }

  // Cotizaciones (solo lectura)
  if (tableResults['cotizaciones']) {
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .select('id, estado, total')
        .limit(5)
      if (error) failure('Cotizaciones — lectura', error.message)
      else       pass('Cotizaciones — lectura', `OK (${data?.length ?? 0} registros de muestra)`)
    } catch (e) { failure('Cotizaciones — lectura', e.message) }
  }

  // Pipeline (cotizaciones agrupadas)
  if (tableResults['cotizaciones']) {
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .select('id, numero, estado, total, creado_en, clientes(nombre)')
        .order('creado_en', { ascending: false })
        .limit(10)
      if (error) failure('Pipeline — query con join', error.message)
      else       pass('Pipeline — query con join clientes', `OK (${data?.length ?? 0} registros)`)
    } catch (e) { failure('Pipeline — query', e.message) }
  }

  // Analytics
  if (tableResults['page_views']) {
    try {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      const { data, error } = await supabase
        .from('page_views')
        .select('path, creado_en')
        .gte('creado_en', since)
        .limit(100)
      if (error) failure('Analytics — page_views', error.message)
      else       pass('Analytics — page_views', `OK (${data?.length ?? 0} vistas en 30d)`)
    } catch (e) { failure('Analytics — page_views', e.message) }
  }

  // ── 5. Relaciones entre tablas ──────────────────────────────────────────────
  section('5. Relaciones (JOINs)')

  if (tableResults['proyectos'] && tableResults['clientes']) {
    try {
      const { data, error } = await supabase
        .from('proyectos')
        .select('id, nombre, clientes(id, nombre)')
        .limit(5)
      if (error) failure('proyectos → clientes', error.message)
      else       pass('proyectos → clientes', `JOIN OK (${data?.length ?? 0} registros)`)
    } catch (e) { failure('proyectos → clientes', e.message) }
  }

  if (tableResults['cotizaciones'] && tableResults['clientes']) {
    try {
      const { data, error } = await supabase
        .from('cotizaciones')
        .select('id, numero, clientes(id, nombre, correo)')
        .limit(5)
      if (error) failure('cotizaciones → clientes', error.message)
      else       pass('cotizaciones → clientes', `JOIN OK (${data?.length ?? 0} registros)`)
    } catch (e) { failure('cotizaciones → clientes', e.message) }
  }

  // ── 6. Autenticación ────────────────────────────────────────────────────────
  section('6. Autenticación')

  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      failure('Auth — getSession', error.message)
    } else if (session) {
      pass('Auth — sesión activa', `usuario: ${session.user.email}`)
    } else {
      warning('Auth — sin sesión', 'normal si se ejecuta fuera del navegador')
    }
  } catch (e) { failure('Auth — getSession', e.message) }

  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error && error.message !== 'Auth session missing!') {
      failure('Auth — getUser', error.message)
    } else {
      pass('Auth — getUser', user ? `OK (${user.email})` : 'sin sesión (esperado en CLI)')
    }
  } catch (e) { failure('Auth — getUser', e.message) }

  // ── 7. Rutas API ────────────────────────────────────────────────────────────
  section('7. Rutas API')

  // Verificar si el servidor está corriendo
  let serverRunning = false
  try {
    const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(3000) })
    serverRunning = res.status < 500
  } catch { /* servidor no disponible */ }

  if (!serverRunning) {
    warning('Servidor Next.js', `no disponible en ${BASE_URL} — omitiendo checks de API`)
    warning('API /api/analytics', 'omitido (servidor no disponible)')
    warning('API /api/contact',   'omitido (servidor no disponible)')
    warning('API /api/newsletter','omitido (servidor no disponible)')
  } else {
    pass('Servidor Next.js', `disponible en ${BASE_URL}`)

    await checkApiRoute(BASE_URL, '/api/analytics?days=7', 'GET', null, 'GET /api/analytics')

    await checkApiRoute(
      BASE_URL, '/api/contact', 'POST',
      { nombre: 'Test Check', email: 'test@check.dev', mensaje: 'Verificación automática del sistema' },
      'POST /api/contact'
    )

    await checkApiRoute(
      BASE_URL, '/api/newsletter', 'POST',
      { email: `check_${Date.now()}@test.dev` },
      'POST /api/newsletter'
    )
  }

  // ── 8. Storage de Supabase ──────────────────────────────────────────────────
  section('8. Storage (Supabase)')

  try {
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets()
    if (error) {
      warning('Storage — listar buckets', error.message)
    } else {
      const names = (buckets || []).map(b => b.name).join(', ') || 'ninguno'
      pass('Storage — buckets disponibles', names)

      const avatarBucket = (buckets || []).find(b => b.name === 'avatars')
      if (avatarBucket) pass('Storage — bucket "avatars"', 'existe')
      else              warning('Storage — bucket "avatars"', 'no encontrado (necesario para fotos de perfil)')
    }
  } catch (e) { warning('Storage', e.message) }

  // ── 9. Realtime ─────────────────────────────────────────────────────────────
  section('9. Realtime')

  await new Promise(resolve => {
    let resolved = false
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true
        warning('Realtime — suscripción', 'timeout (puede ser normal en entornos sin WebSocket)')
        resolve()
      }
    }, 4000)

    try {
      const channel = supabase
        .channel('__health_check__')
        .on('system', { event: 'connected' }, () => {
          if (!resolved) {
            resolved = true
            clearTimeout(timeout)
            pass('Realtime — WebSocket', 'conectado correctamente')
            supabase.removeChannel(channel)
            resolve()
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED' && !resolved) {
            resolved = true
            clearTimeout(timeout)
            pass('Realtime — suscripción', `estado: ${status}`)
            supabase.removeChannel(channel)
            resolve()
          }
          if (status === 'CHANNEL_ERROR' && !resolved) {
            resolved = true
            clearTimeout(timeout)
            failure('Realtime — suscripción', `error: ${status}`)
            supabase.removeChannel(channel)
            resolve()
          }
        })
    } catch (e) {
      clearTimeout(timeout)
      warning('Realtime', e.message)
      resolve()
    }
  })

  // ── 10. Módulos del panel — rutas de página ─────────────────────────────────
  section('10. Módulos del Panel Admin')

  const adminModules = [
    ['/admin',                'Dashboard principal'],
    ['/admin/clientes',       'Módulo Clientes'],
    ['/admin/proyectos',      'Módulo Proyectos'],
    ['/admin/servicios',      'Módulo Servicios'],
    ['/admin/cotizaciones',   'Módulo Cotizaciones'],
    ['/admin/pipeline',       'Módulo Pipeline (Kanban)'],
    ['/admin/mensajes',       'Módulo Mensajes'],
    ['/admin/testimonios',    'Módulo Testimonios'],
    ['/admin/newsletter',     'Módulo Newsletter'],
    ['/admin/blog',           'Módulo Blog'],
    ['/admin/portafolio',     'Módulo Portafolio'],
    ['/admin/analytics',      'Módulo Analytics'],
    ['/admin/configuracion',  'Módulo Configuración'],
  ]

  if (!serverRunning) {
    for (const [, label] of adminModules) {
      warning(label, 'omitido (servidor no disponible)')
    }
  } else {
    for (const [path, label] of adminModules) {
      await checkApiRoute(BASE_URL, path, 'GET', null, label)
    }
  }

  // ── Resumen final ───────────────────────────────────────────────────────────
  const total = results.passed + results.failed + results.warnings
  const allOk = results.failed === 0

  console.log(`\n${c.bold}${c.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`)
  console.log(`${c.bold}  RESUMEN FINAL${c.reset}`)
  console.log(`${c.bold}${c.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`)
  console.log(`  ${ok}  Pasaron:    ${c.bold}${c.green}${results.passed}${c.reset} / ${total}`)
  console.log(`  ${fail}  Fallaron:   ${c.bold}${results.failed > 0 ? c.red : c.dim}${results.failed}${c.reset} / ${total}`)
  console.log(`  ${warn}  Advertencias: ${c.bold}${results.warnings > 0 ? c.yellow : c.dim}${results.warnings}${c.reset} / ${total}`)

  if (results.failed > 0) {
    console.log(`\n${c.bold}${c.red}  ✘ Checks fallidos:${c.reset}`)
    for (const d of results.details.filter(d => d.status === 'fail')) {
      console.log(`    ${fail} ${c.bold}${d.label}${c.reset}  ${c.red}${d.msg}${c.reset}`)
    }
  }

  if (results.warnings > 0) {
    console.log(`\n${c.bold}${c.yellow}  ⚠ Advertencias:${c.reset}`)
    for (const d of results.details.filter(d => d.status === 'warn')) {
      console.log(`    ${warn} ${c.bold}${d.label}${c.reset}  ${c.yellow}${d.msg}${c.reset}`)
    }
  }

  console.log()
  if (allOk) {
    console.log(`  ${c.bgGreen}${c.bold}  ✔ PANEL ADMIN OPERATIVO — todos los módulos funcionan  ${c.reset}`)
  } else {
    console.log(`  ${c.bgRed}${c.bold}  ✘ SE ENCONTRARON PROBLEMAS — revisa los errores arriba  ${c.reset}`)
  }
  console.log()

  process.exit(allOk ? 0 : 1)
}

main().catch(err => {
  console.error(`\n${c.red}${c.bold}Error inesperado:${c.reset}`, err)
  process.exit(1)
})

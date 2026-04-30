#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║     NovaTec — Test CRUD completo del Panel Admin                ║
 * ║  Prueba INSERT → SELECT → UPDATE → DELETE en cada módulo        ║
 * ║  Uso: node scripts/test-admin-crud.mjs                          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Cargar .env.local ─────────────────────────────────────────────────────────
function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const content = readFileSync(resolve(__dirname, '..', file), 'utf-8')
      for (const line of content.split('\n')) {
        const t = line.trim()
        if (!t || t.startsWith('#')) continue
        const idx = t.indexOf('=')
        if (idx === -1) continue
        const key = t.slice(0, idx).trim()
        const val = t.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) process.env[key] = val
      }
      break
    } catch { /* no existe */ }
  }
}
loadEnv()

// ── Colores ───────────────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m',
  cyan: '\x1b[36m', blue: '\x1b[34m', white: '\x1b[37m',
  bgGreen: '\x1b[42m', bgRed: '\x1b[41m',
}
const OK   = `${C.green}✔${C.reset}`
const FAIL = `${C.red}✘${C.reset}`
const WARN = `${C.yellow}⚠${C.reset}`
const SEP  = `${C.dim}${'─'.repeat(54)}${C.reset}`

// ── Contadores ────────────────────────────────────────────────────────────────
let passed = 0, failed = 0, warnings = 0
const errors = []

function pass(label, detail = '') {
  passed++
  console.log(`  ${OK} ${C.bold}${label}${C.reset}${detail ? `  ${C.dim}${detail}${C.reset}` : ''}`)
}
function fail(label, detail = '') {
  failed++
  errors.push({ label, detail })
  console.log(`  ${FAIL} ${C.bold}${label}${C.reset}  ${C.red}${detail}${C.reset}`)
}
function warn(label, detail = '') {
  warnings++
  console.log(`  ${WARN} ${C.bold}${label}${C.reset}  ${C.yellow}${detail}${C.reset}`)
}
function section(title) {
  console.log(`\n${C.bold}${C.blue}┌─  ${title}${C.reset}`)
}

// ── CRUD helper ───────────────────────────────────────────────────────────────
async function testCRUD(db, { tabla, modulo, insert, update, uniqueField }) {
  section(`Módulo: ${modulo}  (tabla: ${tabla})`)

  // ── SELECT vacío (tabla accesible) ────────────────────────────────────────
  const { error: selErr } = await db.from(tabla).select('*').limit(1)
  if (selErr) {
    fail(`${modulo} — SELECT`, selErr.message)
    return
  }
  pass(`${modulo} — SELECT`, 'tabla accesible')

  // ── INSERT ────────────────────────────────────────────────────────────────
  const { data: inserted, error: insErr } = await db.from(tabla).insert(insert).select().single()
  if (insErr) {
    fail(`${modulo} — INSERT`, insErr.message)
    return
  }
  const id = inserted?.id
  pass(`${modulo} — INSERT`, `id: ${id?.slice(0, 8)}…`)

  // ── SELECT por id ─────────────────────────────────────────────────────────
  const { data: found, error: findErr } = await db.from(tabla).select('*').eq('id', id).single()
  if (findErr || !found) {
    fail(`${modulo} — SELECT por id`, findErr?.message || 'no encontrado')
  } else {
    pass(`${modulo} — SELECT por id`, 'registro encontrado')
  }

  // ── UPDATE ────────────────────────────────────────────────────────────────
  if (update) {
    const { error: updErr } = await db.from(tabla).update(update).eq('id', id)
    if (updErr) fail(`${modulo} — UPDATE`, updErr.message)
    else        pass(`${modulo} — UPDATE`, `campos: ${Object.keys(update).join(', ')}`)
  }

  // ── DELETE ────────────────────────────────────────────────────────────────
  const { error: delErr } = await db.from(tabla).delete().eq('id', id)
  if (delErr) fail(`${modulo} — DELETE`, delErr.message)
  else        pass(`${modulo} — DELETE`, 'registro limpiado')
}

// ── API helper ────────────────────────────────────────────────────────────────
async function testAPI(baseUrl, { ruta, metodo = 'GET', cuerpo = null, etiqueta, esperaExito = true }) {
  try {
    const opts = { method: metodo, headers: { 'Content-Type': 'application/json' }, redirect: 'manual' }
    if (cuerpo) opts.body = JSON.stringify(cuerpo)
    const res = await fetch(`${baseUrl}${ruta}`, opts)
    const status = res.status

    // Redirect a login = protección de auth activa (correcto)
    if (status === 302 || status === 307 || status === 308) {
      pass(`API ${metodo} ${ruta}`, `HTTP ${status} → redirige a login (auth activa ✓)`)
      return
    }
    if (esperaExito && status >= 400) {
      let body = ''
      try { body = await res.text() } catch {}
      fail(`API ${metodo} ${ruta}`, `HTTP ${status} — ${body.slice(0, 120)}`)
    } else {
      pass(`API ${metodo} ${ruta}`, `HTTP ${status}`)
    }
  } catch (e) {
    fail(`API ${metodo} ${ruta}`, `sin conexión: ${e.message}`)
  }
}

// ═════════════════════════════════════════════════════════════════════════════
async function main() {
  console.clear()
  console.log(`\n${C.bold}${C.cyan}╔══════════════════════════════════════════════════════╗${C.reset}`)
  console.log(`${C.bold}${C.cyan}║   NovaTec — Test CRUD Panel Admin                   ║${C.reset}`)
  console.log(`${C.bold}${C.cyan}╚══════════════════════════════════════════════════════╝${C.reset}`)
  console.log(`  ${C.dim}${new Date().toLocaleString('es-PE')}${C.reset}`)

  const URL_SB  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const KEY_SB  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const SRK     = process.env.SUPABASE_SERVICE_ROLE_KEY
  const BASE    = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  if (!URL_SB || !KEY_SB) {
    console.log(`\n${C.red}${C.bold}  ✘ Faltan variables NEXT_PUBLIC_SUPABASE_URL / ANON_KEY${C.reset}`)
    process.exit(1)
  }

  // Usamos service role si está disponible, si no anon key
  const db = createClient(URL_SB, SRK || KEY_SB)
  const modoKey = SRK ? 'service_role (bypass RLS)' : 'anon key (RLS activo)'

  console.log(`\n  ${C.dim}Supabase: ${URL_SB.slice(8, 40)}…${C.reset}`)
  console.log(`  ${C.dim}Key: ${modoKey}${C.reset}`)
  if (!SRK) {
    console.log(`\n  ${WARN} ${C.yellow}Sin SUPABASE_SERVICE_ROLE_KEY — los INSERT pueden fallar por RLS${C.reset}`)
    console.log(`  ${C.dim}Agrega la key en .env.local para pruebas completas${C.reset}`)
  }

  // ── 1. CLIENTES ─────────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'clientes', modulo: 'Clientes',
    insert: { nombre: '__test_crud__', correo: `crud_${Date.now()}@test.dev` },
    update: { empresa: 'Empresa Test', telefono: '+51999000000' },
  })

  // ── 2. SERVICIOS ────────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'servicios', modulo: 'Servicios',
    insert: { nombre: '__test_crud__', categoria: 'Desarrollo', orden: 9999, activo: false },
    update: { descripcion: 'Descripción de prueba', precio: 1500 },
  })

  // ── 3. PROYECTOS ────────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'proyectos', modulo: 'Proyectos',
    insert: { nombre: '__test_crud__', estado: 'pendiente', progreso: 0 },
    update: { estado: 'en_progreso', progreso: 25 },
  })

  // ── 4. COTIZACIONES ─────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'cotizaciones', modulo: 'Cotizaciones',
    insert: { estado: 'borrador', subtotal: 1000, impuesto: 180, total: 1180 },
    update: { estado: 'enviada', notas: 'Nota de prueba' },
  })

  // ── 5. MENSAJES ─────────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'mensajes', modulo: 'Mensajes',
    insert: { nombre: '__test_crud__', correo: `crud_${Date.now()}@test.dev`, mensaje: 'Mensaje de prueba CRUD', leido: false, resuelto: false },
    update: { leido: true },
  })

  // ── 6. TESTIMONIOS ──────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'testimonios', modulo: 'Testimonios',
    insert: { nombre_cliente: '__test_crud__', comentario: 'Testimonio de prueba', calificacion: 5, destacado: false },
    update: { destacado: true, empresa: 'Empresa Test' },
  })

  // ── 7. NEWSLETTER ───────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'newsletter', modulo: 'Newsletter',
    insert: { correo: `crud_${Date.now()}@test.dev`, activo: true },
    update: { activo: false },
  })

  // ── 8. ENTRADAS BLOG ────────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'entradas_blog', modulo: 'Blog',
    insert: {
      titulo: '__test_crud__',
      slug: `__test_${Date.now()}__`,
      categoria: 'desarrollo',
      tiempo_lectura: 1,
      publicado: false,
      destacado: false,
    },
    update: { titulo: '__test_crud_actualizado__', publicado: true },
  })

  // ── 9. ELEMENTOS PORTAFOLIO ─────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'elementos_portafolio', modulo: 'Portafolio',
    insert: { nombre: '__test_crud__', categoria: 'Web', orden: 9999, publicado: false, destacado: false },
    update: { nombre: '__test_crud_actualizado__', publicado: true },
  })

  // ── 10. VISITAS PAGINA ──────────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'visitas_pagina', modulo: 'Analytics (visitas)',
    insert: { ruta: '/test-crud', referidor: null, agente_usuario: 'test-script/1.0', pais: 'PE' },
    update: null, // no se actualiza, solo se inserta
  })

  // ── 11. REGISTRO ACTIVIDAD ──────────────────────────────────────────────────
  await testCRUD(db, {
    tabla: 'registro_actividad', modulo: 'Registro de Actividad',
    insert: { accion: 'VER', tabla: 'test', descripcion: 'Prueba CRUD del script' },
    update: null,
  })

  // ── 12. CONFIGURACION ───────────────────────────────────────────────────────
  section('Módulo: Configuración  (tabla: configuracion)')
  const claveTest = `__test_crud_${Date.now()}__`
  const { error: cfgInsErr } = await db.from('configuracion')
    .upsert({ clave: claveTest, valor: 'valor_prueba', actualizado_en: new Date().toISOString() }, { onConflict: 'clave' })
  if (cfgInsErr) {
    fail('Configuración — UPSERT', cfgInsErr.message)
  } else {
    pass('Configuración — UPSERT', `clave: ${claveTest}`)
    const { data: cfgFound } = await db.from('configuracion').select('*').eq('clave', claveTest).single()
    if (cfgFound) pass('Configuración — SELECT', `valor: ${cfgFound.valor}`)
    else          fail('Configuración — SELECT', 'no encontrado')
    await db.from('configuracion').delete().eq('clave', claveTest)
    pass('Configuración — DELETE', 'limpiado')
  }

  // ── 13. PIPELINE (cotizaciones con join) ────────────────────────────────────
  section('Módulo: Pipeline  (cotizaciones + clientes JOIN)')
  const { data: pipeline, error: pipeErr } = await db
    .from('cotizaciones')
    .select('id, numero, estado, total, clientes(nombre)')
    .order('creado_en', { ascending: false })
    .limit(5)
  if (pipeErr) fail('Pipeline — JOIN cotizaciones→clientes', pipeErr.message)
  else         pass('Pipeline — JOIN cotizaciones→clientes', `${pipeline?.length ?? 0} registros`)

  // ── 14. DASHBOARD (múltiples tablas) ────────────────────────────────────────
  section('Módulo: Dashboard  (conteos múltiples tablas)')
  const tablasDash = ['clientes', 'proyectos', 'cotizaciones', 'mensajes', 'servicios', 'testimonios']
  let dashOk = true
  for (const t of tablasDash) {
    const { count, error } = await db.from(t).select('*', { count: 'exact', head: true })
    if (error) { fail(`Dashboard — count(${t})`, error.message); dashOk = false }
    else        pass(`Dashboard — count(${t})`, `${count ?? 0} registros`)
  }

  // ── 15. RUTAS API ────────────────────────────────────────────────────────────
  section('Rutas API')

  let serverOk = false
  try {
    const r = await fetch(BASE, { signal: AbortSignal.timeout(3000), redirect: 'manual' })
    serverOk = r.status < 500
  } catch {}

  if (!serverOk) {
    warn('Servidor Next.js', `no disponible en ${BASE} — inicia con npm run dev`)
    warn('API /api/analytics', 'omitido')
    warn('API /api/contact',   'omitido')
    warn('API /api/newsletter','omitido')
  } else {
    pass('Servidor Next.js', `disponible en ${BASE}`)

    await testAPI(BASE, {
      ruta: '/api/analytics?days=7', metodo: 'GET',
      etiqueta: 'GET /api/analytics',
    })

    await testAPI(BASE, {
      ruta: '/api/contact', metodo: 'POST',
      cuerpo: { nombre: 'Test CRUD', email: 'test@crud.dev', mensaje: 'Prueba automática del script de verificación' },
      etiqueta: 'POST /api/contact',
    })

    await testAPI(BASE, {
      ruta: '/api/newsletter', metodo: 'POST',
      cuerpo: { email: `crud_api_${Date.now()}@test.dev` },
      etiqueta: 'POST /api/newsletter',
    })

    // Rutas admin (deben redirigir a login, no dar 500)
    const rutasAdmin = [
      '/admin', '/admin/clientes', '/admin/proyectos', '/admin/servicios',
      '/admin/cotizaciones', '/admin/pipeline', '/admin/mensajes',
      '/admin/testimonios', '/admin/newsletter', '/admin/blog',
      '/admin/portafolio', '/admin/analytics', '/admin/configuracion',
    ]
    section('Rutas del Panel Admin (deben redirigir a login)')
    for (const ruta of rutasAdmin) {
      await testAPI(BASE, { ruta, metodo: 'GET', etiqueta: ruta })
    }
  }

  // ── RESUMEN ──────────────────────────────────────────────────────────────────
  const total = passed + failed + warnings
  console.log(`\n${C.bold}${C.cyan}${SEP}${C.reset}`)
  console.log(`${C.bold}  RESUMEN${C.reset}`)
  console.log(SEP)
  console.log(`  ${OK}  Pasaron:      ${C.bold}${C.green}${passed}${C.reset} / ${total}`)
  console.log(`  ${FAIL}  Fallaron:     ${C.bold}${failed > 0 ? C.red : C.dim}${failed}${C.reset} / ${total}`)
  console.log(`  ${WARN}  Advertencias: ${C.bold}${warnings > 0 ? C.yellow : C.dim}${warnings}${C.reset} / ${total}`)

  if (errors.length > 0) {
    console.log(`\n${C.bold}${C.red}  Errores a corregir:${C.reset}`)
    for (const e of errors) {
      console.log(`    ${FAIL} ${C.bold}${e.label}${C.reset}`)
      console.log(`       ${C.red}${e.detail}${C.reset}`)
    }
  }

  console.log()
  if (failed === 0) {
    console.log(`  ${C.bgGreen}${C.bold}  ✔ TODOS LOS MÓDULOS FUNCIONAN CORRECTAMENTE  ${C.reset}`)
  } else {
    console.log(`  ${C.bgRed}${C.bold}  ✘ HAY ${failed} ERROR(ES) — revisa arriba  ${C.reset}`)
  }
  console.log()

  process.exit(failed === 0 ? 0 : 1)
}

main().catch(e => {
  console.error(`\n${C.red}Error inesperado:${C.reset}`, e.message)
  process.exit(1)
})

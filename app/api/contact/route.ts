import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const schema = z.object({
  nombre:  z.string().min(2).max(100),
  email:   z.string().email(),
  asunto:  z.string().max(200).optional(),
  mensaje: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { success, remaining } = rateLimit(`contact:${ip}`, 5, 60_000)

  if (!success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta en un minuto.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten() }, { status: 422 })
  }

  const { nombre, email, asunto, mensaje } = parsed.data

  // Fix 7: usar service role key en server-side para bypass de RLS
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { error } = await supabase.from('mensajes').insert({
    nombre,
    correo: email,
    asunto: asunto || 'Sin asunto',
    mensaje,
    leido: false,
    resuelto: false,
    creado_en: new Date().toISOString(),
  })

  if (error) {
    console.error('Contact insert error:', error)
    return NextResponse.json({ error: 'Error al guardar el mensaje' }, { status: 500 })
  }

  // Fix 3: email desde variable de entorno
  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail) {
    try {
      await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `📩 Nuevo Mensaje: ${asunto || 'Sin Asunto'}`,
          _template: 'box',
          Nombre_del_Cliente: nombre,
          Correo_del_Cliente: email,
          Asunto: asunto || 'Sin asunto expresado',
          Mensaje_Recibido: mensaje,
          _replyto: email,
          _autoresponse: '¡Hola! Hemos recibido tu mensaje en NovaTec. Estaremos leyéndolo y nos contactaremos a la brevedad posible.',
        }),
      })
    } catch (e) {
      console.error('Email notification failed', e)
    }
  }

  return NextResponse.json(
    { success: true, message: 'Mensaje enviado correctamente' },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}

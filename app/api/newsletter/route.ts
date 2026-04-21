import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = rateLimit(`newsletter:${ip}`, 3, 60_000)
  if (!success) return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })

  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Email inválido' }, { status: 422 })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { error } = await supabase
    .from('newsletter')
    .upsert({ email: parsed.data.email, suscrito_en: new Date().toISOString() }, { onConflict: 'email' })

  if (error) return NextResponse.json({ error: 'Error al suscribirse' }, { status: 500 })

  // Notificación por correo al administrador
  try {
    await fetch('https://formsubmit.co/ajax/carranzacortesluisarmando73@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: '🎉 ¡Nuevo Suscriptor en el Newsletter de NovaTec!',
        _template: 'box',
        Mensaje: 'Se acaba de suscribir una nueva persona. Aquí tienes los detalles:',
        Correo_del_Cliente: parsed.data.email,
        Fecha_de_Suscripción: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
        _autoresponse: '¡Gracias por suscribirte al newsletter de NovaTec! Muy pronto recibirás nuestras novedades.'
      })
    })
  } catch (e) {
    console.error('Email notification failed', e)
  }

  return NextResponse.json({ success: true })
}

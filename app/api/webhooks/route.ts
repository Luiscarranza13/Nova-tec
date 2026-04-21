import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'
import crypto from 'crypto'

const eventSchema = z.object({
  event:   z.enum(['nuevo_mensaje', 'nueva_cotizacion', 'cotizacion_aceptada', 'nuevo_cliente']),
  payload: z.record(z.unknown()),
})

// Verify webhook signature (HMAC-SHA256)
function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = rateLimit(`webhook:${ip}`, 30, 60_000)
  if (!success) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })

  const body = await req.text()
  const signature = req.headers.get('x-novatec-signature') || ''
  const secret = process.env.WEBHOOK_SECRET || ''

  if (secret && signature && !verifySignature(body, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let parsed: unknown
  try { parsed = JSON.parse(body) }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const result = eventSchema.safeParse(parsed)
  if (!result.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 422 })

  const { event, payload } = result.data

  // Get configured webhook URLs from DB
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { data: config } = await supabase
    .from('configuracion')
    .select('clave, valor')
    .in('clave', ['webhook_url_mensajes', 'webhook_url_cotizaciones', 'webhook_url_clientes'])

  const webhookMap: Record<string, string> = {
    nuevo_mensaje:       'webhook_url_mensajes',
    nueva_cotizacion:    'webhook_url_cotizaciones',
    cotizacion_aceptada: 'webhook_url_cotizaciones',
    nuevo_cliente:       'webhook_url_clientes',
  }

  const configMap = Object.fromEntries((config || []).map(c => [c.clave, c.valor]))
  const webhookUrl = configMap[webhookMap[event]]

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'NovaTec-Webhook/1.0' },
        body: JSON.stringify({ event, payload, timestamp: new Date().toISOString() }),
      })
    } catch { /* non-critical */ }
  }

  return NextResponse.json({ success: true, event })
}

// GET: list available events
export async function GET() {
  return NextResponse.json({
    events: [
      { name: 'nuevo_mensaje',       description: 'Se recibe un nuevo mensaje de contacto' },
      { name: 'nueva_cotizacion',    description: 'Se crea una nueva cotización' },
      { name: 'cotizacion_aceptada', description: 'Una cotización es aceptada' },
      { name: 'nuevo_cliente',       description: 'Se registra un nuevo cliente' },
    ],
    docs: '/api/docs',
  })
}

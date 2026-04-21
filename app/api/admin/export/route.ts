import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const table = searchParams.get('table')
  const format = searchParams.get('format') || 'csv'

  const allowed = ['clientes', 'proyectos', 'cotizaciones', 'mensajes', 'testimonios']
  if (!table || !allowed.includes(table)) {
    return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 })
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { data, error } = await supabase.from(table).select('*').order('creado_en', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (format === 'json') {
    return NextResponse.json(data, {
      headers: { 'Content-Disposition': `attachment; filename="${table}.json"` }
    })
  }

  // CSV
  if (!data?.length) return NextResponse.json({ error: 'Sin datos' }, { status: 404 })
  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(h => {
      const v = row[h]
      if (v === null || v === undefined) return ''
      const s = String(v).replace(/"/g, '""')
      return s.includes(',') || s.includes('\n') ? `"${s}"` : s
    }).join(',')
  )
  const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv;charset=utf-8',
      'Content-Disposition': `attachment; filename="${table}-${new Date().toISOString().split('T')[0]}.csv"`,
    }
  })
}

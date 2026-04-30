import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,`n    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get('days') || '30')
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const [
    { data: vistas, count: totalVistas },
    { data: todasVistas },
    { data: visitasDiarias },
  ] = await Promise.all([
    supabase.from('visitas_pagina').select('id', { count: 'exact', head: true }).gte('creado_en', since),
    supabase.from('visitas_pagina').select('ruta').gte('creado_en', since),
    supabase.from('visitas_pagina').select('creado_en').gte('creado_en', since).order('creado_en'),
  ])

  // Contar por ruta
  const conteoRutas: Record<string, number> = {}
  ;(todasVistas || []).forEach(v => {
    conteoRutas[v.ruta] = (conteoRutas[v.ruta] || 0) + 1
  })
  const paginasTop = Object.entries(conteoRutas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }))

  // Visitas por día
  const conteoDiario: Record<string, number> = {}
  ;(visitasDiarias || []).forEach(v => {
    const dia = v.creado_en.split('T')[0]
    conteoDiario[dia] = (conteoDiario[dia] || 0) + 1
  })
  const visitasPorDia = Object.entries(conteoDiario)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }))

  return NextResponse.json({
    totalViews: totalVistas || 0,
    topPages: paginasTop,
    dailyViews: visitasPorDia,
  })
}

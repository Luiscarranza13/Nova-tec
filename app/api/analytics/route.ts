import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get('days') || '30')
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const [
    { data: views },
    { data: topPages },
    { data: dailyViews },
  ] = await Promise.all([
    supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('creado_en', since),
    supabase.from('page_views').select('path').gte('creado_en', since),
    supabase.from('page_views').select('creado_en').gte('creado_en', since).order('creado_en'),
  ])

  // Count by path
  const pathCount: Record<string, number> = {}
  ;(topPages || []).forEach(v => { pathCount[v.path] = (pathCount[v.path] || 0) + 1 })
  const topPagesArr = Object.entries(pathCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }))

  // Daily views
  const dailyCount: Record<string, number> = {}
  ;(dailyViews || []).forEach(v => {
    const day = v.creado_en.split('T')[0]
    dailyCount[day] = (dailyCount[day] || 0) + 1
  })
  const dailyArr = Object.entries(dailyCount)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }))

  return NextResponse.json({
    totalViews: (views as any)?.count || 0,
    topPages: topPagesArr,
    dailyViews: dailyArr,
  })
}

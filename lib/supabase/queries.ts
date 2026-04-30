import { createServerClient } from '@supabase/ssr'
import { unstable_cache } from 'next/cache'

function getSupabase() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

// Servicios activos — cache 5 min, revalidar en background
export const getServicios = unstable_cache(
  async () => {
    const { data } = await getSupabase()
      .from('servicios')
      .select('*')
      .eq('activo', true)
      .order('orden')
    return data ?? []
  },
  ['servicios-publicos'],
  { revalidate: 300, tags: ['servicios'] }
)

// Portafolio publicado — cache 5 min
export const getPortafolio = unstable_cache(
  async () => {
    const { data } = await getSupabase()
      .from('portafolio')
      .select('*')
      .eq('publicado', true)
      .order('orden')
    return data ?? []
  },
  ['portafolio-publico'],
  { revalidate: 300, tags: ['portafolio'] }
)

// Testimonios destacados — cache 10 min
export const getTestimonios = unstable_cache(
  async () => {
    const { data } = await getSupabase()
      .from('testimonios')
      .select('*')
      .eq('destacado', true)
      .order('creado_en', { ascending: false })
      .limit(12)
    return data ?? []
  },
  ['testimonios-publicos'],
  { revalidate: 600, tags: ['testimonios'] }
)

// Blog posts publicados — cache 5 min
export const getBlogPosts = unstable_cache(
  async () => {
    const { data } = await getSupabase()
      .from('blog_posts')
      .select('id, titulo, slug, extracto, imagen_url, categoria, tags, tiempo_lectura, publicado_en')
      .eq('publicado', true)
      .order('publicado_en', { ascending: false })
    return data ?? []
  },
  ['blog-posts-publicos'],
  { revalidate: 300, tags: ['blog'] }
)

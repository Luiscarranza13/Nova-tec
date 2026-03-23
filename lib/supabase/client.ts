import { createBrowserClient } from '@supabase/ssr'

// Usar createBrowserClient de @supabase/ssr para que las cookies
// se manejen correctamente con el middleware de Next.js
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const getSupabaseClient = () => supabase

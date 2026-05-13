import { createBrowserClient } from '@supabase/ssr'

// Fallback values for when Supabase is not configured
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
  )
}

// Usar createBrowserClient de @supabase/ssr para que las cookies
// se manejen correctamente con el middleware de Next.js
export const supabase = createBrowserClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)

export const getSupabaseClient = () => supabase
